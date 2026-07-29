import path from "node:path";

import pino, { type Logger } from "pino";

import type {
  MarkdownDocumentMetadata,
  MarkdownFileDescriptor,
  MarkdownFrontMatter,
} from "./markdown.types";

export function createMarkdownLoaderLogger(): Logger {
  return pino({ level: "info" }).child({ component: "markdown-loader" });
}

export function toPortableKnowledgePath(relativePath: string): string {
  return `knowledge/${relativePath.split(path.sep).join("/")}`;
}

export function createDocumentMetadata(
  frontMatter: MarkdownFrontMatter,
  file: MarkdownFileDescriptor,
): MarkdownDocumentMetadata {
  const filePath = toPortableKnowledgePath(file.relativePath);
  return {
    ...frontMatter,
    ...(frontMatter.subcategory
      ? { subcategory: frontMatter.subcategory }
      : {}),
    tags: frontMatter.tags ?? [],
    filePath,
    fileName: path.basename(file.absolutePath),
    source: filePath,
    extension: ".md",
  };
}

export function serializeMarkdownError(error: unknown): Readonly<{
  name: string;
  message: string;
  code?: string;
}> {
  if (error instanceof Error) {
    const code = (error as Error & { code?: unknown }).code;
    return {
      name: error.name,
      message: error.message,
      ...(typeof code === "string" ? { code } : {}),
    };
  }
  return { name: "UnknownError", message: String(error) };
}
