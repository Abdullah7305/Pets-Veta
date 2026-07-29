import path from "node:path";

import dotenv from "dotenv";
import { z } from "zod";

const projectRoot = path.resolve(__dirname, "../..");

// Explicit path resolution makes loading consistent for tsx, compiled output,
// npm scripts, process managers, and containers. Existing environment values
// always take precedence over values from the local .env file.
dotenv.config({
  path: path.join(projectRoot, ".env"),
  override: false,
  quiet: true,
});

const environmentSchema = z
  .object({
    PORT: z.coerce.number().int().min(1).max(65_535).default(8_000),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    DATABASE_URL: z
      .string()
      .trim()
      .min(1, "DATABASE_URL is required")
      .refine(
        (value) => value.startsWith("postgresql://") || value.startsWith("postgres://"),
        "DATABASE_URL must be a PostgreSQL connection URL",
      ),
    GEMINI_API_KEY: z.string().trim().min(1, "GEMINI_API_KEY is required"),
    GEMINI_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
    GEMINI_MAX_RETRIES: z.coerce.number().int().min(0).max(5).default(2),
    GEMINI_RETRY_BASE_DELAY_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(200),
    REDIS_URL: z.string().trim().optional(),

    KNOWLEDGE_BASE_PATH: z.string().trim().min(1).default("./knowledge"),
    EMBEDDING_MODEL: z
      .string()
      .trim()
      .min(1)
      .default("Xenova/bge-small-en-v1.5"),
    EMBEDDING_BATCH_SIZE: z.coerce.number().int().positive().default(16),
    VECTOR_STORE_BATCH_SIZE: z.coerce.number().int().positive().default(100),
    CHUNK_SIZE: z.coerce.number().int().positive().default(500),
    CHUNK_OVERLAP: z.coerce.number().int().nonnegative().default(50),
    TOP_K: z.coerce.number().int().min(1).max(100).default(5),
    VECTOR_WEIGHT: z.coerce.number().min(0).max(1).default(0.7),
    TEXT_WEIGHT: z.coerce.number().min(0).max(1).default(0.3),
    SIMILARITY_THRESHOLD: z.coerce.number().min(-1).max(1).default(0.7),
    EMBEDDING_CACHE_TTL_SECONDS: z.coerce
      .number()
      .int()
      .positive()
      .default(86_400),
    RESPONSE_CACHE_TTL_SECONDS: z.coerce
      .number()
      .int()
      .positive()
      .default(300),
    RAG_CACHE_MAX_ENTRIES: z.coerce
      .number()
      .int()
      .positive()
      .default(1_000),
    RAG_CACHE_OPERATION_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(100),

    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
  })
  .superRefine((environment, context) => {
    if (environment.CHUNK_OVERLAP >= environment.CHUNK_SIZE) {
      context.addIssue({
        code: "custom",
        path: ["CHUNK_OVERLAP"],
        message: "CHUNK_OVERLAP must be smaller than CHUNK_SIZE",
      });
    }
  });

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  const details = parsedEnvironment.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  // Do not include environment values in this message: configuration errors
  // may be captured by centralized logs in production.
  throw new Error(`Invalid environment configuration: ${details}`);
}

const environment = parsedEnvironment.data;

export type AppConfig = Readonly<{
  server: Readonly<{
    port: number;
    environment: "development" | "test" | "production";
  }>;
  database: Readonly<{
    url: string;
  }>;
  gemini: Readonly<{
    apiKey: string;
    timeoutMs: number;
    maxRetries: number;
    retryBaseDelayMs: number;
  }>;
  cache: Readonly<{
    redisUrl?: string;
    embeddingTtlSeconds: number;
    responseTtlSeconds: number;
    maximumEntries: number;
    operationTimeoutMs: number;
  }>;
  rag: Readonly<{
    knowledgeBasePath: string;
    embeddingModel: string;
    embeddingBatchSize: number;
    vectorStoreBatchSize: number;
    chunkSize: number;
    chunkOverlap: number;
    topK: number;
    similarityThreshold: number;
  }>;
  logging: Readonly<{
    level: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
  }>;
}>;

export const appConfig: AppConfig = Object.freeze({
  server: Object.freeze({
    port: environment.PORT,
    environment: environment.NODE_ENV,
  }),
  database: Object.freeze({
    url: environment.DATABASE_URL,
  }),
  gemini: Object.freeze({
    apiKey: environment.GEMINI_API_KEY,
    timeoutMs: environment.GEMINI_TIMEOUT_MS,
    maxRetries: environment.GEMINI_MAX_RETRIES,
    retryBaseDelayMs: environment.GEMINI_RETRY_BASE_DELAY_MS,
  }),
  cache: Object.freeze({
    ...(environment.REDIS_URL ? { redisUrl: environment.REDIS_URL } : {}),
    embeddingTtlSeconds: environment.EMBEDDING_CACHE_TTL_SECONDS,
    responseTtlSeconds: environment.RESPONSE_CACHE_TTL_SECONDS,
    maximumEntries: environment.RAG_CACHE_MAX_ENTRIES,
    operationTimeoutMs: environment.RAG_CACHE_OPERATION_TIMEOUT_MS,
  }),
  rag: Object.freeze({
    knowledgeBasePath: path.resolve(projectRoot, environment.KNOWLEDGE_BASE_PATH),
    embeddingModel: environment.EMBEDDING_MODEL,
    embeddingBatchSize: environment.EMBEDDING_BATCH_SIZE,
    vectorStoreBatchSize: environment.VECTOR_STORE_BATCH_SIZE,
    chunkSize: environment.CHUNK_SIZE,
    chunkOverlap: environment.CHUNK_OVERLAP,
    topK: environment.TOP_K,
    similarityThreshold: environment.SIMILARITY_THRESHOLD,
  }),
  logging: Object.freeze({
    level: environment.LOG_LEVEL,
  }),
});
