export type GeminiTokenUsage = Readonly<{
  promptTokens: number;
  outputTokens: number;
  totalTokens: number;
  cachedTokens?: number;
}>;

export type GeminiResponse = Readonly<{
  answer: string;
  model: string;
  tokenUsage: GeminiTokenUsage;
  latencyMs: number;
  finishReason: string;
}>;

export type GeminiStreamEvent =
  | Readonly<{ type: "text-delta"; text: string }>
  | Readonly<{ type: "complete"; response: GeminiResponse }>;

export type GeminiErrorKind =
  | "rate_limit"
  | "network"
  | "timeout"
  | "api"
  | "configuration";

export class GeminiServiceError extends Error {
  readonly kind: GeminiErrorKind;
  readonly status?: number;
  readonly retryable: boolean;
  readonly cause?: unknown;

  constructor(options: {
    kind: GeminiErrorKind;
    message: string;
    status?: number;
    retryable: boolean;
    cause?: unknown;
  }) {
    super(options.message);
    this.name = "GeminiServiceError";
    this.kind = options.kind;
    this.status = options.status;
    this.retryable = options.retryable;
    this.cause = options.cause;
  }
}

export type GeminiLogLevel = "info" | "error";

export type GeminiLogEntry =
  | Readonly<{
      timestamp: string;
      event: "gemini.request-started";
      level: "info";
      mode: "normal" | "stream";
      promptLength: number;
      timeoutMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "gemini.model-used";
      level: "info";
      model: string;
      temperature: number;
      topP: number;
      topK: number;
      maxOutputTokens: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "gemini.request-retry";
      level: "info";
      mode: "normal";
      model: string;
      attempt: number;
      nextAttempt: number;
      delayMs: number;
      errorKind: GeminiErrorKind;
    }>
  | Readonly<{
      timestamp: string;
      event: "gemini.request-completed";
      level: "info";
      mode: "normal" | "stream";
      model: string;
      latencyMs: number;
      tokenUsage: GeminiTokenUsage;
      finishReason: string;
    }>
  | Readonly<{
      timestamp: string;
      event: "gemini.request-failed";
      level: "error";
      mode: "normal" | "stream";
      model: string;
      latencyMs: number;
      error: Readonly<{
        name: string;
        message: string;
        kind: GeminiErrorKind;
        status?: number;
        retryable: boolean;
      }>;
    }>;

export type GeminiLogPayload = GeminiLogEntry extends infer Entry
  ? Entry extends GeminiLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;

export type GeminiProviderRequest = Readonly<{
  prompt: string;
  model: string;
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  signal: AbortSignal;
}>;

export type GeminiProviderResponse = Readonly<{
  text: string;
  tokenUsage: GeminiTokenUsage;
  finishReason: string;
}>;

export type GeminiProviderChunk = Readonly<{
  text: string;
  tokenUsage?: GeminiTokenUsage;
  finishReason?: string;
}>;
