import assert from "node:assert/strict";
import { test } from "node:test";

import { Document } from "@langchain/core/documents";

import { EmbeddingService } from "../../src/rag/embeddings";
import type {
  EmbeddingLogger,
  EmbeddingLogEntry,
  EmbeddingModel,
} from "../../src/rag/embeddings";

class MemoryLogger implements EmbeddingLogger {
  readonly entries: EmbeddingLogEntry[] = [];
  log(entry: EmbeddingLogEntry): void {
    this.entries.push(entry);
  }
}

function documents(count: number): Document[] {
  return Array.from({ length: count }, (_, index) =>
    new Document({
      id: `doc-${index}`,
      pageContent: `Content ${index}`,
      metadata: { index, nested: { preserved: true } },
    }),
  );
}

function vector(value: number): number[] {
  return Array.from({ length: 384 }, () => value);
}

test("embeds documents in configured batches and preserves metadata", async () => {
  const calls: string[][] = [];
  const model: EmbeddingModel = {
    async embed(texts) {
      calls.push([...texts]);
      return texts.map((_, index) => vector(index + 0.1));
    },
  };
  const logger = new MemoryLogger();
  let providerCalls = 0;
  const output = await new EmbeddingService({
    batchSize: 2,
    logger,
    modelProvider: async () => {
      providerCalls += 1;
      return model;
    },
  }).embedDocuments(documents(5));

  assert.equal(providerCalls, 1);
  assert.deepEqual(calls.map((call) => call.length), [2, 2, 1]);
  assert.equal(output.length, 5);
  assert.equal(output[0]?.embedding.length, 384);
  assert.equal(output[0]?.embedding[0], 0.1);
  assert.equal(output[0]?.metadata.index, 0);
  assert.deepEqual(output[0]?.metadata.nested, { preserved: true });
  assert.equal(output[0]?.metadata.embeddingModel, "Xenova/bge-small-en-v1.5");
  assert.equal(output[0]?.metadata.embeddingDimension, 384);
  assert.match(String(output[0]?.metadata.generatedAt), /^\d{4}-\d{2}-\d{2}T/u);
  assert.equal(output[0]?.id, "doc-0");
  const completed = logger.entries.find((entry) => entry.event === "embedding.completed");
  assert.ok(completed?.event === "embedding.completed");
  assert.deepEqual(
    {
      generated: completed.summary.embeddingsGenerated,
      batches: completed.summary.batchesProcessed,
      failed: completed.summary.failedDocuments,
    },
    { generated: 5, batches: 3, failed: 0 },
  );
});

test("continues after a failed batch and returns successful documents", async () => {
  let call = 0;
  const logger = new MemoryLogger();
  const output = await new EmbeddingService({
    batchSize: 2,
    logger,
    modelProvider: async () => ({
      async embed(texts) {
        call += 1;
        if (call === 1) throw new Error("inference failed");
        return texts.map(() => vector(0.5));
      },
    }),
  }).embedDocuments(documents(4));

  assert.deepEqual(output.map((document) => document.id), ["doc-2", "doc-3"]);
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "embedding.error" && entry.stage === "batch",
    ),
  );
});

test("handles model loading failure without rejecting ingestion", async () => {
  const logger = new MemoryLogger();
  const output = await new EmbeddingService({
    logger,
    modelProvider: async () => {
      throw new Error("model unavailable");
    },
  }).embedDocuments(documents(3));

  assert.deepEqual(output, []);
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "embedding.error" && entry.stage === "model-load",
    ),
  );
  const completed = logger.entries.find((entry) => entry.event === "embedding.completed");
  assert.ok(completed?.event === "embedding.completed");
  assert.equal(completed.summary.failedDocuments, 3);
});

test("does not load the model for an empty input", async () => {
  let providerCalls = 0;
  const output = await new EmbeddingService({
    logger: new MemoryLogger(),
    modelProvider: async () => {
      providerCalls += 1;
      return { embed: async () => [] };
    },
  }).embedDocuments([]);

  assert.deepEqual(output, []);
  assert.equal(providerCalls, 0);
});

test("rejects invalid batch sizes", () => {
  assert.throws(() => new EmbeddingService({ batchSize: 0 }), RangeError);
  assert.throws(() => new EmbeddingService({ batchSize: 1.5 }), RangeError);
});

test("skips empty documents without sending them to the model", async () => {
  const received: string[][] = [];
  const output = await new EmbeddingService({
    batchSize: 2,
    logger: new MemoryLogger(),
    modelProvider: async () => ({
      embed: async (texts) => {
        received.push([...texts]);
        return texts.map(() => vector(0.25));
      },
    }),
  }).generateEmbeddings([
    new Document({ pageContent: "   ", metadata: { skipped: true } }),
    new Document({ pageContent: "  useful content  ", metadata: { kept: true } }),
  ]);

  assert.deepEqual(received, [["useful content"]]);
  assert.equal(output.length, 1);
  assert.equal(output[0]?.metadata.kept, true);
});

test("rejects an incorrect vector dimension and continues with later batches", async () => {
  let call = 0;
  const output = await new EmbeddingService({
    batchSize: 1,
    logger: new MemoryLogger(),
    modelProvider: async () => ({
      embed: async () => {
        call += 1;
        return call === 1 ? [[0.1, 0.2]] : [vector(0.75)];
      },
    }),
  }).generateEmbeddings(documents(2));

  assert.deepEqual(output.map((document) => document.id), ["doc-1"]);
  assert.equal(output[0]?.embedding.length, 384);
});
