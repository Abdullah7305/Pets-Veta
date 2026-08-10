"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const promises_1 = require("node:fs/promises");
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const node_test_1 = require("node:test");
const markdown_loader_1 = require("../../src/rag/loaders/markdown-loader");
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
const temporaryDirectories = [];
async function createTemporaryKnowledgeDirectory() {
    const directory = await (0, promises_1.mkdtemp)(node_path_1.default.join(node_os_1.default.tmpdir(), "pets-veta-markdown-loader-"));
    temporaryDirectories.push(directory);
    return directory;
}
async function writeFixture(root, relativePath, content) {
    const filePath = node_path_1.default.join(root, relativePath);
    await (0, promises_1.mkdir)(node_path_1.default.dirname(filePath), { recursive: true });
    await (0, promises_1.writeFile)(filePath, content, "utf8");
}
(0, node_test_1.afterEach)(async () => {
    await Promise.all(temporaryDirectories.splice(0).map((directory) => (0, promises_1.rm)(directory, { recursive: true, force: true })));
});
(0, node_test_1.test)("recursively loads valid Markdown files into LangChain Documents", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    const logger = new MemoryLogger();
    await writeFixture(root, "dogs/care/puppy-care.md", [
        "---",
        "id: DOG-001",
        "title: Puppy Care",
        "animal: dog",
        "category: care",
        "tags:",
        "  - puppy",
        "review:",
        "  approved: true",
        "---",
        "# Puppy Care",
        "",
        "Body content.",
    ].join("\n"));
    await writeFixture(root, "dogs/care/ignored.txt", "not markdown");
    await writeFixture(root, "dogs/care/ignored.MD", "not lowercase .md");
    const documents = await new markdown_loader_1.MarkdownLoader({
        knowledgeDirectory: root,
        logger,
    }).loadDocuments();
    strict_1.default.equal(documents.length, 1);
    strict_1.default.equal(documents[0]?.id, "DOG-001");
    strict_1.default.equal(documents[0]?.pageContent, "# Puppy Care\n\nBody content.");
    strict_1.default.deepEqual(documents[0]?.metadata.tags, ["puppy"]);
    strict_1.default.deepEqual(documents[0]?.metadata.review, { approved: true });
    strict_1.default.equal(documents[0]?.metadata.filePath, "knowledge/dogs/care/puppy-care.md");
    strict_1.default.equal(documents[0]?.metadata.source, "knowledge/dogs/care/puppy-care.md");
    const completed = logger.entries.find((entry) => entry.event === "markdown-loader.completed");
    strict_1.default.ok(completed?.event === "markdown-loader.completed");
    strict_1.default.deepEqual({
        discovered: completed.summary.discovered,
        loaded: completed.summary.loaded,
        skipped: completed.summary.skipped,
        errors: completed.summary.errors,
    }, { discovered: 1, loaded: 1, skipped: 0, errors: 0 });
});
(0, node_test_1.test)("skips invalid metadata and continues after malformed YAML", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    const logger = new MemoryLogger();
    await writeFixture(root, "a-invalid.md", ["---", "id: INVALID-001", "animal: dog", "category: care", "---"].join("\n"));
    await writeFixture(root, "b-malformed.md", [
        "---",
        "id: BROKEN-001",
        "title: [unterminated",
        "animal: dog",
        "category: care",
        "---",
    ].join("\n"));
    await writeFixture(root, "c-valid.md", [
        "---",
        "id: VALID-001",
        "title: Valid Document",
        "animal: general",
        "category: faq",
        "---",
        "",
    ].join("\n"));
    const documents = await new markdown_loader_1.MarkdownLoader({
        knowledgeDirectory: root,
        logger,
    }).loadDocuments();
    strict_1.default.deepEqual(documents.map((document) => document.id), ["VALID-001"]);
    const completed = logger.entries.find((entry) => entry.event === "markdown-loader.completed");
    strict_1.default.ok(completed?.event === "markdown-loader.completed");
    strict_1.default.equal(completed.summary.loaded, 1);
    strict_1.default.equal(completed.summary.skipped, 1);
    strict_1.default.equal(completed.summary.errors, 1);
});
(0, node_test_1.test)("rejects a missing knowledge root with a structured initialization error", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    await (0, promises_1.rm)(root, { recursive: true, force: true });
    temporaryDirectories.splice(temporaryDirectories.indexOf(root), 1);
    const logger = new MemoryLogger();
    await strict_1.default.rejects(new markdown_loader_1.MarkdownLoader({ knowledgeDirectory: root, logger }).loadDocuments());
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "markdown-loader.error" &&
        entry.stage === "initialize"));
});
(0, node_test_1.test)("never evaluates JavaScript front matter", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    const logger = new MemoryLogger();
    const marker = "__petsVetaMarkdownLoaderExecuted";
    const globalRecord = globalThis;
    delete globalRecord[marker];
    await writeFixture(root, "unsafe.md", [
        "---javascript",
        `(() => { globalThis.${marker} = true; return ({ id: \"BAD-001\", title: \"Unsafe\", animal: \"dog\", category: \"care\" }); })()`,
        "---",
        "unsafe",
    ].join("\n"));
    const documents = await new markdown_loader_1.MarkdownLoader({
        knowledgeDirectory: root,
        logger,
    }).loadDocuments();
    strict_1.default.equal(documents.length, 0);
    strict_1.default.equal(globalRecord[marker], undefined);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "markdown-loader.file-skipped" &&
        entry.reason === "invalid-metadata"));
});
(0, node_test_1.test)("rejects delimiter-prefix lines instead of accepting partial front matter", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    const logger = new MemoryLogger();
    await writeFixture(root, "delimiter-prefix.md", [
        "---",
        "id: BYPASS-001",
        "title: Must Not Load",
        "animal: dog",
        "category: care",
        "---not-a-delimiter",
        "invalid: [",
        "---",
        "Body",
    ].join("\n"));
    const documents = await new markdown_loader_1.MarkdownLoader({
        knowledgeDirectory: root,
        logger,
    }).loadDocuments();
    strict_1.default.equal(documents.length, 0);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "markdown-loader.error" && entry.stage === "parse"));
});
(0, node_test_1.test)("parses UTF-8 BOM and CRLF front matter without changing the body", async () => {
    const root = await createTemporaryKnowledgeDirectory();
    const logger = new MemoryLogger();
    await writeFixture(root, "crlf.md", `\uFEFF${[
        "---",
        "id: CRLF-001",
        "title: CRLF Document",
        "animal: cat",
        "category: care",
        "---",
        "# Body",
        "",
        "Text.",
    ].join("\r\n")}`);
    const documents = await new markdown_loader_1.MarkdownLoader({
        knowledgeDirectory: root,
        logger,
    }).loadDocuments();
    strict_1.default.equal(documents.length, 1);
    strict_1.default.equal(documents[0]?.pageContent, "# Body\r\n\r\nText.");
});
