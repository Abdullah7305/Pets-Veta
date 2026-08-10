"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleVectorStoreLogger = void 0;
exports.emitVectorStoreLog = emitVectorStoreLog;
exports.serializeVectorStoreError = serializeVectorStoreError;
exports.prepareChunk = prepareChunk;
exports.createVectorStoreLogger = createVectorStoreLogger;
exports.resolveVectorStoreBatchSize = resolveVectorStoreBatchSize;
exports.buildUpsertQuery = buildUpsertQuery;
exports.buildDeleteQuery = buildDeleteQuery;
exports.buildFindByDocumentQuery = buildFindByDocumentQuery;
const node_crypto_1 = require("node:crypto");
const client_1 = require("@prisma/client");
const pino_1 = __importDefault(require("pino"));
const vector_store_validator_1 = require("./vector-store.validator");
class JsonConsoleVectorStoreLogger {
    log(entry) {
        const serialized = JSON.stringify(entry);
        if (entry.level === "error")
            console.error(serialized);
        else if (entry.level === "warn")
            console.warn(serialized);
        else
            console.info(serialized);
    }
}
exports.JsonConsoleVectorStoreLogger = JsonConsoleVectorStoreLogger;
function emitVectorStoreLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        if ("log" in logger && logger.log.length <= 1) {
            logger.log(entry);
        }
        else {
            const pinoLogger = logger;
            pinoLogger[entry.level](entry, entry.event);
        }
    }
    catch {
        // Logging must not affect persistence.
    }
}
function serializeVectorStoreError(error) {
    if (error instanceof Error) {
        const code = error.code;
        return {
            name: error.name,
            message: error.message,
            ...(typeof code === "string" ? { code } : {}),
        };
    }
    return { name: "UnknownError", message: String(error) };
}
function prepareChunk(chunk) {
    (0, vector_store_validator_1.assertEmbeddedDocument)(chunk);
    const chunkIndex = chunk.metadata.chunkIndex;
    const metadataJson = JSON.stringify(chunk.metadata);
    if (metadataJson === undefined)
        throw new TypeError("Chunk metadata is not serializable");
    const parsedMetadata = JSON.parse(metadataJson);
    if (!parsedMetadata || Array.isArray(parsedMetadata) || typeof parsedMetadata !== "object") {
        throw new TypeError("Chunk metadata must serialize to a JSON object");
    }
    return {
        id: (0, node_crypto_1.randomUUID)(),
        chunkIndex: chunkIndex,
        heading: typeof chunk.metadata.heading === "string" ? chunk.metadata.heading : null,
        content: chunk.pageContent,
        tokenCount: countApproximateTokens(chunk.pageContent),
        embeddingSql: `[${chunk.embedding.join(",")}]`,
        metadataJson,
    };
}
function createVectorStoreLogger() {
    return (0, pino_1.default)({ level: "info" }).child({ component: "vector-store" });
}
function resolveVectorStoreBatchSize(batchSize) {
    if (batchSize !== undefined)
        return batchSize;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { appConfig } = require("../../config");
    return appConfig.rag.vectorStoreBatchSize;
}
function buildUpsertQuery(knowledgeDocumentId, chunks) {
    const rows = chunks.map((chunk) => client_1.Prisma.sql `(
    ${chunk.id}::uuid,
    ${knowledgeDocumentId}::uuid,
    ${chunk.chunkIndex},
    ${chunk.heading},
    ${chunk.content},
    ${chunk.tokenCount},
    ${chunk.embeddingSql}::vector,
    ${chunk.metadataJson}::jsonb,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )`);
    return client_1.Prisma.sql `
    INSERT INTO "KnowledgeChunk"
      ("id", "knowledgeDocumentId", "chunkIndex", "heading", "content", "tokenCount", "embedding", "metadata", "createdAt", "updatedAt")
    VALUES ${client_1.Prisma.join(rows)}
    ON CONFLICT ("knowledgeDocumentId", "chunkIndex") DO UPDATE SET
      "heading" = EXCLUDED."heading",
      "content" = EXCLUDED."content",
      "tokenCount" = EXCLUDED."tokenCount",
      "embedding" = EXCLUDED."embedding",
      "metadata" = EXCLUDED."metadata",
      "updatedAt" = CURRENT_TIMESTAMP
  `;
}
function buildDeleteQuery(knowledgeDocumentId, chunkIndexes) {
    if (chunkIndexes) {
        return client_1.Prisma.sql `
      DELETE FROM "KnowledgeChunk"
      WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
        AND "chunkIndex" IN (${client_1.Prisma.join(chunkIndexes)})
    `;
    }
    return client_1.Prisma.sql `
    DELETE FROM "KnowledgeChunk"
    WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
  `;
}
function buildFindByDocumentQuery(knowledgeDocumentId) {
    return client_1.Prisma.sql `
    SELECT "id", "knowledgeDocumentId", "chunkIndex", "heading", "content",
      "tokenCount", "embeddingModel", "metadata", "createdAt", "updatedAt"
    FROM "KnowledgeChunk"
    WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
    ORDER BY "chunkIndex" ASC
  `;
}
function countApproximateTokens(text) {
    return text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)?.length ?? 0;
}
//# sourceMappingURL=vector-store.utils.js.map