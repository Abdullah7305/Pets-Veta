"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddingLogger = createEmbeddingLogger;
exports.emitEmbeddingLog = emitEmbeddingLog;
exports.serializeEmbeddingError = serializeEmbeddingError;
exports.resolveEmbeddingConfiguration = resolveEmbeddingConfiguration;
const pino_1 = __importDefault(require("pino"));
function createEmbeddingLogger() {
    return (0, pino_1.default)({ level: "info" }).child({ component: "embedding-service" });
}
function emitEmbeddingLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        if ("log" in logger && logger.log.length <= 1) {
            logger.log(entry);
            return;
        }
        const pinoLogger = logger;
        const level = entry.level === "error" ? "error" : "info";
        pinoLogger[level](entry, entry.event);
    }
    catch {
        // Logging must never interrupt ingestion.
    }
}
function serializeEmbeddingError(error) {
    if (!(error instanceof Error))
        return { name: "UnknownError", message: String(error) };
    const code = error.code;
    return {
        name: error.name,
        message: error.message,
        ...(typeof code === "string" ? { code } : {}),
    };
}
function resolveEmbeddingConfiguration(modelName, batchSize) {
    if (modelName !== undefined && batchSize !== undefined)
        return { modelName, batchSize };
    // Lazy loading keeps injected tests and consumers independent of unrelated secrets.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { appConfig } = require("../../config");
    return {
        modelName: modelName ?? appConfig.rag.embeddingModel,
        batchSize: batchSize ?? appConfig.rag.embeddingBatchSize,
    };
}
//# sourceMappingURL=embedding.utils.js.map