import { performance } from "node:perf_hooks";

import {
  DEFAULT_GEMINI_MAX_OUTPUT_TOKENS,
  DEFAULT_GEMINI_MAX_RETRIES,
  DEFAULT_GEMINI_MODEL,
  DEFAULT_GEMINI_RETRY_BASE_DELAY_MS,
  DEFAULT_GEMINI_TEMPERATURE,
  DEFAULT_GEMINI_TIMEOUT_MS,
  DEFAULT_GEMINI_TOP_K,
  DEFAULT_GEMINI_TOP_P,
} from "./gemini.constants";
import { recordRagStage } from "../../observability/rag-performance";
import type {
  GeminiLogger,
  GeminiProvider,
  GeminiServiceOptions,
  GenerativeAIService,
} from "./gemini.interface";
import {
  GeminiServiceError,
  type GeminiProviderRequest,
  type GeminiResponse,
  type GeminiStreamEvent,
} from "./gemini.types";
import {
  emitGeminiLog,
  emptyTokenUsage,
  GoogleGeminiProvider,
  JsonConsoleGeminiLogger,
  normalizeGeminiError,
} from "./gemini.utils";

export class GeminiService implements GenerativeAIService {
  private readonly model: string;
  private readonly temperature: number;
  private readonly topP: number;
  private readonly topK: number;
  private readonly maxOutputTokens: number;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryBaseDelayMs: number;
  private readonly provider: GeminiProvider;
  private readonly logger: GeminiLogger;

  constructor(options: GeminiServiceOptions = {}) {
    this.model = options.model?.trim() || DEFAULT_GEMINI_MODEL;
    this.temperature = options.temperature ?? DEFAULT_GEMINI_TEMPERATURE;
    this.topP = options.topP ?? DEFAULT_GEMINI_TOP_P;
    this.topK = options.topK ?? DEFAULT_GEMINI_TOP_K;
    this.maxOutputTokens =
      options.maxOutputTokens ?? DEFAULT_GEMINI_MAX_OUTPUT_TOKENS;
    this.timeoutMs =
      options.timeoutMs ??
      readPositiveIntegerEnvironment(
        "GEMINI_TIMEOUT_MS",
        DEFAULT_GEMINI_TIMEOUT_MS,
      );
    this.maxRetries =
      options.maxRetries ??
      readNonNegativeIntegerEnvironment(
        "GEMINI_MAX_RETRIES",
        DEFAULT_GEMINI_MAX_RETRIES,
      );
    this.retryBaseDelayMs =
      options.retryBaseDelayMs ??
      readPositiveIntegerEnvironment(
        "GEMINI_RETRY_BASE_DELAY_MS",
        DEFAULT_GEMINI_RETRY_BASE_DELAY_MS,
      );
    this.logger = options.logger ?? new JsonConsoleGeminiLogger();
    this.validateConfiguration();
    this.provider = options.provider ?? new GoogleGeminiProvider(options.apiKey);
  }

  async generate(prompt: string): Promise<GeminiResponse> {
    const input = this.validatePrompt(prompt);
    const startedAt = performance.now();
    this.logStarted("normal", input.length);

    for (let attempt = 1; attempt <= this.maxRetries + 1; attempt += 1) {
      const remainingMs = this.timeoutMs - (performance.now() - startedAt);
      if (remainingMs <= 0) {
        throw this.logAndNormalizeFailure(
          "normal",
          new GeminiServiceError({
            kind: "timeout",
            message: "Gemini request timed out",
            retryable: true,
          }),
          true,
          startedAt,
        );
      }

      const controller = new AbortController();
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, Math.max(1, Math.ceil(remainingMs)));
      const requestStartedAt = performance.now();

      try {
        const providerResponse = await this.provider.generate(
          this.request(input, controller.signal),
        );
        recordRagStage(
          "geminiApiRequest",
          performance.now() - requestStartedAt,
        );
        const responseStartedAt = performance.now();
        const response: GeminiResponse = {
          answer: providerResponse.text,
          model: this.model,
          tokenUsage: providerResponse.tokenUsage,
          latencyMs: Math.round(performance.now() - startedAt),
          finishReason: providerResponse.finishReason,
        };
        recordRagStage(
          "geminiResponse",
          performance.now() - responseStartedAt,
        );
        this.logCompleted("normal", response);
        return response;
      } catch (error) {
        recordRagStage(
          "geminiApiRequest",
          performance.now() - requestStartedAt,
        );
        const normalized = normalizeGeminiError(error, timedOut);
        const delayMs = this.retryDelayMs(attempt);
        const hasRetry = attempt <= this.maxRetries;
        const fitsDeadline =
          performance.now() - startedAt + delayMs < this.timeoutMs;
        if (normalized.retryable && hasRetry && fitsDeadline) {
          emitGeminiLog(this.logger, {
            event: "gemini.request-retry",
            level: "info",
            mode: "normal",
            model: this.model,
            attempt,
            nextAttempt: attempt + 1,
            delayMs,
            errorKind: normalized.kind,
          });
          const retryDelayStartedAt = performance.now();
          await wait(delayMs);
          recordRagStage(
            "geminiRetryDelay",
            performance.now() - retryDelayStartedAt,
          );
          continue;
        }
        throw this.logAndNormalizeFailure(
          "normal",
          normalized,
          timedOut,
          startedAt,
        );
      } finally {
        clearTimeout(timeout);
      }
    }

