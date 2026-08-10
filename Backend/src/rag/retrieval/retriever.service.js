"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgVectorRetrieverService = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const cache_1 = require("../cache");
const embeddings_1 = require("../embeddings");
const rag_performance_1 = require("../../observability/rag-performance");
const retriever_utils_1 = require("./retriever.utils");
class PgVectorRetrieverService {
    defaultTopK;
    defaultMinimumSimilarity;
    maxTopK;
    embeddingService;
    database;
    logger;
    cache;
    embeddingCacheTtlSeconds;
    inFlightEmbeddings = new Map();
    constructor(options = {}) {
        this.maxTopK = options.maxTopK ?? retriever_utils_1.DEFAULT_MAX_TOP_K;
        this.defaultTopK =
            options.topK ?? (0, cache_1.readPositiveInteger)(process.env.TOP_K, retriever_utils_1.DEFAULT_TOP_K);
        this.defaultMinimumSimilarity =
            options.minimumSimilarity ?? readSimilarityThreshold();
        this.embeddingService = options.embeddingService ?? new embeddings_1.EmbeddingService();
        this.database = options.database ?? new retriever_utils_1.PrismaRetrieverDatabase();
        this.logger = options.logger ?? new retriever_utils_1.JsonConsoleRetrieverLogger();
        this.cache = options.cache ?? (0, cache_1.createRagCacheStore)();
        this.embeddingCacheTtlSeconds =
            options.embeddingCacheTtlSeconds ??
                (0, cache_1.readPositiveInteger)(process.env.EMBEDDING_CACHE_TTL_SECONDS, 86_400);
        this.assertPositiveInteger(this.maxTopK, "maxTopK");
        this.validateTopK(this.defaultTopK);
        this.validateSimilarity(this.defaultMinimumSimilarity);
    }
    async retrieve(query, options = {}) {
        const startedAt = node_perf_hooks_1.performance.now();
        const normalizedQuery = query.trim();
        const topK = options.topK ?? this.defaultTopK;
        const minimumSimilarity = options.minimumSimilarity ?? this.defaultMinimumSimilarity;
        const filters = this.normalizeFilters(options.filters);
        this.validateTopK(topK);
        this.validateSimilarity(minimumSimilarity);
        (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
            event: "retriever.query-received",
            level: "info",
            queryLength: normalizedQuery.length,
            topK,
            minimumSimilarity,
            filters,
        });
        if (!normalizedQuery) {
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.warning",
                level: "warn",
                message: "Query is empty after trimming",
            });
            this.resultsReturned(0, startedAt);
            return [];
        }
        let connectionError;
        const connectionPromise = this.connectDatabase().catch((error) => {
            connectionError = error;
        });
        let embedding;
        try {
            embedding = await this.getQueryEmbedding(normalizedQuery);
        }
        catch (error) {
            await connectionPromise;
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.error",
                level: "error",
                stage: "embedding",
                error: (0, retriever_utils_1.serializeRetrieverError)(error),
            });
            this.resultsReturned(0, startedAt);
            return [];
        }
        await connectionPromise;
        if (connectionError !== undefined) {
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.error",
                level: "error",
                stage: "connection",
                error: (0, retriever_utils_1.serializeRetrieverError)(connectionError),
            });
            this.resultsReturned(0, startedAt);
            return [];
        }
        const searchStartedAt = node_perf_hooks_1.performance.now();
        let searchCompleted = false;
        try {
            const rows = await this.database.query((0, retriever_utils_1.buildSimilarityQuery)(embedding, topK, minimumSimilarity, filters));
            const searchDurationMs = node_perf_hooks_1.performance.now() - searchStartedAt;
            searchCompleted = true;
            (0, rag_performance_1.recordRagStage)("vectorSearch", searchDurationMs);
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.search-completed",
                level: "info",
                candidatesReturned: rows.length,
                durationMs: Math.round(searchDurationMs),
            });
            const chunkStartedAt = node_perf_hooks_1.performance.now();
            const filtered = this.filterHighQualityChunks((0, retriever_utils_1.mapDatabaseRows)(rows), minimumSimilarity, topK);
            const chunkDurationMs = node_perf_hooks_1.performance.now() - chunkStartedAt;
            (0, rag_performance_1.recordRagStage)("chunkRetrieval", chunkDurationMs);
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.chunks-filtered",
                level: "info",
                duplicateChunksRemoved: filtered.duplicateChunksRemoved,
                lowSimilarityChunksRemoved: filtered.lowSimilarityChunksRemoved,
                durationMs: Math.round(chunkDurationMs),
            });
            const results = filtered.results;
            this.resultsReturned(results.length, startedAt);
            return results;
        }
        catch (error) {
            if (!searchCompleted) {
                (0, rag_performance_1.recordRagStage)("vectorSearch", node_perf_hooks_1.performance.now() - searchStartedAt);
            }
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.error",
                level: "error",
                stage: "search",
                error: (0, retriever_utils_1.serializeRetrieverError)(error),
            });
            this.resultsReturned(0, startedAt);
            return [];
        }
    }
    async connectDatabase() {
        const connectionStartedAt = node_perf_hooks_1.performance.now();
        try {
            await this.database.connect?.();
            const durationMs = node_perf_hooks_1.performance.now() - connectionStartedAt;
            (0, rag_performance_1.recordRagStage)("databaseConnection", durationMs);
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.database-connected",
                level: "info",
                durationMs: Math.round(durationMs),
            });
        }
        catch (error) {
            (0, rag_performance_1.recordRagStage)("databaseConnection", node_perf_hooks_1.performance.now() - connectionStartedAt);
            throw error;
        }
    }
    async getQueryEmbedding(query) {
        const cacheKey = (0, cache_1.createCacheKey)("query-embedding", {
            model: process.env.EMBEDDING_MODEL?.trim() || embeddings_1.EMBEDDING_MODEL,
            query,
        });
        const cacheStartedAt = node_perf_hooks_1.performance.now();
        const cached = await this.cache.get(cacheKey);
        const cacheDurationMs = node_perf_hooks_1.performance.now() - cacheStartedAt;
        (0, rag_performance_1.recordRagStage)("embeddingCacheLookup", cacheDurationMs);
        if (Array.isArray(cached)) {
            try {
                (0, retriever_utils_1.validateEmbedding)(cached);
                (0, rag_performance_1.recordRagCache)("embedding", "hit");
                (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                    event: "retriever.embedding-cache",
                    level: "info",
                    outcome: "hit",
                    durationMs: Math.round(cacheDurationMs),
                });
                return [...cached];
            }
            catch {
                void this.cache.delete(cacheKey);
            }
        }
        (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
            event: "retriever.embedding-cache",
            level: "info",
            outcome: "miss",
            durationMs: Math.round(cacheDurationMs),
        });
        (0, rag_performance_1.recordRagCache)("embedding", "miss");
        const inFlight = this.inFlightEmbeddings.get(cacheKey);
        if (inFlight) {
            (0, rag_performance_1.recordRagCache)("embedding", "coalesced", "in-flight");
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.embedding-cache",
                level: "info",
                outcome: "coalesced",
                durationMs: 0,
            });
            return [...(await inFlight)];
        }
        const generating = this.generateQueryEmbedding(query, cacheKey);
        this.inFlightEmbeddings.set(cacheKey, generating);
        try {
            return [...(await generating)];
        }
        finally {
            this.inFlightEmbeddings.delete(cacheKey);
        }
    }
    async generateQueryEmbedding(query, cacheKey) {
        const embeddingStartedAt = node_perf_hooks_1.performance.now();
        try {
            const embedded = await this.embeddingService.embedDocuments([
                new documents_1.Document({ pageContent: query, metadata: { type: "query" } }),
            ]);
            if (!embedded[0]) {
                throw new Error("Embedding service returned no query embedding");
            }
            const embedding = embedded[0].embedding;
            (0, retriever_utils_1.validateEmbedding)(embedding);
            const durationMs = node_perf_hooks_1.performance.now() - embeddingStartedAt;
            (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
                event: "retriever.embedding-generated",
                level: "info",
                dimensions: embedding.length,
                durationMs: Math.round(durationMs),
            });
            void this.cache.set(cacheKey, embedding, this.embeddingCacheTtlSeconds);
            return embedding;
        }
        finally {
            (0, rag_performance_1.recordRagStage)("embedding", node_perf_hooks_1.performance.now() - embeddingStartedAt);
        }
    }
    filterHighQualityChunks(results, minimumSimilarity, topK) {
        const seenContent = new Set();
        const selected = [];
        let duplicateChunksRemoved = 0;
        let lowSimilarityChunksRemoved = 0;
        for (const result of results) {
            if (result.similarity < minimumSimilarity) {
                lowSimilarityChunksRemoved += 1;
                continue;
            }
            const fingerprint = result.content
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();
            if (!fingerprint || seenContent.has(fingerprint)) {
                duplicateChunksRemoved += 1;
                continue;
            }
            seenContent.add(fingerprint);
            selected.push(result);
            if (selected.length === topK)
                break;
        }
        return {
            results: selected,
            duplicateChunksRemoved,
            lowSimilarityChunksRemoved,
        };
    }
    normalizeFilters(filters) {
        const clean = (value) => {
            const normalized = value?.trim();
            return normalized || undefined;
        };
        return {
            ...(filters?.animal ? { animal: filters.animal } : {}),
            ...(clean(filters?.category) ? { category: clean(filters?.category) } : {}),
            ...(clean(filters?.subCategory)
                ? { subCategory: clean(filters?.subCategory) }
                : {}),
        };
    }
    validateTopK(topK) {
        this.assertPositiveInteger(topK, "topK");
        if (topK > this.maxTopK)
            throw new RangeError(`topK must not exceed ${this.maxTopK}`);
    }
    assertPositiveInteger(value, name) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new RangeError(`${name} must be a positive integer`);
        }
    }
    validateSimilarity(similarity) {
        if (!Number.isFinite(similarity) || similarity < -1 || similarity > 1) {
            throw new RangeError("minimumSimilarity must be between -1 and 1");
        }
    }
    resultsReturned(count, startedAt) {
        (0, retriever_utils_1.emitRetrieverLog)(this.logger, {
            event: "retriever.results-returned",
            level: "info",
            resultCount: count,
            durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        });
    }
}
exports.PgVectorRetrieverService = PgVectorRetrieverService;
function readSimilarityThreshold() {
    const configured = Number(process.env.SIMILARITY_THRESHOLD);
    return Number.isFinite(configured) && configured >= -1 && configured <= 1
        ? configured
        : retriever_utils_1.DEFAULT_MINIMUM_SIMILARITY;
}
//# sourceMappingURL=retriever.service.js.map