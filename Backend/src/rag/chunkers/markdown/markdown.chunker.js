"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownChunker = void 0;
exports.chunkDocuments = chunkDocuments;
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const chunk_constants_1 = require("./chunk.constants");
const chunking_service_1 = require("./chunking.service");
const chunk_utils_1 = require("./chunk.utils");
const chunk_validator_1 = require("./chunk.validator");
class MarkdownChunker {
    chunkSize;
    chunkOverlap;
    logger;
    splitterFactory;
    constructor(options = {}) {
        const configuration = (0, chunk_utils_1.resolveChunkingConfiguration)(options.chunkSize, options.chunkOverlap);
        (0, chunk_validator_1.validateChunkingConfiguration)(configuration.chunkSize, configuration.chunkOverlap);
        this.chunkSize = configuration.chunkSize;
        this.chunkOverlap = configuration.chunkOverlap;
        this.logger = options.logger ?? (0, chunk_utils_1.createChunkerLogger)();
        this.splitterFactory =
            options.splitterFactory ?? new chunking_service_1.LangChainTextSplitterFactory();
    }
    async chunkDocuments(documents) {
        const startedAt = node_perf_hooks_1.performance.now();
        const chunks = [];
        let skippedChunks = 0;
        let documentErrors = 0;
        let splitterErrors = 0;
        this.logger.info({
            event: "markdown-chunker.started",
            documentCount: documents.length,
            chunkSize: this.chunkSize,
            chunkOverlap: this.chunkOverlap,
        }, "Markdown chunking started");
        for (let documentIndex = 0; documentIndex < documents.length; documentIndex += 1) {
            const document = documents[documentIndex];
            try {
                if (!document.pageContent.trim()) {
                    skippedChunks += 1;
                    this.logger.warn({ event: "markdown-chunker.empty-document", documentIndex }, "Empty document skipped");
                    continue;
                }
                const documentChunks = [];
                for (const section of (0, chunk_utils_1.splitMarkdownIntoSections)(document.pageContent)) {
                    const result = await this.chunkSection(document, section, documentChunks.length);
                    documentChunks.push(...result.chunks);
                    skippedChunks += result.skipped;
                    splitterErrors += result.splitterErrors;
                }
                chunks.push(...documentChunks);
                this.logger.info({
                    event: "markdown-chunker.document-completed",
                    documentIndex,
                    source: document.metadata.source,
                    chunksCreated: documentChunks.length,
                }, "Document chunking completed");
            }
            catch (error) {
                documentErrors += 1;
                this.logger.error({
                    event: "markdown-chunker.document-failed",
                    documentIndex,
                    source: document.metadata.source,
                    error: (0, chunk_utils_1.serializeChunkerError)(error),
                }, "Document could not be chunked");
            }
        }
        const totalEstimatedTokens = chunks.reduce((total, chunk) => total + chunk.metadata.estimatedTokenCount, 0);
        const summary = {
            documentsProcessed: documents.length,
            totalChunksCreated: chunks.length,
            averageChunkSize: chunks.length === 0
                ? 0
                : Math.round((totalEstimatedTokens / chunks.length) * 100) / 100,
            skippedChunks,
            documentErrors,
            splitterErrors,
            processingTimeMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        };
        this.logger.info({ event: "markdown-chunker.completed", ...summary }, "Markdown chunking completed");
        return chunks;
    }
    async chunkSection(document, section, startIndex) {
        const bodyValidation = (0, chunk_validator_1.validateChunkContent)(section.body);
        if (!bodyValidation.valid) {
            return { chunks: [], skipped: 1, splitterErrors: 0 };
        }
        const prefix = section.headingLine ? `${section.headingLine}\n\n` : "";
        const prefixTokens = (0, chunk_utils_1.estimateChunkTokens)(prefix);
        const availableChunkSize = Math.max(1, this.chunkSize - prefixTokens);
        const availableOverlap = Math.min(this.chunkOverlap, Math.max(0, availableChunkSize - 1));
        let bodyParts;
        try {
            bodyParts =
                (0, chunk_utils_1.estimateChunkTokens)(bodyValidation.content) <= availableChunkSize
                    ? [bodyValidation.content]
                    : await this.splitterFactory
                        .create(availableChunkSize, availableOverlap)
                        .splitText(bodyValidation.content);
        }
        catch (error) {
            this.logger.warn({
                event: "markdown-chunker.splitter-failed",
                source: document.metadata.source,
                heading: section.heading,
                error: (0, chunk_utils_1.serializeChunkerError)(error),
            }, "Oversized section skipped after splitter failure");
            return { chunks: [], skipped: 1, splitterErrors: 1 };
        }
        const chunks = [];
        let skipped = 0;
        for (const bodyPart of bodyParts) {
            const validation = (0, chunk_validator_1.validateChunkContent)(`${prefix}${bodyPart}`);
            if (!validation.valid) {
                skipped += 1;
                continue;
            }
            const chunkIndex = startIndex + chunks.length;
            const source = typeof document.metadata.source === "string"
                ? document.metadata.source
                : "";
            const filePath = typeof document.metadata.filePath === "string"
                ? document.metadata.filePath
                : source;
            const metadata = {
                ...document.metadata,
                chunkIndex,
                heading: section.heading,
                ...(section.parentHeading
                    ? { parentHeading: section.parentHeading }
                    : {}),
                headingHierarchy: section.hierarchy,
                source,
                filePath,
                estimatedTokenCount: (0, chunk_utils_1.estimateChunkTokens)(validation.content),
            };
            chunks.push(new documents_1.Document({
                id: document.id
                    ? `${document.id}${chunk_constants_1.CHUNK_TRUNCATION_ID_SEPARATOR}${chunkIndex}`
                    : undefined,
                pageContent: validation.content,
                metadata,
            }));
        }
        return { chunks, skipped, splitterErrors: 0 };
    }
}
exports.MarkdownChunker = MarkdownChunker;
async function chunkDocuments(documents, options) {
    return new MarkdownChunker(options).chunkDocuments(documents);
}
//# sourceMappingURL=markdown.chunker.js.map