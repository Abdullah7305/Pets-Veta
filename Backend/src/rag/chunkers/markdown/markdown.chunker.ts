import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import { CHUNK_TRUNCATION_ID_SEPARATOR } from "./chunk.constants";
import type {
  DocumentChunker,
  MarkdownChunkerOptions,
  TextSplitterFactory,
} from "./chunk.interface";
import { LangChainTextSplitterFactory } from "./chunking.service";
import type {
  ChunkingSummary,
  MarkdownChunkDocument,
  MarkdownChunkMetadata,
  MarkdownSection,
} from "./chunk.types";
import {
  createChunkerLogger,
  estimateChunkTokens,
  resolveChunkingConfiguration,
  serializeChunkerError,
  splitMarkdownIntoSections,
} from "./chunk.utils";
import {
  validateChunkContent,
  validateChunkingConfiguration,
} from "./chunk.validator";

export class MarkdownChunker implements DocumentChunker {
  private readonly chunkSize: number;
  private readonly chunkOverlap: number;
  private readonly logger: Logger;
  private readonly splitterFactory: TextSplitterFactory;

  constructor(options: MarkdownChunkerOptions = {}) {
    const configuration = resolveChunkingConfiguration(
      options.chunkSize,
      options.chunkOverlap,
    );
    validateChunkingConfiguration(
      configuration.chunkSize,
      configuration.chunkOverlap,
    );
    this.chunkSize = configuration.chunkSize;
    this.chunkOverlap = configuration.chunkOverlap;
    this.logger = options.logger ?? createChunkerLogger();
    this.splitterFactory =
      options.splitterFactory ?? new LangChainTextSplitterFactory();
  }

  async chunkDocuments(
    documents: readonly Document[],
  ): Promise<MarkdownChunkDocument[]> {
    const startedAt = performance.now();
    const chunks: MarkdownChunkDocument[] = [];
    let skippedChunks = 0;
    let documentErrors = 0;
    let splitterErrors = 0;

    this.logger.info(
      {
        event: "markdown-chunker.started",
        documentCount: documents.length,
        chunkSize: this.chunkSize,
        chunkOverlap: this.chunkOverlap,
      },
      "Markdown chunking started",
    );

    for (let documentIndex = 0; documentIndex < documents.length; documentIndex += 1) {
      const document = documents[documentIndex]!;
      try {
        if (!document.pageContent.trim()) {
          skippedChunks += 1;
          this.logger.warn(
            { event: "markdown-chunker.empty-document", documentIndex },
            "Empty document skipped",
          );
          continue;
        }

        const documentChunks: MarkdownChunkDocument[] = [];
        for (const section of splitMarkdownIntoSections(document.pageContent)) {
          const result = await this.chunkSection(
            document,
            section,
            documentChunks.length,
          );
          documentChunks.push(...result.chunks);
          skippedChunks += result.skipped;
          splitterErrors += result.splitterErrors;
        }
        chunks.push(...documentChunks);
        this.logger.info(
          {
            event: "markdown-chunker.document-completed",
            documentIndex,
            source: document.metadata.source,
            chunksCreated: documentChunks.length,
          },
          "Document chunking completed",
        );
      } catch (error) {
        documentErrors += 1;
        this.logger.error(
          {
            event: "markdown-chunker.document-failed",
            documentIndex,
            source: document.metadata.source,
            error: serializeChunkerError(error),
          },
          "Document could not be chunked",
        );
      }
    }

    const totalEstimatedTokens = chunks.reduce(
      (total, chunk) => total + chunk.metadata.estimatedTokenCount,
      0,
    );
    const summary: ChunkingSummary = {
      documentsProcessed: documents.length,
      totalChunksCreated: chunks.length,
      averageChunkSize:
        chunks.length === 0
          ? 0
          : Math.round((totalEstimatedTokens / chunks.length) * 100) / 100,
      skippedChunks,
      documentErrors,
      splitterErrors,
      processingTimeMs: Math.round(performance.now() - startedAt),
    };
    this.logger.info(
      { event: "markdown-chunker.completed", ...summary },
      "Markdown chunking completed",
    );
    return chunks;
  }

  private async chunkSection(
    document: Document,
    section: MarkdownSection,
    startIndex: number,
  ): Promise<Readonly<{
    chunks: MarkdownChunkDocument[];
    skipped: number;
    splitterErrors: number;
  }>> {
    const bodyValidation = validateChunkContent(section.body);
    if (!bodyValidation.valid) {
      return { chunks: [], skipped: 1, splitterErrors: 0 };
    }

    const prefix = section.headingLine ? `${section.headingLine}\n\n` : "";
    const prefixTokens = estimateChunkTokens(prefix);
    const availableChunkSize = Math.max(1, this.chunkSize - prefixTokens);
    const availableOverlap = Math.min(
      this.chunkOverlap,
      Math.max(0, availableChunkSize - 1),
    );
    let bodyParts: string[];

    try {
      bodyParts =
        estimateChunkTokens(bodyValidation.content) <= availableChunkSize
          ? [bodyValidation.content]
          : await this.splitterFactory
              .create(availableChunkSize, availableOverlap)
              .splitText(bodyValidation.content);
    } catch (error) {
      this.logger.warn(
        {
          event: "markdown-chunker.splitter-failed",
          source: document.metadata.source,
          heading: section.heading,
          error: serializeChunkerError(error),
        },
        "Oversized section skipped after splitter failure",
      );
      return { chunks: [], skipped: 1, splitterErrors: 1 };
    }

    const chunks: MarkdownChunkDocument[] = [];
    let skipped = 0;
    for (const bodyPart of bodyParts) {
      const validation = validateChunkContent(`${prefix}${bodyPart}`);
      if (!validation.valid) {
        skipped += 1;
        continue;
      }
      const chunkIndex = startIndex + chunks.length;
      const source =
        typeof document.metadata.source === "string"
          ? document.metadata.source
          : "";
      const filePath =
        typeof document.metadata.filePath === "string"
          ? document.metadata.filePath
          : source;
      const metadata: MarkdownChunkMetadata = {
        ...document.metadata,
        chunkIndex,
        heading: section.heading,
        ...(section.parentHeading
          ? { parentHeading: section.parentHeading }
          : {}),
        headingHierarchy: section.hierarchy,
        source,
        filePath,
        estimatedTokenCount: estimateChunkTokens(validation.content),
      };
      chunks.push(
        new Document<MarkdownChunkMetadata>({
          id: document.id
            ? `${document.id}${CHUNK_TRUNCATION_ID_SEPARATOR}${chunkIndex}`
            : undefined,
          pageContent: validation.content,
          metadata,
        }),
      );
    }
    return { chunks, skipped, splitterErrors: 0 };
  }
}

export async function chunkDocuments(
  documents: readonly Document[],
  options?: MarkdownChunkerOptions,
): Promise<MarkdownChunkDocument[]> {
  return new MarkdownChunker(options).chunkDocuments(documents);
}
