"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMarkdownFileSafely = readMarkdownFileSafely;
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const markdown_files_utils_1 = require("./markdown-files.utils");
const NO_FOLLOW_FLAG = node_fs_1.constants.O_NOFOLLOW ?? 0;
async function readMarkdownFileSafely(canonicalKnowledgeDirectory, filePath) {
    const initialStats = await (0, promises_1.lstat)(filePath);
    if (initialStats.isSymbolicLink() || !initialStats.isFile()) {
        throw new Error("Markdown path must remain a regular file.");
    }
    const initialCanonicalPath = await (0, promises_1.realpath)(filePath);
    (0, markdown_files_utils_1.assertPathWithinKnowledgeDirectory)(canonicalKnowledgeDirectory, initialCanonicalPath);
    const fileHandle = await (0, promises_1.open)(filePath, node_fs_1.constants.O_RDONLY | NO_FOLLOW_FLAG);
    try {
        const openedStats = await fileHandle.stat();
        const currentPathStats = await (0, promises_1.lstat)(filePath);
        if (!openedStats.isFile() || currentPathStats.isSymbolicLink()) {
            throw new Error("Markdown path changed while it was being opened.");
        }
        const currentCanonicalPath = await (0, promises_1.realpath)(filePath);
        (0, markdown_files_utils_1.assertPathWithinKnowledgeDirectory)(canonicalKnowledgeDirectory, currentCanonicalPath);
        const currentTargetStats = await (0, promises_1.stat)(currentCanonicalPath);
        const deviceMatches = openedStats.dev === 0 ||
            currentTargetStats.dev === 0 ||
            openedStats.dev === currentTargetStats.dev;
        if (!deviceMatches || openedStats.ino !== currentTargetStats.ino) {
            throw new Error("Markdown file changed while it was being opened.");
        }
        return fileHandle.readFile({ encoding: "utf8" });
    }
    finally {
        await fileHandle.close();
    }
}
//# sourceMappingURL=markdown-file-reader.utils.js.map