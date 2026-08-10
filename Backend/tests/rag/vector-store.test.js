"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const documents_1 = require("@langchain/core/documents");
const vector_store_1 = require("../../src/rag/vector-store");
const DOCUMENT_ID = "c7e3e163-bfea-43a8-bbfe-cd2f4dcfa133";
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
class FakeDatabase {
    queries = [];
    transactionCalls = 0;
    results = [];
    queryRows = [];
    execute(query) {
        return this.run(query);
    }
    query(query) {
        this.queries.push(query);
        return Promise.resolve(this.queryRows);
    }
    async transaction(work) {
        this.transactionCalls += 1;
        return work({ execute: (query) => this.run(query) });
    }
    async run(query) {
        this.queries.push(query);
        const result = this.results.shift() ?? 1;
        if (result instanceof Error)
            throw result;
        return result;
    }
}
function chunk(chunkIndex) {
    return Object.assign(new documents_1.Document({
        id: `chunk-${chunkIndex}`,
        pageContent: `# Heading ${chunkIndex}\n\nVeterinary guidance.`,
        metadata: {
            chunkIndex,
            heading: `Heading ${chunkIndex}`,
            animal: "cat",
            source: "knowledge/cats/behavior.md",
            nested: { preserved: true },
        },
    }), { embedding: Array.from({ length: 384 }, () => 0.05) });
}
(0, node_test_1.test)("batch upserts chunks and includes complete metadata", async () => {
    const database = new FakeDatabase();
    database.results.push(2, 2, 1);
    const logger = new MemoryLogger();
    const result = await new vector_store_1.PgVectorStoreService({
        batchSize: 2,
        database,
        logger,
    }).saveChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2), chunk(3), chunk(4)]);
    strict_1.default.equal(result.success, true);
    strict_1.default.equal(result.affected, 5);
    strict_1.default.equal(result.batchesProcessed, 3);
    strict_1.default.equal(database.transactionCalls, 3);
    strict_1.default.match(database.queries[0].sql, /INSERT INTO "KnowledgeChunk"/);
    strict_1.default.match(database.queries[0].sql, /ON CONFLICT/);
    const serializedValues = database.queries.flatMap((query) => query.values);
    strict_1.default.ok(serializedValues.some((value) => typeof value === "string" &&
        value.includes('"nested":{"preserved":true}')));
    strict_1.default.equal(logger.entries.filter((entry) => entry.event === "vector-store.batch-completed").length, 3);
});
(0, node_test_1.test)("continues subsequent batches after a database failure", async () => {
    const database = new FakeDatabase();
    database.results.push(new Error("database unavailable"), 2);
    const result = await new vector_store_1.PgVectorStoreService({
        batchSize: 2,
        database,
        logger: new MemoryLogger(),
    }).updateChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2), chunk(3)]);
    strict_1.default.equal(result.success, false);
    strict_1.default.equal(result.affected, 2);
    strict_1.default.equal(result.failed, 2);
    strict_1.default.equal(result.batchesProcessed, 1);
    strict_1.default.equal(database.transactionCalls, 2);
});
(0, node_test_1.test)("atomically replaces all chunks for a knowledge document", async () => {
    const database = new FakeDatabase();
    database.results.push(4, 2, 1);
    const result = await new vector_store_1.PgVectorStoreService({
        batchSize: 2,
        database,
        logger: new MemoryLogger(),
    }).replaceChunks(DOCUMENT_ID, [chunk(0), chunk(1), chunk(2)]);
    strict_1.default.equal(result.success, true);
    strict_1.default.equal(result.affected, 3);
    strict_1.default.equal(database.transactionCalls, 1);
    strict_1.default.match(database.queries[0].sql, /DELETE FROM "KnowledgeChunk"/);
    strict_1.default.match(database.queries[1].sql, /INSERT INTO "KnowledgeChunk"/);
});
(0, node_test_1.test)("rejects invalid embeddings before an atomic replacement deletes data", async () => {
    const database = new FakeDatabase();
    const invalid = chunk(0);
    invalid.embedding.pop();
    const result = await new vector_store_1.PgVectorStoreService({
        database,
        logger: new MemoryLogger(),
    }).replaceChunks(DOCUMENT_ID, [invalid]);
    strict_1.default.equal(result.success, false);
    strict_1.default.equal(database.transactionCalls, 0);
    strict_1.default.equal(database.queries.length, 0);
});
(0, node_test_1.test)("deletes selected chunks and validates indexes", async () => {
    const database = new FakeDatabase();
    database.results.push(2);
    const service = new vector_store_1.PgVectorStoreService({
        database,
        logger: new MemoryLogger(),
    });
    const result = await service.deleteChunks(DOCUMENT_ID, [1, 3]);
    strict_1.default.equal(result.affected, 2);
    strict_1.default.match(database.queries[0].sql, /"chunkIndex" IN/);
    const invalid = await service.deleteChunks(DOCUMENT_ID, [-1]);
    strict_1.default.equal(invalid.success, false);
    strict_1.default.equal(database.queries.length, 1);
});
(0, node_test_1.test)("skips invalid chunks during non-atomic batch saves", async () => {
    const database = new FakeDatabase();
    database.results.push(1);
    const invalid = chunk(1);
    invalid.embedding[0] = Number.NaN;
    const result = await new vector_store_1.PgVectorStoreService({
        database,
        logger: new MemoryLogger(),
    }).saveChunks(DOCUMENT_ID, [chunk(0), invalid]);
    strict_1.default.equal(result.success, false);
    strict_1.default.equal(result.affected, 1);
    strict_1.default.equal(result.failed, 1);
});
(0, node_test_1.test)("exposes production APIs for save, update, replace, and document deletion", async () => {
    const database = new FakeDatabase();
    database.results.push(1, 1, 1, 1, 1);
    const service = new vector_store_1.PgVectorStoreService({ database, logger: new MemoryLogger() });
    strict_1.default.equal((await service.saveEmbeddings(DOCUMENT_ID, [chunk(0)])).affected, 1);
    strict_1.default.equal((await service.updateEmbeddings(DOCUMENT_ID, [chunk(0)])).affected, 1);
    strict_1.default.equal((await service.replaceDocumentChunks(DOCUMENT_ID, [chunk(0)])).affected, 1);
    strict_1.default.equal((await service.deleteDocumentChunks(DOCUMENT_ID)).affected, 1);
});
(0, node_test_1.test)("looks up chunks by document ID without selecting the vector payload", async () => {
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
    const result = await new vector_store_1.PgVectorStoreService({
        database,
        logger: new MemoryLogger(),
    }).findChunksByDocument(DOCUMENT_ID);
    strict_1.default.equal(result.length, 1);
    strict_1.default.equal(result[0]?.chunkIndex, 0);
    strict_1.default.match(database.queries[0].sql, /ORDER BY "chunkIndex" ASC/u);
    strict_1.default.doesNotMatch(database.queries[0].sql, /SELECT[^]*"embedding"/u);
});
(0, node_test_1.test)("rejects invalid knowledge document IDs before accessing PostgreSQL", async () => {
    const database = new FakeDatabase();
    const service = new vector_store_1.PgVectorStoreService({ database, logger: new MemoryLogger() });
    const saved = await service.saveEmbeddings("not-a-uuid", [chunk(0)]);
    const found = await service.findChunksByDocument("not-a-uuid");
    strict_1.default.equal(saved.success, false);
    strict_1.default.deepEqual(found, []);
    strict_1.default.equal(database.queries.length, 0);
});
