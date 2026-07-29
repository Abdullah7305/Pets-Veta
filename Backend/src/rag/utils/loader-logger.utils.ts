import type { MarkdownLoaderLogger } from "../types/markdown-loader.interfaces";
import type {
  MarkdownLoaderLogEntry,
  MarkdownLoaderLogPayload,
  SerializedLoaderError,
} from "../types/markdown-loader.types";

export class JsonConsoleMarkdownLoaderLogger implements MarkdownLoaderLogger {
  log(entry: MarkdownLoaderLogEntry): void {
    const serializedEntry = JSON.stringify(entry);

    if (entry.level === "error") {
      console.error(serializedEntry);
      return;
    }

    if (entry.level === "warn") {
      console.warn(serializedEntry);
      return;
    }

    console.info(serializedEntry);
  }
}

export function serializeLoaderError(error: unknown): SerializedLoaderError {
  if (error instanceof Error) {
    const errorWithCode = error as Error & { code?: unknown };
    const code =
      typeof errorWithCode.code === "string" ? errorWithCode.code : undefined;

    return {
      name: error.name,
      message: error.message,
      ...(code ? { code } : {}),
    };
  }

  return {
    name: "UnknownError",
    message: String(error),
  };
}

export function emitLoaderLog(
  logger: MarkdownLoaderLogger,
  payload: MarkdownLoaderLogPayload,
): void {
  const entry = {
    ...payload,
    timestamp: new Date().toISOString(),
  } as MarkdownLoaderLogEntry;

  try {
    logger.log(entry);
  } catch (error) {
    const fallback = {
      timestamp: new Date().toISOString(),
      level: "error",
      event: "markdown-loader.error",
      stage: "convert",
      error: serializeLoaderError(error),
    } satisfies MarkdownLoaderLogEntry;

    console.error(JSON.stringify(fallback));
  }
}
