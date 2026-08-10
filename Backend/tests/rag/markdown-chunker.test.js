"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const documents_1 = require("@langchain/core/documents");
const chunking_1 = require("../../src/rag/chunking");
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
function sourceDocument(content) {
    return new documents_1.Document({
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
(0, node_test_1.test)("splits on Markdown headings and preserves hierarchy and source metadata", async () => {
    const chunks = await new chunking_1.MarkdownChunker().splitDocuments([
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
    strict_1.default.deepEqual(chunks.map((chunk) => chunk.metadata.chunkIndex), [0, 1, 2, 3]);
    strict_1.default.equal(chunks[2]?.metadata.heading, "Puppies");
    strict_1.default.deepEqual(chunks[2]?.metadata.headingHierarchy, {
        h1: "Dog Care",
        h2: "Feeding",
        h3: "Puppies",
    });
    strict_1.default.deepEqual(chunks[3]?.metadata.headingHierarchy, {
        h1: "Dog Care",
        h2: "Exercise",
    });
    strict_1.default.deepEqual(chunks[1]?.metadata.tags, ["health"]);
    strict_1.default.deepEqual(chunks[1]?.metadata.custom, { reviewed: true });
    strict_1.default.equal(chunks[1]?.id, "DOG-001#chunk-1");
});
(0, node_test_1.test)("recursively splits oversized sections without breaking or losing the heading", async () => {
    const body = Array.from({ length: 30 }, (_, index) => `Sentence ${index} contains useful veterinary guidance.`).join(" ");
    const chunks = await new chunking_1.MarkdownChunker({
        chunkSize: 40,
        chunkOverlap: 5,
    }).splitDocuments([sourceDocument(`# Nutrition\n\n${body}`)]);
    strict_1.default.ok(chunks.length > 1);
    strict_1.default.ok(chunks.every((chunk) => chunk.pageContent.startsWith("# Nutrition\n\n")));
    strict_1.default.ok(chunks.every((chunk) => !/^Nutrition$/m.test(chunk.pageContent)));
    strict_1.default.ok(chunks.every((chunk) => chunk.metadata.heading === "Nutrition"));
});
(0, node_test_1.test)("does not treat headings inside fenced code blocks as sections", async () => {
    const chunks = await new chunking_1.MarkdownChunker().splitDocuments([
        sourceDocument("# Real heading\n```md\n## Example heading\n```\nAfter fence."),
    ]);
    strict_1.default.equal(chunks.length, 1);
    strict_1.default.equal(chunks[0]?.metadata.heading, "Real heading");
    strict_1.default.match(chunks[0].pageContent, /## Example heading/);
});
(0, node_test_1.test)("warns for empty documents and reports a completion summary", async () => {
    const logger = new MemoryLogger();
    const chunks = await new chunking_1.MarkdownChunker({ logger }).splitDocuments([
        sourceDocument("  \n"),
    ]);
    strict_1.default.equal(chunks.length, 0);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "markdown-chunker.warning"));
    const completed = logger.entries.find((entry) => entry.event === "markdown-chunker.completed");
    strict_1.default.ok(completed?.event === "markdown-chunker.completed");
    strict_1.default.deepEqual({
        documentsProcessed: completed.summary.documentsProcessed,
        chunksCreated: completed.summary.chunksCreated,
        warnings: completed.summary.warnings,
        errors: completed.summary.errors,
    }, { documentsProcessed: 1, chunksCreated: 0, warnings: 1, errors: 0 });
});
(0, node_test_1.test)("validates chunk sizing options", () => {
    strict_1.default.throws(() => new chunking_1.MarkdownChunker({ chunkSize: 0 }), RangeError);
    strict_1.default.throws(() => new chunking_1.MarkdownChunker({ chunkSize: 50, chunkOverlap: 50 }), RangeError);
});
