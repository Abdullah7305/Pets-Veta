import type { Document } from "@langchain/core/documents";

import { EMBEDDING_DIMENSION } from "./embedding.constants";

export function isEmbeddableDocument(document: Document): boolean {
  return typeof document.pageContent === "string" && document.pageContent.trim().length > 0;
}

export function assertValidEmbedding(
  vector: unknown,
  dimension = EMBEDDING_DIMENSION,
): asserts vector is number[] {
  if (
    !Array.isArray(vector) ||
    vector.length !== dimension ||
    vector.some((value) => typeof value !== "number" || !Number.isFinite(value))
  ) {
    throw new Error(`Embedding must contain exactly ${dimension} finite numbers`);
  }
}

export function assertValidEmbeddingBatch(
  vectors: unknown,
  expectedCount: number,
  dimension = EMBEDDING_DIMENSION,
): asserts vectors is number[][] {
  if (!Array.isArray(vectors) || vectors.length !== expectedCount) {
    throw new Error(`Model returned an invalid embedding count; expected ${expectedCount}`);
  }
  vectors.forEach((vector) => assertValidEmbedding(vector, dimension));
}

export function assertValidBatchSize(batchSize: number): void {
  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new RangeError("batchSize must be a positive integer");
  }
}
