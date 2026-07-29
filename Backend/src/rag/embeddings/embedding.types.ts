import type { Document } from "@langchain/core/documents";

export type EmbeddedDocument = Document & Readonly<{
  embedding: number[];
}>;

export type EmbeddingLogLevel = "info" | "error";

export type EmbeddingSummary = Readonly<{
  documentsReceived: number;
  embeddingsGenerated: number;
  failedDocuments: number;
  batchesProcessed: number;
  failedBatches: number;
  durationMs: number;
  averageProcessingTimeMs: number;
}>;

type EmbeddingLogBase = Readonly<{
  timestamp: string;
  level: EmbeddingLogLevel;
}>;

export type EmbeddingLogEntry =
  | (EmbeddingLogBase & {
      event: "embedding.model-loading";
      level: "info";
      model: string;
    })
  | (EmbeddingLogBase & {
      event: "embedding.model-loaded";
      level: "info";
      model: string;
      durationMs: number;
    })
  | (EmbeddingLogBase & {
      event: "embedding.started";
      level: "info";
      model: string;
      documentCount: number;
      batchSize: number;
      totalBatches: number;
    })
  | (EmbeddingLogBase & {
      event: "embedding.batch-completed";
      level: "info";
      batchIndex: number;
      totalBatches: number;
      batchDocumentCount: number;
      totalEmbeddingsGenerated: number;
      durationMs: number;
    })
  | (EmbeddingLogBase & {
      event: "embedding.error";
      level: "error";
      stage: "model-load" | "batch" | "validation";
      error: Readonly<{ name: string; message: string; code?: string }>;
      batchIndex?: number;
      batchDocumentCount?: number;
      documentIndex?: number;
    })
  | (EmbeddingLogBase & {
      event: "embedding.completed";
      level: "info";
      summary: EmbeddingSummary;
    });

export type EmbeddingLogPayload = EmbeddingLogEntry extends infer Entry
  ? Entry extends EmbeddingLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;
