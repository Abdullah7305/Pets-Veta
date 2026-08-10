"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertKnowledgeDocumentId = assertKnowledgeDocumentId;
exports.assertChunkIndexes = assertChunkIndexes;
exports.assertVectorStoreBatchSize = assertVectorStoreBatchSize;
exports.assertEmbeddedDocument = assertEmbeddedDocument;
const vector_store_constants_1 = require("./vector-store.constants");
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
function assertKnowledgeDocumentId(id) {
    if (!UUID_PATTERN.test(id.trim())) {
        throw new TypeError("knowledgeDocumentId must be a valid UUID");
    }
}
function assertChunkIndexes(indexes) {
    if (indexes.some((index) => !Number.isInteger(index) || index < 0)) {
        throw new TypeError("Chunk indexes must be non-negative integers");
    }
}
function assertVectorStoreBatchSize(batchSize) {
    if (!Number.isInteger(batchSize) || batchSize <= 0) {
        throw new RangeError("batchSize must be a positive integer");
    }
}
function assertEmbeddedDocument(chunk) {
    if (!chunk.pageContent.trim())
        throw new TypeError("Chunk content must not be empty");
    if (!Array.isArray(chunk.embedding) || chunk.embedding.length !== vector_store_constants_1.VECTOR_DIMENSIONS) {
        throw new TypeError(`Chunk embedding must contain ${vector_store_constants_1.VECTOR_DIMENSIONS} dimensions`);
    }
    if (chunk.embedding.some((value) => !Number.isFinite(value))) {
        throw new TypeError("Chunk embedding contains a non-finite value");
    }
    if (!chunk.metadata || Array.isArray(chunk.metadata) || typeof chunk.metadata !== "object") {
        throw new TypeError("Chunk metadata must be an object");
    }
    const index = chunk.metadata.chunkIndex;
    if (!Number.isInteger(index) || index < 0) {
        throw new TypeError("Chunk metadata.chunkIndex must be a non-negative integer");
    }
}
//# sourceMappingURL=vector-store.validator.js.map