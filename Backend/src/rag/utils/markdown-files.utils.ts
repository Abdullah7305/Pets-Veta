import { lstat, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import {
  KNOWLEDGE_PATH_PREFIX,
  MARKDOWN_EXTENSION,
} from "../constants/markdown-loader.constants";
import type {
  MarkdownFileScanIssue,
  MarkdownFileScanResult,
} from "../types/markdown-loader.interfaces";

function compareLexically(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

export async function assertKnowledgeDirectory(
  knowledgeDirectory: string,
): Promise<string> {
  const stats = await lstat(knowledgeDirectory);

  if (stats.isSymbolicLink()) {
    throw new Error("Knowledge directory must not be a symbolic link.");
  }

  if (!stats.isDirectory()) {
    throw new Error("Knowledge path must point to a directory.");
  }

  return realpath(knowledgeDirectory);
}

export function assertPathWithinKnowledgeDirectory(
  canonicalKnowledgeDirectory: string,
  canonicalPath: string,
): void {
  const relativePath = path.relative(
    canonicalKnowledgeDirectory,
    canonicalPath,
  );

  if (
    relativePath === "" ||
    relativePath.startsWith(`..${path.sep}`) ||
    relativePath === ".." ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Resolved path is outside the knowledge directory.");
  }
}

export function toKnowledgeFilePath(
  knowledgeDirectory: string,
  filePath: string,
): string {
  const relativePath = path.relative(knowledgeDirectory, filePath);

  if (
    relativePath === "" ||
    relativePath.startsWith(`..${path.sep}`) ||
    relativePath === ".." ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Discovered path is outside the knowledge directory.");
  }

  const portablePath = relativePath.split(path.sep).join("/");
  return `${KNOWLEDGE_PATH_PREFIX}/${portablePath}`;
}

export async function scanMarkdownFiles(
  knowledgeDirectory: string,
): Promise<MarkdownFileScanResult> {
  const canonicalKnowledgeDirectory = await realpath(knowledgeDirectory);
  const files: string[] = [];
  const symbolicLinks: string[] = [];
  const errors: MarkdownFileScanIssue[] = [];

  async function visit(directory: string, isRoot: boolean): Promise<void> {
    let entries;

    try {
      const directoryStats = await lstat(directory);

      if (directoryStats.isSymbolicLink() || !directoryStats.isDirectory()) {
        if (isRoot) {
          throw new Error("Knowledge path must remain a regular directory.");
        }
        return;
      }

      const canonicalDirectory = await realpath(directory);

      if (isRoot) {
        if (canonicalDirectory !== canonicalKnowledgeDirectory) {
          throw new Error("Knowledge directory changed while scanning.");
        }
      } else {
        assertPathWithinKnowledgeDirectory(
          canonicalKnowledgeDirectory,
          canonicalDirectory,
        );
      }

      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (isRoot) throw error;
      errors.push({ filePath: directory, error });
      return;
    }

    entries.sort((left, right) => compareLexically(left.name, right.name));

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isSymbolicLink()) {
        if (path.extname(entry.name) === MARKDOWN_EXTENSION) {
          symbolicLinks.push(entryPath);
        }
        continue;
      }

      if (entry.isDirectory()) {
        await visit(entryPath, false);
        continue;
      }

      if (entry.isFile() && path.extname(entry.name) === MARKDOWN_EXTENSION) {
        files.push(entryPath);
      }
    }
  }

  await visit(knowledgeDirectory, true);

  files.sort(compareLexically);
  symbolicLinks.sort(compareLexically);

  return { files, symbolicLinks, errors };
}
