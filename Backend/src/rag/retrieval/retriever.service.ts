import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";

import {
  createCacheKey,
  createRagCacheStore,
  readPositiveInteger,
  type CacheStore,
} from "../cache";
import { EmbeddingService, EMBEDDING_MODEL } from "../embeddings";
import {
  recordRagCache,
  recordRagStage,
} from "../../observability/rag-performance";
import type {
  RetrieveOptions,
  Retriever,
  RetrieverDatabase,
  RetrieverLogger,
  RetrieverOptions,
} from "./retriever.interface";
import type { RetrievalResult, RetrieverFilters } from "./retriever.types";
import {
  buildSimilarityQuery,
  DEFAULT_MAX_TOP_K,
  DEFAULT_MINIMUM_SIMILARITY,
  DEFAULT_TOP_K,
  emitRetrieverLog,
  JsonConsoleRetrieverLogger,
  mapDatabaseRows,
  PrismaRetrieverDatabase,
  serializeRetrieverError,
  validateEmbedding,
} from "./retriever.utils";

export class PgVectorRetrieverService implements Retriever {
  private readonly defaultTopK: number;
  private readonly defaultMinimumSimilarity: number;
  private readonly maxTopK: number;
  private readonly embeddingService;
  private readonly database: RetrieverDatabase;
  private readonly logger: RetrieverLogger;
  private readonly cache: CacheStore;
  private readonly embeddingCacheTtlSeconds: number;
  private readonly inFlightEmbeddings = new Map<string, Promise<number[]>>();

  constructor(options: RetrieverOptions = {}) {
    this.maxTopK = options.maxTopK ?? DEFAULT_MAX_TOP_K;
    this.defaultTopK =
      options.topK ?? readPositiveInteger(process.env.TOP_K, DEFAULT_TOP_K);
    this.defaultMinimumSimilarity =
      options.minimumSimilarity ?? readSimilarityThreshold();
    this.embeddingService = options.embeddingService ?? new EmbeddingService();
    this.database = options.database ?? new PrismaRetrieverDatabase();
    this.logger = options.logger ?? new JsonConsoleRetrieverLogger();
    this.cache = options.cache ?? createRagCacheStore();
    this.embeddingCacheTtlSeconds =
      options.embeddingCacheTtlSeconds ??
      readPositiveInteger(process.env.EMBEDDING_CACHE_TTL_SECONDS, 86_400);

    this.assertPositiveInteger(this.maxTopK, "maxTopK");
    this.validateTopK(this.defaultTopK);
    this.validateSimilarity(this.defaultMinimumSimilarity);
  }

  async retrieve(query: string, options: RetrieveOptions = {}): Promise<RetrievalResult[]> {
    const startedAt = performance.now();
    const normalizedQuery = query.trim();
    const topK = options.topK ?? this.defaultTopK;
    const minimumSimilarity =
      options.minimumSimilarity ?? this.defaultMinimumSimilarity;
    const filters = this.normalizeFilters(options.filters);
    this.validateTopK(topK);
    this.validateSimilarity(minimumSimilarity);

    emitRetrieverLog(this.logger, {
      event: "retriever.query-received",
      level: "info",
      queryLength: normalizedQuery.length,
      topK,
      minimumSimilarity,
      filters,
    });

    if (!normalizedQuery) {
      emitRetrieverLog(this.logger, {
        event: "retriever.warning",
        level: "warn",
        message: "Query is empty after trimming",
      });
      this.resultsReturned(0, startedAt);
      return [];
    }

    let connectionError: unknown;
    const connectionPromise = this.connectDatabase().catch((error: unknown) => {
      connectionError = error;
    });

    let embedding: number[];
    try {
      embedding = await this.getQueryEmbedding(normalizedQuery);
    } catch (error) {
      await connectionPromise;
      emitRetrieverLog(this.logger, {
        event: "retriever.error",
        level: "error",
        stage: "embedding",
        error: serializeRetrieverError(error),
      });
      this.resultsReturned(0, startedAt);
      return [];
    }

    await connectionPromise;
    if (connectionError !== undefined) {
      emitRetrieverLog(this.logger, {
        event: "retriever.error",
        level: "error",
        stage: "connection",
        error: serializeRetrieverError(connectionError),
      });
      this.resultsReturned(0, startedAt);
      return [];
    }

    const searchStartedAt = performance.now();
    let searchCompleted = false;
    try {
      const rows = await this.database.query(
        buildSimilarityQuery(embedding, topK, minimumSimilarity, filters),
      );
      const searchDurationMs = performance.now() - searchStartedAt;
      searchCompleted = true;
      recordRagStage("vectorSearch", searchDurationMs);
      emitRetrieverLog(this.logger, {
        event: "retriever.search-completed",
        level: "info",
        candidatesReturned: rows.length,
        durationMs: Math.round(searchDurationMs),
      });

      const chunkStartedAt = performance.now();
      const filtered = this.filterHighQualityChunks(
        mapDatabaseRows(rows),
        minimumSimilarity,
        topK,
      );
      const chunkDurationMs = performance.now() - chunkStartedAt;
      recordRagStage("chunkRetrieval", chunkDurationMs);
      emitRetrieverLog(this.logger, {
        event: "retriever.chunks-filtered",
        level: "info",
        duplicateChunksRemoved: filtered.duplicateChunksRemoved,
        lowSimilarityChunksRemoved: filtered.lowSimilarityChunksRemoved,
        durationMs: Math.round(chunkDurationMs),
      });
      const results = filtered.results;
      this.resultsReturned(results.length, startedAt);
      return results;
    } catch (error) {
      if (!searchCompleted) {
        recordRagStage("vectorSearch", performance.now() - searchStartedAt);
      }
      emitRetrieverLog(this.logger, {
        event: "retriever.error",
        level: "error",
        stage: "search",
        error: serializeRetrieverError(error),
      });
      this.resultsReturned(0, startedAt);
      return [];
    }
  }

