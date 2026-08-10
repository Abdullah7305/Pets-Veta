"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatRouter = createChatRouter;
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const chat_error_middleware_1 = require("../middlewares/chat-error.middleware");
const async_handler_middleware_1 = require("../middlewares/async-handler.middleware");
const validate_chat_middleware_1 = require("../middlewares/validate-chat.middleware");
const ai_service_1 = require("../services/ai.service");
const rag_performance_middleware_1 = require("../middlewares/rag-performance.middleware");
function createChatRouter(aiService = new ai_service_1.AiService()) {
    const router = (0, express_1.Router)();
    const controller = new chat_controller_1.ChatController(aiService);
    router.post("/chat", rag_performance_middleware_1.trackRagPerformance, validate_chat_middleware_1.validateChatRequest, (0, async_handler_middleware_1.asyncHandler)((request, response) => controller.chat(request, response)));
    router.use(chat_error_middleware_1.chatErrorHandler);
    return router;
}
//# sourceMappingURL=chat.routes.js.map