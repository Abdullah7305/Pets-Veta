"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMarkdownMetadata = validateMarkdownMetadata;
const zod_1 = require("zod");
const requiredMarkdownMetadataSchema = zod_1.z
    .object({
    id: zod_1.z.string().trim().min(1, "id must be a non-empty string"),
    title: zod_1.z.string().trim().min(1, "title must be a non-empty string"),
    animal: zod_1.z.string().trim().min(1, "animal must be a non-empty string"),
    category: zod_1.z.string().trim().min(1, "category must be a non-empty string"),
})
    .passthrough();
function validateMarkdownMetadata(data) {
    const result = requiredMarkdownMetadataSchema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            issues: result.error.issues.map((issue) => ({
                path: issue.path.map(String).join(".") || "frontMatter",
                message: issue.message,
            })),
        };
    }
    return {
        success: true,
        metadata: result.data,
    };
}
//# sourceMappingURL=metadata-validation.utils.js.map