"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdownLoaderLogger = createMarkdownLoaderLogger;
exports.toPortableKnowledgePath = toPortableKnowledgePath;
exports.createDocumentMetadata = createDocumentMetadata;
exports.serializeMarkdownError = serializeMarkdownError;
const node_path_1 = __importDefault(require("node:path"));
const pino_1 = __importDefault(require("pino"));
function createMarkdownLoaderLogger() {
    return (0, pino_1.default)({ level: "info" }).child({ component: "markdown-loader" });
}
function toPortableKnowledgePath(relativePath) {
    return `knowledge/${relativePath.split(node_path_1.default.sep).join("/")}`;
}
function createDocumentMetadata(frontMatter, file) {
    const filePath = toPortableKnowledgePath(file.relativePath);
    return {
        ...frontMatter,
        ...(frontMatter.subcategory
            ? { subcategory: frontMatter.subcategory }
            : {}),
        tags: frontMatter.tags ?? [],
        filePath,
        fileName: node_path_1.default.basename(file.absolutePath),
        source: filePath,
        extension: ".md",
    };
}
function serializeMarkdownError(error) {
    if (error instanceof Error) {
        const code = error.code;
        return {
            name: error.name,
            message: error.message,
            ...(typeof code === "string" ? { code } : {}),
        };
    }
    return { name: "UnknownError", message: String(error) };
}
//# sourceMappingURL=markdown.utils.js.map