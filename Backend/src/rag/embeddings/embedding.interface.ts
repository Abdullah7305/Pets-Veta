import type { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import type { EmbeddedDocument, EmbeddingLogEntry } from "./embedding.types";

export interface EmbeddingModel {
  embed(texts: readonly string[]): Promise<number[][]>;
}

export type EmbeddingModelProvider = () => Promise<EmbeddingModel>;

export interface EmbeddingLogger {
  log(entry: EmbeddingLogEntry): void;
}

export interface EmbeddingServiceOptions {
  batchSize?: number;
  modelName?: string;
  logger?: EmbeddingLogger | Logger;
  /** Intended for tests or an alternative execution runtime. */
  modelProvider?: EmbeddingModelProvider;
}

export interface DocumentEmbeddingService {
  embedDocuments(documents: readonly Document[]): Promise<EmbeddedDocument[]>;
}

export interface EmbeddingModelManager {
  getModel(modelName: string): Promise<EmbeddingModel>;
}
