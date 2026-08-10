"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const documents_1 = require("@langchain/core/documents");
const markdown_1 = require("../../src/rag/chunkers/markdown");
class MemoryLogger {
    entries = [];
    info(payload) {
        this.entries.push({ level: "info", payload });
    }
    warn(payload) {
        this.entries.push({ level: "warn", payload });
    }
    error(payload) {
        this.entries.push({ level: "error", payload });
    }
    asLogger() {
        return this;
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
(0, node_test_1.test)("preserves metadata and heading hierarchy with contiguous chunk indexes", async () => {
    const chunks = await (0, markdown_1.chunkDocuments)([
        new documents_1.Document({
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
    ], { chunkSize: 500, chunkOverlap: 50, logger: new MemoryLogger().asLogger() });
    strict_1.default.deepEqual(chunks.map((chunk) => chunk.metadata.chunkIndex), [0, 1, 2]);
    strict_1.default.deepEqual(chunks.map((chunk) => chunk.metadata.heading), [
        "Cat Care",
        "Behavior",
        "Scratching",
    ]);
    strict_1.default.equal(chunks[1]?.metadata.parentHeading, "Cat Care");
    strict_1.default.equal(chunks[2]?.metadata.parentHeading, "Behavior");
    strict_1.default.deepEqual(chunks[2]?.metadata.headingHierarchy, {
        h1: "Cat Care",
        h2: "Behavior",
        h3: "Scratching",
    });
    strict_1.default.deepEqual(chunks[2]?.metadata.tags, ["cat", "care"]);
    strict_1.default.equal(chunks[2]?.metadata.source, metadata.source);
    strict_1.default.match(chunks[2]?.pageContent ?? "", /^### Scratching/u);
    strict_1.default.ok((chunks[2]?.metadata.estimatedTokenCount ?? 0) > 0);
});
(0, node_test_1.test)("recursively splits an oversized body while keeping its heading intact", async () => {
    const content = Array.from({ length: 20 }, (_, index) => `Sentence ${index} contains useful veterinary guidance.`).join(" ");
    const chunks = await (0, markdown_1.chunkDocuments)([new documents_1.Document({ metadata, pageContent: `# Nutrition\n\n${content}` })], { chunkSize: 35, chunkOverlap: 5, logger: new MemoryLogger().asLogger() });
    strict_1.default.ok(chunks.length > 1);
    strict_1.default.ok(chunks.every((chunk) => chunk.pageContent.startsWith("# Nutrition\n\n")));
    strict_1.default.ok(chunks.every((chunk) => chunk.metadata.heading === "Nutrition"));
    strict_1.default.deepEqual(chunks.map((chunk) => chunk.metadata.chunkIndex), chunks.map((_, index) => index));
});
(0, node_test_1.test)("ignores headings inside fenced code and rejects empty or formatting-only chunks", async () => {
    const chunks = await (0, markdown_1.chunkDocuments)([
        new documents_1.Document({
            metadata,
            pageContent: "# Examples\n\n```md\n## Not a section\nexample text\n```",
        }),
        new documents_1.Document({ metadata, pageContent: "   " }),
        new documents_1.Document({ metadata, pageContent: "# Empty\n\n*** --- ` `" }),
    ], { chunkSize: 500, chunkOverlap: 50, logger: new MemoryLogger().asLogger() });
    strict_1.default.equal(chunks.length, 1);
    strict_1.default.equal(chunks[0]?.metadata.heading, "Examples");
    strict_1.default.match(chunks[0]?.pageContent ?? "", /## Not a section/u);
});
(0, node_test_1.test)("contains splitter failures and continues processing later documents", async () => {
    const logger = new MemoryLogger();
    const failingFactory = {
        create: () => ({ splitText: async () => Promise.reject(new Error("split failed")) }),
    };
    const chunks = await new markdown_1.MarkdownChunker({
        chunkSize: 10,
        chunkOverlap: 2,
        logger: logger.asLogger(),
        splitterFactory: failingFactory,
    }).chunkDocuments([
        new documents_1.Document({ metadata, pageContent: `# Large\n\n${"useful words ".repeat(20)}` }),
        new documents_1.Document({ metadata, pageContent: "# Small\n\nUseful advice." }),
    ]);
    strict_1.default.equal(chunks.length, 1);
    strict_1.default.equal(chunks[0]?.metadata.heading, "Small");
    strict_1.default.ok(logger.entries.some((entry) => entry.payload.event === "markdown-chunker.splitter-failed"));
    const completed = logger.entries.find((entry) => entry.payload.event === "markdown-chunker.completed");
    strict_1.default.equal(completed?.payload.documentsProcessed, 2);
    strict_1.default.equal(completed?.payload.totalChunksCreated, 1);
    strict_1.default.equal(completed?.payload.splitterErrors, 1);
    strict_1.default.equal(typeof completed?.payload.averageChunkSize, "number");
    strict_1.default.equal(typeof completed?.payload.processingTimeMs, "number");
});
(0, node_test_1.test)("rejects invalid chunk configuration before processing", () => {
    strict_1.default.throws(() => new markdown_1.MarkdownChunker({ chunkSize: 50, chunkOverlap: 50 }), /chunkOverlap/u);
});
