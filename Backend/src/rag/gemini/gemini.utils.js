"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConsoleGeminiLogger = exports.GoogleGeminiProvider = void 0;
exports.emitGeminiLog = emitGeminiLog;
exports.normalizeGeminiError = normalizeGeminiError;
exports.emptyTokenUsage = emptyTokenUsage;
const gemini_constants_1 = require("./gemini.constants");
const gemini_types_1 = require("./gemini.types");
const EMPTY_USAGE = {
    promptTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
};
class GoogleGeminiProvider {
    clientPromise;
    constructor(apiKey = process.env[gemini_constants_1.GEMINI_API_KEY_ENVIRONMENT_VARIABLE]) {
        if (!apiKey?.trim()) {
            throw new gemini_types_1.GeminiServiceError({
                kind: "configuration",
                message: `${gemini_constants_1.GEMINI_API_KEY_ENVIRONMENT_VARIABLE} is required`,
                retryable: false,
            });
        }
        this.clientPromise = import("@google/genai").then(({ GoogleGenAI }) => new GoogleGenAI({ apiKey }));
    }
    async generate(request) {
        const client = await this.clientPromise;
        const response = await client.models.generateContent(toGenerateContentParameters(request));
        return {
            text: response.text ?? "",
            tokenUsage: mapTokenUsage(response.usageMetadata),
            finishReason: getFinishReason(response),
        };
    }
    async stream(request) {
        const client = await this.clientPromise;
        const response = await client.models.generateContentStream(toGenerateContentParameters(request));
        return this.mapStream(response);
    }
    async *mapStream(response) {
        for await (const chunk of response) {
            yield {
                text: chunk.text ?? "",
                ...(chunk.usageMetadata
                    ? { tokenUsage: mapTokenUsage(chunk.usageMetadata) }
                    : {}),
                ...(chunk.candidates?.[0]?.finishReason
                    ? { finishReason: String(chunk.candidates[0].finishReason) }
                    : {}),
            };
        }
    }
}
exports.GoogleGeminiProvider = GoogleGeminiProvider;
class JsonConsoleGeminiLogger {
    log(entry) {
        const serialized = JSON.stringify(entry);
        if (entry.level === "error")
            console.error(serialized);
        else
            console.info(serialized);
    }
}
exports.JsonConsoleGeminiLogger = JsonConsoleGeminiLogger;
function emitGeminiLog(logger, payload) {
    const entry = { ...payload, timestamp: new Date().toISOString() };
    try {
        logger.log(entry);
    }
    catch {
        // Logging failures must not affect model generation.
    }
}
function normalizeGeminiError(error, timedOut) {
    if (error instanceof gemini_types_1.GeminiServiceError)
        return error;
    const status = getNumericProperty(error, "status");
    const code = getStringProperty(error, "code");
    if (timedOut) {
        return new gemini_types_1.GeminiServiceError({
            kind: "timeout",
            message: "Gemini request timed out",
            retryable: true,
            cause: error,
        });
    }
    if (status === 429) {
        return new gemini_types_1.GeminiServiceError({
            kind: "rate_limit",
            message: "Gemini rate limit exceeded",
            status,
            retryable: true,
            cause: error,
        });
    }
    if (code === "ECONNRESET" ||
        code === "ECONNREFUSED" ||
        code === "ENOTFOUND" ||
        code === "ETIMEDOUT" ||
        error instanceof TypeError) {
        return new gemini_types_1.GeminiServiceError({
            kind: "network",
            message: "Unable to reach the Gemini API",
            ...(status === undefined ? {} : { status }),
            retryable: true,
            cause: error,
        });
    }
    return new gemini_types_1.GeminiServiceError({
        kind: "api",
        message: error instanceof Error ? error.message : "Gemini API request failed",
        ...(status === undefined ? {} : { status }),
        retryable: status === undefined || status >= 500,
        cause: error,
    });
}
function emptyTokenUsage() {
    return { ...EMPTY_USAGE };
}
function toGenerateContentParameters(request) {
    return {
        model: request.model,
        contents: request.prompt,
        config: {
            temperature: request.temperature,
            topP: request.topP,
            topK: request.topK,
            maxOutputTokens: request.maxOutputTokens,
            abortSignal: request.signal,
        },
    };
}
function mapTokenUsage(usage) {
    return {
        promptTokens: usage?.promptTokenCount ?? 0,
        outputTokens: usage?.candidatesTokenCount ?? 0,
        totalTokens: usage?.totalTokenCount ?? 0,
        ...(usage?.cachedContentTokenCount === undefined
            ? {}
            : { cachedTokens: usage.cachedContentTokenCount }),
    };
}
function getFinishReason(response) {
    return response.candidates?.[0]?.finishReason
        ? String(response.candidates[0].finishReason)
        : "UNKNOWN";
}
function getNumericProperty(value, property) {
    if (!value || typeof value !== "object")
        return undefined;
    const candidate = value[property];
    return typeof candidate === "number" ? candidate : undefined;
}
function getStringProperty(value, property) {
    if (!value || typeof value !== "object")
        return undefined;
    const candidate = value[property];
    return typeof candidate === "string" ? candidate : undefined;
}
//# sourceMappingURL=gemini.utils.js.map