import type { RetrievalResult } from "../retrieval";

export type IncludedSource = Readonly<{
  sourceId: string;
  source?: string;
  filePath?: string;
  title?: string;
  heading?: string;
  chunkIndex?: number;
  similarity: number;
  metadata: Record<string, unknown>;
  truncated: boolean;
}>;

export type PromptBuildResult = Readonly<{
  prompt: string;
  includedSources: readonly IncludedSource[];
  tokenEstimate: number;
}>;

export type PromptLogLevel = "info" | "warn" | "error";

export type PromptLogEntry =
  | Readonly<{
      timestamp: string;
      event: "prompt-builder.started";
      level: "info";
      questionLength: number;
      retrievedChunkCount: number;
      maximumContextTokens: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "prompt-builder.chunk-included";
      level: "info";
      sourceId: string;
      chunkIndex: number;
      estimatedTokens: number;
      truncated: boolean;
    }>
  | Readonly<{
      timestamp: string;
      event: "prompt-builder.warning";
      level: "warn";
      message: string;
      chunkIndex?: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "prompt-builder.error";
      level: "error";
      error: Readonly<{ name: string; message: string }>;
    }>
  | Readonly<{
      timestamp: string;
      event: "prompt-builder.completed";
      level: "info";
      includedSourceCount: number;
      omittedChunkCount: number;
      contextTokenEstimate: number;
      promptTokenEstimate: number;
      durationMs: number;
    }>;

export type PromptLogPayload = PromptLogEntry extends infer Entry
  ? Entry extends PromptLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;

export type PromptContextChunk = Readonly<{
  retrieval: RetrievalResult;
  originalIndex: number;
  sourceId: string;
  rendered: string;
  tokenEstimate: number;
  truncated: boolean;
}>;
