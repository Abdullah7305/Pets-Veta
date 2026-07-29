import type { Prisma } from "@prisma/client";

import type { DocumentEmbeddingService } from "../embeddings";
import type {
  RetrievalResult,
  RetrieverDatabaseRow,
  RetrieverFilters,
  RetrieverLogEntry,
} from "./retriever.types";

import type { CacheStore } from '../cache';

export interface RetrieverDatabase {
  connect?(): Promise<void>;
  query(query: Prisma.Sql): Promise<readonly RetrieverDatabaseRow[]>;
}

export interface RetrieverLogger {
  log(entry: RetrieverLogEntry): void;
}

export interface RetrieverOptions {
  topK?: number;
  minimumSimilarity?: number;
  maxTopK?: number;
  embeddingService?: DocumentEmbeddingService;
  database?: RetrieverDatabase;
  logger?: RetrieverLogger;
  cache?: CacheStore;
  embeddingCacheTtlSeconds?: number;
}

export interface RetrieveOptions {
  topK?: number;
  minimumSimilarity?: number;
  filters?: RetrieverFilters;
}

export interface Retriever {
  retrieve(query: string, options?: RetrieveOptions): Promise<RetrievalResult[]>;
}
