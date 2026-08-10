"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRagPerformanceContext = createRagPerformanceContext;
exports.runWithRagPerformanceContext = runWithRagPerformanceContext;
exports.recordRagStage = recordRagStage;
exports.recordRagCache = recordRagCache;
exports.measureRagStage = measureRagStage;
exports.measureRagStageSync = measureRagStageSync;
exports.markRagRequestFailure = markRagRequestFailure;
exports.emitRagRequestReceived = emitRagRequestReceived;
exports.completeRagPerformance = completeRagPerformance;
const node_async_hooks_1 = require("node:async_hooks");
const node_crypto_1 = require("node:crypto");
const node_perf_hooks_1 = require("node:perf_hooks");
const storage = new node_async_hooks_1.AsyncLocalStorage();
function createRagPerformanceContext(method, path) {
    return {
        requestId: (0, node_crypto_1.randomUUID)(),
        requestReceivedAt: new Date().toISOString(),
        startedAt: node_perf_hooks_1.performance.now(),
        cpuStartedAt: process.cpuUsage(),
        memoryStartedAt: process.memoryUsage(),
        method,
        path,
        stages: {},
        cache: {},
        completed: false,
    };
}
function runWithRagPerformanceContext(context, work) {
    return storage.run(context, work);
}
function recordRagStage(stage, durationMs) {
    const context = storage.getStore();
    if (!context || !Number.isFinite(durationMs))
        return;
    context.stages[stage] =
        (context.stages[stage] ?? 0) + Math.max(0, durationMs);
}
function recordRagCache(kind, outcome, backend = "memory-or-redis") {
    const context = storage.getStore();
    if (!context)
        return;
    context.cache[kind] = { outcome, backend };
}
async function measureRagStage(stage, work) {
    const startedAt = node_perf_hooks_1.performance.now();
    try {
        return await work();
    }
    finally {
        recordRagStage(stage, node_perf_hooks_1.performance.now() - startedAt);
    }
}
function measureRagStageSync(stage, work) {
    const startedAt = node_perf_hooks_1.performance.now();
    try {
        return work();
    }
    finally {
        recordRagStage(stage, node_perf_hooks_1.performance.now() - startedAt);
    }
}
function markRagRequestFailure(errorCode) {
    const context = storage.getStore();
    if (context)
        context.errorCode = errorCode;
}
function emitRagRequestReceived(context) {
    safeConsole("info", {
        time: context.requestReceivedAt,
        event: "rag.request.received",
        level: "info",
        requestId: context.requestId,
        method: context.method,
        path: context.path,
    });
}
function completeRagPerformance(context, responseStatus) {
    if (context.completed)
        return;
    context.completed = true;
    context.responseStatus = responseStatus;
    const totalMs = node_perf_hooks_1.performance.now() - context.startedAt;
    const cpu = process.cpuUsage(context.cpuStartedAt);
    const memory = process.memoryUsage();
    const stages = roundStages(context.stages);
    const databaseMs = (stages.databaseConnection ?? 0) + (stages.vectorSearch ?? 0);
    const llmMs = (stages.geminiApiRequest ?? 0) +
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
function roundStages(stages) {
    return Object.fromEntries(Object.entries(stages).map(([key, value]) => [key, round(value)]));
}
function round(value) {
    return Math.round(value * 100) / 100;
}
function formatDuration(value) {
    return String(round(value ?? 0));
}
function safeConsole(level, entry) {
    try {
        const serialized = JSON.stringify(entry);
        if (level === "error")
            console.error(serialized);
        else
            console.info(serialized);
    }
    catch {
        // Observability must never interrupt the response path.
    }
}
//# sourceMappingURL=rag-performance.js.map