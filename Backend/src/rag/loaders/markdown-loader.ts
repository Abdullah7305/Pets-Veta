import path from "node:path";
import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";

import {
  DEFAULT_KNOWLEDGE_DIRECTORY,
  MARKDOWN_FILE_TYPE,
} from "../constants/markdown-loader.constants";
import type {
  MarkdownDocumentLoader,
  MarkdownDocumentMetadata,
  MarkdownLoaderLogger,
  MarkdownLoaderOptions,
} from "../types/markdown-loader.interfaces";
import type { MarkdownLoaderSummary } from "../types/markdown-loader.types";
import {
  assertKnowledgeDirectory,
  emitLoaderLog,
  JsonConsoleMarkdownLoaderLogger,
  parseYamlFrontMatter,
  readMarkdownFileSafely,
  scanMarkdownFiles,
  serializeLoaderError,
  toKnowledgeFilePath,
  validateMarkdownMetadata,
} from "../utils";

export class MarkdownLoader implements MarkdownDocumentLoader {
  private readonly knowledgeDirectory: string;
  private readonly logger: MarkdownLoaderLogger;

  constructor(options: MarkdownLoaderOptions = {}) {
    this.knowledgeDirectory = path.resolve(
      options.knowledgeDirectory ?? DEFAULT_KNOWLEDGE_DIRECTORY,
    );
    this.logger = options.logger ?? new JsonConsoleMarkdownLoaderLogger();
  }

  async loadDocuments(): Promise<Document[]> {
    const startedAt = performance.now();
    let loaded = 0;
    let skipped = 0;
    let errors = 0;

    emitLoaderLog(this.logger, {
      event: "markdown-loader.started",
      level: "info",
      knowledgeDirectory: this.knowledgeDirectory,
    });

    let canonicalKnowledgeDirectory: string;

    try {
      canonicalKnowledgeDirectory = await assertKnowledgeDirectory(
        this.knowledgeDirectory,
      );
    } catch (error) {
      emitLoaderLog(this.logger, {
        event: "markdown-loader.error",
        level: "error",
        stage: "initialize",
        error: serializeLoaderError(error),
      });
      throw error;
    }

    let scanResult;

    try {
      scanResult = await scanMarkdownFiles(this.knowledgeDirectory);
    } catch (error) {
      emitLoaderLog(this.logger, {
        event: "markdown-loader.error",
        level: "error",
        stage: "scan",
        error: serializeLoaderError(error),
      });
      throw error;
    }

    for (const scanError of scanResult.errors) {
      errors += 1;
      emitLoaderLog(this.logger, {
        event: "markdown-loader.error",
        level: "error",
        stage: "scan",
        filePath: this.safeKnowledgePath(scanError.filePath),
        error: serializeLoaderError(scanError.error),
      });
    }

    for (const symbolicLink of scanResult.symbolicLinks) {
      skipped += 1;
      emitLoaderLog(this.logger, {
        event: "markdown-loader.file-skipped",
        level: "warn",
        filePath: this.safeKnowledgePath(symbolicLink),
        reason: "symbolic-link",
      });
    }

    const documents: Document[] = [];

    for (const filePath of scanResult.files) {
      const knowledgeFilePath = this.safeKnowledgePath(filePath);
      let rawContent: string;

      try {
        rawContent = await readMarkdownFileSafely(
          canonicalKnowledgeDirectory,
          filePath,
        );
      } catch (error) {
        errors += 1;
        emitLoaderLog(this.logger, {
          event: "markdown-loader.error",
          level: "error",
          stage: "read",
          filePath: knowledgeFilePath,
          error: serializeLoaderError(error),
        });
        continue;
      }

      let parsedFile;

      try {
        parsedFile = parseYamlFrontMatter(rawContent);
      } catch (error) {
        errors += 1;
        emitLoaderLog(this.logger, {
          event: "markdown-loader.error",
          level: "error",
          stage: "parse",
          filePath: knowledgeFilePath,
          error: serializeLoaderError(error),
        });
        continue;
      }

      const validation = validateMarkdownMetadata(parsedFile.data);

      if (!validation.success) {
        skipped += 1;
        emitLoaderLog(this.logger, {
          event: "markdown-loader.file-skipped",
          level: "warn",
          filePath: knowledgeFilePath,
          reason: "invalid-metadata",
          issues: validation.issues,
        });
        continue;
      }

      try {
        const metadata: MarkdownDocumentMetadata = {
          ...validation.metadata,
          source: knowledgeFilePath,
          filePath: knowledgeFilePath,
          fileType: MARKDOWN_FILE_TYPE,
        };

        const document = new Document<MarkdownDocumentMetadata>({
          id: metadata.id,
          pageContent: parsedFile.content,
          metadata,
        });

        documents.push(document);
        loaded += 1;
        emitLoaderLog(this.logger, {
          event: "markdown-loader.file-loaded",
          level: "info",
          filePath: knowledgeFilePath,
          documentId: metadata.id,
        });
      } catch (error) {
        errors += 1;
        emitLoaderLog(this.logger, {
          event: "markdown-loader.error",
          level: "error",
          stage: "convert",
          filePath: knowledgeFilePath,
          error: serializeLoaderError(error),
        });
      }
    }

    const summary: MarkdownLoaderSummary = {
      discovered: scanResult.files.length + scanResult.symbolicLinks.length,
      loaded,
      skipped,
      errors,
      durationMs: Math.round(performance.now() - startedAt),
    };

    emitLoaderLog(this.logger, {
      event: "markdown-loader.completed",
      level: "info",
      knowledgeDirectory: this.knowledgeDirectory,
      summary,
    });

    return documents;
  }

  private safeKnowledgePath(filePath: string): string {
    try {
      return toKnowledgeFilePath(this.knowledgeDirectory, filePath);
    } catch {
      return "knowledge/[unavailable]";
    }
  }
}

export async function loadDocuments(
  options?: MarkdownLoaderOptions,
): Promise<Document[]> {
  return new MarkdownLoader(options).loadDocuments();
}
