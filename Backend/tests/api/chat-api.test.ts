import assert from "node:assert/strict";
import type { Server } from "node:http";
import { afterEach, test } from "node:test";

import express from "express";

import type { ChatResponseDto } from "../../src/api/dto/chat.dto";
import { createChatRouter } from "../../src/api/routes/chat.routes";
import {
  ChatApiError,
  type AiChatOrchestrator,
} from "../../src/api/types/chat.types";

const servers: Server[] = [];

async function startApi(service: AiChatOrchestrator): Promise<string> {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/ai", createChatRouter(service));
  const server = await new Promise<Server>((resolve) => {
    const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
  });
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No server address");
  return `http://127.0.0.1:${address.port}`;
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        ),
    ),
  );
});

const successfulResponse: ChatResponseDto = {
  answer: "Structured answer [Source 1].",
  sources: [
    {
      sourceId: "Source 1",
      source: "knowledge/cats/behavior/cat-aggression.md",
      similarity: 0.9,
      metadata: { animal: "cat" },
      truncated: false,
    },
  ],
  conversationId: "e1cf0955-0496-4380-b906-60b868d09816",
  usage: {
    model: "gemini-test",
    promptTokenEstimate: 100,
    promptTokens: 90,
    outputTokens: 10,
    totalTokens: 100,
    modelLatencyMs: 30,
    totalLatencyMs: 45,
    finishReason: "STOP",
    retrievedChunks: 1,
  },
};

test("POST /api/v1/ai/chat returns the standardized response", async () => {
  let received: unknown;
  const baseUrl = await startApi({
    async chat(request) {
      received = request;
      return successfulResponse;
    },
  });
  const response = await fetch(`${baseUrl}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      question: " Why is my cat aggressive? ",
      conversationId: successfulResponse.conversationId,
      filters: { animal: "cat", category: "behavior" },
    }),
  });
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.deepEqual(body.data, successfulResponse);
  assert.deepEqual(received, {
    question: "Why is my cat aggressive?",
    conversationId: successfulResponse.conversationId,
    filters: { animal: "cat", category: "behavior" },
  });
});

test("returns centralized validation errors without calling the service", async () => {
  let calls = 0;
  const baseUrl = await startApi({
    async chat() {
      calls += 1;
      return successfulResponse;
    },
  });
  const response = await fetch(`${baseUrl}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question: "", topK: 0, unexpected: true }),
  });
  const body = (await response.json()) as {
    success: boolean;
    error: { code: string; details: unknown[] };
  };

  assert.equal(response.status, 400);
  assert.equal(body.success, false);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.details.length > 0);
  assert.equal(calls, 0);
});

test("maps orchestration errors through centralized error handling", async () => {
  const baseUrl = await startApi({
    async chat() {
      throw new ChatApiError(
        "The AI service is busy. Please try again shortly.",
        429,
        "RATE_LIMITED",
      );
    },
  });
  const response = await fetch(`${baseUrl}/api/v1/ai/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question: "Why is my cat aggressive?" }),
  });
  const body = (await response.json()) as {
    success: boolean;
    error: { code: string };
  };

  assert.equal(response.status, 429);
  assert.equal(body.success, false);
  assert.equal(body.error.code, "RATE_LIMITED");
});
