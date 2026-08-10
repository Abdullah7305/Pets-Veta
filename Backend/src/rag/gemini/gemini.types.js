"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiServiceError = void 0;
class GeminiServiceError extends Error {
    kind;
    status;
    retryable;
    cause;
    constructor(options) {
        super(options.message);
        this.name = "GeminiServiceError";
        this.kind = options.kind;
        this.status = options.status;
        this.retryable = options.retryable;
        this.cause = options.cause;
    }
}
exports.GeminiServiceError = GeminiServiceError;
//# sourceMappingURL=gemini.types.js.map