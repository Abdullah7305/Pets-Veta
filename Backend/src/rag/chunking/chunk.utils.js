"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleChunkLogger = void 0;
exports.splitMarkdownSections = splitMarkdownSections;
exports.approximateTokenCount = approximateTokenCount;
exports.emitChunkLog = emitChunkLog;
exports.serializeChunkError = serializeChunkError;
const HEADING_PATTERN = /^(#{1,3})[\t ]+(.+?)[\t ]*#*[\t ]*$/;
function splitMarkdownSections(markdown) {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const hierarchy = {};
    const sections = [];
    let current = {
        heading: "",
        headingLine: "",
        body: "",
        hierarchy: {},
    };
    const commit = () => {
        const body = current.body.trim();
        if (current.headingLine || body) {
            sections.push({ ...current, body });
        }
    };
    let inFence = false;
    for (const line of lines) {
        if (/^\s*(```|~~~)/.test(line))
            inFence = !inFence;
        const match = inFence ? null : HEADING_PATTERN.exec(line);
        if (!match) {
            current.body += `${current.body ? "\n" : ""}${line}`;
            continue;
        }
        commit();
        const level = match[1].length;
        const heading = match[2].trim();
        if (level === 1) {
            hierarchy.h1 = heading;
            delete hierarchy.h2;
            delete hierarchy.h3;
        }
        else if (level === 2) {
            hierarchy.h2 = heading;
            delete hierarchy.h3;
        }
        else {
            hierarchy.h3 = heading;
        }
        current = {
            heading,
            headingLine: line.trimEnd(),
            body: "",
            hierarchy: { ...hierarchy },
        };
    }
    commit();
    return sections;
}
/** Fast model-independent token estimate suitable for chunk sizing. */
function approximateTokenCount(text) {
    return text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)?.length ?? 0;
}
class JsonConsoleChunkLogger {
    log(entry) {
        const value = JSON.stringify(entry);
        if (entry.level === "error")
            console.error(value);
        else if (entry.level === "warn")
            console.warn(value);
        else
            console.info(value);
    }
}
exports.JsonConsoleChunkLogger = JsonConsoleChunkLogger;
function emitChunkLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        logger.log(entry);
    }
    catch {
        // Logging must never interrupt ingestion.
    }
}
function serializeChunkError(error) {
    return error instanceof Error
        ? { name: error.name, message: error.message }
        : { name: "UnknownError", message: String(error) };
}
//# sourceMappingURL=chunk.utils.js.map