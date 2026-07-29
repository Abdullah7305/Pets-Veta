import { performance } from "node:perf_hooks";

import type { EmbeddedDocument } from "../embeddings";
import type {
  VectorStore,
  VectorStoreDatabase,
  VectorStoreLogger,
  VectorStoreOptions,
  VectorStoreTransaction,
} from "./vector-store.interface";
import type { VectorStoreOperation, VectorStoreResult } from "./vector-store.types";
import {
  buildDeleteQuery,
  buildFindByDocumentQuery,
  buildUpsertQuery,
  emitVectorStoreLog,
  prepareChunk,
  type PreparedChunk,
  createVectorStoreLogger,
  resolveVectorStoreBatchSize,
  serializeVectorStoreError,
} from "./vector-store.utils";
import { DEFAULT_VECTOR_STORE_BATCH_SIZE } from "./vector-store.constants";
import { PrismaVectorStoreRepository } from "./repository";
import {
  assertChunkIndexes,
  assertKnowledgeDocumentId,
  assertVectorStoreBatchSize,
} from "./vector-store.validator";
import type { StoredKnowledgeChunk } from "./vector-store.types";

export class PgVectorStoreService implements VectorStore {
  private readonly batchSize: number;
  private readonly database: VectorStoreDatabase;
  private readonly logger: VectorStoreLogger | import("pino").Logger;
  private readonly continueOnBatchError: boolean;

  constructor(options: VectorStoreOptions = {}) {
    if (options.batchSize !== undefined) assertVectorStoreBatchSize(options.batchSize);
    this.batchSize = options.database
      ? (options.batchSize ?? DEFAULT_VECTOR_STORE_BATCH_SIZE)
      : resolveVectorStoreBatchSize(options.batchSize);
    this.database = options.database ?? new PrismaVectorStoreRepository();
    this.logger = options.logger ?? createVectorStoreLogger();
    this.continueOnBatchError = options.continueOnBatchError ?? true;
  }

  saveChunks(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    return this.writeBatches("save", id, chunks);
  }

  saveEmbeddings(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    return this.saveChunks(id, chunks);
  }

  updateChunks(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    return this.writeBatches("update", id, chunks);
  }

  updateEmbeddings(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    return this.updateChunks(id, chunks);
  }

  async deleteChunks(
    id: string,
    chunkIndexes?: readonly number[],
  ): Promise<VectorStoreResult> {
    const startedAt = performance.now();
    const requested = chunkIndexes?.length ?? 0;
    this.started("delete", id, requested);
    try {
      assertKnowledgeDocumentId(id);
      if (chunkIndexes) assertChunkIndexes(chunkIndexes);
    } catch (error) {
      return this.failure("delete", id, requested, startedAt, error);
    }
    if (chunkIndexes?.length === 0) return this.completed("delete", id, 0, 0, 0, 0, startedAt);
    try {
      const affected = await this.database.execute(buildDeleteQuery(id, chunkIndexes));
      return this.completed("delete", id, requested, affected, 0, 1, startedAt);
    } catch (error) {
      return this.failure("delete", id, requested, startedAt, error);
    }
  }

  deleteDocumentChunks(id: string): Promise<VectorStoreResult> {
    return this.deleteChunks(id);
  }

  async replaceChunks(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    const startedAt = performance.now();
    this.started("replace", id, chunks.length);
    let prepared: PreparedChunk[];
    try {
      assertKnowledgeDocumentId(id);
      prepared = chunks.map(prepareChunk);
      this.assertUniqueIndexes(prepared);
    } catch (error) {
      return this.failure("replace", id, chunks.length, startedAt, error);
    }

    let batchesProcessed = 0;
    try {
      const affected = await this.database.transaction(async (transaction) => {
        await transaction.execute(buildDeleteQuery(id));
        let inserted = 0;
        for (let start = 0; start < prepared.length; start += this.batchSize) {
          const batch = prepared.slice(start, start + this.batchSize);
          inserted += await transaction.execute(buildUpsertQuery(id, batch));
          batchesProcessed += 1;
        }
        return inserted;
      });
      return this.completed("replace", id, chunks.length, affected, 0, batchesProcessed, startedAt);
    } catch (error) {
      return this.failure("replace", id, chunks.length, startedAt, error, batchesProcessed);
    }
  }

  replaceDocumentChunks(id: string, chunks: readonly EmbeddedDocument[]): Promise<VectorStoreResult> {
    return this.replaceChunks(id, chunks);
  }

