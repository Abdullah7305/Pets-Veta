"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleAiServiceLogger = exports.AiService = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const node_path_1 = require("node:path");
const rag_1 = require("../../rag");
const cache_1 = require("../../rag/cache");
const rag_performance_1 = require("../../observability/rag-performance");
const chat_types_1 = require("../types/chat.types");
const DEFAULT_MARKDOWN_FALLBACK_CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_MARKDOWN_KNOWLEDGE_DIRECTORY = node_path_1.resolve(__dirname, "../../../knowledge");
const QUIET_MARKDOWN_LOGGER = {
    info() { },
    warn() { },
    error() { },
};
const STOP_WORDS = new Set([
    "a",
    "about",
    "an",
    "and",
    "are",
    "can",
    "for",
    "from",
    "has",
    "have",
    "how",
    "is",
    "it",
    "me",
    "my",
    "of",
    "on",
    "or",
    "pet",
    "pets",
    "should",
    "the",
    "to",
    "what",
    "when",
    "why",
    "with",
]);
const ANIMAL_TERMS = new Map([
    ["cat", "cat"],
    ["cats", "cat"],
    ["kitten", "cat"],
    ["kittens", "cat"],
    ["dog", "dog"],
    ["dogs", "dog"],
    ["puppy", "dog"],
    ["puppies", "dog"],
    ["bird", "bird"],
    ["birds", "bird"],
    ["rabbit", "rabbit"],
    ["rabbits", "rabbit"],
]);
class AiService {
    retriever;
    promptBuilder;
    generator;
    logger;
    cache;
    responseCacheTtlSeconds;
    constructor(dependencies = {}) {
        this.retriever =
            dependencies.retriever ??
                new MarkdownFallbackRetriever({
                    primary: new rag_1.PgVectorRetrieverService(),
                    fallback: new MarkdownKnowledgeRetriever(),
                });
        this.promptBuilder = dependencies.promptBuilder ?? new rag_1.RagPromptBuilder();
        this.generator = dependencies.generator ?? new rag_1.GeminiService();
        this.logger = dependencies.logger ?? new JsonConsoleAiServiceLogger();
        this.cache = dependencies.cache ?? (0, cache_1.createRagCacheStore)();
        this.responseCacheTtlSeconds =
            dependencies.responseCacheTtlSeconds ??
                (0, cache_1.readPositiveInteger)(process.env.RESPONSE_CACHE_TTL_SECONDS, 300);
    }
    async chat(request) {
        const startedAt = node_perf_hooks_1.performance.now();
        this.emit({
            event: "ai-chat.started",
            level: "info",
            ...(request.conversationId ? { conversationId: request.conversationId } : {}),
            questionLength: request.question.length,
        });
        try {
            const responseCacheKey = this.responseCacheKey(request);
            const cacheStartedAt = node_perf_hooks_1.performance.now();
            const cached = await this.cache.get(responseCacheKey);
            const cacheDurationMs = node_perf_hooks_1.performance.now() - cacheStartedAt;
            (0, rag_performance_1.recordRagStage)("responseCacheLookup", cacheDurationMs);
            if (isChatResponseDto(cached)) {
                (0, rag_performance_1.recordRagCache)("response", "hit");
                this.emit({
                    event: "ai-chat.response-cache",
                    level: "info",
                    outcome: "hit",
                    durationMs: Math.round(cacheDurationMs),
                });
                const response = this.forCurrentRequest(cached, request, startedAt);
                this.emit({
                    event: "ai-chat.completed",
                    level: "info",
                    ...(request.conversationId
                        ? { conversationId: request.conversationId }
                        : {}),
                    model: response.usage.model,
                    finishReason: response.usage.finishReason,
                    totalLatencyMs: response.usage.totalLatencyMs,
                    cacheHit: true,
                });
                return response;
            }
            if (cached !== undefined)
                void this.cache.delete(responseCacheKey);
            (0, rag_performance_1.recordRagCache)("response", "miss");
            this.emit({
                event: "ai-chat.response-cache",
                level: "info",
                outcome: "miss",
                durationMs: Math.round(cacheDurationMs),
            });
            const retrievalStartedAt = node_perf_hooks_1.performance.now();
            const chunks = await this.retriever.retrieve(request.question, {
                ...(request.topK === undefined ? {} : { topK: request.topK }),
                ...(request.minimumSimilarity === undefined
                    ? {}
                    : { minimumSimilarity: request.minimumSimilarity }),
                ...(request.filters ? { filters: request.filters } : {}),
            });
            this.emit({
                event: "ai-chat.retrieval-completed",
                level: "info",
                retrievedChunks: chunks.length,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - retrievalStartedAt),
            });
            const promptStartedAt = node_perf_hooks_1.performance.now();
            const builtPrompt = (0, rag_performance_1.measureRagStageSync)("promptBuild", () => this.promptBuilder.buildPrompt(request.question, chunks));
            const promptDurationMs = node_perf_hooks_1.performance.now() - promptStartedAt;
            this.emit({
                event: "ai-chat.prompt-built",
                level: "info",
                includedSources: builtPrompt.includedSources.length,
                promptTokenEstimate: builtPrompt.tokenEstimate,
                durationMs: Math.round(promptDurationMs),
            });
            const generation = await this.generator.generate(builtPrompt.prompt);
            const totalLatencyMs = Math.round(node_perf_hooks_1.performance.now() - startedAt);
            const response = {
                answer: generation.answer,
                sources: builtPrompt.includedSources,
                ...(request.conversationId
                    ? { conversationId: request.conversationId }
                    : {}),
                usage: {
                    model: generation.model,
                    promptTokenEstimate: builtPrompt.tokenEstimate,
                    promptTokens: generation.tokenUsage.promptTokens,
                    outputTokens: generation.tokenUsage.outputTokens,
                    totalTokens: generation.tokenUsage.totalTokens,
                    modelLatencyMs: generation.latencyMs,
                    totalLatencyMs,
                    finishReason: generation.finishReason,
                    retrievedChunks: chunks.length,
                },
            };
            this.emit({
                event: "ai-chat.completed",
                level: "info",
                ...(request.conversationId ? { conversationId: request.conversationId } : {}),
                model: generation.model,
                finishReason: generation.finishReason,
                totalLatencyMs,
                cacheHit: false,
            });
            void this.cache.set(responseCacheKey, response, this.responseCacheTtlSeconds);
            return response;
        }
        catch (error) {
            this.emit({
                event: "ai-chat.failed",
                level: "error",
                ...(request.conversationId ? { conversationId: request.conversationId } : {}),
                durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
                error: serializeError(error),
            });
            throw mapChatError(error);
        }
    }
    responseCacheKey(request) {
        return (0, cache_1.createCacheKey)("chat-response", {
            question: request.question.trim(),
            topK: request.topK ?? null,
            minimumSimilarity: request.minimumSimilarity ?? null,
            filters: {
                animal: request.filters?.animal ?? null,
                category: request.filters?.category?.trim() || null,
                subCategory: request.filters?.subCategory?.trim() || null,
            },
        });
    }
    forCurrentRequest(cached, request, startedAt) {
        return {
            answer: cached.answer,
            sources: cached.sources,
            ...(request.conversationId
                ? { conversationId: request.conversationId }
                : {}),
            usage: {
                ...cached.usage,
                totalLatencyMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
            },
        };
    }
    emit(payload) {
        try {
            this.logger.log({
                ...payload,
                timestamp: new Date().toISOString(),
            });
        }
        catch {
            // Logging must not interrupt a chat request.
        }
    }
}
exports.AiService = AiService;
class MarkdownFallbackRetriever {
    primary;
    fallback;
    logger;
    constructor(options) {
        this.primary = options.primary;
        this.fallback = options.fallback;
        this.logger = options.logger ?? new JsonConsoleAiServiceLogger();
    }
    async retrieve(query, options = {}) {
        const primaryResults = await this.primary.retrieve(query, options);
        if (primaryResults.length > 0)
            return primaryResults;
        this.log({
            event: "ai-chat.markdown-fallback",
            level: "warn",
            reason: "primary-retriever-returned-no-context",
        });
        const fallbackResults = await this.fallback.retrieve(query, options);
        this.log({
            event: "ai-chat.markdown-fallback-completed",
            level: "info",
            retrievedChunks: fallbackResults.length,
        });
        return fallbackResults;
    }
    log(payload) {
        try {
            this.logger.log({
                ...payload,
                timestamp: new Date().toISOString(),
            });
        }
        catch {
            // Fallback logging must not interrupt retrieval.
        }
    }
}
class MarkdownKnowledgeRetriever {
    knowledgeDirectory;
    cacheTtlMs;
    logger;
    cachedChunks;
    cacheLoadedAtMs = 0;
    loadingPromise;
    constructor(options = {}) {
        this.knowledgeDirectory = node_path_1.resolve(options.knowledgeDirectory ??
            process.env.KNOWLEDGE_BASE_PATH ??
            DEFAULT_MARKDOWN_KNOWLEDGE_DIRECTORY);
        this.cacheTtlMs =
            options.cacheTtlMs ?? DEFAULT_MARKDOWN_FALLBACK_CACHE_TTL_MS;
        this.logger = options.logger ?? new JsonConsoleAiServiceLogger();
    }
    async retrieve(query, options = {}) {
        const normalizedQuery = query.trim();
        if (!normalizedQuery)
            return [];
        const topK = options.topK ?? 5;
        const filters = this.normalizeFilters(options.filters);
        const chunks = await this.getChunks();
        const terms = expandQueryTerms(tokenize(normalizedQuery), normalizedQuery);
        const inferredAnimal = inferAnimal(terms);
        const scored = [];
        for (const chunk of chunks) {
            if (!this.matchesFilters(chunk.metadata, filters, inferredAnimal))
                continue;
            const score = scoreChunk(chunk, terms, inferredAnimal);
            if (score <= 0)
                continue;
            scored.push({
                content: chunk.pageContent,
                metadata: {
                    ...chunk.metadata,
                    retrievalMode: "markdown-fallback",
                },
                similarity: normalizeFallbackScore(score),
                score,
            });
        }
        scored.sort((left, right) => right.score - left.score || right.similarity - left.similarity);
        return scored.slice(0, topK).map(({ score: _score, ...result }) => result);
    }
    async getChunks() {
        const now = Date.now();
        if (this.cachedChunks && now - this.cacheLoadedAtMs < this.cacheTtlMs) {
            return this.cachedChunks;
        }
        this.loadingPromise ??= this.loadChunks();
        try {
            this.cachedChunks = await this.loadingPromise;
            this.cacheLoadedAtMs = Date.now();
            return this.cachedChunks;
        }
        finally {
            this.loadingPromise = undefined;
        }
    }
    async loadChunks() {
        const startedAt = node_perf_hooks_1.performance.now();
        const documents = await new rag_1.ProductionMarkdownLoader({
            knowledgeDirectory: this.knowledgeDirectory,
            logger: QUIET_MARKDOWN_LOGGER,
        }).loadDocuments();
        const chunks = await (0, rag_1.chunkMarkdownDocuments)(documents, {
            logger: QUIET_MARKDOWN_LOGGER,
        });
        this.log({
            event: "markdown-fallback.loaded",
            level: "info",
            documents: documents.length,
            chunks: chunks.length,
            durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        });
        return chunks;
    }
    matchesFilters(metadata, filters, inferredAnimal) {
        const animal = metadataValue(metadata.animal);
        if (filters.animal && animal !== filters.animal)
            return false;
        if (filters.category && metadataValue(metadata.category) !== filters.category)
            return false;
        if (filters.subCategory &&
            metadataValue(metadata.subCategory ?? metadata.subcategory) !== filters.subCategory) {
            return false;
        }
        if (filters.animal || !inferredAnimal)
            return true;
        return !animal || animal === inferredAnimal || animal === "general";
    }
    normalizeFilters(filters) {
        const clean = (value) => value?.trim().toLowerCase() || undefined;
        return {
            ...(clean(filters?.animal) ? { animal: clean(filters?.animal) } : {}),
            ...(clean(filters?.category) ? { category: clean(filters?.category) } : {}),
            ...(clean(filters?.subCategory)
                ? { subCategory: clean(filters?.subCategory) }
                : {}),
        };
    }
    log(payload) {
        try {
            this.logger.log({
                ...payload,
                timestamp: new Date().toISOString(),
            });
        }
        catch {
            // Fallback logging must not interrupt retrieval.
        }
    }
}
function isChatResponseDto(value) {
    if (!value || typeof value !== "object")
        return false;
    const candidate = value;
    const usage = candidate.usage;
    return (typeof candidate.answer === "string" &&
        Array.isArray(candidate.sources) &&
        !!usage &&
        typeof usage.model === "string" &&
        typeof usage.totalLatencyMs === "number" &&
        typeof usage.modelLatencyMs === "number" &&
        typeof usage.totalTokens === "number" &&
        typeof usage.finishReason === "string");
}
class JsonConsoleAiServiceLogger {
    log(entry) {
        const serialized = JSON.stringify(entry);
        if (entry.level === "error")
            console.error(serialized);
        else
            console.info(serialized);
    }
}
exports.JsonConsoleAiServiceLogger = JsonConsoleAiServiceLogger;
function tokenize(text) {
    return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((term) => term.length > 1 && !STOP_WORDS.has(term));
}
function expandQueryTerms(tokens, query) {
    const expanded = new Set(tokens);
    const normalized = query.toLowerCase();
    const add = (...terms) => {
        terms.forEach((term) => expanded.add(term));
    };
    if (/\b(not eating|not eat|won't eat|wont eat|refuses food|no appetite|loss of appetite)\b/.test(normalized)) {
        add("appetite", "eat", "eating", "food", "loss");
    }
    if (expanded.has("vomiting"))
        add("vomit");
    if (expanded.has("diarrhoea"))
        add("diarrhea");
    if (expanded.has("itchy"))
        add("itching", "skin");
    if (expanded.has("allergy"))
        add("allergies", "skin", "itching");
    if (expanded.has("coughing"))
        add("cough");
    return expanded;
}
function inferAnimal(terms) {
    for (const term of terms) {
        const animal = ANIMAL_TERMS.get(term);
        if (animal)
            return animal;
    }
    return undefined;
}
function scoreChunk(chunk, terms, inferredAnimal) {
    const metadata = chunk.metadata ?? {};
    const title = metadataValue(metadata.title);
    const heading = metadataValue(metadata.heading);
    const category = metadataValue(metadata.category);
    const subCategory = metadataValue(metadata.subCategory ?? metadata.subcategory);
    const filePath = metadataValue(metadata.filePath);
    const animal = metadataValue(metadata.animal);
    const metadataText = [title, heading, category, subCategory, filePath, animal]
        .filter(Boolean)
        .join(" ");
    const content = chunk.pageContent.toLowerCase();
    let score = 0;
    for (const term of terms) {
        score += countTerm(title, term) * 8;
        score += countTerm(heading, term) * 6;
        score += countTerm(category, term) * 4;
        score += countTerm(subCategory, term) * 4;
        score += countTerm(filePath, term) * 3;
        score += countTerm(metadataText, term) * 2;
        score += Math.min(countTerm(content, term), 6);
    }
    if (inferredAnimal && animal === inferredAnimal)
        score += 5;
    if (inferredAnimal && animal === "general")
        score += 2;
    if (terms.has("appetite") && terms.has("loss")) {
        const titleAndPath = `${title} ${filePath}`;
        if (titleAndPath.includes("loss") && titleAndPath.includes("appetite"))
            score += 30;
        if (category === "symptoms" || subCategory === "symptoms")
            score += 5;
    }
    return score;
}
function countTerm(text, term) {
    if (!text)
        return 0;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.match(new RegExp(`\\b${escaped}\\b`, "gi"))?.length ?? 0;
}
function metadataValue(value) {
    return typeof value === "string" ? value.toLowerCase() : "";
}
function normalizeFallbackScore(score) {
    return Math.min(0.99, Math.round((0.35 + (score / (score + 20)) * 0.6) * 100) / 100);
}
function mapChatError(error) {
    if (error instanceof chat_types_1.ChatApiError)
        return error;
    if (error instanceof rag_1.GeminiServiceError) {
        if (error.kind === "rate_limit") {
            return new chat_types_1.ChatApiError("The AI service is busy. Please try again shortly.", 429, "RATE_LIMITED", undefined, error);
        }
        if (error.kind === "timeout") {
            return new chat_types_1.ChatApiError("The AI service did not respond in time.", 504, "UPSTREAM_TIMEOUT", undefined, error);
        }
        if (error.kind === "network") {
            return new chat_types_1.ChatApiError("The AI service is temporarily unavailable.", 503, "UPSTREAM_UNAVAILABLE", undefined, error);
        }
        return new chat_types_1.ChatApiError("The AI service could not generate a response.", error.status && error.status >= 400 && error.status < 500
            ? error.status
            : 502, "GENERATION_FAILED", undefined, error);
    }
    return new chat_types_1.ChatApiError("Failed to process the AI chat request.", 500, "INTERNAL_ERROR", undefined, error);
}
function serializeError(error) {
    return error instanceof Error
        ? { name: error.name, message: error.message }
        : { name: "UnknownError", message: String(error) };
}
//# sourceMappingURL=ai.service.js.map
