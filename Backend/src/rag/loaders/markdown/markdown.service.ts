import path from "node:path";

import fg from "fast-glob";

import {
  assertKnowledgeDirectory,
  readMarkdownFileSafely,
} from "../../utils";
import type { MarkdownFileService } from "./markdown.interface";
import type { MarkdownFileDescriptor } from "./markdown.types";

/** Filesystem adapter kept separate from orchestration for testability. */
export class NodeMarkdownFileService implements MarkdownFileService {
  assertKnowledgeDirectory(directory: string): Promise<string> {
    return assertKnowledgeDirectory(directory);
  }

  async scan(directory: string): Promise<readonly MarkdownFileDescriptor[]> {
    const relativePaths = await fg("**/*.md", {
      cwd: directory,
      absolute: false,
      onlyFiles: true,
      dot: false,
      followSymbolicLinks: false,
      unique: true,
      suppressErrors: false,
    });

    return relativePaths
      .filter((relativePath) =>
        relativePath
          .split(/[\\/]/u)
          .every((segment) => segment.length > 0 && !segment.startsWith(".")),
      )
      .sort((left, right) => left.localeCompare(right, "en"))
      .map((relativePath) => ({
        absolutePath: path.resolve(directory, relativePath),
        relativePath: relativePath.split("/").join(path.sep),
      }));
  }

  read(
    canonicalDirectory: string,
    file: MarkdownFileDescriptor,
  ): Promise<string> {
    return readMarkdownFileSafely(canonicalDirectory, file.absolutePath);
  }
}
