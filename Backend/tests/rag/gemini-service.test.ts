import assert from "node:assert/strict";
import { test } from "node:test";

import {
  GeminiService,
  GeminiServiceError,
} from "../../src/rag/gemini";
import type {
  GeminiLogger,
  GeminiLogEntry,
  GeminiProvider,
} from "../../src/rag/gemini";
import type {
  GeminiProviderChunk,
  GeminiProviderRequest,
  GeminiProviderResponse,
} from "../../src/rag/gemini/gemini.types";

class MemoryLogger implements GeminiLogger {
  readonly entries: GeminiLogEntry[] = [];
  log(entry: GeminiLogEntry): void {
    this.entries.push(entry);
  }
}

class FakeProvider implements GeminiProvider {
  requests: GeminiProviderRequest[] = [];
  generateError?: unknown;
  streamError?: unknown;

  async generate(request: GeminiProviderRequest): Promise<GeminiProviderResponse> {
    this.requests.push(request);
    if (this.generateError) throw this.generateError;
    return {
      text: "Cats may become aggressive due to fear.",
      tokenUsage: { promptTokens: 120, outputTokens: 18, totalTokens: 138 },
      finishReason: "STOP",
    };
  }

  async stream(
    request: GeminiProviderRequest,
  ): Promise<AsyncIterable<GeminiProviderChunk>> {
    this.requests.push(request);
    const error = this.streamError;
    return (async function* () {
      yield { text: "Cats may " };
      if (error) throw error;
      yield {
        text: "be frightened.",
        tokenUsage: { promptTokens: 90, outputTokens: 7, totalTokens: 97 },
        finishReason: "STOP",
      };
    })();
  }
}

test("generates a structured normal response with configured sampling", async () => {
  const provider = new FakeProvider();
  const logger = new MemoryLogger();
  const response = await new GeminiService({
    provider,
    logger,
    model: "gemini-test",
    temperature: 0.4,
    topP: 0.8,
    topK: 25,
    maxOutputTokens: 500,
    timeoutMs: 2_000,
  }).generate("  Completed RAG prompt  ");

  assert.deepEqual(
    {
      answer: response.answer,
      model: response.model,
      tokenUsage: response.tokenUsage,
      finishReason: response.finishReason,
    },
    {
      answer: "Cats may become aggressive due to fear.",
      model: "gemini-test",
      tokenUsage: { promptTokens: 120, outputTokens: 18, totalTokens: 138 },
      finishReason: "STOP",
    },
  );
  assert.ok(response.latencyMs >= 0);
  assert.equal(provider.requests[0]?.prompt, "Completed RAG prompt");
  assert.equal(provider.requests[0]?.temperature, 0.4);
  assert.equal(provider.requests[0]?.topP, 0.8);
  assert.equal(provider.requests[0]?.topK, 25);
  assert.equal(provider.requests[0]?.maxOutputTokens, 500);
  assert.ok(logger.entries.some((entry) => entry.event === "gemini.request-started"));
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "gemini.model-used" && entry.model === "gemini-test",
    ),
  );
  const completed = logger.entries.find(
    (entry) => entry.event === "gemini.request-completed",
  );
  assert.ok(completed?.event === "gemini.request-completed");
  assert.equal(completed.finishReason, "STOP");
  assert.equal(completed.tokenUsage.totalTokens, 138);
});

test("streams text deltas followed by one structured completion", async () => {
  const provider = new FakeProvider();
  const events = [];
  for await (const event of new GeminiService({
    provider,
    logger: new MemoryLogger(),
  }).stream("Prompt")) {
    events.push(event);
  }

  assert.deepEqual(events.slice(0, 2), [
    { type: "text-delta", text: "Cats may " },
    { type: "text-delta", text: "be frightened." },
  ]);
  const complete = events[2];
  assert.ok(complete?.type === "complete");
  assert.equal(complete.response.answer, "Cats may be frightened.");
  assert.equal(complete.response.finishReason, "STOP");
  assert.equal(complete.response.tokenUsage.totalTokens, 97);
});

