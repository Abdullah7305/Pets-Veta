export type RetrieverFilters = Readonly<{
  animal?: "dog" | "cat" | "bird" | "rabbit" | "general";
  category?: string;
  subCategory?: string;
}>;

export type RetrievalResult = Readonly<{
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}>;

export type RetrieverLogLevel = "info" | "warn" | "error";

export type RetrieverLogEntry =
  | Readonly<{
      timestamp: string;
      event: "retriever.query-received";
      level: "info";
      queryLength: number;
      topK: number;
      minimumSimilarity: number;
      filters: RetrieverFilters;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.embedding-cache";
      level: "info";
      outcome: "hit" | "miss" | "coalesced";
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.embedding-generated";
      level: "info";
      dimensions: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.database-connected";
      level: "info";
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.search-completed";
      level: "info";
      candidatesReturned: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.chunks-filtered";
      level: "info";
      duplicateChunksRemoved: number;
      lowSimilarityChunksRemoved: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.results-returned";
      level: "info";
      resultCount: number;
      durationMs: number;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.warning";
      level: "warn";
      message: string;
    }>
  | Readonly<{
      timestamp: string;
      event: "retriever.error";
      level: "error";
      stage: "embedding" | "connection" | "search";
      error: Readonly<{ name: string; message: string; code?: string }>;
    }>;

export type RetrieverLogPayload = RetrieverLogEntry extends infer Entry
  ? Entry extends RetrieverLogEntry
    ? Omit<Entry, "timestamp">
    : never
  : never;

export type RetrieverDatabaseRow = Readonly<{
  content: string;
  metadata: unknown;
  similarity: number;
}>;
