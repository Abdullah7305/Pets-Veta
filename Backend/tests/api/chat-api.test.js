"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const express_1 = __importDefault(require("express"));
const chat_routes_1 = require("../../src/api/routes/chat.routes");
const chat_types_1 = require("../../src/api/types/chat.types");
const servers = [];
async function startApi(service) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api/v1/ai", (0, chat_routes_1.createChatRouter)(service));
    const server = await new Promise((resolve) => {
        const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
    });
    servers.push(server);
    const address = server.address();
    if (!address || typeof address === "string")
        throw new Error("No server address");
    return `http://127.0.0.1:${address.port}`;
}
(0, node_test_1.afterEach)(async () => {
    await Promise.all(servers.splice(0).map((server) => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))));
});
const successfulResponse = {
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
(0, node_test_1.test)("POST /api/v1/ai/chat returns the standardized response", async () => {
    let received;
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
    const body = (await response.json());
    strict_1.default.equal(response.status, 200);
    strict_1.default.equal(body.success, true);
    strict_1.default.deepEqual(body.data, successfulResponse);
    strict_1.default.deepEqual(received, {
        question: "Why is my cat aggressive?",
        conversationId: successfulResponse.conversationId,
        filters: { animal: "cat", category: "behavior" },
    });
});
(0, node_test_1.test)("returns centralized validation errors without calling the service", async () => {
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
    const body = (await response.json());
    strict_1.default.equal(response.status, 400);
    strict_1.default.equal(body.success, false);
    strict_1.default.equal(body.error.code, "VALIDATION_ERROR");
    strict_1.default.ok(body.error.details.length > 0);
    strict_1.default.equal(calls, 0);
});
(0, node_test_1.test)("maps orchestration errors through centralized error handling", async () => {
    const baseUrl = await startApi({
        async chat() {
            throw new chat_types_1.ChatApiError("The AI service is busy. Please try again shortly.", 429, "RATE_LIMITED");
        },
    });
    const response = await fetch(`${baseUrl}/api/v1/ai/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: "Why is my cat aggressive?" }),
    });
    const body = (await response.json());
    strict_1.default.equal(response.status, 429);
    strict_1.default.equal(body.success, false);
    strict_1.default.equal(body.error.code, "RATE_LIMITED");
});
