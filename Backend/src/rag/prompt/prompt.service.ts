import { performance } from "node:perf_hooks";

import type { RetrievalResult } from "../retrieval";
import type {
  PromptBuilder,
  PromptBuilderLogger,
  PromptBuilderOptions,
} from "./prompt.interface";
import {
  DEFAULT_AI_ROLE,
  DEFAULT_ANSWER_REQUIREMENTS,
  DEFAULT_RULES,
  DEFAULT_SYSTEM_INSTRUCTIONS,
  EMPTY_CONTEXT_MESSAGE,
} from "./prompt.templates";
import type {
  IncludedSource,
  PromptBuildResult,
  PromptContextChunk,
} from "./prompt.types";
import {
  emitPromptLog,
  estimateTokens,
  JsonConsolePromptBuilderLogger,
  renderContextChunk,
  serializePromptError,
  toIncludedSource,
  truncateToTokenBudget,
} from "./prompt.utils";

const DEFAULT_MAXIMUM_CONTEXT_TOKENS = 3_000;
const MINIMUM_CHUNK_CONTENT_TOKENS = 8;

export class RagPromptBuilder implements PromptBuilder {
  private readonly maximumContextTokens: number;
  private readonly logger: PromptBuilderLogger;
  private readonly systemInstructions: string;
  private readonly aiRole: string;
  private readonly rules: readonly string[];
  private readonly answerRequirements: readonly string[];

  constructor(options: PromptBuilderOptions = {}) {
    this.maximumContextTokens =
      options.maximumContextTokens ?? DEFAULT_MAXIMUM_CONTEXT_TOKENS;
    this.logger = options.logger ?? new JsonConsolePromptBuilderLogger();
    this.systemInstructions =
      options.systemInstructions?.trim() || DEFAULT_SYSTEM_INSTRUCTIONS;
    this.aiRole = options.aiRole?.trim() || DEFAULT_AI_ROLE;
    this.rules = options.rules ?? DEFAULT_RULES;
    this.answerRequirements =
      options.answerRequirements ?? DEFAULT_ANSWER_REQUIREMENTS;

    if (!Number.isInteger(this.maximumContextTokens) || this.maximumContextTokens <= 0) {
      throw new RangeError("maximumContextTokens must be a positive integer");
    }
    if (this.rules.length === 0 || this.answerRequirements.length === 0) {
      throw new RangeError("rules and answerRequirements must not be empty");
    }
  }

  buildPrompt(
    userQuestion: string,
    retrievedChunks: readonly RetrievalResult[],
  ): PromptBuildResult {
    const startedAt = performance.now();
    const question = userQuestion.trim();
    emitPromptLog(this.logger, {
      event: "prompt-builder.started",
      level: "info",
      questionLength: question.length,
      retrievedChunkCount: retrievedChunks.length,
      maximumContextTokens: this.maximumContextTokens,
    });

    try {
      if (!question) throw new TypeError("userQuestion must not be empty");
      const contextChunks = this.selectContext(retrievedChunks);
      const includedSources = contextChunks.map((chunk) =>
        toIncludedSource(chunk.retrieval, chunk.sourceId, chunk.truncated),
      );
      const context = contextChunks.length
        ? contextChunks.map((chunk) => chunk.rendered).join("\n\n")
        : EMPTY_CONTEXT_MESSAGE;
      const prompt = this.renderPrompt(question, context);
      const contextTokenEstimate = estimateTokens(context);
      const tokenEstimate = estimateTokens(prompt);

      emitPromptLog(this.logger, {
        event: "prompt-builder.completed",
        level: "info",
        includedSourceCount: includedSources.length,
        omittedChunkCount: retrievedChunks.length - includedSources.length,
        contextTokenEstimate,
        promptTokenEstimate: tokenEstimate,
        durationMs: Math.round(performance.now() - startedAt),
      });
      return { prompt, includedSources, tokenEstimate };
    } catch (error) {
      emitPromptLog(this.logger, {
        event: "prompt-builder.error",
        level: "error",
        error: serializePromptError(error),
      });
      throw error;
    }
  }

  private selectContext(results: readonly RetrievalResult[]): PromptContextChunk[] {
    const selected: PromptContextChunk[] = [];
    const seenContent = new Set<string>();
    let usedTokens = 0;
    for (let index = 0; index < results.length; index += 1) {
      const result = results[index]!;
      if (!result.content.trim()) {
        this.warn("Retrieved chunk has no content and was omitted", index);
        continue;
      }
      const contentFingerprint = result.content
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (seenContent.has(contentFingerprint)) {
        this.warn("Duplicate retrieved chunk was omitted", index);
        continue;
      }
      seenContent.add(contentFingerprint);
      const sourceId = `Source ${selected.length + 1}`;
      const full = renderContextChunk(result, sourceId);
      const fullTokens = estimateTokens(full);
      const remaining = this.maximumContextTokens - usedTokens;
      if (fullTokens <= remaining) {
        selected.push({
          retrieval: result,
          originalIndex: index,
          sourceId,
          rendered: full,
          tokenEstimate: fullTokens,
          truncated: false,
        });
        usedTokens += fullTokens;
        this.included(sourceId, index, fullTokens, false);
        continue;
      }

      const shell = renderContextChunk(result, sourceId, "");
      const availableContentTokens = remaining - estimateTokens(shell);
      if (availableContentTokens < MINIMUM_CHUNK_CONTENT_TOKENS) {
        this.warn("Context token budget exhausted; remaining chunks were omitted", index);
        break;
      }
      const content = truncateToTokenBudget(result.content, availableContentTokens);
      const rendered = renderContextChunk(result, sourceId, content);
      const tokenEstimate = estimateTokens(rendered);
      selected.push({
        retrieval: result,
        originalIndex: index,
        sourceId,
        rendered,
        tokenEstimate,
        truncated: true,
      });
      usedTokens += tokenEstimate;
      this.included(sourceId, index, tokenEstimate, true);
      this.warn("Retrieved context was truncated to fit the token budget", index);
      break;
    }
    return selected;
  }

  private renderPrompt(question: string, context: string): string {
    return [
      "## System Instructions",
      this.systemInstructions,
      "",
      "## AI Role",
      this.aiRole,
      "",
      "## Rules",
      ...this.rules.map((rule, index) => `${index + 1}. ${rule}`),
      "",
      "## Retrieved Context",
      context,
      "",
      "## User Question",
      `<user_question>\n${question.replace(/<\/user_question\s*>/gi, "&lt;/user_question&gt;")}\n</user_question>`,
      "",
      "## Answer Requirements",
      ...this.answerRequirements.map(
        (requirement, index) => `${index + 1}. ${requirement}`,
      ),
    ].join("\n");
  }

  private included(
    sourceId: string,
    chunkIndex: number,
    estimatedTokens: number,
    truncated: boolean,
  ): void {
    emitPromptLog(this.logger, {
      event: "prompt-builder.chunk-included",
      level: "info",
      sourceId,
      chunkIndex,
      estimatedTokens,
      truncated,
    });
  }

  private warn(message: string, chunkIndex?: number): void {
    emitPromptLog(this.logger, {
      event: "prompt-builder.warning",
      level: "warn",
      message,
      ...(chunkIndex === undefined ? {} : { chunkIndex }),
    });
  }
}
