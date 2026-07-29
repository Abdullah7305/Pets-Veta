import type { MarkdownFrontMatter } from "./markdown-loader.interfaces";

export type MarkdownLoaderLogLevel = "info" | "warn" | "error";

export type MarkdownLoaderErrorStage =
  | "initialize"
  | "scan"
  | "read"
  | "parse"
  | "convert";

export type MarkdownLoaderSkipReason =
  | "invalid-metadata"
  | "symbolic-link";

export type MarkdownMetadataIssue = Readonly<{
  path: string;
  message: string;
}>;

export type SerializedLoaderError = Readonly<{
  name: string;
  message: string;
  code?: string;
}>;

export type MarkdownLoaderSummary = Readonly<{
  discovered: number;
  loaded: number;
  skipped: number;
  errors: number;
  durationMs: number;
}>;

type LogEntryBase = Readonly<{
  timestamp: string;
  level: MarkdownLoaderLogLevel;
}>;

export type MarkdownLoaderLogEntry =
  | (LogEntryBase & {
      event: "markdown-loader.started";
      level: "info";
      knowledgeDirectory: string;
    })
  | (LogEntryBase & {
      event: "markdown-loader.file-loaded";
      level: "info";
      filePath: string;
      documentId: string;
    })
  | (LogEntryBase & {
      event: "markdown-loader.file-skipped";
      level: "warn";
      filePath: string;
      reason: MarkdownLoaderSkipReason;
      issues?: readonly MarkdownMetadataIssue[];
    })
  | (LogEntryBase & {
      event: "markdown-loader.error";
      level: "error";
      stage: MarkdownLoaderErrorStage;
      error: SerializedLoaderError;
      filePath?: string;
    })
  | (LogEntryBase & {
      event: "markdown-loader.completed";
      level: "info";
      knowledgeDirectory: string;
      summary: MarkdownLoaderSummary;
    });

export type MarkdownLoaderLogPayload = MarkdownLoaderLogEntry extends infer Entry
  ? Entry extends MarkdownLoaderLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;

export type MarkdownMetadataValidationResult =
  | Readonly<{
      success: true;
      metadata: MarkdownFrontMatter;
    }>
  | Readonly<{
      success: false;
      issues: readonly MarkdownMetadataIssue[];
    }>;
