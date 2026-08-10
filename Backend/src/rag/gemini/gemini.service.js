"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const gemini_constants_1 = require("./gemini.constants");
const rag_performance_1 = require("../../observability/rag-performance");
const gemini_types_1 = require("./gemini.types");
const gemini_utils_1 = require("./gemini.utils");
class GeminiService {
    model;
    temperature;
    topP;
    topK;
    maxOutputTokens;
    timeoutMs;
    maxRetries;
    retryBaseDelayMs;
    provider;
    logger;
    constructor(options = {}) {
        this.model = options.model?.trim() || gemini_constants_1.DEFAULT_GEMINI_MODEL;
        this.temperature = options.temperature ?? gemini_constants_1.DEFAULT_GEMINI_TEMPERATURE;
        this.topP = options.topP ?? gemini_constants_1.DEFAULT_GEMINI_TOP_P;
        this.topK = options.topK ?? gemini_constants_1.DEFAULT_GEMINI_TOP_K;
        this.maxOutputTokens =
            options.maxOutputTokens ?? gemini_constants_1.DEFAULT_GEMINI_MAX_OUTPUT_TOKENS;
        this.timeoutMs =
            options.timeoutMs ??
                readPositiveIntegerEnvironment("GEMINI_TIMEOUT_MS", gemini_constants_1.DEFAULT_GEMINI_TIMEOUT_MS);
        this.maxRetries =
            options.maxRetries ??
                readNonNegativeIntegerEnvironment("GEMINI_MAX_RETRIES", gemini_constants_1.DEFAULT_GEMINI_MAX_RETRIES);
        this.retryBaseDelayMs =
            options.retryBaseDelayMs ??
                readPositiveIntegerEnvironment("GEMINI_RETRY_BASE_DELAY_MS", gemini_constants_1.DEFAULT_GEMINI_RETRY_BASE_DELAY_MS);
        this.logger = options.logger ?? new gemini_utils_1.JsonConsoleGeminiLogger();
        this.validateConfiguration();
        this.provider = options.provider ?? new gemini_utils_1.GoogleGeminiProvider(options.apiKey);
    }
    async generate(prompt) {
        const input = this.validatePrompt(prompt);
        const startedAt = node_perf_hooks_1.performance.now();
        this.logStarted("normal", input.length);
        for (let attempt = 1; attempt <= this.maxRetries + 1; attempt += 1) {
            const remainingMs = this.timeoutMs - (node_perf_hooks_1.performance.now() - startedAt);
            if (remainingMs <= 0) {
                throw this.logAndNormalizeFailure("normal", new gemini_types_1.GeminiServiceError({
                    kind: "timeout",
                    message: "Gemini request timed out",
                    retryable: true,
                }), true, startedAt);
            }
            const controller = new AbortController();
            let timedOut = false;
            const timeout = setTimeout(() => {
                timedOut = true;
                controller.abort();
            }, Math.max(1, Math.ceil(remainingMs)));
            const requestStartedAt = node_perf_hooks_1.performance.now();
            try {
                const providerResponse = await this.provider.generate(this.request(input, controller.signal));
                (0, rag_performance_1.recordRagStage)("geminiApiRequest", node_perf_hooks_1.performance.now() - requestStartedAt);
                const responseStartedAt = node_perf_hooks_1.performance.now();
                const response = {
                    answer: providerResponse.text,
                    model: this.model,
                    tokenUsage: providerResponse.tokenUsage,
                    latencyMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
                    finishReason: providerResponse.finishReason,
                };
                (0, rag_performance_1.recordRagStage)("geminiResponse", node_perf_hooks_1.performance.now() - responseStartedAt);
                this.logCompleted("normal", response);
                return response;
            }
            catch (error) {
                (0, rag_performance_1.recordRagStage)("geminiApiRequest", node_perf_hooks_1.performance.now() - requestStartedAt);
                const normalized = (0, gemini_utils_1.normalizeGeminiError)(error, timedOut);
                const delayMs = this.retryDelayMs(attempt);
                const hasRetry = attempt <= this.maxRetries;
                const fitsDeadline = node_perf_hooks_1.performance.now() - startedAt + delayMs < this.timeoutMs;
                if (normalized.retryable && hasRetry && fitsDeadline) {
                    (0, gemini_utils_1.emitGeminiLog)(this.logger, {
                        event: "gemini.request-retry",
                        level: "info",
                        mode: "normal",
                        model: this.model,
                        attempt,
                        nextAttempt: attempt + 1,
                        delayMs,
                        errorKind: normalized.kind,
                    });
                    const retryDelayStartedAt = node_perf_hooks_1.performance.now();
                    await wait(delayMs);
                    (0, rag_performance_1.recordRagStage)("geminiRetryDelay", node_perf_hooks_1.performance.now() - retryDelayStartedAt);
                    continue;
                }
                throw this.logAndNormalizeFailure("normal", normalized, timedOut, startedAt);
            }
            finally {
                clearTimeout(timeout);
            }
        }
        throw new gemini_types_1.GeminiServiceError({
            kind: "api",
            message: "Gemini API request failed",
            retryable: false,
        });
    }
    async *stream(prompt) {
        const input = this.validatePrompt(prompt);
        const startedAt = node_perf_hooks_1.performance.now();
        const controller = new AbortController();
        let timedOut = false;
        const timeout = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, this.timeoutMs);
        this.logStarted("stream", input.length);
        let answer = "";
        let tokenUsage = (0, gemini_utils_1.emptyTokenUsage)();
        let finishReason = "UNKNOWN";
        try {
            const chunks = await this.provider.stream(this.request(input, controller.signal));
            for await (const chunk of chunks) {
                if (chunk.text) {
                    answer += chunk.text;
                    yield { type: "text-delta", text: chunk.text };
                }
                if (chunk.tokenUsage)
                    tokenUsage = chunk.tokenUsage;
                if (chunk.finishReason)
                    finishReason = chunk.finishReason;
            }
            const response = {
                answer,
                model: this.model,
                tokenUsage,
                latencyMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
                finishReason,
            };
            this.logCompleted("stream", response);
            yield { type: "complete", response };
        }
        catch (error) {
            throw this.logAndNormalizeFailure("stream", error, timedOut, startedAt);
        }
        finally {
            clearTimeout(timeout);
        }
    }
    request(prompt, signal) {
        return {
            prompt,
            model: this.model,
            temperature: this.temperature,
            topP: this.topP,
            topK: this.topK,
            maxOutputTokens: this.maxOutputTokens,
            signal,
        };
    }
    retryDelayMs(attempt) {
        const exponential = Math.min(2_000, this.retryBaseDelayMs * 2 ** Math.max(0, attempt - 1));
        const jitter = 0.8 + Math.random() * 0.4;
        return Math.max(1, Math.round(exponential * jitter));
    }
    validatePrompt(prompt) {
        const value = prompt.trim();
        if (!value) {
            throw new gemini_types_1.GeminiServiceError({
                kind: "configuration",
                message: "prompt must not be empty",
                retryable: false,
            });
        }
        return value;
    }
    validateConfiguration() {
        if (!Number.isFinite(this.temperature) || this.temperature < 0 || this.temperature > 2) {
            throw new RangeError("temperature must be between 0 and 2");
        }
        if (!Number.isFinite(this.topP) || this.topP < 0 || this.topP > 1) {
            throw new RangeError("topP must be between 0 and 1");
        }
        for (const [name, value] of [
            ["topK", this.topK],
            ["maxOutputTokens", this.maxOutputTokens],
            ["timeoutMs", this.timeoutMs],
            ["retryBaseDelayMs", this.retryBaseDelayMs],
        ]) {
            if (!Number.isInteger(value) || value <= 0) {
                throw new RangeError(`${name} must be a positive integer`);
            }
        }
        if (!Number.isInteger(this.maxRetries) ||
            this.maxRetries < 0 ||
            this.maxRetries > 5) {
            throw new RangeError("maxRetries must be an integer between 0 and 5");
        }
    }
    logStarted(mode, promptLength) {
        (0, gemini_utils_1.emitGeminiLog)(this.logger, {
            event: "gemini.request-started",
            level: "info",
            mode,
            promptLength,
            timeoutMs: this.timeoutMs,
        });
        (0, gemini_utils_1.emitGeminiLog)(this.logger, {
            event: "gemini.model-used",
            level: "info",
            model: this.model,
            temperature: this.temperature,
            topP: this.topP,
            topK: this.topK,
            maxOutputTokens: this.maxOutputTokens,
        });
    }
    logCompleted(mode, response) {
        (0, gemini_utils_1.emitGeminiLog)(this.logger, {
            event: "gemini.request-completed",
            level: "info",
            mode,
            model: response.model,
            latencyMs: response.latencyMs,
            tokenUsage: response.tokenUsage,
            finishReason: response.finishReason,
        });
    }
    logAndNormalizeFailure(mode, error, timedOut, startedAt) {
        const normalized = (0, gemini_utils_1.normalizeGeminiError)(error, timedOut);
        (0, gemini_utils_1.emitGeminiLog)(this.logger, {
            event: "gemini.request-failed",
            level: "error",
            mode,
            model: this.model,
            latencyMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
            error: {
                name: normalized.name,
                message: normalized.message,
                kind: normalized.kind,
                ...(normalized.status === undefined ? {} : { status: normalized.status }),
                retryable: normalized.retryable,
            },
        });
        return normalized;
    }
}
exports.GeminiService = GeminiService;
function readPositiveIntegerEnvironment(name, fallback) {
    const value = Number(process.env[name]);
    return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}
function readNonNegativeIntegerEnvironment(name, fallback) {
    const value = Number(process.env[name]);
    return Number.isSafeInteger(value) && value >= 0 ? value : fallback;
}
function wait(durationMs) {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
}
//# sourceMappingURL=gemini.service.js.map