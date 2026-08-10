"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagPromptBuilder = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const prompt_templates_1 = require("./prompt.templates");
const prompt_utils_1 = require("./prompt.utils");
const DEFAULT_MAXIMUM_CONTEXT_TOKENS = 3_000;
const MINIMUM_CHUNK_CONTENT_TOKENS = 8;
class RagPromptBuilder {
    maximumContextTokens;
    logger;
    systemInstructions;
    aiRole;
    rules;
    answerRequirements;
    constructor(options = {}) {
        this.maximumContextTokens =
            options.maximumContextTokens ?? DEFAULT_MAXIMUM_CONTEXT_TOKENS;
        this.logger = options.logger ?? new prompt_utils_1.JsonConsolePromptBuilderLogger();
        this.systemInstructions =
            options.systemInstructions?.trim() || prompt_templates_1.DEFAULT_SYSTEM_INSTRUCTIONS;
        this.aiRole = options.aiRole?.trim() || prompt_templates_1.DEFAULT_AI_ROLE;
        this.rules = options.rules ?? prompt_templates_1.DEFAULT_RULES;
        this.answerRequirements =
            options.answerRequirements ?? prompt_templates_1.DEFAULT_ANSWER_REQUIREMENTS;
        if (!Number.isInteger(this.maximumContextTokens) || this.maximumContextTokens <= 0) {
            throw new RangeError("maximumContextTokens must be a positive integer");
        }
        if (this.rules.length === 0 || this.answerRequirements.length === 0) {
            throw new RangeError("rules and answerRequirements must not be empty");
        }
    }
    buildPrompt(userQuestion, retrievedChunks) {
        const startedAt = node_perf_hooks_1.performance.now();
        const question = userQuestion.trim();
        (0, prompt_utils_1.emitPromptLog)(this.logger, {
            event: "prompt-builder.started",
            level: "info",
            questionLength: question.length,
            retrievedChunkCount: retrievedChunks.length,
            maximumContextTokens: this.maximumContextTokens,
        });
        try {
            if (!question)
                throw new TypeError("userQuestion must not be empty");
            const contextChunks = this.selectContext(retrievedChunks);
            const includedSources = contextChunks.map((chunk) => (0, prompt_utils_1.toIncludedSource)(chunk.retrieval, chunk.sourceId, chunk.truncated));
            const context = contextChunks.length
                ? contextChunks.map((chunk) => chunk.rendered).join("\n\n")
                : prompt_templates_1.EMPTY_CONTEXT_MESSAGE;
            const prompt = this.renderPrompt(question, context);
            const contextTokenEstimate = (0, prompt_utils_1.estimateTokens)(context);
            const tokenEstimate = (0, prompt_utils_1.estimateTokens)(prompt);
            (0, prompt_utils_1.emitPromptLog)(this.logger, {
                event: "prompt-builder.completed",
                level: "info",
                includedSourceCount: includedSources.length,
                omittedChunkCount: retrievedChunks.length - includedSources.length,
                contextTokenEstimate,
                promptTokenEstimate: tokenEstimate,
                durationMs: Math.round(node_perf_hooks_1.performance.now() - startedAt),
            });
            return { prompt, includedSources, tokenEstimate };
        }
        catch (error) {
            (0, prompt_utils_1.emitPromptLog)(this.logger, {
                event: "prompt-builder.error",
                level: "error",
                error: (0, prompt_utils_1.serializePromptError)(error),
            });
            throw error;
        }
    }
    selectContext(results) {
        const selected = [];
        const seenContent = new Set();
        let usedTokens = 0;
        for (let index = 0; index < results.length; index += 1) {
            const result = results[index];
            if (!result.content.trim()) {
                this.warn("Retrieved chunk has no content and was omitted", index);
                continue;
            }
            const contentFingerprint = result.content
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();
            if (seenContent.has(contentFingerprint)) {
                this.warn("Duplicate retrieved chunk was omitted", index);
                continue;
            }
            seenContent.add(contentFingerprint);
            const sourceId = `Source ${selected.length + 1}`;
            const full = (0, prompt_utils_1.renderContextChunk)(result, sourceId);
            const fullTokens = (0, prompt_utils_1.estimateTokens)(full);
            const remaining = this.maximumContextTokens - usedTokens;
            if (fullTokens <= remaining) {
                selected.push({
                    retrieval: result,
                    originalIndex: index,
                    sourceId,
                    rendered: full,
                    tokenEstimate: fullTokens,
                    truncated: false,
                });
                usedTokens += fullTokens;
                this.included(sourceId, index, fullTokens, false);
                continue;
            }
            const shell = (0, prompt_utils_1.renderContextChunk)(result, sourceId, "");
            const availableContentTokens = remaining - (0, prompt_utils_1.estimateTokens)(shell);
            if (availableContentTokens < MINIMUM_CHUNK_CONTENT_TOKENS) {
                this.warn("Context token budget exhausted; remaining chunks were omitted", index);
                break;
            }
            const content = (0, prompt_utils_1.truncateToTokenBudget)(result.content, availableContentTokens);
            const rendered = (0, prompt_utils_1.renderContextChunk)(result, sourceId, content);
            const tokenEstimate = (0, prompt_utils_1.estimateTokens)(rendered);
            selected.push({
                retrieval: result,
                originalIndex: index,
                sourceId,
                rendered,
                tokenEstimate,
                truncated: true,
            });
            usedTokens += tokenEstimate;
            this.included(sourceId, index, tokenEstimate, true);
            this.warn("Retrieved context was truncated to fit the token budget", index);
            break;
        }
        return selected;
    }
    renderPrompt(question, context) {
        return [
            "## System Instructions",
            this.systemInstructions,
            "",
            "## AI Role",
            this.aiRole,
            "",
            "## Rules",
            ...this.rules.map((rule, index) => `${index + 1}. ${rule}`),
            "",
            "## Retrieved Context",
            context,
            "",
            "## User Question",
            `<user_question>\n${question.replace(/<\/user_question\s*>/gi, "&lt;/user_question&gt;")}\n</user_question>`,
            "",
            "## Answer Requirements",
            ...this.answerRequirements.map((requirement, index) => `${index + 1}. ${requirement}`),
        ].join("\n");
    }
    included(sourceId, chunkIndex, estimatedTokens, truncated) {
        (0, prompt_utils_1.emitPromptLog)(this.logger, {
            event: "prompt-builder.chunk-included",
            level: "info",
            sourceId,
            chunkIndex,
            estimatedTokens,
            truncated,
        });
    }
    warn(message, chunkIndex) {
        (0, prompt_utils_1.emitPromptLog)(this.logger, {
            event: "prompt-builder.warning",
            level: "warn",
            message,
            ...(chunkIndex === undefined ? {} : { chunkIndex }),
        });
    }
}
exports.RagPromptBuilder = RagPromptBuilder;
//# sourceMappingURL=prompt.service.js.map