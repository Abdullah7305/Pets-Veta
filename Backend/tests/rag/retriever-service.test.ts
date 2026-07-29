import assert from "node:assert/strict";
import { test } from "node:test";

import { Document } from "@langchain/core/documents";
import type { Prisma } from "@prisma/client";

import type {
  DocumentEmbeddingService,
  EmbeddedDocument,
} from "../../src/rag/embeddings";
import { PgVectorRetrieverService } from "../../src/rag/retrieval";
import type {
  RetrieverDatabase,
  RetrieverLogger,
  RetrieverLogEntry,
} from "../../src/rag/retrieval";

class FakeEmbeddingService implements DocumentEmbeddingService {
  calls: readonly Document[][] = [];
  shouldFail = false;

  async embedDocuments(documents: readonly Document[]): Promise<EmbeddedDocument[]> {
    this.calls = [...this.calls, [...documents]];
    if (this.shouldFail) throw new Error("embedding failed");
    return documents.map((document) =>
      Object.assign(
        new Document({
          pageContent: document.pageContent,
          metadata: document.metadata,
        }),
        { embedding: Array.from({ length: 384 }, () => 0.05) },
      ),
    );
  }
}

class FakeDatabase implements RetrieverDatabase {
  queries: Prisma.Sql[] = [];
  connectCalls = 0;
  shouldFail = false;
  rows: Array<{
    content: string;
    metadata: Record<string, unknown>;
    similarity: number;
  }> = [
    {
      content: "Cats may scratch when stressed.",
      metadata: { animal: "cat", category: "behavior", chunkIndex: 2 },
      similarity: 0.87,
    },
  ];

  async connect(): Promise<void> {
    this.connectCalls += 1;
  }

  async query(query: Prisma.Sql) {
    this.queries.push(query);
    if (this.shouldFail) throw new Error("search failed");
    return this.rows;
  }
}

class MemoryLogger implements RetrieverLogger {
  readonly entries: RetrieverLogEntry[] = [];
  log(entry: RetrieverLogEntry): void {
    this.entries.push(entry);
  }
}

test("embeds a query and returns cosine-ranked content with metadata", async () => {
  const embeddingService = new FakeEmbeddingService();
  const database = new FakeDatabase();
  const logger = new MemoryLogger();
  const results = await new PgVectorRetrieverService({
    embeddingService,
    database,
    logger,
  }).retrieve("  Why is my cat scratching?  ");

  assert.equal(embeddingService.calls[0]?.[0]?.pageContent, "Why is my cat scratching?");
  assert.deepEqual(results, [
    {
      content: "Cats may scratch when stressed.",
      metadata: { animal: "cat", category: "behavior", chunkIndex: 2 },
      similarity: 0.87,
    },
  ]);
  assert.match(database.queries[0]!.sql, /<=>/);
  assert.match(database.queries[0]!.sql, /ORDER BY/);
  assert.doesNotMatch(database.queries[0]!.sql, /KnowledgeDocument/);
  assert.ok(database.queries[0]!.values.includes(5));
  assert.ok(logger.entries.some((entry) => entry.event === "retriever.embedding-generated"));
  assert.ok(logger.entries.some((entry) => entry.event === "retriever.search-completed"));
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "retriever.results-returned" && entry.resultCount === 1,
    ),
  );
});

test("applies top-k, similarity, and document metadata filters as parameters", async () => {
  const database = new FakeDatabase();
  await new PgVectorRetrieverService({
    embeddingService: new FakeEmbeddingService(),
    database,
    logger: new MemoryLogger(),
  }).retrieve("aggression", {
    topK: 8,
    minimumSimilarity: 0.72,
    filters: {
      animal: "cat",
      category: "behavior",
      subCategory: "aggression",
    },
  });

  const query = database.queries[0]!;
  assert.match(query.sql, /kd\."animal"/);
  assert.match(query.sql, /kd\."category"/);
  assert.match(query.sql, /kd\."subCategory"/);
  assert.match(query.sql, /EXISTS/);
  assert.ok(query.values.includes("CAT"));
  assert.ok(query.values.includes("behavior"));
  assert.ok(query.values.includes("aggression"));
  assert.ok(query.values.includes(0.72));
  assert.ok(query.values.includes(8));
});

