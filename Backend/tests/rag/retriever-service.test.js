"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const documents_1 = require("@langchain/core/documents");
const retrieval_1 = require("../../src/rag/retrieval");
class FakeEmbeddingService {
    calls = [];
    shouldFail = false;
    async embedDocuments(documents) {
        this.calls = [...this.calls, [...documents]];
        if (this.shouldFail)
            throw new Error("embedding failed");
        return documents.map((document) => Object.assign(new documents_1.Document({
            pageContent: document.pageContent,
            metadata: document.metadata,
        }), { embedding: Array.from({ length: 384 }, () => 0.05) }));
    }
}
class FakeDatabase {
    queries = [];
    connectCalls = 0;
    shouldFail = false;
    rows = [
        {
            content: "Cats may scratch when stressed.",
            metadata: { animal: "cat", category: "behavior", chunkIndex: 2 },
            similarity: 0.87,
        },
    ];
    async connect() {
        this.connectCalls += 1;
    }
    async query(query) {
        this.queries.push(query);
        if (this.shouldFail)
            throw new Error("search failed");
        return this.rows;
    }
}
class MemoryLogger {
    entries = [];
    log(entry) {
        this.entries.push(entry);
    }
}
(0, node_test_1.test)("embeds a query and returns cosine-ranked content with metadata", async () => {
    const embeddingService = new FakeEmbeddingService();
    const database = new FakeDatabase();
    const logger = new MemoryLogger();
    const results = await new retrieval_1.PgVectorRetrieverService({
        embeddingService,
        database,
        logger,
    }).retrieve("  Why is my cat scratching?  ");
    strict_1.default.equal(embeddingService.calls[0]?.[0]?.pageContent, "Why is my cat scratching?");
    strict_1.default.deepEqual(results, [
        {
            content: "Cats may scratch when stressed.",
            metadata: { animal: "cat", category: "behavior", chunkIndex: 2 },
            similarity: 0.87,
        },
    ]);
    strict_1.default.match(database.queries[0].sql, /<=>/);
    strict_1.default.match(database.queries[0].sql, /ORDER BY/);
    strict_1.default.doesNotMatch(database.queries[0].sql, /KnowledgeDocument/);
    strict_1.default.ok(database.queries[0].values.includes(5));
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.embedding-generated"));
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.search-completed"));
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.results-returned" && entry.resultCount === 1));
});
(0, node_test_1.test)("applies top-k, similarity, and document metadata filters as parameters", async () => {
    const database = new FakeDatabase();
    await new retrieval_1.PgVectorRetrieverService({
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
    const query = database.queries[0];
    strict_1.default.match(query.sql, /kd\."animal"/);
    strict_1.default.match(query.sql, /kd\."category"/);
    strict_1.default.match(query.sql, /kd\."subCategory"/);
    strict_1.default.match(query.sql, /EXISTS/);
    strict_1.default.ok(query.values.includes("CAT"));
    strict_1.default.ok(query.values.includes("behavior"));
    strict_1.default.ok(query.values.includes("aggression"));
    strict_1.default.ok(query.values.includes(0.72));
    strict_1.default.ok(query.values.includes(8));
});
(0, node_test_1.test)("handles empty queries without loading the model or searching", async () => {
    const embeddingService = new FakeEmbeddingService();
    const database = new FakeDatabase();
    const logger = new MemoryLogger();
    const results = await new retrieval_1.PgVectorRetrieverService({
        embeddingService,
        database,
        logger,
    }).retrieve(" \n ");
    strict_1.default.deepEqual(results, []);
    strict_1.default.equal(embeddingService.calls.length, 0);
    strict_1.default.equal(database.queries.length, 0);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.warning"));
});
(0, node_test_1.test)("returns an empty result when query embedding fails", async () => {
    const embeddingService = new FakeEmbeddingService();
    embeddingService.shouldFail = true;
    const database = new FakeDatabase();
    const logger = new MemoryLogger();
    const results = await new retrieval_1.PgVectorRetrieverService({
        embeddingService,
        database,
        logger,
    }).retrieve("cat behavior");
    strict_1.default.deepEqual(results, []);
    strict_1.default.equal(database.queries.length, 0);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.error" && entry.stage === "embedding"));
});
(0, node_test_1.test)("returns an empty result when the database search fails", async () => {
    const database = new FakeDatabase();
    database.shouldFail = true;
    const logger = new MemoryLogger();
    const results = await new retrieval_1.PgVectorRetrieverService({
        embeddingService: new FakeEmbeddingService(),
        database,
        logger,
    }).retrieve("cat behavior");
    strict_1.default.deepEqual(results, []);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.error" && entry.stage === "search"));
});
(0, node_test_1.test)("validates retrieval limits and similarity thresholds", async () => {
    const service = new retrieval_1.PgVectorRetrieverService({
        embeddingService: new FakeEmbeddingService(),
        database: new FakeDatabase(),
        logger: new MemoryLogger(),
        maxTopK: 20,
    });
    await strict_1.default.rejects(service.retrieve("query", { topK: 21 }), RangeError);
    await strict_1.default.rejects(service.retrieve("query", { minimumSimilarity: 1.1 }), RangeError);
});
(0, node_test_1.test)("reuses a cached query embedding while still running fresh vector search", async () => {
    const embeddingService = new FakeEmbeddingService();
    const database = new FakeDatabase();
    const service = new retrieval_1.PgVectorRetrieverService({
        embeddingService,
        database,
        logger: new MemoryLogger(),
    });
    await service.retrieve("repeated cat question");
    await service.retrieve("repeated cat question");
    strict_1.default.equal(embeddingService.calls.length, 1);
    strict_1.default.equal(database.queries.length, 2);
});
(0, node_test_1.test)("removes duplicate chunks and enforces similarity after row mapping", async () => {
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
    const results = await new retrieval_1.PgVectorRetrieverService({
        embeddingService: new FakeEmbeddingService(),
        database,
        logger,
    }).retrieve("quality", { topK: 3, minimumSimilarity: 0.8 });
    strict_1.default.deepEqual(results.map((entry) => entry.content), [
        "High quality context.",
    ]);
    strict_1.default.ok(logger.entries.some((entry) => entry.event === "retriever.chunks-filtered" &&
        entry.duplicateChunksRemoved === 1 &&
        entry.lowSimilarityChunksRemoved === 1));
});
