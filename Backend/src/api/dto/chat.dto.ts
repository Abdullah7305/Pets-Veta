import type { RetrieverFilters } from "../../rag";

export interface ChatRequestDto {
  question: string;
  conversationId?: string;
  topK?: number;
  minimumSimilarity?: number;
  filters?: RetrieverFilters;
}

export interface ChatSourceDto {
  sourceId: string;
  source?: string;
  filePath?: string;
  title?: string;
  heading?: string;
  chunkIndex?: number;
  similarity: number;
  metadata: Record<string, unknown>;
  truncated: boolean;
}

export interface ChatUsageDto {
  model: string;
  promptTokenEstimate: number;
  promptTokens: number;
  outputTokens: number;
  totalTokens: number;
  modelLatencyMs: number;
  totalLatencyMs: number;
  finishReason: string;
  retrievedChunks: number;
}

export interface ChatResponseDto {
  answer: string;
  sources: readonly ChatSourceDto[];
  conversationId?: string;
  usage: ChatUsageDto;
}
