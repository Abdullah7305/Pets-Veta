"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleAiServiceLogger = exports.AiService = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const rag_1 = require("../../rag");
const cache_1 = require("../../rag/cache");
const rag_performance_1 = require("../../observability/rag-performance");
const chat_types_1 = require("../types/chat.types");
class AiService {
    retriever;
    promptBuilder;
    generator;
    logger;
    cache;
    responseCacheTtlSeconds;
    constructor(dependencies = {}) {
        this.retriever = dependencies.retriever ?? new rag_1.PgVectorRetrieverService();
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