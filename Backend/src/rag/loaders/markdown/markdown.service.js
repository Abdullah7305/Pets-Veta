"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMarkdownFileService = void 0;
const node_path_1 = __importDefault(require("node:path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const utils_1 = require("../../utils");
/** Filesystem adapter kept separate from orchestration for testability. */
class NodeMarkdownFileService {
    assertKnowledgeDirectory(directory) {
        return (0, utils_1.assertKnowledgeDirectory)(directory);
    }
    async scan(directory) {
        const relativePaths = await (0, fast_glob_1.default)("**/*.md", {
            cwd: directory,
            absolute: false,
            onlyFiles: true,
            dot: false,
            followSymbolicLinks: false,
            unique: true,
            suppressErrors: false,
        });
        return relativePaths
            .filter((relativePath) => relativePath
            .split(/[\\/]/u)
            .every((segment) => segment.length > 0 && !segment.startsWith(".")))
            .sort((left, right) => left.localeCompare(right, "en"))
            .map((relativePath) => ({
            absolutePath: node_path_1.default.resolve(directory, relativePath),
            relativePath: relativePath.split("/").join(node_path_1.default.sep),
        }));
    }
    read(canonicalDirectory, file) {
        return (0, utils_1.readMarkdownFileSafely)(canonicalDirectory, file.absolutePath);
    }
}
exports.NodeMarkdownFileService = NodeMarkdownFileService;
//# sourceMappingURL=markdown.service.js.map