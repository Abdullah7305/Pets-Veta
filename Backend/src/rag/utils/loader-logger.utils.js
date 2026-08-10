"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleMarkdownLoaderLogger = void 0;
exports.serializeLoaderError = serializeLoaderError;
exports.emitLoaderLog = emitLoaderLog;
class JsonConsoleMarkdownLoaderLogger {
    log(entry) {
        const serializedEntry = JSON.stringify(entry);
        if (entry.level === "error") {
            console.error(serializedEntry);
            return;
        }
        if (entry.level === "warn") {
            console.warn(serializedEntry);
            return;
        }
        console.info(serializedEntry);
    }
}
exports.JsonConsoleMarkdownLoaderLogger = JsonConsoleMarkdownLoaderLogger;
function serializeLoaderError(error) {
    if (error instanceof Error) {
        const errorWithCode = error;
        const code = typeof errorWithCode.code === "string" ? errorWithCode.code : undefined;
        return {
            name: error.name,
            message: error.message,
            ...(code ? { code } : {}),
        };
    }
    return {
        name: "UnknownError",
        message: String(error),
    };
}
function emitLoaderLog(logger, payload) {
    const entry = {
        ...payload,
        timestamp: new Date().toISOString(),
    };
    try {
        logger.log(entry);
    }
    catch (error) {
        const fallback = {
            timestamp: new Date().toISOString(),
            level: "error",
            event: "markdown-loader.error",
            stage: "convert",
            error: serializeLoaderError(error),
        };
        console.error(JSON.stringify(fallback));
    }
}
//# sourceMappingURL=loader-logger.utils.js.map