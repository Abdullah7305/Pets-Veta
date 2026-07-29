import pino, { type Logger } from "pino";

import type { ChunkingConfiguration } from "./chunk.interface";
import type {
  HeadingHierarchy,
  HeadingLevel,
  MarkdownSection,
} from "./chunk.types";

const TOKEN_PATTERN = /[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu;
const HEADING_PATTERN = /^(#{1,3})[\t ]+(.+?)[\t ]*#*[\t ]*$/u;
const FENCE_PATTERN = /^\s*(`{3,}|~{3,})/u;

export function estimateChunkTokens(text: string): number {
  return text.match(TOKEN_PATTERN)?.length ?? 0;
}

export function createChunkerLogger(): Logger {
  return pino({ level: "info" }).child({ component: "markdown-chunker" });
}

/**
 * Resolves defaults lazily so callers providing explicit configuration do not
 * initialize unrelated application configuration or read process.env here.
 */
export function resolveChunkingConfiguration(
  chunkSize?: number,
  chunkOverlap?: number,
): ChunkingConfiguration {
  if (chunkSize !== undefined && chunkOverlap !== undefined) {
    return { chunkSize, chunkOverlap };
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { appConfig } = require("../../../config") as typeof import("../../../config");
  return {
    chunkSize: chunkSize ?? appConfig.rag.chunkSize,
    chunkOverlap: chunkOverlap ?? appConfig.rag.chunkOverlap,
  };
}

export function splitMarkdownIntoSections(markdown: string): MarkdownSection[] {
  const lines = markdown.replace(/\r\n?/gu, "\n").split("\n");
  const hierarchy: { h1?: string; h2?: string; h3?: string } = {};
  const sections: MarkdownSection[] = [];
  let section: MarkdownSection = {
    heading: "",
    headingLine: "",
    body: "",
    hierarchy: {},
  };
  let activeFence: "`" | "~" | undefined;

  const commit = (): void => {
    if (section.headingLine || section.body.trim()) {
      sections.push({ ...section, body: section.body.trim() });
    }
  };

  for (const line of lines) {
    const fence = FENCE_PATTERN.exec(line);
    if (fence) {
      const marker = fence[1]![0] as "`" | "~";
      if (!activeFence) activeFence = marker;
      else if (activeFence === marker) activeFence = undefined;
      section.body += `${section.body ? "\n" : ""}${line}`;
      continue;
    }

    const match = activeFence ? null : HEADING_PATTERN.exec(line);
    if (!match) {
      section.body += `${section.body ? "\n" : ""}${line}`;
      continue;
    }

    commit();
    const level = match[1]!.length as HeadingLevel;
    const heading = match[2]!.trim();
    const parentHeading = getParentHeading(hierarchy, level);
    updateHierarchy(hierarchy, level, heading);
    section = {
      heading,
      ...(parentHeading ? { parentHeading } : {}),
      headingLine: line.trimEnd(),
      body: "",
      level,
      hierarchy: { ...hierarchy },
    };
  }
  commit();
  return sections;
}

export function serializeChunkerError(error: unknown): Readonly<{
  name: string;
  message: string;
}> {
  return error instanceof Error
    ? { name: error.name, message: error.message }
    : { name: "UnknownError", message: String(error) };
}

function getParentHeading(
  hierarchy: HeadingHierarchy,
  level: HeadingLevel,
): string | undefined {
  if (level === 3) return hierarchy.h2 ?? hierarchy.h1;
  if (level === 2) return hierarchy.h1;
  return undefined;
}

function updateHierarchy(
  hierarchy: { h1?: string; h2?: string; h3?: string },
  level: HeadingLevel,
  heading: string,
): void {
  if (level === 1) {
    hierarchy.h1 = heading;
    delete hierarchy.h2;
    delete hierarchy.h3;
  } else if (level === 2) {
    hierarchy.h2 = heading;
    delete hierarchy.h3;
  } else {
    hierarchy.h3 = heading;
  }
}
