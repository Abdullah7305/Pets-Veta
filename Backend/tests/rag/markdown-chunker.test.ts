import assert from "node:assert/strict";
import { test } from "node:test";

import { Document } from "@langchain/core/documents";

import { MarkdownChunker } from "../../src/rag/chunking";
import type { ChunkLogger, ChunkLogEntry } from "../../src/rag/chunking";

class MemoryLogger implements ChunkLogger {
  readonly entries: ChunkLogEntry[] = [];
  log(entry: ChunkLogEntry): void {
    this.entries.push(entry);
  }
}

function sourceDocument(content: string): Document {
  return new Document({
    id: "DOG-001",
    pageContent: content,
    metadata: {
      title: "Dog Care",
      animal: "dog",
      category: "care",
      source: "knowledge/dogs/care.md",
      filePath: "knowledge/dogs/care.md",
      tags: ["health"],
      custom: { reviewed: true },
    },
  });
}

test("splits on Markdown headings and preserves hierarchy and source metadata", async () => {
  const chunks = await new MarkdownChunker().splitDocuments([
    sourceDocument([
      "# Dog Care",
      "Introduction.",
      "## Feeding",
      "Choose balanced food.",
      "### Puppies",
      "Feed smaller portions.",
      "## Exercise",
      "Walk daily.",
    ].join("\n")),
  ]);

  assert.deepEqual(chunks.map((chunk) => chunk.metadata.chunkIndex), [0, 1, 2, 3]);
  assert.equal(chunks[2]?.metadata.heading, "Puppies");
  assert.deepEqual(chunks[2]?.metadata.headingHierarchy, {
    h1: "Dog Care",
    h2: "Feeding",
    h3: "Puppies",
  });
  assert.deepEqual(chunks[3]?.metadata.headingHierarchy, {
    h1: "Dog Care",
    h2: "Exercise",
  });
  assert.deepEqual(chunks[1]?.metadata.tags, ["health"]);
  assert.deepEqual(chunks[1]?.metadata.custom, { reviewed: true });
  assert.equal(chunks[1]?.id, "DOG-001#chunk-1");
});

test("recursively splits oversized sections without breaking or losing the heading", async () => {
  const body = Array.from(
    { length: 30 },
    (_, index) => `Sentence ${index} contains useful veterinary guidance.`,
  ).join(" ");
  const chunks = await new MarkdownChunker({
    chunkSize: 40,
    chunkOverlap: 5,
  }).splitDocuments([sourceDocument(`# Nutrition\n\n${body}`)]);

  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.pageContent.startsWith("# Nutrition\n\n")));
  assert.ok(chunks.every((chunk) => !/^Nutrition$/m.test(chunk.pageContent)));
  assert.ok(chunks.every((chunk) => chunk.metadata.heading === "Nutrition"));
});

test("does not treat headings inside fenced code blocks as sections", async () => {
  const chunks = await new MarkdownChunker().splitDocuments([
    sourceDocument("# Real heading\n```md\n## Example heading\n```\nAfter fence."),
  ]);

  assert.equal(chunks.length, 1);
  assert.equal(chunks[0]?.metadata.heading, "Real heading");
  assert.match(chunks[0]!.pageContent, /## Example heading/);
});

test("warns for empty documents and reports a completion summary", async () => {
  const logger = new MemoryLogger();
  const chunks = await new MarkdownChunker({ logger }).splitDocuments([
    sourceDocument("  \n"),
  ]);

  assert.equal(chunks.length, 0);
  assert.ok(logger.entries.some((entry) => entry.event === "markdown-chunker.warning"));
  const completed = logger.entries.find(
    (entry) => entry.event === "markdown-chunker.completed",
  );
  assert.ok(completed?.event === "markdown-chunker.completed");
  assert.deepEqual(
    {
      documentsProcessed: completed.summary.documentsProcessed,
      chunksCreated: completed.summary.chunksCreated,
      warnings: completed.summary.warnings,
      errors: completed.summary.errors,
    },
    { documentsProcessed: 1, chunksCreated: 0, warnings: 1, errors: 0 },
  );
});

test("validates chunk sizing options", () => {
  assert.throws(() => new MarkdownChunker({ chunkSize: 0 }), RangeError);
  assert.throws(
    () => new MarkdownChunker({ chunkSize: 50, chunkOverlap: 50 }),
    RangeError,
  );
});
