"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatApiError = void 0;
class ChatApiError extends Error {
    statusCode;
    code;
    details;
    cause;
    constructor(message, statusCode, code, details, cause) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.cause = cause;
        this.name = "ChatApiError";
    }
}
exports.ChatApiError = ChatApiError;
//# sourceMappingURL=chat.types.js.map