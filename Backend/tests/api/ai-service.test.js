"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const ai_service_1 = require("../../src/api/services/ai.service");
class FakeRetriever {
    calls = [];
    async retrieve(query, options) {
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
class FakePromptBuilder {
    calls = [];
    buildPrompt(question, chunks) {
        this.calls.push({ question, chunks });
        return {
            prompt: "Completed prompt",
            includedSources: [
                {
                    sourceId: "Source 1",
                    source: "knowledge/cats/behavior/cat-aggression.md",
                    chunkIndex: 1,
                    similarity: 0.89,
                    metadata: chunks[0].metadata,
                    truncated: false,
                },
            ],
            tokenEstimate: 240,
        };
    }
}
class FakeGenerator {
    prompts = [];
    async generate(prompt) {
        this.prompts.push(prompt);
        return {
            answer: "Fear can contribute to defensive aggression [Source 1].",
            model: "gemini-test",
            tokenUsage: { promptTokens: 210, outputTokens: 15, totalTokens: 225 },
            latencyMs: 40,
            finishReason: "STOP",
        };
    }
    async *stream(_prompt) { }
}
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
(0, node_test_1.test)("orchestrates retrieval, prompt construction, and generation", async () => {
    const retriever = new FakeRetriever();
    const promptBuilder = new FakePromptBuilder();
    const generator = new FakeGenerator();
    const logger = new MemoryLogger();
    const conversationId = "f675297f-ec90-4bc6-9793-9aa98e52707c";
    const response = await new ai_service_1.AiService({
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
    strict_1.default.equal(retriever.calls[0]?.query, "Why is my cat aggressive?");
    strict_1.default.deepEqual(retriever.calls[0]?.options, {
        topK: 7,
        minimumSimilarity: 0.65,
        filters: { animal: "cat", category: "behavior" },
    });
    strict_1.default.equal(promptBuilder.calls[0]?.chunks.length, 1);
    strict_1.default.deepEqual(generator.prompts, ["Completed prompt"]);
    strict_1.default.equal(response.answer, "Fear can contribute to defensive aggression [Source 1].");
    strict_1.default.equal(response.conversationId, conversationId);
    strict_1.default.equal(response.sources.length, 1);
    strict_1.default.deepEqual({
        model: response.usage.model,
        promptEstimate: response.usage.promptTokenEstimate,
        promptTokens: response.usage.promptTokens,
        outputTokens: response.usage.outputTokens,
        totalTokens: response.usage.totalTokens,
        finishReason: response.usage.finishReason,
        retrievedChunks: response.usage.retrievedChunks,
    }, {
        model: "gemini-test",
        promptEstimate: 240,
        promptTokens: 210,
        outputTokens: 15,
        totalTokens: 225,
        finishReason: "STOP",
        retrievedChunks: 1,
    });
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "ai-chat.started"));
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "ai-chat.completed"));
});
(0, node_test_1.test)("returns an exact repeated question from response cache without rerunning RAG", async () => {
    const retriever = new FakeRetriever();
    const promptBuilder = new FakePromptBuilder();
    const generator = new FakeGenerator();
    const logger = new MemoryLogger();
    const service = new ai_service_1.AiService({
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
    strict_1.default.equal(retriever.calls.length, 1);
    strict_1.default.equal(promptBuilder.calls.length, 1);
    strict_1.default.equal(generator.prompts.length, 1);
    strict_1.default.equal(cached.conversationId, "second-conversation");
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "ai-chat.response-cache" && entry.outcome === "hit"));
});
