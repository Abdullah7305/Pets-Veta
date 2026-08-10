"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleRetrieverLogger = exports.PrismaRetrieverDatabase = exports.QUERY_EMBEDDING_DIMENSIONS = exports.DEFAULT_MINIMUM_SIMILARITY = exports.DEFAULT_MAX_TOP_K = exports.DEFAULT_TOP_K = void 0;
exports.emitRetrieverLog = emitRetrieverLog;
exports.serializeRetrieverError = serializeRetrieverError;
exports.buildSimilarityQuery = buildSimilarityQuery;
exports.validateEmbedding = validateEmbedding;
exports.mapDatabaseRows = mapDatabaseRows;
const client_1 = require("@prisma/client");
const database_1 = require("../database");
exports.DEFAULT_TOP_K = 5;
exports.DEFAULT_MAX_TOP_K = 100;
exports.DEFAULT_MINIMUM_SIMILARITY = 0.7;
exports.QUERY_EMBEDDING_DIMENSIONS = 384;
class PrismaRetrieverDatabase {
    client;
    connectionPromise;
    constructor(client = getPrismaClient()) {
        this.client = client;
    }
    connect() {
        this.connectionPromise ??= this.client.$connect().catch((error) => {
            this.connectionPromise = undefined;
            throw error;
        });
        return this.connectionPromise;
    }
    query(query) {
        return this.client.$queryRaw(query);
    }
}
exports.PrismaRetrieverDatabase = PrismaRetrieverDatabase;
function getPrismaClient() {
    return (0, database_1.getRagPrismaClient)();
}
class JsonConsoleRetrieverLogger {
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
exports.JsonConsoleRetrieverLogger = JsonConsoleRetrieverLogger;
function emitRetrieverLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        logger.log(entry);
    }
    catch {
        // Logging failures must not prevent retrieval.
    }
}
function serializeRetrieverError(error) {
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
function buildSimilarityQuery(embedding, topK, minimumSimilarity, filters) {
    const vector = `[${embedding.join(",")}]`;
    const chunkPredicates = [
        client_1.Prisma.sql `kc."embedding" IS NOT NULL`,
        client_1.Prisma.sql `1 - (kc."embedding" <=> ${vector}::vector) >= ${minimumSimilarity}`,
    ];
    const documentPredicates = [];
    if (filters.animal) {
        documentPredicates.push(client_1.Prisma.sql `kd."animal" = ${filters.animal.toUpperCase()}::"Animal"`);
    }
    if (filters.category) {
        documentPredicates.push(client_1.Prisma.sql `kd."category" = ${filters.category}`);
    }
    if (filters.subCategory) {
        documentPredicates.push(client_1.Prisma.sql `kd."subCategory" = ${filters.subCategory}`);
    }
    const documentFilter = documentPredicates.length
        ? client_1.Prisma.sql `
        AND EXISTS (
          SELECT 1
          FROM "KnowledgeDocument" AS kd
          WHERE kd."id" = kc."knowledgeDocumentId"
            AND ${client_1.Prisma.join(documentPredicates, " AND ")}
        )
      `
        : client_1.Prisma.empty;
    return client_1.Prisma.sql `
    SELECT
      kc."content",
      kc."metadata",
      1 - (kc."embedding" <=> ${vector}::vector) AS "similarity"
    FROM "KnowledgeChunk" AS kc
    WHERE ${client_1.Prisma.join(chunkPredicates, " AND ")}
    ${documentFilter}
    ORDER BY kc."embedding" <=> ${vector}::vector ASC
    LIMIT ${topK}
  `;
}
function validateEmbedding(embedding) {
    if (embedding.length !== exports.QUERY_EMBEDDING_DIMENSIONS) {
        throw new Error(`Query embedding must contain ${exports.QUERY_EMBEDDING_DIMENSIONS} dimensions`);
    }
    if (embedding.some((value) => !Number.isFinite(value))) {
        throw new Error("Query embedding contains a non-finite value");
    }
}
function mapDatabaseRows(rows) {
    return rows.flatMap((row) => {
        const similarity = Number(row.similarity);
        if (typeof row.content !== "string" || !Number.isFinite(similarity))
            return [];
        const metadata = row.metadata && typeof row.metadata === "object" && !Array.isArray(row.metadata)
            ? row.metadata
            : {};
        return [{ content: row.content, metadata, similarity }];
    });
}
//# sourceMappingURL=retriever.utils.js.map