import type { RetrievalResult } from "../retrieval";
import type { PromptBuildResult, PromptLogEntry } from "./prompt.types";

export interface PromptBuilderLogger {
  log(entry: PromptLogEntry): void;
}

export interface PromptBuilderOptions {
  maximumContextTokens?: number;
  logger?: PromptBuilderLogger;
  systemInstructions?: string;
  aiRole?: string;
  rules?: readonly string[];
  answerRequirements?: readonly string[];
}

export interface PromptBuilder {
  buildPrompt(
    userQuestion: string,
    retrievedChunks: readonly RetrievalResult[],
  ): PromptBuildResult;
}
