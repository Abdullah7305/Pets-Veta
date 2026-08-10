"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const measured_json_response_1 = require("../utils/measured-json-response");
class ChatController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async chat(request, response) {
        const result = await this.aiService.chat(request.body);
        (0, measured_json_response_1.sendMeasuredJson)(response, 200, {
            success: true,
            message: "AI response generated successfully",
            data: result,
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map