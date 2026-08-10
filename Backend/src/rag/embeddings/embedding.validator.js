"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmbeddableDocument = isEmbeddableDocument;
exports.assertValidEmbedding = assertValidEmbedding;
exports.assertValidEmbeddingBatch = assertValidEmbeddingBatch;
exports.assertValidBatchSize = assertValidBatchSize;
const embedding_constants_1 = require("./embedding.constants");
function isEmbeddableDocument(document) {
    return typeof document.pageContent === "string" && document.pageContent.trim().length > 0;
}
function assertValidEmbedding(vector, dimension = embedding_constants_1.EMBEDDING_DIMENSION) {
    if (!Array.isArray(vector) ||
        vector.length !== dimension ||
        vector.some((value) => typeof value !== "number" || !Number.isFinite(value))) {
        throw new Error(`Embedding must contain exactly ${dimension} finite numbers`);
    }
}
function assertValidEmbeddingBatch(vectors, expectedCount, dimension = embedding_constants_1.EMBEDDING_DIMENSION) {
    if (!Array.isArray(vectors) || vectors.length !== expectedCount) {
        throw new Error(`Model returned an invalid embedding count; expected ${expectedCount}`);
    }
    vectors.forEach((vector) => assertValidEmbedding(vector, dimension));
}
function assertValidBatchSize(batchSize) {
    if (!Number.isInteger(batchSize) || batchSize <= 0) {
        throw new RangeError("batchSize must be a positive integer");
    }
}
//# sourceMappingURL=embedding.validator.js.map