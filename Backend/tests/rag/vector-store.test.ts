import assert from "node:assert/strict";
import { test } from "node:test";

import { Document } from "@langchain/core/documents";
import type { Prisma } from "@prisma/client";

import type { EmbeddedDocument } from "../../src/rag/embeddings";
import { PgVectorStoreService } from "../../src/rag/vector-store";
import type {
  VectorStoreDatabase,
  VectorStoreLogger,
  VectorStoreLogEntry,
  VectorStoreTransaction,
} from "../../src/rag/vector-store";

const DOCUMENT_ID = "c7e3e163-bfea-43a8-bbfe-cd2f4dcfa133";

class MemoryLogger implements VectorStoreLogger {
  readonly entries: VectorStoreLogEntry[] = [];
  log(entry: VectorStoreLogEntry): void {
    this.entries.push(entry);
  }
}

class FakeDatabase implements VectorStoreDatabase {
  readonly queries: Prisma.Sql[] = [];
  transactionCalls = 0;
  results: Array<number | Error> = [];
  queryRows: unknown[] = [];

  execute(query: Prisma.Sql): Promise<number> {
    return this.run(query);
  }

  query<T>(query: Prisma.Sql): Promise<T[]> {
    this.queries.push(query);
    return Promise.resolve(this.queryRows as T[]);
  }

  async transaction<T>(
    work: (transaction: VectorStoreTransaction) => Promise<T>,
  ): Promise<T> {
    this.transactionCalls += 1;
    return work({ execute: (query) => this.run(query) });
  }

  private async run(query: Prisma.Sql): Promise<number> {
    this.queries.push(query);
    const result = this.results.shift() ?? 1;
    if (result instanceof Error) throw result;
    return result;
  }
}

function chunk(chunkIndex: number): EmbeddedDocument {
  return Object.assign(
    new Document({
      id: `chunk-${chunkIndex}`,
      pageContent: `# Heading ${chunkIndex}\n\nVeterinary guidance.`,
      metadata: {
        chunkIndex,
        heading: `Heading ${chunkIndex}`,
        animal: "cat",
        source: "knowledge/cats/behavior.md",
        nested: { preserved: true },
      },
    }),
    { embedding: Array.from({ length: 384 }, () => 0.05) },
  );
}

test("batch upserts chunks and includes complete metadata", async () => {
  const database = new FakeDatabase();
  database.results.push(2, 2, 1);
  const logger = new MemoryLogger();
  const result = await new PgVectorStoreService({
    batchSize: 2,
    database,
    logger,
  }).saveChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2), chunk(3), chunk(4)]);

  assert.equal(result.success, true);
  assert.equal(result.affected, 5);
  assert.equal(result.batchesProcessed, 3);
  assert.equal(database.transactionCalls, 3);
  assert.match(database.queries[0]!.sql, /INSERT INTO "KnowledgeChunk"/);
  assert.match(database.queries[0]!.sql, /ON CONFLICT/);
  const serializedValues = database.queries.flatMap((query) => query.values);
  assert.ok(
    serializedValues.some(
      (value) =>
        typeof value === "string" &&
        value.includes('"nested":{"preserved":true}'),
    ),
  );
  assert.equal(
    logger.entries.filter((entry) => entry.event === "vector-store.batch-completed").length,
    3,
  );
});

test("continues subsequent batches after a database failure", async () => {
  const database = new FakeDatabase();
  database.results.push(new Error("database unavailable"), 2);
  const result = await new PgVectorStoreService({
    batchSize: 2,
    database,
    logger: new MemoryLogger(),
  }).updateChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2), chunk(3)]);

  assert.equal(result.success, false);
  assert.equal(result.affected, 2);
  assert.equal(result.failed, 2);
  assert.equal(result.batchesProcessed, 1);
  assert.equal(database.transactionCalls, 2);
});

