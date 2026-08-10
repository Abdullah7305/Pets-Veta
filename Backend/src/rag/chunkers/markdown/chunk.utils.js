"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateChunkTokens = estimateChunkTokens;
exports.createChunkerLogger = createChunkerLogger;
exports.resolveChunkingConfiguration = resolveChunkingConfiguration;
exports.splitMarkdownIntoSections = splitMarkdownIntoSections;
exports.serializeChunkerError = serializeChunkerError;
const pino_1 = __importDefault(require("pino"));
const TOKEN_PATTERN = /[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu;
const HEADING_PATTERN = /^(#{1,3})[\t ]+(.+?)[\t ]*#*[\t ]*$/u;
const FENCE_PATTERN = /^\s*(`{3,}|~{3,})/u;
function estimateChunkTokens(text) {
    return text.match(TOKEN_PATTERN)?.length ?? 0;
}
function createChunkerLogger() {
    return (0, pino_1.default)({ level: "info" }).child({ component: "markdown-chunker" });
}
/**
 * Resolves defaults lazily so callers providing explicit configuration do not
 * initialize unrelated application configuration or read process.env here.
 */
function resolveChunkingConfiguration(chunkSize, chunkOverlap) {
    if (chunkSize !== undefined && chunkOverlap !== undefined) {
        return { chunkSize, chunkOverlap };
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { appConfig } = require("../../../config");
    return {
        chunkSize: chunkSize ?? appConfig.rag.chunkSize,
        chunkOverlap: chunkOverlap ?? appConfig.rag.chunkOverlap,
    };
}
function splitMarkdownIntoSections(markdown) {
    const lines = markdown.replace(/\r\n?/gu, "\n").split("\n");
    const hierarchy = {};
    const sections = [];
    let section = {
        heading: "",
        headingLine: "",
        body: "",
        hierarchy: {},
    };
    let activeFence;
    const commit = () => {
        if (section.headingLine || section.body.trim()) {
            sections.push({ ...section, body: section.body.trim() });
        }
    };
    for (const line of lines) {
        const fence = FENCE_PATTERN.exec(line);
        if (fence) {
            const marker = fence[1][0];
            if (!activeFence)
                activeFence = marker;
            else if (activeFence === marker)
                activeFence = undefined;
            section.body += `${section.body ? "\n" : ""}${line}`;
            continue;
        }
        const match = activeFence ? null : HEADING_PATTERN.exec(line);
        if (!match) {
            section.body += `${section.body ? "\n" : ""}${line}`;
            continue;
        }
        commit();
        const level = match[1].length;
        const heading = match[2].trim();
        const parentHeading = getParentHeading(hierarchy, level);
        updateHierarchy(hierarchy, level, heading);
        section = {
            heading,
            ...(parentHeading ? { parentHeading } : {}),
            headingLine: line.trimEnd(),
            body: "",
            level,
            hierarchy: { ...hierarchy },
        };
    }
    commit();
    return sections;
}
function serializeChunkerError(error) {
    return error instanceof Error
        ? { name: error.name, message: error.message }
        : { name: "UnknownError", message: String(error) };
}
function getParentHeading(hierarchy, level) {
    if (level === 3)
        return hierarchy.h2 ?? hierarchy.h1;
    if (level === 2)
        return hierarchy.h1;
    return undefined;
}
function updateHierarchy(hierarchy, level, heading) {
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
}
//# sourceMappingURL=chunk.utils.js.map