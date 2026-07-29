import assert from "node:assert/strict";
import { test } from "node:test";

import type {
  GeminiResponse,
  GeminiStreamEvent,
  GenerativeAIService,
  PromptBuildResult,
  PromptBuilder,
  RetrievalResult,
  RetrieveOptions,
  Retriever,
} from "../../src/rag";
import { AiService } from "../../src/api/services/ai.service";
import type {
  AiServiceLogger,
  AiServiceLogEntry,
} from "../../src/api/types/chat.types";

class FakeRetriever implements Retriever {
  calls: Array<{ query: string; options?: RetrieveOptions }> = [];
  async retrieve(query: string, options?: RetrieveOptions): Promise<RetrievalResult[]> {
    this.calls.push({ query, options });
    return [
      {
        content: "Cats can show defensive aggression when frightened.",
        metadata: {
          source: "knowledge/cats/behavior/cat-aggression.md",
          chunkIndex: 1,
        },
        similarity: 0.89,
      },
    ];
  }
}

class FakePromptBuilder implements PromptBuilder {
  calls: Array<{ question: string; chunks: readonly RetrievalResult[] }> = [];
  buildPrompt(
    question: string,
    chunks: readonly RetrievalResult[],
  ): PromptBuildResult {
    this.calls.push({ question, chunks });
    return {
      prompt: "Completed prompt",
      includedSources: [
        {
          sourceId: "Source 1",
          source: "knowledge/cats/behavior/cat-aggression.md",
          chunkIndex: 1,
          similarity: 0.89,
          metadata: chunks[0]!.metadata,
          truncated: false,
        },
      ],
      tokenEstimate: 240,
    };
  }
}

class FakeGenerator implements GenerativeAIService {
  prompts: string[] = [];
  async generate(prompt: string): Promise<GeminiResponse> {
    this.prompts.push(prompt);
    return {
      answer: "Fear can contribute to defensive aggression [Source 1].",
      model: "gemini-test",
      tokenUsage: { promptTokens: 210, outputTokens: 15, totalTokens: 225 },
      latencyMs: 40,
      finishReason: "STOP",
    };
  }
  async *stream(_prompt: string): AsyncGenerator<GeminiStreamEvent> {}
}

class MemoryLogger implements AiServiceLogger {
  readonly entries: AiServiceLogEntry[] = [];
  log(entry: AiServiceLogEntry): void {
    this.entries.push(entry);
  }
}

test("orchestrates retrieval, prompt construction, and generation", async () => {
  const retriever = new FakeRetriever();
  const promptBuilder = new FakePromptBuilder();
  const generator = new FakeGenerator();
  const logger = new MemoryLogger();
  const conversationId = "f675297f-ec90-4bc6-9793-9aa98e52707c";
  const response = await new AiService({
    retriever,
    promptBuilder,
    generator,
    logger,
  }).chat({
    question: "Why is my cat aggressive?",
    conversationId,
    topK: 7,
    minimumSimilarity: 0.65,
    filters: { animal: "cat", category: "behavior" },
  });

  assert.equal(retriever.calls[0]?.query, "Why is my cat aggressive?");
  assert.deepEqual(retriever.calls[0]?.options, {
    topK: 7,
    minimumSimilarity: 0.65,
    filters: { animal: "cat", category: "behavior" },
  });
  assert.equal(promptBuilder.calls[0]?.chunks.length, 1);
  assert.deepEqual(generator.prompts, ["Completed prompt"]);
  assert.equal(response.answer, "Fear can contribute to defensive aggression [Source 1].");
  assert.equal(response.conversationId, conversationId);
  assert.equal(response.sources.length, 1);
  assert.deepEqual(
    {
      model: response.usage.model,
      promptEstimate: response.usage.promptTokenEstimate,
      promptTokens: response.usage.promptTokens,
      outputTokens: response.usage.outputTokens,
      totalTokens: response.usage.totalTokens,
      finishReason: response.usage.finishReason,
      retrievedChunks: response.usage.retrievedChunks,
    },
    {
      model: "gemini-test",
      promptEstimate: 240,
      promptTokens: 210,
      outputTokens: 15,
      totalTokens: 225,
      finishReason: "STOP",
      retrievedChunks: 1,
    },
  );
  assert.ok(logger.entries.some((entry) => entry.event === "ai-chat.started"));
  assert.ok(logger.entries.some((entry) => entry.event === "ai-chat.completed"));
});

test("returns an exact repeated question from response cache without rerunning RAG", async () => {
  const retriever = new FakeRetriever();
  const promptBuilder = new FakePromptBuilder();
  const generator = new FakeGenerator();
  const logger = new MemoryLogger();
  const service = new AiService({
    retriever,
    promptBuilder,
    generator,
    logger,
  });

  await service.chat({
    question: "Why is my cat aggressive?",
    conversationId: "first-conversation",
  });
  const cached = await service.chat({
    question: "Why is my cat aggressive?",
    conversationId: "second-conversation",
  });

  assert.equal(retriever.calls.length, 1);
  assert.equal(promptBuilder.calls.length, 1);
  assert.equal(generator.prompts.length, 1);
  assert.equal(cached.conversationId, "second-conversation");
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "ai-chat.response-cache" && entry.outcome === "hit",
    ),
  );
});
