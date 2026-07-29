import type { EmbeddedDocument } from "../embeddings";
import { VECTOR_DIMENSIONS } from "./vector-store.constants";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export function assertKnowledgeDocumentId(id: string): void {
  if (!UUID_PATTERN.test(id.trim())) {
    throw new TypeError("knowledgeDocumentId must be a valid UUID");
  }
}

export function assertChunkIndexes(indexes: readonly number[]): void {
  if (indexes.some((index) => !Number.isInteger(index) || index < 0)) {
    throw new TypeError("Chunk indexes must be non-negative integers");
  }
}

export function assertVectorStoreBatchSize(batchSize: number): void {
  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new RangeError("batchSize must be a positive integer");
  }
}

export function assertEmbeddedDocument(chunk: EmbeddedDocument): void {
  if (!chunk.pageContent.trim()) throw new TypeError("Chunk content must not be empty");
  if (!Array.isArray(chunk.embedding) || chunk.embedding.length !== VECTOR_DIMENSIONS) {
    throw new TypeError(`Chunk embedding must contain ${VECTOR_DIMENSIONS} dimensions`);
  }
  if (chunk.embedding.some((value) => !Number.isFinite(value))) {
    throw new TypeError("Chunk embedding contains a non-finite value");
  }
  if (!chunk.metadata || Array.isArray(chunk.metadata) || typeof chunk.metadata !== "object") {
    throw new TypeError("Chunk metadata must be an object");
  }
  const index = chunk.metadata.chunkIndex;
  if (!Number.isInteger(index) || (index as number) < 0) {
    throw new TypeError("Chunk metadata.chunkIndex must be a non-negative integer");
  }
}