  async findChunksByDocument(id: string): Promise<StoredKnowledgeChunk[]> {
    const startedAt = performance.now();
    try {
      assertKnowledgeDocumentId(id);
      if (!this.database.query) throw new Error("Repository does not support chunk lookup");
      const chunks = await this.database.query<StoredKnowledgeChunk>(buildFindByDocumentQuery(id));
      emitVectorStoreLog(this.logger, {
        event: "vector-store.lookup-completed",
        level: "info",
        knowledgeDocumentId: id,
        count: chunks.length,
        durationMs: Math.round(performance.now() - startedAt),
      });
      return chunks;
    } catch (error) {
      emitVectorStoreLog(this.logger, {
        event: "vector-store.error",
        level: "error",
        operation: "find",
        knowledgeDocumentId: id,
        error: serializeVectorStoreError(error),
      });
      return [];
    }
  }

  private async writeBatches(
    operation: "save" | "update",
    id: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult> {
    const startedAt = performance.now();
    this.started(operation, id, chunks.length);
    const prepared: PreparedChunk[] = [];
    let failed = 0;
    try {
      assertKnowledgeDocumentId(id);
    } catch (error) {
      return this.failure(operation, id, chunks.length, startedAt, error);
    }
    chunks.forEach((chunk, itemIndex) => {
      try {
        prepared.push(prepareChunk(chunk));
      } catch (error) {
        failed += 1;
        emitVectorStoreLog(this.logger, {
          event: "vector-store.warning",
          level: "warn",
          operation,
          knowledgeDocumentId: id,
          itemIndex,
          message: serializeVectorStoreError(error).message,
        });
      }
    });

    try {
      this.assertUniqueIndexes(prepared);
    } catch (error) {
      return this.failure(operation, id, chunks.length, startedAt, error);
    }

    let affected = 0;
    let batchesProcessed = 0;
    for (let start = 0; start < prepared.length; start += this.batchSize) {
      const batchIndex = Math.floor(start / this.batchSize);
      const batch = prepared.slice(start, start + this.batchSize);
      try {
        const count = await this.database.transaction((transaction) =>
          this.writeBatch(transaction, id, batch),
        );
        affected += count;
        batchesProcessed += 1;
        emitVectorStoreLog(this.logger, {
          event: "vector-store.batch-completed",
          level: "info",
          operation,
          knowledgeDocumentId: id,
          batchIndex,
          batchCount: batch.length,
          affected: count,
        });
      } catch (error) {
        failed += batch.length;
        emitVectorStoreLog(this.logger, {
          event: "vector-store.error",
          level: "error",
          operation,
          knowledgeDocumentId: id,
          batchIndex,
          error: serializeVectorStoreError(error),
        });
        if (!this.continueOnBatchError) break;
      }
    }
    return this.completed(operation, id, chunks.length, affected, failed, batchesProcessed, startedAt);
  }

  private writeBatch(
    transaction: VectorStoreTransaction,
    id: string,
    batch: readonly PreparedChunk[],
  ): Promise<number> {
    return transaction.execute(buildUpsertQuery(id, batch));
  }

  private assertUniqueIndexes(chunks: readonly PreparedChunk[]): void {
    const indexes = new Set<number>();
    for (const chunk of chunks) {
      if (indexes.has(chunk.chunkIndex)) throw new Error(`Duplicate chunkIndex ${chunk.chunkIndex}`);
      indexes.add(chunk.chunkIndex);
    }
  }

  private started(operation: VectorStoreOperation, id: string, requested: number): void {
    emitVectorStoreLog(this.logger, {
      event: "vector-store.started",
      level: "info",
      operation,
      knowledgeDocumentId: id,
      requested,
      batchSize: this.batchSize,
    });
  }

  private completed(
    operation: VectorStoreOperation,
    id: string,
    requested: number,
    affected: number,
    failed: number,
    batchesProcessed: number,
    startedAt: number,
  ): VectorStoreResult {
    const result: VectorStoreResult = {
      success: failed === 0,
      operation,
      requested,
      affected,
      failed,
      batchesProcessed,
      durationMs: Math.round(performance.now() - startedAt),
    };
    emitVectorStoreLog(this.logger, {
      event: "vector-store.completed",
      level: "info",
      knowledgeDocumentId: id,
      result,
    });
    return result;
  }

  private failure(
    operation: VectorStoreOperation,
    id: string,
    requested: number,
    startedAt: number,
    error: unknown,
    batchesProcessed = 0,
  ): VectorStoreResult {
    emitVectorStoreLog(this.logger, {
      event: "vector-store.error",
      level: "error",
      operation,
      knowledgeDocumentId: id,
      error: serializeVectorStoreError(error),
    });
    return this.completed(
      operation,
      id,
      requested,
      0,
      Math.max(1, requested),
      batchesProcessed,
      startedAt,
    );
  }
}
