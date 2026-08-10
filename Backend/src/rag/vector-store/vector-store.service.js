"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgVectorStoreService = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const vector_store_utils_1 = require("./vector-store.utils");
const vector_store_constants_1 = require("./vector-store.constants");
const repository_1 = require("./repository");
const vector_store_validator_1 = require("./vector-store.validator");
class PgVectorStoreService {
    batchSize;
    database;
    logger;
    continueOnBatchError;
    constructor(options = {}) {
        if (options.batchSize !== undefined)
            (0, vector_store_validator_1.assertVectorStoreBatchSize)(options.batchSize);
        this.batchSize = options.database
            ? (options.batchSize ?? vector_store_constants_1.DEFAULT_VECTOR_STORE_BATCH_SIZE)
            : (0, vector_store_utils_1.resolveVectorStoreBatchSize)(options.batchSize);
        this.database = options.database ?? new repository_1.PrismaVectorStoreRepository();
        this.logger = options.logger ?? (0, vector_store_utils_1.createVectorStoreLogger)();
        this.continueOnBatchError = options.continueOnBatchError ?? true;
    }
    saveChunks(id, chunks) {
        return this.writeBatches("save", id, chunks);
    }
    saveEmbeddings(id, chunks) {
        return this.saveChunks(id, chunks);
    }
    updateChunks(id, chunks) {
        return this.writeBatches("update", id, chunks);
    }
    updateEmbeddings(id, chunks) {
        return this.updateChunks(id, chunks);
    }
    async deleteChunks(id, chunkIndexes) {
        const startedAt = node_perf_hooks_1.performance.now();
        const requested = chunkIndexes?.length ?? 0;
        this.started("delete", id, requested);
        try {
            (0, vector_store_validator_1.assertKnowledgeDocumentId)(id);
            if (chunkIndexes)
                (0, vector_store_validator_1.assertChunkIndexes)(chunkIndexes);
        }
        catch (error) {
            return this.failure("delete", id, requested, startedAt, error);
        }
        if (chunkIndexes?.length === 0)
            return this.completed("delete", id, 0, 0, 0, 0, startedAt);
        try {
            const affected = await this.database.execute((0, vector_store_utils_1.buildDeleteQuery)(id, chunkIndexes));
            return this.completed("delete", id, requested, affected, 0, 1, startedAt);
        }
        catch (error) {
            return this.failure("delete", id, requested, startedAt, error);
        }
    }
    deleteDocumentChunks(id) {
        return this.deleteChunks(id);
    }
    async replaceChunks(id, chunks) {
        const startedAt = node_perf_hooks_1.performance.now();
        this.started("replace", id, chunks.length);
        let prepared;
        try {
            (0, vector_store_validator_1.assertKnowledgeDocumentId)(id);
            prepared = chunks.map(vector_store_utils_1.prepareChunk);
            this.assertUniqueIndexes(prepared);
        }
        catch (error) {
            return this.failure("replace", id, chunks.length, startedAt, error);
        }
        let batchesProcessed = 0;
        try {
            const affected = await this.database.transaction(async (transaction) => {
                await transaction.execute((0, vector_store_utils_1.buildDeleteQuery)(id));
                let inserted = 0;
                for (let start = 0; start < prepared.length; start += this.batchSize) {
                    const batch = prepared.slice(start, start + this.batchSize);
                    inserted += await transaction.execute((0, vector_store_utils_1.buildUpsertQuery)(id, batch));
                    batchesProcessed += 1;
                }
                return inserted;
            });
            return this.completed("replace", id, chunks.length, affected, 0, batchesProcessed, startedAt);
        }
        catch (error) {
            return this.failure("replace", id, chunks.length, startedAt, error, batchesProcessed);
        }
    }
    replaceDocumentChunks(id, chunks) {
        return this.replaceChunks(id, chunks);
    }
    async findChunksByDocument(id) {
        const startedAt = node_perf_hooks_1.performance.now();
        try {
            (0, vector_store_validator_1.assertKnowledgeDocumentId)(id);
            if (!this.database.query)
                throw new Error("Repository does not support chunk lookup");
            const chunks = await this.database.query((0, vector_store_utils_1.buildFindByDocumentQuery)(id));
            (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
                event: "vector-store.lookup-completed",
                level: "info",
                knowledgeDocumentId: id,
                count: chunks.length,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
            });
            return chunks;
        }
        catch (error) {
            (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
                event: "vector-store.error",
                level: "error",
                operation: "find",
                knowledgeDocumentId: id,
                error: (0, vector_store_utils_1.serializeVectorStoreError)(error),
            });
            return [];
        }
    }
    async writeBatches(operation, id, chunks) {
        const startedAt = node_perf_hooks_1.performance.now();
        this.started(operation, id, chunks.length);
        const prepared = [];
        let failed = 0;
        try {
            (0, vector_store_validator_1.assertKnowledgeDocumentId)(id);
        }
        catch (error) {
            return this.failure(operation, id, chunks.length, startedAt, error);
        }
        chunks.forEach((chunk, itemIndex) => {
            try {
                prepared.push((0, vector_store_utils_1.prepareChunk)(chunk));
            }
            catch (error) {
                failed += 1;
                (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
                    event: "vector-store.warning",
                    level: "warn",
                    operation,
                    knowledgeDocumentId: id,
                    itemIndex,
                    message: (0, vector_store_utils_1.serializeVectorStoreError)(error).message,
                });
            }
        });
        try {
            this.assertUniqueIndexes(prepared);
        }
        catch (error) {
            return this.failure(operation, id, chunks.length, startedAt, error);
        }
        let affected = 0;
        let batchesProcessed = 0;
        for (let start = 0; start < prepared.length; start += this.batchSize) {
            const batchIndex = Math.floor(start / this.batchSize);
            const batch = prepared.slice(start, start + this.batchSize);
            try {
                const count = await this.database.transaction((transaction) => this.writeBatch(transaction, id, batch));
                affected += count;
                batchesProcessed += 1;
                (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
                    event: "vector-store.batch-completed",
                    level: "info",
                    operation,
                    knowledgeDocumentId: id,
                    batchIndex,
                    batchCount: batch.length,
                    affected: count,
                });
            }
            catch (error) {
                failed += batch.length;
                (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
                    event: "vector-store.error",
                    level: "error",
                    operation,
                    knowledgeDocumentId: id,
                    batchIndex,
                    error: (0, vector_store_utils_1.serializeVectorStoreError)(error),
                });
                if (!this.continueOnBatchError)
                    break;
            }
        }
        return this.completed(operation, id, chunks.length, affected, failed, batchesProcessed, startedAt);
    }
    writeBatch(transaction, id, batch) {
        return transaction.execute((0, vector_store_utils_1.buildUpsertQuery)(id, batch));
    }
    assertUniqueIndexes(chunks) {
        const indexes = new Set();
        for (const chunk of chunks) {
            if (indexes.has(chunk.chunkIndex))
                throw new Error(`Duplicate chunkIndex ${chunk.chunkIndex}`);
            indexes.add(chunk.chunkIndex);
        }
    }
    started(operation, id, requested) {
        (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
            event: "vector-store.started",
            level: "info",
            operation,
            knowledgeDocumentId: id,
            requested,
            batchSize: this.batchSize,
        });
    }
    completed(operation, id, requested, affected, failed, batchesProcessed, startedAt) {
        const result = {
            success: failed === 0,
            operation,
            requested,
            affected,
            failed,
            batchesProcessed,
            durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        };
        (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
            event: "vector-store.completed",
            level: "info",
            knowledgeDocumentId: id,
            result,
        });
        return result;
    }
    failure(operation, id, requested, startedAt, error, batchesProcessed = 0) {
        (0, vector_store_utils_1.emitVectorStoreLog)(this.logger, {
            event: "vector-store.error",
            level: "error",
            operation,
            knowledgeDocumentId: id,
            error: (0, vector_store_utils_1.serializeVectorStoreError)(error),
        });
        return this.completed(operation, id, requested, 0, Math.max(1, requested), batchesProcessed, startedAt);
    }
}
exports.PgVectorStoreService = PgVectorStoreService;
//# sourceMappingURL=vector-store.service.js.map