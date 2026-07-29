import pino, { type Logger } from "pino";

import type { EmbeddingLogger } from "./embedding.interface";
import type { EmbeddingLogEntry, EmbeddingLogPayload } from "./embedding.types";

export function createEmbeddingLogger(): Logger {
  return pino({ level: "info" }).child({ component: "embedding-service" });
}

export function emitEmbeddingLog(
  logger: EmbeddingLogger | Logger,
  payload: EmbeddingLogPayload,
): void {
  const entry = { ...payload, timestamp: new Date().toISOString() } as EmbeddingLogEntry;
  try {
    if ("log" in logger && logger.log.length <= 1) {
      (logger as EmbeddingLogger).log(entry);
      return;
    }
    const pinoLogger = logger as Logger;
    const level = entry.level === "error" ? "error" : "info";
    pinoLogger[level](entry, entry.event);
  } catch {
    // Logging must never interrupt ingestion.
  }
}

export function serializeEmbeddingError(error: unknown): Readonly<{
  name: string;
  message: string;
  code?: string;
}> {
  if (!(error instanceof Error)) return { name: "UnknownError", message: String(error) };
  const code = (error as Error & { code?: unknown }).code;
  return {
    name: error.name,
    message: error.message,
    ...(typeof code === "string" ? { code } : {}),
  };
}

export function resolveEmbeddingConfiguration(
  modelName?: string,
  batchSize?: number,
): Readonly<{ modelName: string; batchSize: number }> {
  if (modelName !== undefined && batchSize !== undefined) return { modelName, batchSize };
  // Lazy loading keeps injected tests and consumers independent of unrelated secrets.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { appConfig } = require("../../config") as typeof import("../../config");
  return {
    modelName: modelName ?? appConfig.rag.embeddingModel,
    batchSize: batchSize ?? appConfig.rag.embeddingBatchSize,
  };
}