test("classifies rate limits as retryable typed errors", async () => {
  const provider = new FakeProvider();
  provider.generateError = Object.assign(new Error("quota exceeded"), {
    status: 429,
  });
  const logger = new MemoryLogger();

  await assert.rejects(
    new GeminiService({ provider, logger, maxRetries: 0 }).generate("Prompt"),
    (error: unknown) =>
      error instanceof GeminiServiceError &&
      error.kind === "rate_limit" &&
      error.status === 429 &&
      error.retryable,
  );
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "gemini.request-failed" &&
        entry.error.kind === "rate_limit",
    ),
  );
});

test("classifies network failures without exposing provider errors", async () => {
  const provider = new FakeProvider();
  provider.generateError = Object.assign(new Error("socket reset"), {
    code: "ECONNRESET",
  });
  await assert.rejects(
    new GeminiService({
      provider,
      logger: new MemoryLogger(),
      maxRetries: 0,
    }).generate("Prompt"),
    (error: unknown) =>
      error instanceof GeminiServiceError && error.kind === "network",
  );
});

test("aborts and classifies requests that exceed the timeout", async () => {
  const provider: GeminiProvider = {
    generate: (request) =>
      new Promise((_, reject) => {
        request.signal.addEventListener(
          "abort",
          () => reject(new DOMException("Aborted", "AbortError")),
          { once: true },
        );
      }),
    stream: async () => (async function* () {})(),
  };

  await assert.rejects(
    new GeminiService({
      provider,
      logger: new MemoryLogger(),
      timeoutMs: 10,
    }).generate("Prompt"),
    (error: unknown) =>
      error instanceof GeminiServiceError && error.kind === "timeout",
  );
});

test("normalizes errors raised while consuming a stream", async () => {
  const provider = new FakeProvider();
  provider.streamError = Object.assign(new Error("service unavailable"), {
    status: 503,
  });
  const events = new GeminiService({
    provider,
    logger: new MemoryLogger(),
  }).stream("Prompt");

  await assert.rejects(
    async () => {
      for await (const event of events) void event;
    },
    (error: unknown) =>
      error instanceof GeminiServiceError &&
      error.kind === "api" &&
      error.retryable,
  );
});

test("validates prompts and generation configuration", async () => {
  const provider = new FakeProvider();
  assert.throws(
    () => new GeminiService({ provider, temperature: 2.1 }),
    RangeError,
  );
  assert.throws(() => new GeminiService({ provider, topP: -0.1 }), RangeError);
  assert.throws(() => new GeminiService({ provider, topK: 0 }), RangeError);
  await assert.rejects(
    new GeminiService({ provider }).generate("   "),
    (error: unknown) =>
      error instanceof GeminiServiceError && error.kind === "configuration",
  );
});

test("retries a transient Gemini failure and succeeds within the total timeout", async () => {
  let attempts = 0;
  const provider: GeminiProvider = {
    async generate(): Promise<GeminiProviderResponse> {
      attempts += 1;
      if (attempts === 1) {
        throw Object.assign(new Error("temporarily unavailable"), {
          status: 503,
        });
      }
      return {
        text: "Recovered response",
        tokenUsage: { promptTokens: 5, outputTokens: 2, totalTokens: 7 },
        finishReason: "STOP",
      };
    },
    async stream(): Promise<AsyncIterable<GeminiProviderChunk>> {
      return (async function* () {})();
    },
  };
  const logger = new MemoryLogger();
  const response = await new GeminiService({
    provider,
    logger,
    maxRetries: 1,
    retryBaseDelayMs: 1,
    timeoutMs: 1_000,
  }).generate("Prompt");

  assert.equal(response.answer, "Recovered response");
  assert.equal(attempts, 2);
  assert.ok(
    logger.entries.some((entry) => entry.event === "gemini.request-retry"),
  );
});
