import { randomUUID } from "node:crypto";

import { Prisma } from "@prisma/client";
import pino, { type Logger } from "pino";

import type { EmbeddedDocument } from "../embeddings";
import type { VectorStoreLogger } from "./vector-store.interface";
import type {
  VectorStoreLogEntry,
  VectorStoreLogPayload,
} from "./vector-store.types";

import { assertEmbeddedDocument } from "./vector-store.validator";

export interface PreparedChunk {
  id: string;
  chunkIndex: number;
  heading: string | null;
  content: string;
  tokenCount: number;
  embeddingSql: string;
  metadataJson: string;
}

export class JsonConsoleVectorStoreLogger implements VectorStoreLogger {
  log(entry: VectorStoreLogEntry): void {
    const serialized = JSON.stringify(entry);
    if (entry.level === "error") console.error(serialized);
    else if (entry.level === "warn") console.warn(serialized);
    else console.info(serialized);
  }
}

export function emitVectorStoreLog(
  logger: VectorStoreLogger | Logger,
  payload: VectorStoreLogPayload,
): void {
  const entry = { ...payload, timestamp: new Date().toISOString() } as VectorStoreLogEntry;
  try {
    if ("log" in logger && logger.log.length <= 1) {
      (logger as VectorStoreLogger).log(entry);
    } else {
      const pinoLogger = logger as Logger;
      pinoLogger[entry.level](entry, entry.event);
    }
  } catch {
    // Logging must not affect persistence.
  }
}

export function serializeVectorStoreError(error: unknown): Readonly<{
  name: string;
  message: string;
  code?: string;
}> {
  if (error instanceof Error) {
    const code = (error as Error & { code?: unknown }).code;
    return {
      name: error.name,
      message: error.message,
      ...(typeof code === "string" ? { code } : {}),
    };
  }
  return { name: "UnknownError", message: String(error) };
}

export function prepareChunk(chunk: EmbeddedDocument): PreparedChunk {
  assertEmbeddedDocument(chunk);
  const chunkIndex = chunk.metadata.chunkIndex;

  const metadataJson = JSON.stringify(chunk.metadata);
  if (metadataJson === undefined) throw new TypeError("Chunk metadata is not serializable");
  const parsedMetadata: unknown = JSON.parse(metadataJson);
  if (!parsedMetadata || Array.isArray(parsedMetadata) || typeof parsedMetadata !== "object") {
    throw new TypeError("Chunk metadata must serialize to a JSON object");
  }

  return {
    id: randomUUID(),
    chunkIndex: chunkIndex as number,
    heading: typeof chunk.metadata.heading === "string" ? chunk.metadata.heading : null,
    content: chunk.pageContent,
    tokenCount: countApproximateTokens(chunk.pageContent),
    embeddingSql: `[${chunk.embedding.join(",")}]`,
    metadataJson,
  };
}

export function createVectorStoreLogger(): Logger {
  return pino({ level: "info" }).child({ component: "vector-store" });
}

export function resolveVectorStoreBatchSize(batchSize?: number): number {
  if (batchSize !== undefined) return batchSize;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { appConfig } = require("../../config") as typeof import("../../config");
  return appConfig.rag.vectorStoreBatchSize;
}

export function buildUpsertQuery(
  knowledgeDocumentId: string,
  chunks: readonly PreparedChunk[],
): Prisma.Sql {
  const rows = chunks.map((chunk) => Prisma.sql`(
    ${chunk.id}::uuid,
    ${knowledgeDocumentId}::uuid,
    ${chunk.chunkIndex},
    ${chunk.heading},
    ${chunk.content},
    ${chunk.tokenCount},
    ${chunk.embeddingSql}::vector,
    ${chunk.metadataJson}::jsonb,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )`);
  return Prisma.sql`
    INSERT INTO "KnowledgeChunk"
      ("id", "knowledgeDocumentId", "chunkIndex", "heading", "content", "tokenCount", "embedding", "metadata", "createdAt", "updatedAt")
    VALUES ${Prisma.join(rows)}
    ON CONFLICT ("knowledgeDocumentId", "chunkIndex") DO UPDATE SET
      "heading" = EXCLUDED."heading",
      "content" = EXCLUDED."content",
      "tokenCount" = EXCLUDED."tokenCount",
      "embedding" = EXCLUDED."embedding",
      "metadata" = EXCLUDED."metadata",
      "updatedAt" = CURRENT_TIMESTAMP
  `;
}

export function buildDeleteQuery(
  knowledgeDocumentId: string,
  chunkIndexes?: readonly number[],
): Prisma.Sql {
  if (chunkIndexes) {
    return Prisma.sql`
      DELETE FROM "KnowledgeChunk"
      WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
        AND "chunkIndex" IN (${Prisma.join(chunkIndexes)})
    `;
  }
  return Prisma.sql`
    DELETE FROM "KnowledgeChunk"
    WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
  `;
}

export function buildFindByDocumentQuery(knowledgeDocumentId: string): Prisma.Sql {
  return Prisma.sql`
    SELECT "id", "knowledgeDocumentId", "chunkIndex", "heading", "content",
      "tokenCount", "embeddingModel", "metadata", "createdAt", "updatedAt"
    FROM "KnowledgeChunk"
    WHERE "knowledgeDocumentId" = ${knowledgeDocumentId}::uuid
    ORDER BY "chunkIndex" ASC
  `;
}

function countApproximateTokens(text: string): number {
  return text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)?.length ?? 0;
}
