"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownChunker = void 0;
exports.chunkDocuments = chunkDocuments;
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const textsplitters_1 = require("@langchain/textsplitters");
const chunk_utils_1 = require("./chunk.utils");
const DEFAULT_CHUNK_SIZE = 500;
const DEFAULT_CHUNK_OVERLAP = 50;
class MarkdownChunker {
    chunkSize;
    chunkOverlap;
    logger;
    continueOnError;
    constructor(options = {}) {
        this.chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
        this.chunkOverlap = options.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
        this.logger = options.logger ?? new chunk_utils_1.JsonConsoleChunkLogger();
        this.continueOnError = options.continueOnError ?? true;
        if (!Number.isInteger(this.chunkSize) || this.chunkSize <= 0) {
            throw new RangeError("chunkSize must be a positive integer");
        }
        if (!Number.isInteger(this.chunkOverlap) ||
            this.chunkOverlap < 0 ||
            this.chunkOverlap >= this.chunkSize) {
            throw new RangeError("chunkOverlap must be an integer smaller than chunkSize");
        }
    }
    async splitDocuments(documents) {
        const startedAt = node_perf_hooks_1.performance.now();
        const chunks = [];
        let warnings = 0;
        let errors = 0;
        (0, chunk_utils_1.emitChunkLog)(this.logger, {
            event: "markdown-chunker.started",
            level: "info",
            documentCount: documents.length,
        });
        for (let documentIndex = 0; documentIndex < documents.length; documentIndex += 1) {
            const document = documents[documentIndex];
            const source = typeof document.metadata.source === "string"
                ? document.metadata.source
                : undefined;
            try {
                if (!document.pageContent.trim()) {
                    warnings += 1;
                    (0, chunk_utils_1.emitChunkLog)(this.logger, {
                        event: "markdown-chunker.warning",
                        level: "warn",
                        documentIndex,
                        ...(source ? { source } : {}),
                        message: "Document has no chunkable content",
                    });
                    continue;
                }
                const documentChunks = await this.splitDocument(document);
                chunks.push(...documentChunks);
                (0, chunk_utils_1.emitChunkLog)(this.logger, {
                    event: "markdown-chunker.document-processed",
                    level: "info",
                    documentIndex,
                    ...(source ? { source } : {}),
                    chunksCreated: documentChunks.length,
                });
            }
            catch (error) {
                errors += 1;
                (0, chunk_utils_1.emitChunkLog)(this.logger, {
                    event: "markdown-chunker.error",
                    level: "error",
                    documentIndex,
                    ...(source ? { source } : {}),
                    error: (0, chunk_utils_1.serializeChunkError)(error),
                });
                if (!this.continueOnError)
                    throw error;
            }
        }
        (0, chunk_utils_1.emitChunkLog)(this.logger, {
            event: "markdown-chunker.completed",
            level: "info",
            summary: {
                documentsProcessed: documents.length,
                chunksCreated: chunks.length,
                warnings,
                errors,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
            },
        });
        return chunks;
    }
    async splitDocument(document) {
        const output = [];
        for (const section of (0, chunk_utils_1.splitMarkdownSections)(document.pageContent)) {
            const prefix = section.headingLine ? `${section.headingLine}\n\n` : "";
            const prefixTokens = (0, chunk_utils_1.approximateTokenCount)(prefix);
            const availableSize = Math.max(1, this.chunkSize - prefixTokens);
            const availableOverlap = Math.min(this.chunkOverlap, availableSize - 1);
            const bodyParts = await this.splitSectionBody(section.body, availableSize, Math.max(0, availableOverlap));
            for (const body of bodyParts) {
                const pageContent = `${prefix}${body}`.trim();
                if (!pageContent)
                    continue;
                const chunkIndex = output.length;
                const metadata = {
                    ...document.metadata,
                    chunkIndex,
                    heading: section.heading,
                    headingHierarchy: section.hierarchy,
                    title: document.metadata.title,
                    animal: document.metadata.animal,
                    category: document.metadata.category,
                    source: document.metadata.source,
                    filePath: document.metadata.filePath,
                };
                output.push(new documents_1.Document({
                    id: document.id ? `${document.id}#chunk-${chunkIndex}` : undefined,
                    pageContent,
                    metadata,
                }));
            }
        }
        return output;
    }
    async splitSectionBody(body, chunkSize, chunkOverlap) {
        if (!body || (0, chunk_utils_1.approximateTokenCount)(body) <= chunkSize)
            return [body];
        const splitter = new textsplitters_1.RecursiveCharacterTextSplitter({
            chunkSize,
            chunkOverlap,
            keepSeparator: true,
            lengthFunction: chunk_utils_1.approximateTokenCount,
            separators: ["\n\n", "\n", ". ", "! ", "? ", "; ", ", ", " ", ""],
        });
        return splitter.splitText(body);
    }
}
exports.MarkdownChunker = MarkdownChunker;
async function chunkDocuments(documents, options) {
    return new MarkdownChunker(options).splitDocuments(documents);
}
//# sourceMappingURL=markdown.chunker.js.map