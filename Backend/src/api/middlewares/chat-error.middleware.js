"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatErrorHandler = void 0;
const chat_types_1 = require("../types/chat.types");
const rag_performance_1 = require("../../observability/rag-performance");
const measured_json_response_1 = require("../utils/measured-json-response");
const chatErrorHandler = (error, _request, response, _next) => {
    const apiError = error instanceof chat_types_1.ChatApiError
        ? error
        : new chat_types_1.ChatApiError("An unexpected error occurred while processing the chat request", 500, "INTERNAL_ERROR", undefined, error);
    (0, rag_performance_1.markRagRequestFailure)(apiError.code);
    (0, measured_json_response_1.sendMeasuredJson)(response, apiError.statusCode, {
        success: false,
        error: {
            code: apiError.code,
            message: apiError.message,
            ...(apiError.details === undefined ? {} : { details: apiError.details }),
        },
    });
};
exports.chatErrorHandler = chatErrorHandler;
//# sourceMappingURL=chat-error.middleware.js.map