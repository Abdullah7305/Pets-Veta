import { performance } from "node:perf_hooks";

import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import type {
  ChunkMetadata,
  DocumentChunker,
  MarkdownChunkerOptions,
} from "./chunk.interface";
import {
  approximateTokenCount,
  emitChunkLog,
  JsonConsoleChunkLogger,
  serializeChunkError,
  splitMarkdownSections,
} from "./chunk.utils";

const DEFAULT_CHUNK_SIZE = 500;
const DEFAULT_CHUNK_OVERLAP = 50;

export class MarkdownChunker implements DocumentChunker {
  private readonly chunkSize: number;
  private readonly chunkOverlap: number;
  private readonly logger;
  private readonly continueOnError: boolean;

  constructor(options: MarkdownChunkerOptions = {}) {
    this.chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
    this.chunkOverlap = options.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
    this.logger = options.logger ?? new JsonConsoleChunkLogger();
    this.continueOnError = options.continueOnError ?? true;

    if (!Number.isInteger(this.chunkSize) || this.chunkSize <= 0) {
      throw new RangeError("chunkSize must be a positive integer");
    }
    if (
      !Number.isInteger(this.chunkOverlap) ||
      this.chunkOverlap < 0 ||
      this.chunkOverlap >= this.chunkSize
    ) {
      throw new RangeError("chunkOverlap must be an integer smaller than chunkSize");
    }
  }

  async splitDocuments(documents: readonly Document[]): Promise<Document[]> {
    const startedAt = performance.now();
    const chunks: Document[] = [];
    let warnings = 0;
    let errors = 0;

    emitChunkLog(this.logger, {
      event: "markdown-chunker.started",
      level: "info",
      documentCount: documents.length,
    });

    for (let documentIndex = 0; documentIndex < documents.length; documentIndex += 1) {
      const document = documents[documentIndex]!;
      const source = typeof document.metadata.source === "string"
        ? document.metadata.source
        : undefined;
      try {
        if (!document.pageContent.trim()) {
          warnings += 1;
          emitChunkLog(this.logger, {
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
        emitChunkLog(this.logger, {
          event: "markdown-chunker.document-processed",
          level: "info",
          documentIndex,
          ...(source ? { source } : {}),
          chunksCreated: documentChunks.length,
        });
      } catch (error) {
        errors += 1;
        emitChunkLog(this.logger, {
          event: "markdown-chunker.error",
          level: "error",
          documentIndex,
          ...(source ? { source } : {}),
          error: serializeChunkError(error),
        });
        if (!this.continueOnError) throw error;
      }
    }

    emitChunkLog(this.logger, {
      event: "markdown-chunker.completed",
      level: "info",
      summary: {
        documentsProcessed: documents.length,
        chunksCreated: chunks.length,
        warnings,
        errors,
        durationMs: Math.round(performance.now() - startedAt),
      },
    });
    return chunks;
  }

  private async splitDocument(document: Document): Promise<Document[]> {
    const output: Document[] = [];
    for (const section of splitMarkdownSections(document.pageContent)) {
      const prefix = section.headingLine ? `${section.headingLine}\n\n` : "";
      const prefixTokens = approximateTokenCount(prefix);
      const availableSize = Math.max(1, this.chunkSize - prefixTokens);
      const availableOverlap = Math.min(this.chunkOverlap, availableSize - 1);
      const bodyParts = await this.splitSectionBody(
        section.body,
        availableSize,
        Math.max(0, availableOverlap),
      );

      for (const body of bodyParts) {
        const pageContent = `${prefix}${body}`.trim();
        if (!pageContent) continue;
        const chunkIndex = output.length;
        const metadata: ChunkMetadata = {
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
        output.push(new Document({
          id: document.id ? `${document.id}#chunk-${chunkIndex}` : undefined,
          pageContent,
          metadata,
        }));
      }
    }
    return output;
  }

  private async splitSectionBody(
    body: string,
    chunkSize: number,
    chunkOverlap: number,
  ): Promise<string[]> {
    if (!body || approximateTokenCount(body) <= chunkSize) return [body];
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      keepSeparator: true,
      lengthFunction: approximateTokenCount,
      separators: ["\n\n", "\n", ". ", "! ", "? ", "; ", ", ", " ", ""],
    });
    return splitter.splitText(body);
  }
}

export async function chunkDocuments(
  documents: readonly Document[],
  options?: MarkdownChunkerOptions,
): Promise<Document[]> {
  return new MarkdownChunker(options).splitDocuments(documents);
}
