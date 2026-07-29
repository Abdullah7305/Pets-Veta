import { performance } from "node:perf_hooks";

import {
  GeminiService,
  GeminiServiceError,
  PgVectorRetrieverService,
  RagPromptBuilder,
  type GenerativeAIService,
  type PromptBuilder,
  type Retriever,
} from "../../rag";
import {
  createCacheKey,
  createRagCacheStore,
  readPositiveInteger,
  type CacheStore,
} from "../../rag/cache";
import {
  measureRagStageSync,
  recordRagCache,
  recordRagStage,
} from "../../observability/rag-performance";
import type { ChatRequestDto, ChatResponseDto } from "../dto/chat.dto";
import {
  ChatApiError,
  type AiChatOrchestrator,
  type AiServiceLogger,
  type AiServiceLogEntry,
} from "../types/chat.types";

export interface AiServiceDependencies {
  retriever?: Retriever;
  promptBuilder?: PromptBuilder;
  generator?: GenerativeAIService;
  logger?: AiServiceLogger;
  cache?: CacheStore;
  responseCacheTtlSeconds?: number;
}

export class AiService implements AiChatOrchestrator {
  private readonly retriever: Retriever;
  private readonly promptBuilder: PromptBuilder;
  private readonly generator: GenerativeAIService;
  private readonly logger: AiServiceLogger;
  private readonly cache: CacheStore;
  private readonly responseCacheTtlSeconds: number;

  constructor(dependencies: AiServiceDependencies = {}) {
    this.retriever = dependencies.retriever ?? new PgVectorRetrieverService();
    this.promptBuilder = dependencies.promptBuilder ?? new RagPromptBuilder();
    this.generator = dependencies.generator ?? new GeminiService();
    this.logger = dependencies.logger ?? new JsonConsoleAiServiceLogger();
    this.cache = dependencies.cache ?? createRagCacheStore();
    this.responseCacheTtlSeconds =
      dependencies.responseCacheTtlSeconds ??
      readPositiveInteger(process.env.RESPONSE_CACHE_TTL_SECONDS, 300);
  }

  async chat(request: ChatRequestDto): Promise<ChatResponseDto> {
    const startedAt = performance.now();
    this.emit({
      event: "ai-chat.started",
      level: "info",
      ...(request.conversationId ? { conversationId: request.conversationId } : {}),
      questionLength: request.question.length,
    });

    try {
      const responseCacheKey = this.responseCacheKey(request);
      const cacheStartedAt = performance.now();
      const cached = await this.cache.get<unknown>(responseCacheKey);
      const cacheDurationMs = performance.now() - cacheStartedAt;
      recordRagStage("responseCacheLookup", cacheDurationMs);

      if (isChatResponseDto(cached)) {
        recordRagCache("response", "hit");
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
      if (cached !== undefined) void this.cache.delete(responseCacheKey);
      recordRagCache("response", "miss");
      this.emit({
        event: "ai-chat.response-cache",
        level: "info",
        outcome: "miss",
        durationMs: Math.round(cacheDurationMs),
      });

      const retrievalStartedAt = performance.now();
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
        durationMs: Math.round(performance.now() - retrievalStartedAt),
      });

      const promptStartedAt = performance.now();
      const builtPrompt = measureRagStageSync("promptBuild", () =>
        this.promptBuilder.buildPrompt(request.question, chunks),
      );
      const promptDurationMs = performance.now() - promptStartedAt;
      this.emit({
        event: "ai-chat.prompt-built",
        level: "info",
        includedSources: builtPrompt.includedSources.length,
        promptTokenEstimate: builtPrompt.tokenEstimate,
        durationMs: Math.round(promptDurationMs),
      });

      const generation = await this.generator.generate(builtPrompt.prompt);
      const totalLatencyMs = Math.round(performance.now() - startedAt);
      const response: ChatResponseDto = {
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
      void this.cache.set(
        responseCacheKey,
        response,
        this.responseCacheTtlSeconds,
      );
      return response;
    } catch (error) {
      this.emit({
        event: "ai-chat.failed",
        level: "error",
        ...(request.conversationId ? { conversationId: request.conversationId } : {}),
        durationMs: Math.round(performance.now() - startedAt),
        error: serializeError(error),
      });
      throw mapChatError(error);
    }
  }

  private responseCacheKey(request: ChatRequestDto): string {
    return createCacheKey("chat-response", {
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

  private forCurrentRequest(
    cached: ChatResponseDto,
    request: ChatRequestDto,
    startedAt: number,
  ): ChatResponseDto {
    return {
      answer: cached.answer,
      sources: cached.sources,
      ...(request.conversationId
        ? { conversationId: request.conversationId }
        : {}),
      usage: {
        ...cached.usage,
        totalLatencyMs: Math.round(performance.now() - startedAt),
      },
    };
  }

  private emit(payload: AiServiceLogEntry extends infer Entry
    ? Entry extends AiServiceLogEntry
      ? Omit<Entry, "timestamp">
      : never
    : never): void {
    try {
      this.logger.log({
        ...payload,
        timestamp: new Date().toISOString(),
      } as AiServiceLogEntry);
    } catch {
      // Logging must not interrupt a chat request.
    }
  }
}

function isChatResponseDto(value: unknown): value is ChatResponseDto {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ChatResponseDto>;
  const usage = candidate.usage as
    | Partial<ChatResponseDto["usage"]>
    | undefined;
  return (
    typeof candidate.answer === "string" &&
    Array.isArray(candidate.sources) &&
    !!usage &&
    typeof usage.model === "string" &&
    typeof usage.totalLatencyMs === "number" &&
    typeof usage.modelLatencyMs === "number" &&
    typeof usage.totalTokens === "number" &&
    typeof usage.finishReason === "string"
  );
}

export class JsonConsoleAiServiceLogger implements AiServiceLogger {
  log(entry: AiServiceLogEntry): void {
    const serialized = JSON.stringify(entry);
    if (entry.level === "error") console.error(serialized);
    else console.info(serialized);
  }
}

function mapChatError(error: unknown): ChatApiError {
  if (error instanceof ChatApiError) return error;
  if (error instanceof GeminiServiceError) {
    if (error.kind === "rate_limit") {
      return new ChatApiError(
        "The AI service is busy. Please try again shortly.",
        429,
        "RATE_LIMITED",
        undefined,
        error,
      );
    }
    if (error.kind === "timeout") {
      return new ChatApiError(
        "The AI service did not respond in time.",
        504,
        "UPSTREAM_TIMEOUT",
        undefined,
        error,
      );
    }
    if (error.kind === "network") {
      return new ChatApiError(
        "The AI service is temporarily unavailable.",
        503,
        "UPSTREAM_UNAVAILABLE",
        undefined,
        error,
      );
    }
    return new ChatApiError(
      "The AI service could not generate a response.",
      error.status && error.status >= 400 && error.status < 500
        ? error.status
        : 502,
      "GENERATION_FAILED",
      undefined,
      error,
    );
  }
  return new ChatApiError(
    "Failed to process the AI chat request.",
    500,
    "INTERNAL_ERROR",
    undefined,
    error,
  );
}

function serializeError(error: unknown): Readonly<{ name: string; message: string }> {
  return error instanceof Error
    ? { name: error.name, message: error.message }
    : { name: "UnknownError", message: String(error) };
}
