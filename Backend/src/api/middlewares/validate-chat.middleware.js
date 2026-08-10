"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChatRequest = validateChatRequest;
const zod_1 = require("zod");
const chat_validator_1 = require("../validators/chat.validator");
const chat_types_1 = require("../types/chat.types");
function validateChatRequest(request, _response, next) {
    try {
        request.body = (0, chat_validator_1.parseChatRequest)(request.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            next(new chat_types_1.ChatApiError("Invalid chat request", 400, "VALIDATION_ERROR", error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })), error));
            return;
        }
        next(error);
    }
}
//# sourceMappingURL=validate-chat.middleware.js.map