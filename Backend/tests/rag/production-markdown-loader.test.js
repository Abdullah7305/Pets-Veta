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
const markdown_1 = require("../../src/rag/loaders/markdown");
class MemoryPinoLogger {
    entries = [];
    info(payload, message) {
        this.entries.push({ level: "info", payload, message });
    }
    warn(payload, message) {
        this.entries.push({ level: "warn", payload, message });
    }
    error(payload, message) {
        this.entries.push({ level: "error", payload, message });
    }
    asLogger() {
        return this;
    }
}
const temporaryDirectories = [];
async function createKnowledgeDirectory() {
    const directory = await (0, promises_1.mkdtemp)(node_path_1.default.join(node_os_1.default.tmpdir(), "pets-veta-production-markdown-loader-"));
    temporaryDirectories.push(directory);
    return directory;
}
async function fixture(root, relativePath, content) {
    const filePath = node_path_1.default.join(root, relativePath);
    await (0, promises_1.mkdir)(node_path_1.default.dirname(filePath), { recursive: true });
    await (0, promises_1.writeFile)(filePath, content, "utf8");
}
(0, node_test_1.afterEach)(async () => {
    await Promise.all(temporaryDirectories.splice(0).map((directory) => (0, promises_1.rm)(directory, { recursive: true, force: true })));
});
(0, node_test_1.test)("recursively creates typed LangChain documents with complete metadata", async () => {
    const root = await createKnowledgeDirectory();
    const logger = new MemoryPinoLogger();
    await fixture(root, "dogs/vaccination/dog-vaccination.md", [
        "---",
        "id: dog-vaccination",
        "title: Dog Vaccination",
        "animal: dog",
        "category: vaccination",
        "subcategory: puppy",
        "tags:",
        "  - vaccine",
        "  - puppy",
        "reviewed: true",
        "---",
        "# Dog Vaccination",
        "",
        "Vaccination guidance.",
    ].join("\n"));
    const documents = await new markdown_1.ProductionMarkdownLoader({
        knowledgeDirectory: root,
        logger: logger.asLogger(),
    }).loadDocuments();
    strict_1.default.equal(documents.length, 1);
    strict_1.default.equal(documents[0]?.id, "dog-vaccination");
    strict_1.default.equal(documents[0]?.metadata.animal, "DOG");
    strict_1.default.equal(documents[0]?.metadata.subcategory, "puppy");
    strict_1.default.deepEqual(documents[0]?.metadata.tags, ["vaccine", "puppy"]);
    strict_1.default.equal(documents[0]?.metadata.reviewed, true);
    strict_1.default.equal(documents[0]?.metadata.filePath, "knowledge/dogs/vaccination/dog-vaccination.md");
    strict_1.default.equal(documents[0]?.metadata.fileName, "dog-vaccination.md");
    strict_1.default.equal(documents[0]?.metadata.extension, ".md");
    const completed = logger.entries.find((entry) => entry.payload.event === "markdown-loader.completed");
    strict_1.default.deepEqual({
        total: completed?.payload.totalFiles,
        loaded: completed?.payload.loadedFiles,
        skipped: completed?.payload.skippedFiles,
        invalid: completed?.payload.invalidMetadata,
    }, { total: 1, loaded: 1, skipped: 0, invalid: 0 });
    strict_1.default.equal(typeof completed?.payload.processingTimeMs, "number");
});
(0, node_test_1.test)("ignores hidden paths and unsupported extensions", async () => {
    const root = await createKnowledgeDirectory();
    await fixture(root, "cats/visible.md", "---\nid: cat\ntitle: Cat\nanimal: CAT\ncategory: care\n---\nBody");
    await fixture(root, ".hidden.md", "---\nid: hidden\ntitle: Hidden\nanimal: CAT\ncategory: care\n---\nBody");
    await fixture(root, ".private/secret.md", "---\nid: secret\ntitle: Secret\nanimal: CAT\ncategory: care\n---\nBody");
    await fixture(root, "cats/image.png", "not markdown");
    await fixture(root, "cats/notes.tmp", "not markdown");
    const documents = await new markdown_1.ProductionMarkdownLoader({
        knowledgeDirectory: root,
        logger: new MemoryPinoLogger().asLogger(),
    }).loadDocuments();
    strict_1.default.deepEqual(documents.map((document) => document.id), ["cat"]);
});
(0, node_test_1.test)("skips invalid metadata, malformed YAML, and empty Markdown independently", async () => {
    const root = await createKnowledgeDirectory();
    const logger = new MemoryPinoLogger();
    await fixture(root, "a-invalid.md", "---\nid: invalid\nanimal: CAT\ncategory: care\n---\nBody");
    await fixture(root, "b-yaml.md", "---\nid: broken\ntitle: [unterminated\nanimal: CAT\ncategory: care\n---\nBody");
    await fixture(root, "c-empty.md", "---\nid: empty\ntitle: Empty\nanimal: CAT\ncategory: care\n---\n");
    await fixture(root, "d-valid.md", "---\nid: valid\ntitle: Valid\nanimal: CAT\ncategory: care\n---\nBody");
    const documents = await new markdown_1.ProductionMarkdownLoader({
        knowledgeDirectory: root,
        logger: logger.asLogger(),
    }).loadDocuments();
    strict_1.default.deepEqual(documents.map((document) => document.id), ["valid"]);
    const completed = logger.entries.find((entry) => entry.payload.event === "markdown-loader.completed");
    strict_1.default.equal(completed?.payload.totalFiles, 4);
    strict_1.default.equal(completed?.payload.loadedFiles, 1);
    strict_1.default.equal(completed?.payload.skippedFiles, 3);
    strict_1.default.equal(completed?.payload.invalidMetadata, 1);
    strict_1.default.equal(completed?.payload.processingErrors, 1);
});
(0, node_test_1.test)("returns an empty result instead of crashing for a missing directory", async () => {
    const root = await createKnowledgeDirectory();
    await (0, promises_1.rm)(root, { recursive: true, force: true });
    temporaryDirectories.splice(temporaryDirectories.indexOf(root), 1);
    const logger = new MemoryPinoLogger();
    const documents = await new markdown_1.ProductionMarkdownLoader({
        knowledgeDirectory: root,
        logger: logger.asLogger(),
    }).loadDocuments();
    strict_1.default.deepEqual(documents, []);
    strict_1.default.ok(logger.entries.some((entry) => entry.payload.event === "markdown-loader.initialization-failed"));
});
(0, node_test_1.test)("continues after an injected per-file permission failure", async () => {
    const logger = new MemoryPinoLogger();
    const service = {
        assertKnowledgeDirectory: async () => "C:\\knowledge",
        scan: async () => [
            { absolutePath: "C:\\knowledge\\denied.md", relativePath: "denied.md" },
            { absolutePath: "C:\\knowledge\\valid.md", relativePath: "valid.md" },
        ],
        read: async (_directory, file) => {
            if (file.relativePath === "denied.md") {
                throw Object.assign(new Error("permission denied"), { code: "EACCES" });
            }
            return "---\nid: valid\ntitle: Valid\nanimal: CAT\ncategory: care\n---\nBody";
        },
    };
    const documents = await new markdown_1.ProductionMarkdownLoader({
        fileService: service,
        logger: logger.asLogger(),
    }).loadDocuments();
    strict_1.default.deepEqual(documents.map((document) => document.id), ["valid"]);
    strict_1.default.ok(logger.entries.some((entry) => entry.payload.event === "markdown-loader.file-failed" &&
        entry.payload.error.code === "EACCES"));
});
