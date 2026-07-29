import type { Document } from "@langchain/core/documents";

import type { MarkdownLoaderLogEntry } from "./markdown-loader.types";

export interface MarkdownFrontMatter {
  [key: string]: unknown;
  id: string;
  title: string;
  animal: string;
  category: string;
}

export interface MarkdownDocumentMetadata extends MarkdownFrontMatter {
  source: string;
  filePath: string;
  fileType: "markdown";
}

export interface MarkdownLoaderLogger {
  log(entry: MarkdownLoaderLogEntry): void;
}

export interface MarkdownLoaderOptions {
  knowledgeDirectory?: string;
  logger?: MarkdownLoaderLogger;
}

export interface MarkdownDocumentLoader {
  loadDocuments(): Promise<Document[]>;
}

export interface MarkdownFileScanIssue {
  filePath: string;
  error: unknown;
}

export interface MarkdownFileScanResult {
  files: readonly string[];
  symbolicLinks: readonly string[];
  errors: readonly MarkdownFileScanIssue[];
}

export interface ParsedMarkdownFile {
  content: string;
  data: unknown;
}
