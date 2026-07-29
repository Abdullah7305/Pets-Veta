export type ChunkLogLevel = "info" | "warn" | "error";

export type HeadingHierarchy = Readonly<{
  h1?: string;
  h2?: string;
  h3?: string;
}>;

export type ChunkingSummary = Readonly<{
  documentsProcessed: number;
  chunksCreated: number;
  warnings: number;
  errors: number;
  durationMs: number;
}>;

type ChunkLogBase = Readonly<{
  timestamp: string;
  level: ChunkLogLevel;
}>;

export type ChunkLogEntry =
  | (ChunkLogBase & {
      event: "markdown-chunker.started";
      level: "info";
      documentCount: number;
    })
  | (ChunkLogBase & {
      event: "markdown-chunker.document-processed";
      level: "info";
      documentIndex: number;
      source?: string;
      chunksCreated: number;
    })
  | (ChunkLogBase & {
      event: "markdown-chunker.warning";
      level: "warn";
      documentIndex: number;
      source?: string;
      message: string;
    })
  | (ChunkLogBase & {
      event: "markdown-chunker.error";
      level: "error";
      documentIndex: number;
      source?: string;
      error: Readonly<{ name: string; message: string }>;
    })
  | (ChunkLogBase & {
      event: "markdown-chunker.completed";
      level: "info";
      summary: ChunkingSummary;
    });

export type ChunkLogPayload = ChunkLogEntry extends infer Entry
  ? Entry extends ChunkLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;
