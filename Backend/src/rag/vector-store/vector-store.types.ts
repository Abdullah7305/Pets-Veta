export type VectorStoreOperation = "save" | "update" | "delete" | "replace" | "find";
export type VectorStoreLogLevel = "info" | "warn" | "error";

export type VectorStoreResult = Readonly<{
  success: boolean;
  operation: VectorStoreOperation;
  requested: number;
  affected: number;
  failed: number;
  batchesProcessed: number;
  durationMs: number;
}>;

export type StoredKnowledgeChunk = Readonly<{
  id: string;
  knowledgeDocumentId: string;
  chunkIndex: number;
  heading: string | null;
  content: string;
  tokenCount: number;
  embeddingModel: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}>;

type VectorStoreLogBase = Readonly<{
  timestamp: string;
  level: VectorStoreLogLevel;
}>;

export type VectorStoreLogEntry =
  | (VectorStoreLogBase & {
      event: "vector-store.lookup-completed";
      level: "info";
      knowledgeDocumentId: string;
      count: number;
      durationMs: number;
    })
  | (VectorStoreLogBase & {
      event: "vector-store.started";
      level: "info";
      operation: VectorStoreOperation;
      knowledgeDocumentId: string;
      requested: number;
      batchSize: number;
    })
  | (VectorStoreLogBase & {
      event: "vector-store.batch-completed";
      level: "info";
      operation: VectorStoreOperation;
      knowledgeDocumentId: string;
      batchIndex: number;
      batchCount: number;
      affected: number;
    })
  | (VectorStoreLogBase & {
      event: "vector-store.warning";
      level: "warn";
      operation: VectorStoreOperation;
      knowledgeDocumentId: string;
      itemIndex: number;
      message: string;
    })
  | (VectorStoreLogBase & {
      event: "vector-store.error";
      level: "error";
      operation: VectorStoreOperation;
      knowledgeDocumentId: string;
      error: Readonly<{ name: string; message: string; code?: string }>;
      batchIndex?: number;
    })
  | (VectorStoreLogBase & {
      event: "vector-store.completed";
      level: "info";
      knowledgeDocumentId: string;
      result: VectorStoreResult;
    });

export type VectorStoreLogPayload = VectorStoreLogEntry extends infer Entry
  ? Entry extends VectorStoreLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;
