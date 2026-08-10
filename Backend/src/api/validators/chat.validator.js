"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRequestSchema = void 0;
exports.parseChatRequest = parseChatRequest;
const zod_1 = require("zod");
exports.chatRequestSchema = zod_1.z
    .object({
    question: zod_1.z.string().trim().min(1).max(4_000),
    conversationId: zod_1.z.uuid().optional(),
    topK: zod_1.z.number().int().min(1).max(100).optional(),
    minimumSimilarity: zod_1.z.number().min(-1).max(1).optional(),
    filters: zod_1.z
        .object({
        animal: zod_1.z.enum(["dog", "cat", "bird", "rabbit", "general"]).optional(),
        category: zod_1.z.string().trim().min(1).max(100).optional(),
        subCategory: zod_1.z.string().trim().min(1).max(100).optional(),
    })
        .strict()
        .optional(),
})
    .strict();
function parseChatRequest(input) {
    return exports.chatRequestSchema.parse(input);
}
//# sourceMappingURL=chat.validator.js.map