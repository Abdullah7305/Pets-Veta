import type {
  GeminiLogEntry,
  GeminiProviderChunk,
  GeminiProviderRequest,
  GeminiProviderResponse,
  GeminiResponse,
  GeminiStreamEvent,
} from "./gemini.types";

export interface GeminiProvider {
  generate(request: GeminiProviderRequest): Promise<GeminiProviderResponse>;
  stream(request: GeminiProviderRequest): Promise<AsyncIterable<GeminiProviderChunk>>;
}

export interface GeminiLogger {
  log(entry: GeminiLogEntry): void;
}

export interface GeminiServiceOptions {
  model?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
  timeoutMs?: number;
  maxRetries?: number;
  retryBaseDelayMs?: number;
  apiKey?: string;
  provider?: GeminiProvider;
  logger?: GeminiLogger;
}

export interface GenerativeAIService {
  generate(prompt: string): Promise<GeminiResponse>;
  stream(prompt: string): AsyncGenerator<GeminiStreamEvent>;
}
