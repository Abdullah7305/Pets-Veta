"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedDocuments = exports.EmbeddingService = void 0;
exports.generateEmbeddings = generateEmbeddings;
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const batch_processor_1 = require("./batch.processor");
const embedding_constants_1 = require("./embedding.constants");
const model_manager_1 = require("./model.manager");
const embedding_utils_1 = require("./embedding.utils");
const embedding_validator_1 = require("./embedding.validator");
class EmbeddingService {
    batchSize;
    modelName;
    logger;
    modelProvider;
    constructor(options = {}) {
        if (options.batchSize !== undefined)
            (0, embedding_validator_1.assertValidBatchSize)(options.batchSize);
        const configuration = (0, embedding_utils_1.resolveEmbeddingConfiguration)(options.modelProvider ? (options.modelName ?? embedding_constants_1.EMBEDDING_MODEL) : options.modelName, options.modelProvider
            ? (options.batchSize ?? embedding_constants_1.DEFAULT_EMBEDDING_BATCH_SIZE)
            : options.batchSize);
        (0, embedding_validator_1.assertValidBatchSize)(configuration.batchSize);
        if (!configuration.modelName.trim())
            throw new Error("modelName must not be empty");
        this.batchSize = configuration.batchSize;
        this.modelName = configuration.modelName;
        this.logger = options.logger ?? (0, embedding_utils_1.createEmbeddingLogger)();
        this.modelProvider =
            options.modelProvider ?? (() => model_manager_1.embeddingModelManager.getModel(this.modelName));
    }
    async generateEmbeddings(documents) {
        const startedAt = node_perf_hooks_1.performance.now();
        const validDocuments = documents.filter((document, index) => {
            if ((0, embedding_validator_1.isEmbeddableDocument)(document))
                return true;
            (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
                event: "embedding.error",
                level: "error",
                stage: "validation",
                documentIndex: index,
                error: { name: "ValidationError", message: "Document content is empty" },
            });
            return false;
        });
        const totalBatches = Math.ceil(validDocuments.length / this.batchSize);
        (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
            event: "embedding.started",
            level: "info",
            model: this.modelName,
            documentCount: documents.length,
            batchSize: this.batchSize,
            totalBatches,
        });
        if (validDocuments.length === 0) {
            this.emitCompleted(startedAt, documents.length, 0, documents.length, 0, 0);
            return [];
        }
        const model = await this.loadModel(startedAt, documents.length);
        if (!model)
            return [];
        let generatedCount = 0;
        const result = await new batch_processor_1.BatchProcessor(this.batchSize).process(validDocuments, async (batch, batchIndex) => {
            const batchStartedAt = node_perf_hooks_1.performance.now();
            const vectors = await model.embed(batch.map((document) => document.pageContent.trim()));
            (0, embedding_validator_1.assertValidEmbeddingBatch)(vectors, batch.length);
            const generatedAt = new Date().toISOString();
            const embedded = batch.map((document, index) => Object.assign(new documents_1.Document({
                id: document.id,
                pageContent: document.pageContent.trim(),
                metadata: {
                    ...document.metadata,
                    embeddingModel: this.modelName,
                    embeddingDimension: embedding_constants_1.EMBEDDING_DIMENSION,
                    generatedAt,
                },
            }), { embedding: vectors[index] }));
            generatedCount += embedded.length;
            (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
                event: "embedding.batch-completed",
                level: "info",
                batchIndex,
                totalBatches,
                batchDocumentCount: batch.length,
                totalEmbeddingsGenerated: generatedCount,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - batchStartedAt),
            });
            return embedded;
        }, (error, batch, batchIndex) => {
            (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
                event: "embedding.error",
                level: "error",
                stage: "batch",
                batchIndex,
                batchDocumentCount: batch.length,
                error: (0, embedding_utils_1.serializeEmbeddingError)(error),
            });
        });
        this.emitCompleted(startedAt, documents.length, result.values.length, documents.length - result.values.length, result.processedBatches, result.failedBatches);
        return result.values;
    }
    /** Compatibility alias for existing retriever consumers. */
    embedDocuments(documents) {
        return this.generateEmbeddings(documents);
    }
    async loadModel(startedAt, documentCount) {
        const modelStartedAt = node_perf_hooks_1.performance.now();
        (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
            event: "embedding.model-loading",
            level: "info",
            model: this.modelName,
        });
        try {
            const model = await this.modelProvider();
            (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
                event: "embedding.model-loaded",
                level: "info",
                model: this.modelName,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - modelStartedAt),
            });
            return model;
        }
        catch (error) {
            (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
                event: "embedding.error",
                level: "error",
                stage: "model-load",
                error: (0, embedding_utils_1.serializeEmbeddingError)(error),
            });
            this.emitCompleted(startedAt, documentCount, 0, documentCount, 0, 0);
            return undefined;
        }
    }
    emitCompleted(startedAt, documentsReceived, embeddingsGenerated, failedDocuments, batchesProcessed, failedBatches) {
        const durationMs = Math.round(node_perf_hooks_1.performance.now() - startedAt);
        (0, embedding_utils_1.emitEmbeddingLog)(this.logger, {
            event: "embedding.completed",
            level: "info",
            summary: {
                documentsReceived,
                embeddingsGenerated,
                failedDocuments,
                batchesProcessed,
                failedBatches,
                durationMs,
                averageProcessingTimeMs: embeddingsGenerated === 0 ? 0 : Math.round((durationMs / embeddingsGenerated) * 100) / 100,
            },
        });
    }
}
exports.EmbeddingService = EmbeddingService;
async function generateEmbeddings(documents, options) {
    return new EmbeddingService(options).generateEmbeddings(documents);
}
exports.embedDocuments = generateEmbeddings;
//# sourceMappingURL=embedding.service.js.map