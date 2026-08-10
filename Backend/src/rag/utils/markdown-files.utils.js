"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertKnowledgeDirectory = assertKnowledgeDirectory;
exports.assertPathWithinKnowledgeDirectory = assertPathWithinKnowledgeDirectory;
exports.toKnowledgeFilePath = toKnowledgeFilePath;
exports.scanMarkdownFiles = scanMarkdownFiles;
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const markdown_loader_constants_1 = require("../constants/markdown-loader.constants");
function compareLexically(left, right) {
    if (left < right)
        return -1;
    if (left > right)
        return 1;
    return 0;
}
async function assertKnowledgeDirectory(knowledgeDirectory) {
    const stats = await (0, promises_1.lstat)(knowledgeDirectory);
    if (stats.isSymbolicLink()) {
        throw new Error("Knowledge directory must not be a symbolic link.");
    }
    if (!stats.isDirectory()) {
        throw new Error("Knowledge path must point to a directory.");
    }
    return (0, promises_1.realpath)(knowledgeDirectory);
}
function assertPathWithinKnowledgeDirectory(canonicalKnowledgeDirectory, canonicalPath) {
    const relativePath = node_path_1.default.relative(canonicalKnowledgeDirectory, canonicalPath);
    if (relativePath === "" ||
        relativePath.startsWith(`..${node_path_1.default.sep}`) ||
        relativePath === ".." ||
        node_path_1.default.isAbsolute(relativePath)) {
        throw new Error("Resolved path is outside the knowledge directory.");
    }
}
function toKnowledgeFilePath(knowledgeDirectory, filePath) {
    const relativePath = node_path_1.default.relative(knowledgeDirectory, filePath);
    if (relativePath === "" ||
        relativePath.startsWith(`..${node_path_1.default.sep}`) ||
        relativePath === ".." ||
        node_path_1.default.isAbsolute(relativePath)) {
        throw new Error("Discovered path is outside the knowledge directory.");
    }
    const portablePath = relativePath.split(node_path_1.default.sep).join("/");
    return `${markdown_loader_constants_1.KNOWLEDGE_PATH_PREFIX}/${portablePath}`;
}
async function scanMarkdownFiles(knowledgeDirectory) {
    const canonicalKnowledgeDirectory = await (0, promises_1.realpath)(knowledgeDirectory);
    const files = [];
    const symbolicLinks = [];
    const errors = [];
    async function visit(directory, isRoot) {
        let entries;
        try {
            const directoryStats = await (0, promises_1.lstat)(directory);
            if (directoryStats.isSymbolicLink() || !directoryStats.isDirectory()) {
                if (isRoot) {
                    throw new Error("Knowledge path must remain a regular directory.");
                }
                return;
            }
            const canonicalDirectory = await (0, promises_1.realpath)(directory);
            if (isRoot) {
                if (canonicalDirectory !== canonicalKnowledgeDirectory) {
                    throw new Error("Knowledge directory changed while scanning.");
                }
            }
            else {
                assertPathWithinKnowledgeDirectory(canonicalKnowledgeDirectory, canonicalDirectory);
            }
            entries = await (0, promises_1.readdir)(directory, { withFileTypes: true });
        }
        catch (error) {
            if (isRoot)
                throw error;
            errors.push({ filePath: directory, error });
            return;
        }
        entries.sort((left, right) => compareLexically(left.name, right.name));
        for (const entry of entries) {
            const entryPath = node_path_1.default.join(directory, entry.name);
            if (entry.isSymbolicLink()) {
                if (node_path_1.default.extname(entry.name) === markdown_loader_constants_1.MARKDOWN_EXTENSION) {
                    symbolicLinks.push(entryPath);
                }
                continue;
            }
            if (entry.isDirectory()) {
                await visit(entryPath, false);
                continue;
            }
            if (entry.isFile() && node_path_1.default.extname(entry.name) === markdown_loader_constants_1.MARKDOWN_EXTENSION) {
                files.push(entryPath);
            }
        }
    }
    await visit(knowledgeDirectory, true);
    files.sort(compareLexically);
    symbolicLinks.sort(compareLexically);
    return { files, symbolicLinks, errors };
}
//# sourceMappingURL=markdown-files.utils.js.map