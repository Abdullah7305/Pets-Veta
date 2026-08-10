"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDocuments = exports.MarkdownLoader = exports.ProductionMarkdownLoader = void 0;
exports.loadMarkdownDocuments = loadMarkdownDocuments;
const node_path_1 = __importDefault(require("node:path"));
const node_perf_hooks_1 = require("node:perf_hooks");
const documents_1 = require("@langchain/core/documents");
const utils_1 = require("../../utils");
const markdown_service_1 = require("./markdown.service");
const markdown_utils_1 = require("./markdown.utils");
const markdown_validator_1 = require("./markdown.validator");
const DEFAULT_KNOWLEDGE_DIRECTORY = node_path_1.default.resolve(process.cwd(), "knowledge");
class ProductionMarkdownLoader {
    knowledgeDirectory;
    logger;
    fileService;
    constructor(options = {}) {
        this.knowledgeDirectory = node_path_1.default.resolve(options.knowledgeDirectory ?? DEFAULT_KNOWLEDGE_DIRECTORY);
        this.logger = options.logger ?? (0, markdown_utils_1.createMarkdownLoaderLogger)();
        this.fileService = options.fileService ?? new markdown_service_1.NodeMarkdownFileService();
    }
    async loadDocuments() {
        const startedAt = node_perf_hooks_1.performance.now();
        const documents = [];
        let totalFiles = 0;
        let skippedFiles = 0;
        let invalidMetadata = 0;
        let processingErrors = 0;
        this.logger.info({ event: "markdown-loader.started", knowledgeDirectory: this.knowledgeDirectory }, "Markdown loading started");
        let canonicalDirectory;
        try {
            canonicalDirectory = await this.fileService.assertKnowledgeDirectory(this.knowledgeDirectory);
        }
        catch (error) {
            this.logger.error({
                event: "markdown-loader.initialization-failed",
                knowledgeDirectory: this.knowledgeDirectory,
                error: (0, markdown_utils_1.serializeMarkdownError)(error),
            }, "Knowledge directory is unavailable");
            this.logCompleted(startedAt, {
                totalFiles,
                loadedFiles: 0,
                skippedFiles,
                invalidMetadata,
                processingErrors: 1,
                processingTimeMs: 0,
            });
            return documents;
        }
        let files;
        try {
            files = await this.fileService.scan(this.knowledgeDirectory);
            totalFiles = files.length;
            this.logger.info({ event: "markdown-loader.scan-completed", totalFiles }, "Markdown scan completed");
        }
        catch (error) {
            this.logger.error({ event: "markdown-loader.scan-failed", error: (0, markdown_utils_1.serializeMarkdownError)(error) }, "Unable to scan the knowledge directory");
            this.logCompleted(startedAt, {
                totalFiles,
                loadedFiles: 0,
                skippedFiles,
                invalidMetadata,
                processingErrors: 1,
                processingTimeMs: 0,
            });
            return documents;
        }
        for (const file of files) {
            const filePath = (0, markdown_utils_1.toPortableKnowledgePath)(file.relativePath);
            try {
                const rawMarkdown = await this.fileService.read(canonicalDirectory, file);
                const parsed = (0, utils_1.parseYamlFrontMatter)(rawMarkdown);
                const validation = (0, markdown_validator_1.validateMarkdownFrontMatter)(parsed.data);
                if (!validation.success) {
                    skippedFiles += 1;
                    invalidMetadata += 1;
                    this.logger.warn({
                        event: "markdown-loader.invalid-metadata",
                        filePath,
                        issues: validation.issues,
                    }, "Markdown file skipped because metadata is invalid");
                    continue;
                }
                if (!parsed.content.trim()) {
                    skippedFiles += 1;
                    this.logger.warn({ event: "markdown-loader.invalid-markdown", filePath }, "Markdown file skipped because it has no body content");
                    continue;
                }
                const metadata = (0, markdown_utils_1.createDocumentMetadata)(validation.metadata, file);
                documents.push(new documents_1.Document({
                    id: metadata.id,
                    pageContent: parsed.content,
                    metadata,
                }));
            }
            catch (error) {
                skippedFiles += 1;
                processingErrors += 1;
                this.logger.warn({
                    event: "markdown-loader.file-failed",
                    filePath,
                    error: (0, markdown_utils_1.serializeMarkdownError)(error),
                }, "Markdown file could not be processed and was skipped");
            }
        }
        this.logCompleted(startedAt, {
            totalFiles,
            loadedFiles: documents.length,
            skippedFiles,
            invalidMetadata,
            processingErrors,
            processingTimeMs: 0,
        });
        return documents;
    }
    logCompleted(startedAt, summary) {
        const completedSummary = {
            ...summary,
            processingTimeMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
        };
        this.logger.info({ event: "markdown-loader.completed", ...completedSummary }, "Markdown loading completed");
    }
}
exports.ProductionMarkdownLoader = ProductionMarkdownLoader;
exports.MarkdownLoader = ProductionMarkdownLoader;
async function loadMarkdownDocuments(options) {
    return new ProductionMarkdownLoader(options).loadDocuments();
}
exports.loadDocuments = loadMarkdownDocuments;
//# sourceMappingURL=markdown.loader.js.map