import path from "node:path";
import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import { parseYamlFrontMatter } from "../../utils";
import type {
  MarkdownDocumentLoader,
  MarkdownFileService,
  MarkdownLoaderOptions,
} from "./markdown.interface";
import { NodeMarkdownFileService } from "./markdown.service";
import type {
  MarkdownDocumentMetadata,
  MarkdownLoaderSummary,
} from "./markdown.types";
import {
  createDocumentMetadata,
  createMarkdownLoaderLogger,
  serializeMarkdownError,
  toPortableKnowledgePath,
} from "./markdown.utils";
import { validateMarkdownFrontMatter } from "./markdown.validator";

const DEFAULT_KNOWLEDGE_DIRECTORY = path.resolve(process.cwd(), "knowledge");

export class ProductionMarkdownLoader implements MarkdownDocumentLoader {
  private readonly knowledgeDirectory: string;
  private readonly logger: Logger;
  private readonly fileService: MarkdownFileService;

  constructor(options: MarkdownLoaderOptions = {}) {
    this.knowledgeDirectory = path.resolve(
      options.knowledgeDirectory ?? DEFAULT_KNOWLEDGE_DIRECTORY,
    );
    this.logger = options.logger ?? createMarkdownLoaderLogger();
    this.fileService = options.fileService ?? new NodeMarkdownFileService();
  }

  async loadDocuments(): Promise<Array<Document<MarkdownDocumentMetadata>>> {
    const startedAt = performance.now();
    const documents: Array<Document<MarkdownDocumentMetadata>> = [];
    let totalFiles = 0;
    let skippedFiles = 0;
    let invalidMetadata = 0;
    let processingErrors = 0;

    this.logger.info(
      { event: "markdown-loader.started", knowledgeDirectory: this.knowledgeDirectory },
      "Markdown loading started",
    );

    let canonicalDirectory: string;
    try {
      canonicalDirectory = await this.fileService.assertKnowledgeDirectory(
        this.knowledgeDirectory,
      );
    } catch (error) {
      this.logger.error(
        {
          event: "markdown-loader.initialization-failed",
          knowledgeDirectory: this.knowledgeDirectory,
          error: serializeMarkdownError(error),
        },
        "Knowledge directory is unavailable",
      );
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
      this.logger.info(
        { event: "markdown-loader.scan-completed", totalFiles },
        "Markdown scan completed",
      );
    } catch (error) {
      this.logger.error(
        { event: "markdown-loader.scan-failed", error: serializeMarkdownError(error) },
        "Unable to scan the knowledge directory",
      );
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
      const filePath = toPortableKnowledgePath(file.relativePath);
      try {
        const rawMarkdown = await this.fileService.read(canonicalDirectory, file);
        const parsed = parseYamlFrontMatter(rawMarkdown);
        const validation = validateMarkdownFrontMatter(parsed.data);

        if (!validation.success) {
          skippedFiles += 1;
          invalidMetadata += 1;
          this.logger.warn(
            {
              event: "markdown-loader.invalid-metadata",
              filePath,
              issues: validation.issues,
            },
            "Markdown file skipped because metadata is invalid",
          );
          continue;
        }
        if (!parsed.content.trim()) {
          skippedFiles += 1;
          this.logger.warn(
            { event: "markdown-loader.invalid-markdown", filePath },
            "Markdown file skipped because it has no body content",
          );
          continue;
        }

        const metadata = createDocumentMetadata(validation.metadata, file);
        documents.push(
          new Document<MarkdownDocumentMetadata>({
            id: metadata.id,
            pageContent: parsed.content,
            metadata,
          }),
        );
      } catch (error) {
        skippedFiles += 1;
        processingErrors += 1;
        this.logger.warn(
          {
            event: "markdown-loader.file-failed",
            filePath,
            error: serializeMarkdownError(error),
          },
          "Markdown file could not be processed and was skipped",
        );
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

  private logCompleted(
    startedAt: number,
    summary: MarkdownLoaderSummary,
  ): void {
    const completedSummary: MarkdownLoaderSummary = {
      ...summary,
      processingTimeMs: Math.round(performance.now() - startedAt),
    };
    this.logger.info(
      { event: "markdown-loader.completed", ...completedSummary },
      "Markdown loading completed",
    );
  }
}

export async function loadMarkdownDocuments(
  options?: MarkdownLoaderOptions,
): Promise<Array<Document<MarkdownDocumentMetadata>>> {
  return new ProductionMarkdownLoader(options).loadDocuments();
}

// Conventional names are available from the nested module while the explicit
// names avoid colliding with the legacy compatibility exports at src/rag.
export { ProductionMarkdownLoader as MarkdownLoader };
export const loadDocuments = loadMarkdownDocuments;
