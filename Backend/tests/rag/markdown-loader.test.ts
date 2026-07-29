import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import { MarkdownLoader } from "../../src/rag/loaders/markdown-loader";
import type {
  MarkdownLoaderLogEntry,
  MarkdownLoaderLogger,
} from "../../src/rag/types";

class MemoryLogger implements MarkdownLoaderLogger {
  readonly entries: MarkdownLoaderLogEntry[] = [];

  log(entry: MarkdownLoaderLogEntry): void {
    this.entries.push(entry);
  }
}

const temporaryDirectories: string[] = [];

async function createTemporaryKnowledgeDirectory(): Promise<string> {
  const directory = await mkdtemp(
    path.join(os.tmpdir(), "pets-veta-markdown-loader-"),
  );
  temporaryDirectories.push(directory);
  return directory;
}

async function writeFixture(
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

test("recursively loads valid Markdown files into LangChain Documents", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  const logger = new MemoryLogger();

  await writeFixture(
    root,
    "dogs/care/puppy-care.md",
    [
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
    ].join("\n"),
  );
  await writeFixture(root, "dogs/care/ignored.txt", "not markdown");
  await writeFixture(root, "dogs/care/ignored.MD", "not lowercase .md");

  const documents = await new MarkdownLoader({
    knowledgeDirectory: root,
    logger,
  }).loadDocuments();

  assert.equal(documents.length, 1);
  assert.equal(documents[0]?.id, "DOG-001");
  assert.equal(documents[0]?.pageContent, "# Puppy Care\n\nBody content.");
  assert.deepEqual(documents[0]?.metadata.tags, ["puppy"]);
  assert.deepEqual(documents[0]?.metadata.review, { approved: true });
  assert.equal(
    documents[0]?.metadata.filePath,
    "knowledge/dogs/care/puppy-care.md",
  );
  assert.equal(
    documents[0]?.metadata.source,
    "knowledge/dogs/care/puppy-care.md",
  );

  const completed = logger.entries.find(
    (entry) => entry.event === "markdown-loader.completed",
  );
  assert.ok(completed?.event === "markdown-loader.completed");
  assert.deepEqual(
    {
      discovered: completed.summary.discovered,
      loaded: completed.summary.loaded,
      skipped: completed.summary.skipped,
      errors: completed.summary.errors,
    },
    { discovered: 1, loaded: 1, skipped: 0, errors: 0 },
  );
});

test("skips invalid metadata and continues after malformed YAML", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  const logger = new MemoryLogger();

  await writeFixture(
    root,
    "a-invalid.md",
    ["---", "id: INVALID-001", "animal: dog", "category: care", "---"].join(
      "\n",
    ),
  );
  await writeFixture(
    root,
    "b-malformed.md",
    [
      "---",
      "id: BROKEN-001",
      "title: [unterminated",
      "animal: dog",
      "category: care",
      "---",
    ].join("\n"),
  );
  await writeFixture(
    root,
    "c-valid.md",
    [
      "---",
      "id: VALID-001",
      "title: Valid Document",
      "animal: general",
      "category: faq",
      "---",
      "",
    ].join("\n"),
  );

  const documents = await new MarkdownLoader({
    knowledgeDirectory: root,
    logger,
  }).loadDocuments();

  assert.deepEqual(
    documents.map((document) => document.id),
    ["VALID-001"],
  );

  const completed = logger.entries.find(
    (entry) => entry.event === "markdown-loader.completed",
  );
  assert.ok(completed?.event === "markdown-loader.completed");
  assert.equal(completed.summary.loaded, 1);
  assert.equal(completed.summary.skipped, 1);
  assert.equal(completed.summary.errors, 1);
});

test("rejects a missing knowledge root with a structured initialization error", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  await rm(root, { recursive: true, force: true });
  temporaryDirectories.splice(temporaryDirectories.indexOf(root), 1);
  const logger = new MemoryLogger();

  await assert.rejects(
    new MarkdownLoader({ knowledgeDirectory: root, logger }).loadDocuments(),
  );

  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "markdown-loader.error" &&
        entry.stage === "initialize",
    ),
  );
});

test("never evaluates JavaScript front matter", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  const logger = new MemoryLogger();
  const marker = "__petsVetaMarkdownLoaderExecuted";
  const globalRecord = globalThis as Record<string, unknown>;
  delete globalRecord[marker];

  await writeFixture(
    root,
    "unsafe.md",
    [
      "---javascript",
      `(() => { globalThis.${marker} = true; return ({ id: \"BAD-001\", title: \"Unsafe\", animal: \"dog\", category: \"care\" }); })()`,
      "---",
      "unsafe",
    ].join("\n"),
  );

  const documents = await new MarkdownLoader({
    knowledgeDirectory: root,
    logger,
  }).loadDocuments();

  assert.equal(documents.length, 0);
  assert.equal(globalRecord[marker], undefined);
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "markdown-loader.file-skipped" &&
        entry.reason === "invalid-metadata",
    ),
  );
});

test("rejects delimiter-prefix lines instead of accepting partial front matter", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  const logger = new MemoryLogger();

  await writeFixture(
    root,
    "delimiter-prefix.md",
    [
      "---",
      "id: BYPASS-001",
      "title: Must Not Load",
      "animal: dog",
      "category: care",
      "---not-a-delimiter",
      "invalid: [",
      "---",
      "Body",
    ].join("\n"),
  );

  const documents = await new MarkdownLoader({
    knowledgeDirectory: root,
    logger,
  }).loadDocuments();

  assert.equal(documents.length, 0);
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "markdown-loader.error" && entry.stage === "parse",
    ),
  );
});

test("parses UTF-8 BOM and CRLF front matter without changing the body", async () => {
  const root = await createTemporaryKnowledgeDirectory();
  const logger = new MemoryLogger();

  await writeFixture(
    root,
    "crlf.md",
    `\uFEFF${[
      "---",
      "id: CRLF-001",
      "title: CRLF Document",
      "animal: cat",
      "category: care",
      "---",
      "# Body",
      "",
      "Text.",
    ].join("\r\n")}`,
  );

  const documents = await new MarkdownLoader({
    knowledgeDirectory: root,
    logger,
  }).loadDocuments();

  assert.equal(documents.length, 1);
  assert.equal(documents[0]?.pageContent, "# Body\r\n\r\nText.");
});
