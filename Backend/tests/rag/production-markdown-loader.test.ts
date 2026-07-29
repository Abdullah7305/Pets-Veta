import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import type { Logger } from "pino";

import {
  ProductionMarkdownLoader,
  type MarkdownFileService,
} from "../../src/rag/loaders/markdown";

type CapturedLog = Readonly<{
  level: "info" | "warn" | "error";
  payload: Record<string, unknown>;
  message?: string;
}>;

class MemoryPinoLogger {
  readonly entries: CapturedLog[] = [];
  info(payload: Record<string, unknown>, message?: string): void {
    this.entries.push({ level: "info", payload, message });
  }
  warn(payload: Record<string, unknown>, message?: string): void {
    this.entries.push({ level: "warn", payload, message });
  }
  error(payload: Record<string, unknown>, message?: string): void {
    this.entries.push({ level: "error", payload, message });
  }
  asLogger(): Logger {
    return this as unknown as Logger;
  }
}

const temporaryDirectories: string[] = [];

async function createKnowledgeDirectory(): Promise<string> {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pets-veta-production-markdown-loader-"),
  );
  temporaryDirectories.push(directory);
  return directory;
}

async function fixture(
  root: string,
  relativePath: string,
  content: string,
): Promise<void> {
  const filePath = path.join(root, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

test("recursively creates typed LangChain documents with complete metadata", async () => {
  const root = await createKnowledgeDirectory();
  const logger = new MemoryPinoLogger();
  await fixture(
    root,
    "dogs/vaccination/dog-vaccination.md",
    [
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
    ].join("\n"),
  );

  const documents = await new ProductionMarkdownLoader({
    knowledgeDirectory: root,
    logger: logger.asLogger(),
  }).loadDocuments();

  assert.equal(documents.length, 1);
  assert.equal(documents[0]?.id, "dog-vaccination");
  assert.equal(documents[0]?.metadata.animal, "DOG");
  assert.equal(documents[0]?.metadata.subcategory, "puppy");
  assert.deepEqual(documents[0]?.metadata.tags, ["vaccine", "puppy"]);
  assert.equal(documents[0]?.metadata.reviewed, true);
  assert.equal(
    documents[0]?.metadata.filePath,
    "knowledge/dogs/vaccination/dog-vaccination.md",
  );
  assert.equal(documents[0]?.metadata.fileName, "dog-vaccination.md");
  assert.equal(documents[0]?.metadata.extension, ".md");

  const completed = logger.entries.find(
    (entry) => entry.payload.event === "markdown-loader.completed",
  );
  assert.deepEqual(
    {
      total: completed?.payload.totalFiles,
      loaded: completed?.payload.loadedFiles,
      skipped: completed?.payload.skippedFiles,
      invalid: completed?.payload.invalidMetadata,
    },
    { total: 1, loaded: 1, skipped: 0, invalid: 0 },
  );
  assert.equal(typeof completed?.payload.processingTimeMs, "number");
});

test("ignores hidden paths and unsupported extensions", async () => {
  const root = await createKnowledgeDirectory();
  await fixture(
    root,
    "cats/visible.md",
    "---\nid: cat\ntitle: Cat\nanimal: CAT\ncategory: care\n---\nBody",
  );
  await fixture(
    root,
    ".hidden.md",
    "---\nid: hidden\ntitle: Hidden\nanimal: CAT\ncategory: care\n---\nBody",
  );
  await fixture(
    root,
    ".private/secret.md",
    "---\nid: secret\ntitle: Secret\nanimal: CAT\ncategory: care\n---\nBody",
  );
  await fixture(root, "cats/image.png", "not markdown");
  await fixture(root, "cats/notes.tmp", "not markdown");

  const documents = await new ProductionMarkdownLoader({
    knowledgeDirectory: root,
    logger: new MemoryPinoLogger().asLogger(),
  }).loadDocuments();
  assert.deepEqual(documents.map((document) => document.id), ["cat"]);
});

test("skips invalid metadata, malformed YAML, and empty Markdown independently", async () => {
  const root = await createKnowledgeDirectory();
  const logger = new MemoryPinoLogger();
  await fixture(
    root,
    "a-invalid.md",
    "---\nid: invalid\nanimal: CAT\ncategory: care\n---\nBody",
  );
  await fixture(
    root,
    "b-yaml.md",
    "---\nid: broken\ntitle: [unterminated\nanimal: CAT\ncategory: care\n---\nBody",
  );
  await fixture(
    root,
    "c-empty.md",
    "---\nid: empty\ntitle: Empty\nanimal: CAT\ncategory: care\n---\n",
  );
  await fixture(
    root,
    "d-valid.md",
    "---\nid: valid\ntitle: Valid\nanimal: CAT\ncategory: care\n---\nBody",
  );

  const documents = await new ProductionMarkdownLoader({
    knowledgeDirectory: root,
    logger: logger.asLogger(),
  }).loadDocuments();
  assert.deepEqual(documents.map((document) => document.id), ["valid"]);
  const completed = logger.entries.find(
    (entry) => entry.payload.event === "markdown-loader.completed",
  );
  assert.equal(completed?.payload.totalFiles, 4);
  assert.equal(completed?.payload.loadedFiles, 1);
  assert.equal(completed?.payload.skippedFiles, 3);
  assert.equal(completed?.payload.invalidMetadata, 1);
  assert.equal(completed?.payload.processingErrors, 1);
});

test("returns an empty result instead of crashing for a missing directory", async () => {
  const root = await createKnowledgeDirectory();
  await rm(root, { recursive: true, force: true });
  temporaryDirectories.splice(temporaryDirectories.indexOf(root), 1);
  const logger = new MemoryPinoLogger();
  const documents = await new ProductionMarkdownLoader({
    knowledgeDirectory: root,
    logger: logger.asLogger(),
  }).loadDocuments();

  assert.deepEqual(documents, []);
  assert.ok(
    logger.entries.some(
      (entry) => entry.payload.event === "markdown-loader.initialization-failed",
    ),
  );
});

test("continues after an injected per-file permission failure", async () => {
  const logger = new MemoryPinoLogger();
  const service: MarkdownFileService = {
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
  const documents = await new ProductionMarkdownLoader({
    fileService: service,
    logger: logger.asLogger(),
  }).loadDocuments();

  assert.deepEqual(documents.map((document) => document.id), ["valid"]);
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.payload.event === "markdown-loader.file-failed" &&
        (entry.payload.error as { code?: string }).code === "EACCES",
    ),
  );
});
