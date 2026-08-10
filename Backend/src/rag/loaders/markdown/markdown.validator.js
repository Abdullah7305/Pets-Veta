"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownFrontMatterSchema = void 0;
exports.validateMarkdownFrontMatter = validateMarkdownFrontMatter;
const zod_1 = require("zod");
const markdown_types_1 = require("./markdown.types");
const nonEmptyString = zod_1.z.string().trim().min(1);
exports.markdownFrontMatterSchema = zod_1.z
    .object({
    id: nonEmptyString.max(255),
    title: nonEmptyString.max(500),
    animal: zod_1.z
        .string()
        .trim()
        .transform((value) => value.toUpperCase())
        .pipe(zod_1.z.enum(markdown_types_1.SUPPORTED_ANIMALS)),
    category: nonEmptyString.max(100),
    subcategory: nonEmptyString.max(100).optional(),
    tags: zod_1.z.array(nonEmptyString.max(100)).max(100).default([]),
})
    .passthrough();
function validateMarkdownFrontMatter(input) {
    const result = exports.markdownFrontMatterSchema.safeParse(input);
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
//# sourceMappingURL=markdown.validator.js.map