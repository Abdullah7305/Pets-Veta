import type { ChatRequestDto, ChatResponseDto } from "../dto/chat.dto";

export interface AiChatOrchestrator {
  chat(request: ChatRequestDto): Promise<ChatResponseDto>;
}

export type ChatApiErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "UPSTREAM_TIMEOUT"
  | "UPSTREAM_UNAVAILABLE"
  | "GENERATION_FAILED"
  | "INTERNAL_ERROR";

export class ChatApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code: ChatApiErrorCode,
    readonly details?: unknown,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

export type AiServiceLogEntry =
  | Readonly<{
      timestamp: string;
      event: "ai-chat.started";
      level: "info";
      conversationId?: string;
      questionLength: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "ai-chat.response-cache";
      level: "info";
      outcome: "hit" | "miss" | "coalesced";
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "ai-chat.retrieval-completed";
      level: "info";
      retrievedChunks: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "ai-chat.prompt-built";
      level: "info";
      includedSources: number;
      promptTokenEstimate: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "ai-chat.completed";
      level: "info";
      conversationId?: string;
      model: string;
      finishReason: string;
      totalLatencyMs: number;
      cacheHit: boolean;
    }>
  | Readonly<{
      timestamp: string;
      event: "ai-chat.failed";
      level: "error";
      conversationId?: string;
      durationMs: number;
      error: Readonly<{ name: string; message: string }>;
    }>;

export interface AiServiceLogger {
  log(entry: AiServiceLogEntry): void;
}