    throw new GeminiServiceError({
      kind: "api",
      message: "Gemini API request failed",
      retryable: false,
    });
  }

  async *stream(prompt: string): AsyncGenerator<GeminiStreamEvent> {
    const input = this.validatePrompt(prompt);
    const startedAt = performance.now();
    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.timeoutMs);
    this.logStarted("stream", input.length);

    let answer = "";
    let tokenUsage = emptyTokenUsage();
    let finishReason = "UNKNOWN";
    try {
      const chunks = await this.provider.stream(this.request(input, controller.signal));
      for await (const chunk of chunks) {
        if (chunk.text) {
          answer += chunk.text;
          yield { type: "text-delta", text: chunk.text };
        }
        if (chunk.tokenUsage) tokenUsage = chunk.tokenUsage;
        if (chunk.finishReason) finishReason = chunk.finishReason;
      }
      const response: GeminiResponse = {
        answer,
        model: this.model,
        tokenUsage,
        latencyMs: Math.round(performance.now() - startedAt),
        finishReason,
      };
      this.logCompleted("stream", response);
      yield { type: "complete", response };
    } catch (error) {
      throw this.logAndNormalizeFailure("stream", error, timedOut, startedAt);
    } finally {
      clearTimeout(timeout);
    }
  }

  private request(prompt: string, signal: AbortSignal): GeminiProviderRequest {
    return {
      prompt,
      model: this.model,
      temperature: this.temperature,
      topP: this.topP,
      topK: this.topK,
      maxOutputTokens: this.maxOutputTokens,
      signal,
    };
  }

  private retryDelayMs(attempt: number): number {
    const exponential = Math.min(
      2_000,
      this.retryBaseDelayMs * 2 ** Math.max(0, attempt - 1),
    );
    const jitter = 0.8 + Math.random() * 0.4;
    return Math.max(1, Math.round(exponential * jitter));
  }

  private validatePrompt(prompt: string): string {
    const value = prompt.trim();
    if (!value) {
      throw new GeminiServiceError({
        kind: "configuration",
        message: "prompt must not be empty",
        retryable: false,
      });
    }
    return value;
  }

  private validateConfiguration(): void {
    if (!Number.isFinite(this.temperature) || this.temperature < 0 || this.temperature > 2) {
      throw new RangeError("temperature must be between 0 and 2");
    }
    if (!Number.isFinite(this.topP) || this.topP < 0 || this.topP > 1) {
      throw new RangeError("topP must be between 0 and 1");
    }
    for (const [name, value] of [
      ["topK", this.topK],
      ["maxOutputTokens", this.maxOutputTokens],
      ["timeoutMs", this.timeoutMs],
      ["retryBaseDelayMs", this.retryBaseDelayMs],
    ] as const) {
      if (!Number.isInteger(value) || value <= 0) {
        throw new RangeError(`${name} must be a positive integer`);
      }
    }
    if (
      !Number.isInteger(this.maxRetries) ||
      this.maxRetries < 0 ||
      this.maxRetries > 5
    ) {
      throw new RangeError("maxRetries must be an integer between 0 and 5");
    }
  }

  private logStarted(mode: "normal" | "stream", promptLength: number): void {
    emitGeminiLog(this.logger, {
      event: "gemini.request-started",
      level: "info",
      mode,
      promptLength,
      timeoutMs: this.timeoutMs,
    });
    emitGeminiLog(this.logger, {
      event: "gemini.model-used",
      level: "info",
      model: this.model,
      temperature: this.temperature,
      topP: this.topP,
      topK: this.topK,
      maxOutputTokens: this.maxOutputTokens,
    });
  }

  private logCompleted(mode: "normal" | "stream", response: GeminiResponse): void {
    emitGeminiLog(this.logger, {
      event: "gemini.request-completed",
      level: "info",
      mode,
      model: response.model,
      latencyMs: response.latencyMs,
      tokenUsage: response.tokenUsage,
      finishReason: response.finishReason,
    });
  }

  private logAndNormalizeFailure(
    mode: "normal" | "stream",
    error: unknown,
    timedOut: boolean,
    startedAt: number,
  ): GeminiServiceError {
    const normalized = normalizeGeminiError(error, timedOut);
    emitGeminiLog(this.logger, {
      event: "gemini.request-failed",
      level: "error",
      mode,
      model: this.model,
      latencyMs: Math.round(performance.now() - startedAt),
      error: {
        name: normalized.name,
        message: normalized.message,
        kind: normalized.kind,
        ...(normalized.status === undefined ? {} : { status: normalized.status }),
        retryable: normalized.retryable,
      },
    });
    return normalized;
  }
}

function readPositiveIntegerEnvironment(
  name: string,
  fallback: number,
): number {
  const value = Number(process.env[name]);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

function readNonNegativeIntegerEnvironment(
  name: string,
  fallback: number,
): number {
  const value = Number(process.env[name]);
  return Number.isSafeInteger(value) && value >= 0 ? value : fallback;
}

function wait(durationMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}
