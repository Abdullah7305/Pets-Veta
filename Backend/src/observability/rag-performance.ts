import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";

export type RagPerformanceStage =
  | "responseCacheLookup"
  | "embeddingCacheLookup"
  | "embedding"
  | "databaseConnection"
  | "vectorSearch"
  | "chunkRetrieval"
  | "promptBuild"
  | "geminiApiRequest"
  | "geminiRetryDelay"
  | "geminiResponse"
  | "jsonSerialization";

export type RagCacheKind = "embedding" | "response";
export type RagCacheOutcome = "hit" | "miss" | "coalesced";

export interface RagPerformanceContext {
  readonly requestId: string;
  readonly requestReceivedAt: string;
  readonly startedAt: number;
  readonly cpuStartedAt: NodeJS.CpuUsage;
  readonly memoryStartedAt: NodeJS.MemoryUsage;
  readonly method: string;
  readonly path: string;
  readonly stages: Partial<Record<RagPerformanceStage, number>>;
  readonly cache: Partial<
    Record<
      RagCacheKind,
      Readonly<{ outcome: RagCacheOutcome; backend: "memory-or-redis" | "in-flight" }>
    >
  >;
  responseStatus?: number;
  errorCode?: string;
  completed: boolean;
}

const storage = new AsyncLocalStorage<RagPerformanceContext>();

export function createRagPerformanceContext(
  method: string,
  path: string,
): RagPerformanceContext {
  return {
    requestId: randomUUID(),
    requestReceivedAt: new Date().toISOString(),
    startedAt: performance.now(),
    cpuStartedAt: process.cpuUsage(),
    memoryStartedAt: process.memoryUsage(),
    method,
    path,
    stages: {},
    cache: {},
    completed: false,
  };
}

export function runWithRagPerformanceContext<T>(
  context: RagPerformanceContext,
  work: () => T,
): T {
  return storage.run(context, work);
}

export function recordRagStage(
  stage: RagPerformanceStage,
  durationMs: number,
): void {
  const context = storage.getStore();
  if (!context || !Number.isFinite(durationMs)) return;
  context.stages[stage] =
    (context.stages[stage] ?? 0) + Math.max(0, durationMs);
}

export function recordRagCache(
  kind: RagCacheKind,
  outcome: RagCacheOutcome,
  backend: "memory-or-redis" | "in-flight" = "memory-or-redis",
): void {
  const context = storage.getStore();
  if (!context) return;
  context.cache[kind] = { outcome, backend };
}

export async function measureRagStage<T>(
  stage: RagPerformanceStage,
  work: () => Promise<T>,
): Promise<T> {
  const startedAt = performance.now();
  try {
    return await work();
  } finally {
    recordRagStage(stage, performance.now() - startedAt);
  }
}

export function measureRagStageSync<T>(
  stage: RagPerformanceStage,
  work: () => T,
): T {
  const startedAt = performance.now();
  try {
    return work();
  } finally {
    recordRagStage(stage, performance.now() - startedAt);
  }
}

export function markRagRequestFailure(errorCode: string): void {
  const context = storage.getStore();
  if (context) context.errorCode = errorCode;
}

export function emitRagRequestReceived(
  context: RagPerformanceContext,
): void {
  safeConsole("info", {
    time: context.requestReceivedAt,
    event: "rag.request.received",
    level: "info",
    requestId: context.requestId,
    method: context.method,
    path: context.path,
  });
}

export function completeRagPerformance(
  context: RagPerformanceContext,
  responseStatus: number,
): void {
  if (context.completed) return;
  context.completed = true;
  context.responseStatus = responseStatus;

  const totalMs = performance.now() - context.startedAt;
  const cpu = process.cpuUsage(context.cpuStartedAt);
  const memory = process.memoryUsage();
  const stages = roundStages(context.stages);
  const databaseMs =
    (stages.databaseConnection ?? 0) + (stages.vectorSearch ?? 0);
  const llmMs =
    (stages.geminiApiRequest ?? 0) +
    (stages.geminiRetryDelay ?? 0) +
    (stages.geminiResponse ?? 0);
  const totalRounded = round(totalMs);

  safeConsole(responseStatus >= 500 ? "error" : "info", {
    time: new Date().toISOString(),
    event: "rag.performance",
    level: responseStatus >= 500 ? "error" : "info",
    requestId: context.requestId,
    method: context.method,
    path: context.path,
    responseStatus,
    ...(context.errorCode ? { errorCode: context.errorCode } : {}),
    stagesMs: {
      requestReceived: 0,
      ...stages,
    },
    cache: context.cache,
    databaseTimeMs: round(databaseMs),
    llmTimeMs: round(llmMs),
    totalTimeMs: totalRounded,
    cpuTimeMs: {
      user: round(cpu.user / 1_000),
      system: round(cpu.system / 1_000),
      total: round((cpu.user + cpu.system) / 1_000),
    },
    cpuTimeScope: "process delta during request",
    memoryBytes: {
      rss: memory.rss,
      heapUsed: memory.heapUsed,
      external: memory.external,
      arrayBuffers: memory.arrayBuffers,
      heapUsedDelta: memory.heapUsed - context.memoryStartedAt.heapUsed,
    },
    message: [
      `Embedding: ${formatDuration(stages.embedding)} ms`,
      `Vector Search: ${formatDuration(stages.vectorSearch)} ms`,
      `Prompt Build: ${formatDuration(stages.promptBuild)} ms`,
      `Gemini: ${formatDuration(llmMs)} ms`,
      `Total: ${formatDuration(totalRounded)} ms`,
    ].join(" | "),
  });
}

function roundStages(
  stages: Partial<Record<RagPerformanceStage, number>>,
): Partial<Record<RagPerformanceStage, number>> {
  return Object.fromEntries(
    Object.entries(stages).map(([key, value]) => [key, round(value)]),
  ) as Partial<Record<RagPerformanceStage, number>>;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatDuration(value: number | undefined): string {
  return String(round(value ?? 0));
}

function safeConsole(
  level: "info" | "error",
  entry: Record<string, unknown>,
): void {
  try {
    const serialized = JSON.stringify(entry);
    if (level === "error") console.error(serialized);
    else console.info(serialized);
  } catch {
    // Observability must never interrupt the response path.
  }
}