test("atomically replaces all chunks for a knowledge document", async () => {
  const database = new FakeDatabase();
  database.results.push(4, 2, 1);
  const result = await new PgVectorStoreService({
    batchSize: 2,
    database,
    logger: new MemoryLogger(),
  }).replaceChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2)]);

  assert.equal(result.success, true);
  assert.equal(result.affected, 3);
  assert.equal(database.transactionCalls, 1);
  assert.match(database.queries[0]!.sql, /DELETE FROM "KnowledgeChunk"/);
  assert.match(database.queries[1]!.sql, /INSERT INTO "KnowledgeChunk"/);
});

test("rejects invalid embeddings before an atomic replacement deletes data", async () => {
  const database = new FakeDatabase();
  const invalid = chunk(0);
  invalid.embedding.pop();
  const result = await new PgVectorStoreService({
    database,
    logger: new MemoryLogger(),
  }).replaceChunks(DOCUMENT_ID, [invalid]);

  assert.equal(result.success, false);
  assert.equal(database.transactionCalls, 0);
  assert.equal(database.queries.length, 0);
});

test("deletes selected chunks and validates indexes", async () => {
  const database = new FakeDatabase();
  database.results.push(2);
  const service = new PgVectorStoreService({
    database,
    logger: new MemoryLogger(),
  });
  const result = await service.deleteChunks(DOCUMENT_ID, [1, 3]);
  assert.equal(result.affected, 2);
  assert.match(database.queries[0]!.sql, /"chunkIndex" IN/);

  const invalid = await service.deleteChunks(DOCUMENT_ID, [-1]);
  assert.equal(invalid.success, false);
  assert.equal(database.queries.length, 1);
});

test("skips invalid chunks during non-atomic batch saves", async () => {
  const database = new FakeDatabase();
  database.results.push(1);
  const invalid = chunk(1);
  invalid.embedding[0] = Number.NaN;
  const result = await new PgVectorStoreService({
    database,
    logger: new MemoryLogger(),
  }).saveChunks(DOCUMENT_ID, [chunk(0), invalid]);

  assert.equal(result.success, false);
  assert.equal(result.affected, 1);
  assert.equal(result.failed, 1);
});

test("exposes production APIs for save, update, replace, and document deletion", async () => {
  const database = new FakeDatabase();
  database.results.push(1, 1, 1, 1, 1);
  const service = new PgVectorStoreService({ database, logger: new MemoryLogger() });

  assert.equal((await service.saveEmbeddings(DOCUMENT_ID, [chunk(0)])).affected, 1);
  assert.equal((await service.updateEmbeddings(DOCUMENT_ID, [chunk(0)])).affected, 1);
  assert.equal((await service.replaceDocumentChunks(DOCUMENT_ID, [chunk(0)])).affected, 1);
  assert.equal((await service.deleteDocumentChunks(DOCUMENT_ID)).affected, 1);
});

test("looks up chunks by document ID without selecting the vector payload", async () => {
  const database = new FakeDatabase();
  database.queryRows = [
    {
      id: "chunk-id",
      knowledgeDocumentId: DOCUMENT_ID,
      chunkIndex: 0,
      heading: "Heading",
      content: "Guidance",
      tokenCount: 1,
      embeddingModel: "Xenova/bge-small-en-v1.5",
      metadata: { animal: "CAT" },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const result = await new PgVectorStoreService({
    database,
    logger: new MemoryLogger(),
  }).findChunksByDocument(DOCUMENT_ID);

  assert.equal(result.length, 1);
  assert.equal(result[0]?.chunkIndex, 0);
  assert.match(database.queries[0]!.sql, /ORDER BY "chunkIndex" ASC/u);
  assert.doesNotMatch(database.queries[0]!.sql, /SELECT[^]*"embedding"/u);
});

test("rejects invalid knowledge document IDs before accessing PostgreSQL", async () => {
  const database = new FakeDatabase();
  const service = new PgVectorStoreService({ database, logger: new MemoryLogger() });
  const saved = await service.saveEmbeddings("not-a-uuid", [chunk(0)]);
  const found = await service.findChunksByDocument("not-a-uuid");

  assert.equal(saved.success, false);
  assert.deepEqual(found, []);
  assert.equal(database.queries.length, 0);
});
