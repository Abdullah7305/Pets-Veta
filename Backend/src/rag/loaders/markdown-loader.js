"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownLoader = void 0;
exports.loadDocuments = loadDocuments;
const node_path_1 = __importDefault(require("node:path"));
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const markdown_loader_constants_1 = require("../constants/markdown-loader.constants");
const utils_1 = require("../utils");
class MarkdownLoader {
    knowledgeDirectory;
    logger;
    constructor(options = {}) {
        this.knowledgeDirectory = node_path_1.default.resolve(options.knowledgeDirectory ?? markdown_loader_constants_1.DEFAULT_KNOWLEDGE_DIRECTORY);
        this.logger = options.logger ?? new utils_1.JsonConsoleMarkdownLoaderLogger();
    }
    async loadDocuments() {
        const startedAt = node_perf_hooks_1.performance.now();
        let loaded = 0;
        let skipped = 0;
        let errors = 0;
        (0, utils_1.emitLoaderLog)(this.logger, {
            event: "markdown-loader.started",
            level: "info",
            knowledgeDirectory: this.knowledgeDirectory,
        });
        let canonicalKnowledgeDirectory;
        try {
            canonicalKnowledgeDirectory = await (0, utils_1.assertKnowledgeDirectory)(this.knowledgeDirectory);
        }
        catch (error) {
            (0, utils_1.emitLoaderLog)(this.logger, {
                event: "markdown-loader.error",
                level: "error",
                stage: "initialize",
                error: (0, utils_1.serializeLoaderError)(error),
            });
            throw error;
        }
        let scanResult;
        try {
            scanResult = await (0, utils_1.scanMarkdownFiles)(this.knowledgeDirectory);
        }
        catch (error) {
            (0, utils_1.emitLoaderLog)(this.logger, {
                event: "markdown-loader.error",
                level: "error",
                stage: "scan",
                error: (0, utils_1.serializeLoaderError)(error),
            });
            throw error;
        }
        for (const scanError of scanResult.errors) {
            errors += 1;
            (0, utils_1.emitLoaderLog)(this.logger, {
                event: "markdown-loader.error",
                level: "error",
                stage: "scan",
                filePath: this.safeKnowledgePath(scanError.filePath),
                error: (0, utils_1.serializeLoaderError)(scanError.error),
            });
        }
        for (const symbolicLink of scanResult.symbolicLinks) {
            skipped += 1;
            (0, utils_1.emitLoaderLog)(this.logger, {
                event: "markdown-loader.file-skipped",
                level: "warn",
                filePath: this.safeKnowledgePath(symbolicLink),
                reason: "symbolic-link",
            });
        }
        const documents = [];
        for (const filePath of scanResult.files) {
            const knowledgeFilePath = this.safeKnowledgePath(filePath);
            let rawContent;
            try {
                rawContent = await (0, utils_1.readMarkdownFileSafely)(canonicalKnowledgeDirectory, filePath);
            }
            catch (error) {
                errors += 1;
                (0, utils_1.emitLoaderLog)(this.logger, {
                    event: "markdown-loader.error",
                    level: "error",
                    stage: "read",
                    filePath: knowledgeFilePath,
                    error: (0, utils_1.serializeLoaderError)(error),
                });
                continue;
            }
            let parsedFile;
            try {
                parsedFile = (0, utils_1.parseYamlFrontMatter)(rawContent);
            }
            catch (error) {
                errors += 1;
                (0, utils_1.emitLoaderLog)(this.logger, {
                    event: "markdown-loader.error",
                    level: "error",
                    stage: "parse",
                    filePath: knowledgeFilePath,
                    error: (0, utils_1.serializeLoaderError)(error),
                });
                continue;
            }
            const validation = (0, utils_1.validateMarkdownMetadata)(parsedFile.data);
            if (!validation.success) {
                skipped += 1;
                (0, utils_1.emitLoaderLog)(this.logger, {
                    event: "markdown-loader.file-skipped",
                    level: "warn",
                    filePath: knowledgeFilePath,
                    reason: "invalid-metadata",
                    issues: validation.issues,
                });
                continue;
            }
            try {
                const metadata = {
                    ...validation.metadata,
                    source: knowledgeFilePath,
                    filePath: knowledgeFilePath,
                    fileType: markdown_loader_constants_1.MARKDOWN_FILE_TYPE,
                };
                const document = new documents_1.Document({
                    id: metadata.id,
                    pageContent: parsedFile.content,
                    metadata,
                });
                documents.push(document);
                loaded += 1;
                (0, utils_1.emitLoaderLog)(this.logger, {
                    event: "markdown-loader.file-loaded",
                    level: "info",
                    filePath: knowledgeFilePath,
                    documentId: metadata.id,
                });
            }
            catch (error) {
                errors += 1;
                (0, utils_1.emitLoaderLog)(this.logger, {
                    event: "markdown-loader.error",
                    level: "error",
                    stage: "convert",
                    filePath: knowledgeFilePath,
                    error: (0, utils_1.serializeLoaderError)(error),
                });
            }
        }
        const summary = {
            discovered: scanResult.files.length + scanResult.symbolicLinks.length,
            loaded,
            skipped,
            errors,
            durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        };
        (0, utils_1.emitLoaderLog)(this.logger, {
            event: "markdown-loader.completed",
            level: "info",
            knowledgeDirectory: this.knowledgeDirectory,
            summary,
        });
        return documents;
    }
    safeKnowledgePath(filePath) {
        try {
            return (0, utils_1.toKnowledgeFilePath)(this.knowledgeDirectory, filePath);
        }
        catch {
            return "knowledge/[unavailable]";
        }
    }
}
exports.MarkdownLoader = MarkdownLoader;
async function loadDocuments(options) {
    return new MarkdownLoader(options).loadDocuments();
}
//# sourceMappingURL=markdown-loader.js.map