import assert from "node:assert/strict";
import { test } from "node:test";

import { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import {
  MarkdownChunker,
  chunkDocuments,
  type TextSplitterFactory,
} from "../../src/rag/chunkers/markdown";

type LogEntry = Readonly<{
  level: "info" | "warn" | "error";
  payload: Record<string, unknown>;
}>;

class MemoryLogger {
  readonly entries: LogEntry[] = [];
  info(payload: Record<string, unknown>): void {
    this.entries.push({ level: "info", payload });
  }
  warn(payload: Record<string, unknown>): void {
    this.entries.push({ level: "warn", payload });
  }
  error(payload: Record<string, unknown>): void {
    this.entries.push({ level: "error", payload });
  }
  asLogger(): Logger {
    return this as unknown as Logger;
  }
}

const metadata = {
  id: "cat-care",
  title: "Cat Care",
  animal: "CAT",
  category: "behavior",
  source: "knowledge/cats/behavior/cat-care.md",
  filePath: "knowledge/cats/behavior/cat-care.md",
  tags: ["cat", "care"],
};

test("preserves metadata and heading hierarchy with contiguous chunk indexes", async () => {
  const chunks = await chunkDocuments(
    [
      new Document({
        id: "cat-care",
        metadata,
        pageContent: [
          "# Cat Care",
          "General care guidance.",
          "## Behavior",
          "Watch changes in behavior.",
          "### Scratching",
          "Provide suitable scratching posts.",
        ].join("\n\n"),
      }),
    ],
    { chunkSize: 500, chunkOverlap: 50, logger: new MemoryLogger().asLogger() },
  );

  assert.deepEqual(chunks.map((chunk) => chunk.metadata.chunkIndex), [0, 1, 2]);
  assert.deepEqual(chunks.map((chunk) => chunk.metadata.heading), [
    "Cat Care",
    "Behavior",
    "Scratching",
  ]);
  assert.equal(chunks[1]?.metadata.parentHeading, "Cat Care");
  assert.equal(chunks[2]?.metadata.parentHeading, "Behavior");
  assert.deepEqual(chunks[2]?.metadata.headingHierarchy, {
    h1: "Cat Care",
    h2: "Behavior",
    h3: "Scratching",
  });
  assert.deepEqual(chunks[2]?.metadata.tags, ["cat", "care"]);
  assert.equal(chunks[2]?.metadata.source, metadata.source);
  assert.match(chunks[2]?.pageContent ?? "", /^### Scratching/u);
  assert.ok((chunks[2]?.metadata.estimatedTokenCount ?? 0) > 0);
});

test("recursively splits an oversized body while keeping its heading intact", async () => {
  const content = Array.from(
    { length: 20 },
    (_, index) => `Sentence ${index} contains useful veterinary guidance.`,
  ).join(" ");
  const chunks = await chunkDocuments(
    [new Document({ metadata, pageContent: `# Nutrition\n\n${content}` })],
    { chunkSize: 35, chunkOverlap: 5, logger: new MemoryLogger().asLogger() },
  );

  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.pageContent.startsWith("# Nutrition\n\n")));
  assert.ok(chunks.every((chunk) => chunk.metadata.heading === "Nutrition"));
  assert.deepEqual(
    chunks.map((chunk) => chunk.metadata.chunkIndex),
    chunks.map((_, index) => index),
  );
});

test("ignores headings inside fenced code and rejects empty or formatting-only chunks", async () => {
  const chunks = await chunkDocuments(
    [
      new Document({
        metadata,
        pageContent: "# Examples\n\n```md\n## Not a section\nexample text\n```",
      }),
      new Document({ metadata, pageContent: "   " }),
      new Document({ metadata, pageContent: "# Empty\n\n*** --- ` `" }),
    ],
    { chunkSize: 500, chunkOverlap: 50, logger: new MemoryLogger().asLogger() },
  );

  assert.equal(chunks.length, 1);
  assert.equal(chunks[0]?.metadata.heading, "Examples");
  assert.match(chunks[0]?.pageContent ?? "", /## Not a section/u);
});

test("contains splitter failures and continues processing later documents", async () => {
  const logger = new MemoryLogger();
  const failingFactory: TextSplitterFactory = {
    create: () => ({ splitText: async () => Promise.reject(new Error("split failed")) }),
  };
  const chunks = await new MarkdownChunker({
    chunkSize: 10,
    chunkOverlap: 2,
    logger: logger.asLogger(),
    splitterFactory: failingFactory,
  }).chunkDocuments([
    new Document({ metadata, pageContent: `# Large\n\n${"useful words ".repeat(20)}` }),
    new Document({ metadata, pageContent: "# Small\n\nUseful advice." }),
  ]);

  assert.equal(chunks.length, 1);
  assert.equal(chunks[0]?.metadata.heading, "Small");
  assert.ok(
    logger.entries.some((entry) => entry.payload.event === "markdown-chunker.splitter-failed"),
  );
  const completed = logger.entries.find(
    (entry) => entry.payload.event === "markdown-chunker.completed",
  );
  assert.equal(completed?.payload.documentsProcessed, 2);
  assert.equal(completed?.payload.totalChunksCreated, 1);
  assert.equal(completed?.payload.splitterErrors, 1);
  assert.equal(typeof completed?.payload.averageChunkSize, "number");
  assert.equal(typeof completed?.payload.processingTimeMs, "number");
});

test("rejects invalid chunk configuration before processing", () => {
  assert.throws(
    () => new MarkdownChunker({ chunkSize: 50, chunkOverlap: 50 }),
    /chunkOverlap/u,
  );
});
