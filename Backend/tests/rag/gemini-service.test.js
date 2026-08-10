"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const gemini_1 = require("../../src/rag/gemini");
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
class FakeProvider {
    requests = [];
    generateError;
    streamError;
    async generate(request) {
        this.requests.push(request);
        if (this.generateError)
            throw this.generateError;
        return {
            text: "Cats may become aggressive due to fear.",
            tokenUsage: { promptTokens: 120, outputTokens: 18, totalTokens: 138 },
            finishReason: "STOP",
        };
    }
    async stream(request) {
        this.requests.push(request);
        const error = this.streamError;
        return (async function* () {
            yield { text: "Cats may " };
            if (error)
                throw error;
            yield {
                text: "be frightened.",
                tokenUsage: { promptTokens: 90, outputTokens: 7, totalTokens: 97 },
                finishReason: "STOP",
            };
        })();
    }
}
(0, node_test_1.test)("generates a structured normal response with configured sampling", async () => {
    const provider = new FakeProvider();
    const logger = new MemoryLogger();
    const response = await new gemini_1.GeminiService({
        provider,
        logger,
        model: "gemini-test",
        temperature: 0.4,
        topP: 0.8,
        topK: 25,
        maxOutputTokens: 500,
        timeoutMs: 2_000,
    }).generate("  Completed RAG prompt  ");
    strict_1.default.deepEqual({
        answer: response.answer,
        model: response.model,
        tokenUsage: response.tokenUsage,
        finishReason: response.finishReason,
    }, {
        answer: "Cats may become aggressive due to fear.",
        model: "gemini-test",
        tokenUsage: { promptTokens: 120, outputTokens: 18, totalTokens: 138 },
        finishReason: "STOP",
    });
    strict_1.default.ok(response.latencyMs >= 0);
    strict_1.default.equal(provider.requests[0]?.prompt, "Completed RAG prompt");
    strict_1.default.equal(provider.requests[0]?.temperature, 0.4);
    strict_1.default.equal(provider.requests[0]?.topP, 0.8);
    strict_1.default.equal(provider.requests[0]?.topK, 25);
    strict_1.default.equal(provider.requests[0]?.maxOutputTokens, 500);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "gemini.request-started"));
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "gemini.model-used" && entry.model === "gemini-test"));
    const completed = logger.entries.find((entry) => entry.event === "gemini.request-completed");
    strict_1.default.ok(completed?.event === "gemini.request-completed");
    strict_1.default.equal(completed.finishReason, "STOP");
    strict_1.default.equal(completed.tokenUsage.totalTokens, 138);
});
(0, node_test_1.test)("streams text deltas followed by one structured completion", async () => {
    const provider = new FakeProvider();
    const events = [];
    for await (const event of new gemini_1.GeminiService({
        provider,
        logger: new MemoryLogger(),
    }).stream("Prompt")) {
        events.push(event);
    }
    strict_1.default.deepEqual(events.slice(0, 2), [
        { type: "text-delta", text: "Cats may " },
        { type: "text-delta", text: "be frightened." },
    ]);
    const complete = events[2];
    strict_1.default.ok(complete?.type === "complete");
    strict_1.default.equal(complete.response.answer, "Cats may be frightened.");
    strict_1.default.equal(complete.response.finishReason, "STOP");
    strict_1.default.equal(complete.response.tokenUsage.totalTokens, 97);
});
(0, node_test_1.test)("classifies rate limits as retryable typed errors", async () => {
    const provider = new FakeProvider();
    provider.generateError = Object.assign(new Error("quota exceeded"), {
        status: 429,
    });
    const logger = new MemoryLogger();
    await strict_1.default.rejects(new gemini_1.GeminiService({ provider, logger, maxRetries: 0 }).generate("Prompt"), (error) => error instanceof gemini_1.GeminiServiceError &&
        error.kind === "rate_limit" &&
        error.status === 429 &&
        error.retryable);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "gemini.request-failed" &&
        entry.error.kind === "rate_limit"));
});
(0, node_test_1.test)("classifies network failures without exposing provider errors", async () => {
    const provider = new FakeProvider();
    provider.generateError = Object.assign(new Error("socket reset"), {
        code: "ECONNRESET",
    });
    await strict_1.default.rejects(new gemini_1.GeminiService({
        provider,
        logger: new MemoryLogger(),
        maxRetries: 0,
    }).generate("Prompt"), (error) => error instanceof gemini_1.GeminiServiceError && error.kind === "network");
});
(0, node_test_1.test)("aborts and classifies requests that exceed the timeout", async () => {
    const provider = {
        generate: (request) => new Promise((_, reject) => {
            request.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
        }),
        stream: async () => (async function* () { })(),
    };
    await strict_1.default.rejects(new gemini_1.GeminiService({
        provider,
        logger: new MemoryLogger(),
        timeoutMs: 10,
    }).generate("Prompt"), (error) => error instanceof gemini_1.GeminiServiceError && error.kind === "timeout");
});
(0, node_test_1.test)("normalizes errors raised while consuming a stream", async () => {
    const provider = new FakeProvider();
    provider.streamError = Object.assign(new Error("service unavailable"), {
        status: 503,
    });
    const events = new gemini_1.GeminiService({
        provider,
        logger: new MemoryLogger(),
    }).stream("Prompt");
    await strict_1.default.rejects(async () => {
        for await (const event of events)
            void event;
    }, (error) => error instanceof gemini_1.GeminiServiceError &&
        error.kind === "api" &&
        error.retryable);
});
(0, node_test_1.test)("validates prompts and generation configuration", async () => {
    const provider = new FakeProvider();
    strict_1.default.throws(() => new gemini_1.GeminiService({ provider, temperature: 2.1 }), RangeError);
    strict_1.default.throws(() => new gemini_1.GeminiService({ provider, topP: -0.1 }), RangeError);
    strict_1.default.throws(() => new gemini_1.GeminiService({ provider, topK: 0 }), RangeError);
    await strict_1.default.rejects(new gemini_1.GeminiService({ provider }).generate("   "), (error) => error instanceof gemini_1.GeminiServiceError && error.kind === "configuration");
});
(0, node_test_1.test)("retries a transient Gemini failure and succeeds within the total timeout", async () => {
    let attempts = 0;
    const provider = {
        async generate() {
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
        async stream() {
            return (async function* () { })();
        },
    };
    const logger = new MemoryLogger();
    const response = await new gemini_1.GeminiService({
        provider,
        logger,
        maxRetries: 1,
        retryBaseDelayMs: 1,
        timeoutMs: 1_000,
    }).generate("Prompt");
    strict_1.default.equal(response.answer, "Recovered response");
    strict_1.default.equal(attempts, 2);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "gemini.request-retry"));
});