test("handles empty queries without loading the model or searching", async () => {
  const embeddingService = new FakeEmbeddingService();
  const database = new FakeDatabase();
  const logger = new MemoryLogger();
  const results = await new PgVectorRetrieverService({
    embeddingService,
    database,
    logger,
  }).retrieve(" \n ");

  assert.deepEqual(results, []);
  assert.equal(embeddingService.calls.length, 0);
  assert.equal(database.queries.length, 0);
  assert.ok(logger.entries.some((entry) => entry.event === "retriever.warning"));
});

test("returns an empty result when query embedding fails", async () => {
  const embeddingService = new FakeEmbeddingService();
  embeddingService.shouldFail = true;
  const database = new FakeDatabase();
  const logger = new MemoryLogger();
  const results = await new PgVectorRetrieverService({
    embeddingService,
    database,
    logger,
  }).retrieve("cat behavior");

  assert.deepEqual(results, []);
  assert.equal(database.queries.length, 0);
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "retriever.error" && entry.stage === "embedding",
    ),
  );
});

test("returns an empty result when the database search fails", async () => {
  const database = new FakeDatabase();
  database.shouldFail = true;
  const logger = new MemoryLogger();
  const results = await new PgVectorRetrieverService({
    embeddingService: new FakeEmbeddingService(),
    database,
    logger,
  }).retrieve("cat behavior");

  assert.deepEqual(results, []);
  assert.ok(
    logger.entries.some(
      (entry) => entry.event === "retriever.error" && entry.stage === "search",
    ),
  );
});

test("validates retrieval limits and similarity thresholds", async () => {
  const service = new PgVectorRetrieverService({
    embeddingService: new FakeEmbeddingService(),
    database: new FakeDatabase(),
    logger: new MemoryLogger(),
    maxTopK: 20,
  });

  await assert.rejects(service.retrieve("query", { topK: 21 }), RangeError);
  await assert.rejects(
    service.retrieve("query", { minimumSimilarity: 1.1 }),
    RangeError,
  );
});

test("reuses a cached query embedding while still running fresh vector search", async () => {
  const embeddingService = new FakeEmbeddingService();
  const database = new FakeDatabase();
  const service = new PgVectorRetrieverService({
    embeddingService,
    database,
    logger: new MemoryLogger(),
  });

  await service.retrieve("repeated cat question");
  await service.retrieve("repeated cat question");

  assert.equal(embeddingService.calls.length, 1);
  assert.equal(database.queries.length, 2);
});

test("removes duplicate chunks and enforces similarity after row mapping", async () => {
  const database = new FakeDatabase();
  database.rows = [
    {
      content: "High quality context.",
      metadata: { chunkIndex: 0 },
      similarity: 0.94,
    },
    {
      content: "  HIGH   quality context. ",
      metadata: { chunkIndex: 1 },
      similarity: 0.91,
    },
    {
      content: "Weak context.",
      metadata: { chunkIndex: 2 },
      similarity: 0.4,
    },
  ];
  const logger = new MemoryLogger();
  const results = await new PgVectorRetrieverService({
    embeddingService: new FakeEmbeddingService(),
    database,
    logger,
  }).retrieve("quality", { topK: 3, minimumSimilarity: 0.8 });

  assert.deepEqual(results.map((entry) => entry.content), [
    "High quality context.",
  ]);
  assert.ok(
    logger.entries.some(
      (entry) =>
        entry.event === "retriever.chunks-filtered" &&
        entry.duplicateChunksRemoved === 1 &&
        entry.lowSimilarityChunksRemoved === 1,
    ),
  );
});
