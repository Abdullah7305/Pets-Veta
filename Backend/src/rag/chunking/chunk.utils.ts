import type { ChunkLogger } from "./chunk.interface";
import type {
  ChunkLogEntry,
  ChunkLogPayload,
  HeadingHierarchy,
} from "./chunk.types";

export interface MarkdownSection {
  heading: string;
  headingLine: string;
  body: string;
  hierarchy: HeadingHierarchy;
}

const HEADING_PATTERN = /^(#{1,3})[\t ]+(.+?)[\t ]*#*[\t ]*$/;

export function splitMarkdownSections(markdown: string): MarkdownSection[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const hierarchy: { h1?: string; h2?: string; h3?: string } = {};
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection = {
    heading: "",
    headingLine: "",
    body: "",
    hierarchy: {},
  };

  const commit = (): void => {
    const body = current.body.trim();
    if (current.headingLine || body) {
      sections.push({ ...current, body });
    }
  };

  let inFence = false;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const match = inFence ? null : HEADING_PATTERN.exec(line);
    if (!match) {
      current.body += `${current.body ? "\n" : ""}${line}`;
      continue;
    }

    commit();
    const level = match[1]!.length;
    const heading = match[2]!.trim();
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
    current = {
      heading,
      headingLine: line.trimEnd(),
      body: "",
      hierarchy: { ...hierarchy },
    };
  }
  commit();
  return sections;
}

/** Fast model-independent token estimate suitable for chunk sizing. */
export function approximateTokenCount(text: string): number {
  return text.match(/[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu)?.length ?? 0;
}

export class JsonConsoleChunkLogger implements ChunkLogger {
  log(entry: ChunkLogEntry): void {
    const value = JSON.stringify(entry);
    if (entry.level === "error") console.error(value);
    else if (entry.level === "warn") console.warn(value);
    else console.info(value);
  }
}

export function emitChunkLog(logger: ChunkLogger, payload: ChunkLogPayload): void {
  const entry = { ...payload, timestamp: new Date().toISOString() } as ChunkLogEntry;
  try {
    logger.log(entry);
  } catch {
    // Logging must never interrupt ingestion.
  }
}

export function serializeChunkError(error: unknown): Readonly<{
  name: string;
  message: string;
}> {
  return error instanceof Error
    ? { name: error.name, message: error.message }
    : { name: "UnknownError", message: String(error) };
}
