export {
  EmbeddingService,
  embedDocuments,
  generateEmbeddings,
} from "./embedding.service";
export { BatchProcessor } from "./batch.processor";
export {
  embeddingModelManager,
  HuggingFaceModelManager,
} from "./model.manager";
export {
  DEFAULT_EMBEDDING_BATCH_SIZE,
  EMBEDDING_DIMENSION,
  EMBEDDING_MODEL,
  EMBEDDING_POOLING,
  NORMALIZE_EMBEDDINGS,
} from "./embedding.constants";
export type {
  DocumentEmbeddingService,
  EmbeddingLogger,
  EmbeddingModel,
  EmbeddingModelProvider,
  EmbeddingServiceOptions,
  EmbeddingModelManager,
} from "./embedding.interface";
export {
  assertValidBatchSize,
  assertValidEmbedding,
  assertValidEmbeddingBatch,
  isEmbeddableDocument,
} from "./embedding.validator";
export type {
  EmbeddedDocument,
  EmbeddingLogEntry,
  EmbeddingLogLevel,
  EmbeddingSummary,
} from "./embedding.types";
