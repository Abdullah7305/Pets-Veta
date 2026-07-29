import type { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import type {
  MarkdownChunkDocument,
  MarkdownSection,
} from "./chunk.types";

export interface TextSplitter {
  splitText(text: string): Promise<string[]>;
}

export interface TextSplitterFactory {
  create(chunkSize: number, chunkOverlap: number): TextSplitter;
}

export interface ChunkingConfiguration {
  chunkSize: number;
  chunkOverlap: number;
}

export interface MarkdownChunkerOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  logger?: Logger;
  splitterFactory?: TextSplitterFactory;
}

export interface MarkdownSectionParser {
  parse(markdown: string): MarkdownSection[];
}

export interface DocumentChunker {
  chunkDocuments(documents: readonly Document[]): Promise<MarkdownChunkDocument[]>;
}
