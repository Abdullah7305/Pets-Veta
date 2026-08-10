"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const documents_1 = require("@langchain/core/documents");
const embeddings_1 = require("../../src/rag/embeddings");
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
function documents(count) {
    return Array.from({ length: count }, (_, index) => new documents_1.Document({
        id: `doc-${index}`,
        pageContent: `Content ${index}`,
        metadata: { index, nested: { preserved: true } },
    }));
}
function vector(value) {
    return Array.from({ length: 384 }, () => value);
}
(0, node_test_1.test)("embeds documents in configured batches and preserves metadata", async () => {
    const calls = [];
    const model = {
        async embed(texts) {
            calls.push([...texts]);
            return texts.map((_, index) => vector(index + 0.1));
        },
    };
    const logger = new MemoryLogger();
    let providerCalls = 0;
    const output = await new embeddings_1.EmbeddingService({
        batchSize: 2,
        logger,
        modelProvider: async () => {
            providerCalls += 1;
            return model;
        },
    }).embedDocuments(documents(5));
    strict_1.default.equal(providerCalls, 1);
    strict_1.default.deepEqual(calls.map((call) => call.length), [2, 2, 1]);
    strict_1.default.equal(output.length, 5);
    strict_1.default.equal(output[0]?.embedding.length, 384);
    strict_1.default.equal(output[0]?.embedding[0], 0.1);
    strict_1.default.equal(output[0]?.metadata.index, 0);
    strict_1.default.deepEqual(output[0]?.metadata.nested, { preserved: true });
    strict_1.default.equal(output[0]?.metadata.embeddingModel, "Xenova/bge-small-en-v1.5");
    strict_1.default.equal(output[0]?.metadata.embeddingDimension, 384);
    strict_1.default.match(String(output[0]?.metadata.generatedAt), /^\d{4}-\d{2}-\d{2}T/u);
    strict_1.default.equal(output[0]?.id, "doc-0");
    const completed = logger.entries.find((entry) => entry.event === "embedding.completed");
    strict_1.default.ok(completed?.event === "embedding.completed");
    strict_1.default.deepEqual({
        generated: completed.summary.embeddingsGenerated,
        batches: completed.summary.batchesProcessed,
        failed: completed.summary.failedDocuments,
    }, { generated: 5, batches: 3, failed: 0 });
});
(0, node_test_1.test)("continues after a failed batch and returns successful documents", async () => {
    let call = 0;
    const logger = new MemoryLogger();
    const output = await new embeddings_1.EmbeddingService({
        batchSize: 2,
        logger,
        modelProvider: async () => ({
            async embed(texts) {
                call += 1;
                if (call === 1)
                    throw new Error("inference failed");
                return texts.map(() => vector(0.5));
            },
        }),
    }).embedDocuments(documents(4));
    strict_1.default.deepEqual(output.map((document) => document.id), ["doc-2", "doc-3"]);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "embedding.error" && entry.stage === "batch"));
});
(0, node_test_1.test)("handles model loading failure without rejecting ingestion", async () => {
    const logger = new MemoryLogger();
    const output = await new embeddings_1.EmbeddingService({
        logger,
        modelProvider: async () => {
            throw new Error("model unavailable");
        },
    }).embedDocuments(documents(3));
    strict_1.default.deepEqual(output, []);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "embedding.error" && entry.stage === "model-load"));
    const completed = logger.entries.find((entry) => entry.event === "embedding.completed");
    strict_1.default.ok(completed?.event === "embedding.completed");
    strict_1.default.equal(completed.summary.failedDocuments, 3);
});
(0, node_test_1.test)("does not load the model for an empty input", async () => {
    let providerCalls = 0;
    const output = await new embeddings_1.EmbeddingService({
        logger: new MemoryLogger(),
        modelProvider: async () => {
            providerCalls += 1;
            return { embed: async () => [] };
        },
    }).embedDocuments([]);
    strict_1.default.deepEqual(output, []);
    strict_1.default.equal(providerCalls, 0);
});
(0, node_test_1.test)("rejects invalid batch sizes", () => {
    strict_1.default.throws(() => new embeddings_1.EmbeddingService({ batchSize: 0 }), RangeError);
    strict_1.default.throws(() => new embeddings_1.EmbeddingService({ batchSize: 1.5 }), RangeError);
});
(0, node_test_1.test)("skips empty documents without sending them to the model", async () => {
    const received = [];
    const output = await new embeddings_1.EmbeddingService({
        batchSize: 2,
        logger: new MemoryLogger(),
        modelProvider: async () => ({
            embed: async (texts) => {
                received.push([...texts]);
                return texts.map(() => vector(0.25));
            },
        }),
    }).generateEmbeddings([
        new documents_1.Document({ pageContent: "   ", metadata: { skipped: true } }),
        new documents_1.Document({ pageContent: "  useful content  ", metadata: { kept: true } }),
    ]);
    strict_1.default.deepEqual(received, [["useful content"]]);
    strict_1.default.equal(output.length, 1);
    strict_1.default.equal(output[0]?.metadata.kept, true);
});
(0, node_test_1.test)("rejects an incorrect vector dimension and continues with later batches", async () => {
    let call = 0;
    const output = await new embeddings_1.EmbeddingService({
        batchSize: 1,
        logger: new MemoryLogger(),
        modelProvider: async () => ({
            embed: async () => {
                call += 1;
                return call === 1 ? [[0.1, 0.2]] : [vector(0.75)];
            },
        }),
    }).generateEmbeddings(documents(2));
    strict_1.default.deepEqual(output.map((document) => document.id), ["doc-1"]);
    strict_1.default.equal(output[0]?.embedding.length, 384);
});
