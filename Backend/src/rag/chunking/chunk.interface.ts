import type { Document } from "@langchain/core/documents";

import type { ChunkLogEntry, HeadingHierarchy } from "./chunk.types";

export interface ChunkMetadata extends Record<string, unknown> {
  chunkIndex: number;
  heading: string;
  headingHierarchy: HeadingHierarchy;
  title: unknown;
  animal: unknown;
  category: unknown;
  source: unknown;
  filePath: unknown;
}

export interface ChunkLogger {
  log(entry: ChunkLogEntry): void;
}

export interface MarkdownChunkerOptions {
  /** Approximate token target. Defaults to 500. */
  chunkSize?: number;
  /** Approximate token overlap. Defaults to 50. */
  chunkOverlap?: number;
  logger?: ChunkLogger;
  /** Continue processing subsequent documents after a per-document error. */
  continueOnError?: boolean;
}

export interface DocumentChunker {
  splitDocuments(documents: readonly Document[]): Promise<Document[]>;
}