  private async connectDatabase(): Promise<void> {
    const connectionStartedAt = performance.now();
    try {
      await this.database.connect?.();
      const durationMs = performance.now() - connectionStartedAt;
      recordRagStage("databaseConnection", durationMs);
      emitRetrieverLog(this.logger, {
        event: "retriever.database-connected",
        level: "info",
        durationMs: Math.round(durationMs),
      });
    } catch (error) {
      recordRagStage(
        "databaseConnection",
        performance.now() - connectionStartedAt,
      );
      throw error;
    }
  }

  private async getQueryEmbedding(query: string): Promise<number[]> {
    const cacheKey = createCacheKey("query-embedding", {
      model: process.env.EMBEDDING_MODEL?.trim() || EMBEDDING_MODEL,
      query,
    });
    const cacheStartedAt = performance.now();
    const cached = await this.cache.get<unknown>(cacheKey);
    const cacheDurationMs = performance.now() - cacheStartedAt;
    recordRagStage("embeddingCacheLookup", cacheDurationMs);

    if (Array.isArray(cached)) {
      try {
        validateEmbedding(cached);
        recordRagCache("embedding", "hit");
        emitRetrieverLog(this.logger, {
          event: "retriever.embedding-cache",
          level: "info",
          outcome: "hit",
          durationMs: Math.round(cacheDurationMs),
        });
        return [...cached] as number[];
      } catch {
        void this.cache.delete(cacheKey);
      }
    }

    emitRetrieverLog(this.logger, {
      event: "retriever.embedding-cache",
      level: "info",
      outcome: "miss",
      durationMs: Math.round(cacheDurationMs),
    });
    recordRagCache("embedding", "miss");

    const inFlight = this.inFlightEmbeddings.get(cacheKey);
    if (inFlight) {
      recordRagCache("embedding", "coalesced", "in-flight");
      emitRetrieverLog(this.logger, {
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
    } finally {
      this.inFlightEmbeddings.delete(cacheKey);
    }
  }

  private async generateQueryEmbedding(
    query: string,
    cacheKey: string,
  ): Promise<number[]> {
    const embeddingStartedAt = performance.now();
    try {
      const embedded = await this.embeddingService.embedDocuments([
        new Document({ pageContent: query, metadata: { type: "query" } }),
      ]);
      if (!embedded[0]) {
        throw new Error("Embedding service returned no query embedding");
      }
      const embedding = embedded[0].embedding;
      validateEmbedding(embedding);
      const durationMs = performance.now() - embeddingStartedAt;
      emitRetrieverLog(this.logger, {
        event: "retriever.embedding-generated",
        level: "info",
        dimensions: embedding.length,
        durationMs: Math.round(durationMs),
      });
      void this.cache.set(
        cacheKey,
        embedding,
        this.embeddingCacheTtlSeconds,
      );
      return embedding;
    } finally {
      recordRagStage("embedding", performance.now() - embeddingStartedAt);
    }
  }

  private filterHighQualityChunks(
    results: readonly RetrievalResult[],
    minimumSimilarity: number,
    topK: number,
  ): Readonly<{
    results: RetrievalResult[];
    duplicateChunksRemoved: number;
    lowSimilarityChunksRemoved: number;
  }> {
    const seenContent = new Set<string>();
    const selected: RetrievalResult[] = [];
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
      if (selected.length === topK) break;
    }

    return {
      results: selected,
      duplicateChunksRemoved,
      lowSimilarityChunksRemoved,
    };
  }

  private normalizeFilters(filters: RetrieverFilters | undefined): RetrieverFilters {
    const clean = (value: string | undefined): string | undefined => {
      const normalized = value?.trim();
      return normalized || undefined;
    };
    return {
      ...(filters?.animal ? { animal: filters.animal } : {}),
      ...(clean(filters?.category) ? { category: clean(filters?.category)! } : {}),
      ...(clean(filters?.subCategory)
        ? { subCategory: clean(filters?.subCategory)! }
        : {}),
    };
  }

  private validateTopK(topK: number): void {
    this.assertPositiveInteger(topK, "topK");
    if (topK > this.maxTopK) throw new RangeError(`topK must not exceed ${this.maxTopK}`);
  }

  private assertPositiveInteger(value: number, name: string): void {
    if (!Number.isInteger(value) || value <= 0) {
      throw new RangeError(`${name} must be a positive integer`);
    }
  }

  private validateSimilarity(similarity: number): void {
    if (!Number.isFinite(similarity) || similarity < -1 || similarity > 1) {
      throw new RangeError("minimumSimilarity must be between -1 and 1");
    }
  }

  private resultsReturned(count: number, startedAt: number): void {
    emitRetrieverLog(this.logger, {
      event: "retriever.results-returned",
      level: "info",
      resultCount: count,
      durationMs: Math.round(performance.now() - startedAt),
    });
  }
}

function readSimilarityThreshold(): number {
  const configured = Number(process.env.SIMILARITY_THRESHOLD);
  return Number.isFinite(configured) && configured >= -1 && configured <= 1
    ? configured
    : DEFAULT_MINIMUM_SIMILARITY;
}
