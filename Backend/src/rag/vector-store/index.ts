export { PgVectorStoreService } from "./vector-store.service";
export { VectorBatchRepository } from "./batch.repository";
export {
  PrismaVectorStoreDatabase,
  PrismaVectorStoreRepository,
} from "./repository";
export {
  DEFAULT_VECTOR_STORE_BATCH_SIZE,
  VECTOR_DIMENSIONS,
} from "./vector-store.constants";
export {
  assertChunkIndexes,
  assertEmbeddedDocument,
  assertKnowledgeDocumentId,
  assertVectorStoreBatchSize,
} from "./vector-store.validator";
export type {
  VectorStore,
  VectorStoreDatabase,
  VectorStoreLogger,
  VectorStoreOptions,
  VectorStoreTransaction,
} from "./vector-store.interface";
export type {
  VectorStoreLogEntry,
  VectorStoreLogLevel,
  VectorStoreOperation,
  VectorStoreResult,
  StoredKnowledgeChunk,
} from "./vector-store.types";
