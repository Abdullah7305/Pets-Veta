import type { Prisma } from "@prisma/client";
import type { Logger } from "pino";

import type { EmbeddedDocument } from "../embeddings";
import type { VectorStoreLogEntry, VectorStoreResult } from "./vector-store.types";

export interface VectorStoreTransaction {
  execute(query: Prisma.Sql): Promise<number>;
  query?<T>(query: Prisma.Sql): Promise<T[]>;
}

export interface VectorStoreDatabase extends VectorStoreTransaction {
  transaction<T>(work: (transaction: VectorStoreTransaction) => Promise<T>): Promise<T>;
}

export interface VectorStoreLogger {
  log(entry: VectorStoreLogEntry): void;
}

export interface VectorStoreOptions {
  batchSize?: number;
  database?: VectorStoreDatabase;
  logger?: VectorStoreLogger | Logger;
  continueOnBatchError?: boolean;
}

export interface VectorStore {
  saveEmbeddings(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  saveChunks(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  updateChunks(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  updateEmbeddings(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  deleteChunks(
    knowledgeDocumentId: string,
    chunkIndexes?: readonly number[],
  ): Promise<VectorStoreResult>;
  deleteDocumentChunks(knowledgeDocumentId: string): Promise<VectorStoreResult>;
  replaceChunks(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  replaceDocumentChunks(
    knowledgeDocumentId: string,
    chunks: readonly EmbeddedDocument[],
  ): Promise<VectorStoreResult>;
  findChunksByDocument(knowledgeDocumentId: string): Promise<StoredKnowledgeChunk[]>;
}

import type { StoredKnowledgeChunk } from "./vector-store.types";
