import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";

import { BatchProcessor } from "./batch.processor";
import {
  DEFAULT_EMBEDDING_BATCH_SIZE,
  EMBEDDING_DIMENSION,
  EMBEDDING_MODEL,
} from "./embedding.constants";
import type {
  DocumentEmbeddingService,
  EmbeddingLogger,
  EmbeddingModel,
  EmbeddingModelProvider,
  EmbeddingServiceOptions,
} from "./embedding.interface";
import { embeddingModelManager } from "./model.manager";
import type { EmbeddedDocument } from "./embedding.types";
import {
  createEmbeddingLogger,
  emitEmbeddingLog,
  resolveEmbeddingConfiguration,
  serializeEmbeddingError,
} from "./embedding.utils";
import {
  assertValidBatchSize,
  assertValidEmbeddingBatch,
  isEmbeddableDocument,
} from "./embedding.validator";

export class EmbeddingService implements DocumentEmbeddingService {
  private readonly batchSize: number;
  private readonly modelName: string;
  private readonly logger: EmbeddingLogger | import("pino").Logger;
  private readonly modelProvider: EmbeddingModelProvider;

  constructor(options: EmbeddingServiceOptions = {}) {
    if (options.batchSize !== undefined) assertValidBatchSize(options.batchSize);
    const configuration = resolveEmbeddingConfiguration(
      options.modelProvider ? (options.modelName ?? EMBEDDING_MODEL) : options.modelName,
      options.modelProvider
        ? (options.batchSize ?? DEFAULT_EMBEDDING_BATCH_SIZE)
        : options.batchSize,
    );
    assertValidBatchSize(configuration.batchSize);
    if (!configuration.modelName.trim()) throw new Error("modelName must not be empty");
    this.batchSize = configuration.batchSize;
    this.modelName = configuration.modelName;
    this.logger = options.logger ?? createEmbeddingLogger();
    this.modelProvider =
      options.modelProvider ?? (() => embeddingModelManager.getModel(this.modelName));
  }

  async generateEmbeddings(documents: readonly Document[]): Promise<EmbeddedDocument[]> {
    const startedAt = performance.now();
    const validDocuments = documents.filter((document, index) => {
      if (isEmbeddableDocument(document)) return true;
      emitEmbeddingLog(this.logger, {
        event: "embedding.error",
        level: "error",
        stage: "validation",
        documentIndex: index,
        error: { name: "ValidationError", message: "Document content is empty" },
      });
      return false;
    });
    const totalBatches = Math.ceil(validDocuments.length / this.batchSize);
    emitEmbeddingLog(this.logger, {
      event: "embedding.started",
      level: "info",
      model: this.modelName,
      documentCount: documents.length,
      batchSize: this.batchSize,
      totalBatches,
    });

    if (validDocuments.length === 0) {
      this.emitCompleted(startedAt, documents.length, 0, documents.length, 0, 0);
      return [];
    }

    const model = await this.loadModel(startedAt, documents.length);
    if (!model) return [];

    let generatedCount = 0;
    const result = await new BatchProcessor(this.batchSize).process(
      validDocuments,
      async (batch, batchIndex) => {
        const batchStartedAt = performance.now();
        const vectors = await model.embed(batch.map((document) => document.pageContent.trim()));
        assertValidEmbeddingBatch(vectors, batch.length);
        const generatedAt = new Date().toISOString();
        const embedded = batch.map((document, index) =>
          Object.assign(
            new Document({
              id: document.id,
              pageContent: document.pageContent.trim(),
              metadata: {
                ...document.metadata,
                embeddingModel: this.modelName,
                embeddingDimension: EMBEDDING_DIMENSION,
                generatedAt,
              },
            }),
            { embedding: vectors[index]! },
          ),
        );
        generatedCount += embedded.length;
        emitEmbeddingLog(this.logger, {
          event: "embedding.batch-completed",
          level: "info",
          batchIndex,
          totalBatches,
          batchDocumentCount: batch.length,
          totalEmbeddingsGenerated: generatedCount,
          durationMs: Math.round(performance.now() - batchStartedAt),
        });
        return embedded;
      },
      (error, batch, batchIndex) => {
        emitEmbeddingLog(this.logger, {
          event: "embedding.error",
          level: "error",
          stage: "batch",
          batchIndex,
          batchDocumentCount: batch.length,
          error: serializeEmbeddingError(error),
        });
      },
    );

    this.emitCompleted(
      startedAt,
      documents.length,
      result.values.length,
      documents.length - result.values.length,
      result.processedBatches,
      result.failedBatches,
    );
    return result.values;
  }

  /** Compatibility alias for existing retriever consumers. */
  embedDocuments(documents: readonly Document[]): Promise<EmbeddedDocument[]> {
    return this.generateEmbeddings(documents);
  }

  private async loadModel(startedAt: number, documentCount: number): Promise<EmbeddingModel | undefined> {
    const modelStartedAt = performance.now();
    emitEmbeddingLog(this.logger, {
      event: "embedding.model-loading",
      level: "info",
      model: this.modelName,
    });
    try {
      const model = await this.modelProvider();
      emitEmbeddingLog(this.logger, {
        event: "embedding.model-loaded",
        level: "info",
        model: this.modelName,
        durationMs: Math.round(performance.now() - modelStartedAt),
      });
      return model;
    } catch (error) {
      emitEmbeddingLog(this.logger, {
        event: "embedding.error",
        level: "error",
        stage: "model-load",
        error: serializeEmbeddingError(error),
      });
      this.emitCompleted(startedAt, documentCount, 0, documentCount, 0, 0);
      return undefined;
    }
  }

  private emitCompleted(
    startedAt: number,
    documentsReceived: number,
    embeddingsGenerated: number,
    failedDocuments: number,
    batchesProcessed: number,
    failedBatches: number,
  ): void {
    const durationMs = Math.round(performance.now() - startedAt);
    emitEmbeddingLog(this.logger, {
      event: "embedding.completed",
      level: "info",
      summary: {
        documentsReceived,
        embeddingsGenerated,
        failedDocuments,
        batchesProcessed,
        failedBatches,
        durationMs,
        averageProcessingTimeMs:
          embeddingsGenerated === 0 ? 0 : Math.round((durationMs / embeddingsGenerated) * 100) / 100,
      },
    });
  }
}

export async function generateEmbeddings(
  documents: readonly Document[],
  options?: EmbeddingServiceOptions,
): Promise<EmbeddedDocument[]> {
  return new EmbeddingService(options).generateEmbeddings(documents);
}

export const embedDocuments = generateEmbeddings;
