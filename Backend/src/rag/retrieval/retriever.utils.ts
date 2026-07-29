import { Prisma, PrismaClient } from "@prisma/client";

import { getRagPrismaClient } from "../database";
import type { RetrieverDatabase, RetrieverLogger } from "./retriever.interface";
import type {
  RetrievalResult,
  RetrieverDatabaseRow,
  RetrieverFilters,
  RetrieverLogEntry,
  RetrieverLogPayload,
} from "./retriever.types";

export const DEFAULT_TOP_K = 5;
export const DEFAULT_MAX_TOP_K = 100;
export const DEFAULT_MINIMUM_SIMILARITY = 0.7;
export const QUERY_EMBEDDING_DIMENSIONS = 384;

export class PrismaRetrieverDatabase implements RetrieverDatabase {
  private connectionPromise?: Promise<void>;

  constructor(private readonly client: PrismaClient = getPrismaClient()) {}

  connect(): Promise<void> {
    this.connectionPromise ??= this.client.$connect().catch((error: unknown) => {
      this.connectionPromise = undefined;
      throw error;
    });
    return this.connectionPromise;
  }

  query(query: Prisma.Sql): Promise<readonly RetrieverDatabaseRow[]> {
    return this.client.$queryRaw<RetrieverDatabaseRow[]>(query);
  }
}

function getPrismaClient(): PrismaClient {
  return getRagPrismaClient();
}

export class JsonConsoleRetrieverLogger implements RetrieverLogger {
  log(entry: RetrieverLogEntry): void {
    const serialized = JSON.stringify(entry);
    if (entry.level === "error") console.error(serialized);
    else if (entry.level === "warn") console.warn(serialized);
    else console.info(serialized);
  }
}

export function emitRetrieverLog(
  logger: RetrieverLogger,
  payload: RetrieverLogPayload,
): void {
  const entry = { ...payload, timestamp: new Date().toISOString() } as RetrieverLogEntry;
  try {
    logger.log(entry);
  } catch {
    // Logging failures must not prevent retrieval.
  }
}

export function serializeRetrieverError(error: unknown): Readonly<{
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

export function buildSimilarityQuery(
  embedding: readonly number[],
  topK: number,
  minimumSimilarity: number,
  filters: RetrieverFilters,
): Prisma.Sql {
  const vector = `[${embedding.join(",")}]`;
  const chunkPredicates: Prisma.Sql[] = [
    Prisma.sql`kc."embedding" IS NOT NULL`,
    Prisma.sql`1 - (kc."embedding" <=> ${vector}::vector) >= ${minimumSimilarity}`,
  ];
  const documentPredicates: Prisma.Sql[] = [];
  if (filters.animal) {
    documentPredicates.push(
      Prisma.sql`kd."animal" = ${filters.animal.toUpperCase()}::"Animal"`,
    );
  }
  if (filters.category) {
    documentPredicates.push(Prisma.sql`kd."category" = ${filters.category}`);
  }
  if (filters.subCategory) {
    documentPredicates.push(
      Prisma.sql`kd."subCategory" = ${filters.subCategory}`,
    );
  }
  const documentFilter = documentPredicates.length
    ? Prisma.sql`
        AND EXISTS (
          SELECT 1
          FROM "KnowledgeDocument" AS kd
          WHERE kd."id" = kc."knowledgeDocumentId"
            AND ${Prisma.join(documentPredicates, " AND ")}
        )
      `
    : Prisma.empty;

  return Prisma.sql`
    SELECT
      kc."content",
      kc."metadata",
      1 - (kc."embedding" <=> ${vector}::vector) AS "similarity"
    FROM "KnowledgeChunk" AS kc
    WHERE ${Prisma.join(chunkPredicates, " AND ")}
    ${documentFilter}
    ORDER BY kc."embedding" <=> ${vector}::vector ASC
    LIMIT ${topK}
  `;
}

export function validateEmbedding(embedding: readonly number[]): void {
  if (embedding.length !== QUERY_EMBEDDING_DIMENSIONS) {
    throw new Error(`Query embedding must contain ${QUERY_EMBEDDING_DIMENSIONS} dimensions`);
  }
  if (embedding.some((value) => !Number.isFinite(value))) {
    throw new Error("Query embedding contains a non-finite value");
  }
}

export function mapDatabaseRows(
  rows: readonly RetrieverDatabaseRow[],
): RetrievalResult[] {
  return rows.flatMap((row) => {
    const similarity = Number(row.similarity);
    if (typeof row.content !== "string" || !Number.isFinite(similarity)) return [];
    const metadata =
      row.metadata && typeof row.metadata === "object" && !Array.isArray(row.metadata)
        ? (row.metadata as Record<string, unknown>)
        : {};
    return [{ content: row.content, metadata, similarity }];
  });
}
