import type { Document } from "@langchain/core/documents";

export type HeadingLevel = 1 | 2 | 3;

export type HeadingHierarchy = Readonly<{
  h1?: string;
  h2?: string;
  h3?: string;
}>;

export interface MarkdownSection {
  heading: string;
  parentHeading?: string;
  headingLine: string;
  body: string;
  level?: HeadingLevel;
  hierarchy: HeadingHierarchy;
}

export interface MarkdownChunkMetadata extends Record<string, unknown> {
  chunkIndex: number;
  heading: string;
  parentHeading?: string;
  headingHierarchy: HeadingHierarchy;
  source: string;
  filePath: string;
  estimatedTokenCount: number;
}

export type MarkdownChunkDocument = Document<MarkdownChunkMetadata>;

export interface ChunkingSummary {
  documentsProcessed: number;
  totalChunksCreated: number;
  averageChunkSize: number;
  skippedChunks: number;
  documentErrors: number;
  splitterErrors: number;
  processingTimeMs: number;
}

export type ChunkValidationResult =
  | Readonly<{ valid: true; content: string }>
  | Readonly<{ valid: false; reason: "empty" | "formatting-only" }>;
