"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsolePromptBuilderLogger = void 0;
exports.emitPromptLog = emitPromptLog;
exports.estimateTokens = estimateTokens;
exports.truncateToTokenBudget = truncateToTokenBudget;
exports.renderContextChunk = renderContextChunk;
exports.toIncludedSource = toIncludedSource;
exports.serializePromptError = serializePromptError;
const TOKEN_PATTERN = /[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu;
const TRUNCATION_MARKER = "\n[Context truncated]";
class JsonConsolePromptBuilderLogger {
    log(entry) {
        const serialized = JSON.stringify(entry);
        if (entry.level === "error")
            console.error(serialized);
        else if (entry.level === "warn")
            console.warn(serialized);
        else
            console.info(serialized);
    }
}
exports.JsonConsolePromptBuilderLogger = JsonConsolePromptBuilderLogger;
function emitPromptLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        logger.log(entry);
    }
    catch {
        // Prompt creation must not depend on observability infrastructure.
    }
}
function estimateTokens(text) {
    return text.match(TOKEN_PATTERN)?.length ?? 0;
}
function truncateToTokenBudget(text, budget) {
    if (budget <= 0)
        return "";
    const matches = [...text.matchAll(TOKEN_PATTERN)];
    if (matches.length <= budget)
        return text;
    const markerTokens = estimateTokens(TRUNCATION_MARKER);
    const contentBudget = Math.max(1, budget - markerTokens);
    const boundary = matches[Math.min(contentBudget, matches.length) - 1];
    if (!boundary || boundary.index === undefined)
        return "";
    const rawEnd = boundary.index + boundary[0].length;
    let candidate = text.slice(0, rawEnd).trimEnd();
    // Prefer a nearby sentence boundary without discarding most of the allocation.
    const sentenceEnd = Math.max(candidate.lastIndexOf(". "), candidate.lastIndexOf("! "), candidate.lastIndexOf("? "), candidate.lastIndexOf("\n"));
    if (sentenceEnd >= candidate.length * 0.6) {
        candidate = candidate.slice(0, sentenceEnd + 1).trimEnd();
    }
    return `${candidate}${TRUNCATION_MARKER}`;
}
function renderContextChunk(result, sourceId, content = result.content) {
    const metadata = result.metadata;
    const descriptors = [
        `id="${escapeAttribute(sourceId)}"`,
        optionalAttribute("title", metadata.title),
        optionalAttribute("heading", metadata.heading),
    ].filter(Boolean);
    return `<retrieved_chunk ${descriptors.join(" ")}>\n[${sourceId}]\n${escapeClosingTag(content)}\n</retrieved_chunk>`;
}
function toIncludedSource(result, sourceId, truncated) {
    const metadata = result.metadata;
    return {
        sourceId,
        ...(typeof metadata.source === "string" ? { source: metadata.source } : {}),
        ...(typeof metadata.filePath === "string" ? { filePath: metadata.filePath } : {}),
        ...(typeof metadata.title === "string" ? { title: metadata.title } : {}),
        ...(typeof metadata.heading === "string" ? { heading: metadata.heading } : {}),
        ...(Number.isInteger(metadata.chunkIndex)
            ? { chunkIndex: metadata.chunkIndex }
            : {}),
        similarity: result.similarity,
        metadata,
        truncated,
    };
}
function serializePromptError(error) {
    return error instanceof Error
        ? { name: error.name, message: error.message }
        : { name: "UnknownError", message: String(error) };
}
function optionalAttribute(name, value) {
    return typeof value === "string" && value
        ? `${name}="${escapeAttribute(value)}"`
        : "";
}
function escapeAttribute(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
function escapeClosingTag(content) {
    return content.replace(/<\/retrieved_chunk\s*>/gi, "&lt;/retrieved_chunk&gt;");
}
//# sourceMappingURL=prompt.utils.js.map