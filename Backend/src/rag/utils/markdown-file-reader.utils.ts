import { constants } from "node:fs";
import { lstat, open, realpath, stat } from "node:fs/promises";

import { assertPathWithinKnowledgeDirectory } from "./markdown-files.utils";

const NO_FOLLOW_FLAG = constants.O_NOFOLLOW ?? 0;

export async function readMarkdownFileSafely(
  canonicalKnowledgeDirectory: string,
  filePath: string,
): Promise<string> {
  const initialStats = await lstat(filePath);

  if (initialStats.isSymbolicLink() || !initialStats.isFile()) {
    throw new Error("Markdown path must remain a regular file.");
  }

  const initialCanonicalPath = await realpath(filePath);
  assertPathWithinKnowledgeDirectory(
    canonicalKnowledgeDirectory,
    initialCanonicalPath,
  );

  const fileHandle = await open(
    filePath,
    constants.O_RDONLY | NO_FOLLOW_FLAG,
  );

  try {
    const openedStats = await fileHandle.stat();
    const currentPathStats = await lstat(filePath);

    if (!openedStats.isFile() || currentPathStats.isSymbolicLink()) {
      throw new Error("Markdown path changed while it was being opened.");
    }

    const currentCanonicalPath = await realpath(filePath);
    assertPathWithinKnowledgeDirectory(
      canonicalKnowledgeDirectory,
      currentCanonicalPath,
    );

    const currentTargetStats = await stat(currentCanonicalPath);

    const deviceMatches =
      openedStats.dev === 0 ||
      currentTargetStats.dev === 0 ||
      openedStats.dev === currentTargetStats.dev;

    if (!deviceMatches || openedStats.ino !== currentTargetStats.ino) {
      throw new Error("Markdown file changed while it was being opened.");
    }

    return fileHandle.readFile({ encoding: "utf8" });
  } finally {
    await fileHandle.close();
  }
}
