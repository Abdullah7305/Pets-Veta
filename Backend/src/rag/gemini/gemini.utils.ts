import { GEMINI_API_KEY_ENVIRONMENT_VARIABLE } from "./gemini.constants";
import type { GeminiLogger, GeminiProvider } from "./gemini.interface";
import {
  GeminiServiceError,
  type GeminiLogEntry,
  type GeminiLogPayload,
  type GeminiProviderChunk,
  type GeminiProviderRequest,
  type GeminiProviderResponse,
  type GeminiTokenUsage,
} from "./gemini.types";

const EMPTY_USAGE: GeminiTokenUsage = {
  promptTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
};

interface SdkUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
  cachedContentTokenCount?: number;
}

interface SdkResponse {
  readonly text?: string;
  readonly usageMetadata?: SdkUsageMetadata;
  readonly candidates?: ReadonlyArray<Readonly<{ finishReason?: unknown }>>;
}

interface SdkClient {
  models: {
    generateContent(parameters: ReturnType<typeof toGenerateContentParameters>): Promise<SdkResponse>;
    generateContentStream(
      parameters: ReturnType<typeof toGenerateContentParameters>,
    ): Promise<AsyncIterable<SdkResponse>>;
  };
}

export class GoogleGeminiProvider implements GeminiProvider {
  private readonly clientPromise: Promise<SdkClient>;

  constructor(apiKey = process.env[GEMINI_API_KEY_ENVIRONMENT_VARIABLE]) {
    if (!apiKey?.trim()) {
      throw new GeminiServiceError({
        kind: "configuration",
        message: `${GEMINI_API_KEY_ENVIRONMENT_VARIABLE} is required`,
        retryable: false,
      });
    }
    this.clientPromise = import("@google/genai").then(
      ({ GoogleGenAI }) => new GoogleGenAI({ apiKey }) as unknown as SdkClient,
    );
  }

  async generate(request: GeminiProviderRequest): Promise<GeminiProviderResponse> {
    const client = await this.clientPromise;
    const response = await client.models.generateContent(
      toGenerateContentParameters(request),
    );
    return {
      text: response.text ?? "",
      tokenUsage: mapTokenUsage(response.usageMetadata),
      finishReason: getFinishReason(response),
    };
  }

  async stream(
    request: GeminiProviderRequest,
  ): Promise<AsyncIterable<GeminiProviderChunk>> {
    const client = await this.clientPromise;
    const response = await client.models.generateContentStream(
      toGenerateContentParameters(request),
    );
    return this.mapStream(response);
  }

  private async *mapStream(
    response: AsyncIterable<SdkResponse>,
  ): AsyncGenerator<GeminiProviderChunk> {
    for await (const chunk of response) {
      yield {
        text: chunk.text ?? "",
        ...(chunk.usageMetadata
          ? { tokenUsage: mapTokenUsage(chunk.usageMetadata) }
          : {}),
        ...(chunk.candidates?.[0]?.finishReason
          ? { finishReason: String(chunk.candidates[0].finishReason) }
          : {}),
      };
    }
  }
}

export class JsonConsoleGeminiLogger implements GeminiLogger {
  log(entry: GeminiLogEntry): void {
    const serialized = JSON.stringify(entry);
    if (entry.level === "error") console.error(serialized);
    else console.info(serialized);
  }
}

export function emitGeminiLog(
  logger: GeminiLogger,
  payload: GeminiLogPayload,
): void {
  const entry = { ...payload, timestamp: new Date().toISOString() } as GeminiLogEntry;
  try {
    logger.log(entry);
  } catch {
    // Logging failures must not affect model generation.
  }
}

export function normalizeGeminiError(
  error: unknown,
  timedOut: boolean,
): GeminiServiceError {
  if (error instanceof GeminiServiceError) return error;
  const status = getNumericProperty(error, "status");
  const code = getStringProperty(error, "code");
  if (timedOut) {
    return new GeminiServiceError({
      kind: "timeout",
      message: "Gemini request timed out",
      retryable: true,
      cause: error,
    });
  }
  if (status === 429) {
    return new GeminiServiceError({
      kind: "rate_limit",
      message: "Gemini rate limit exceeded",
      status,
      retryable: true,
      cause: error,
    });
  }
  if (
    code === "ECONNRESET" ||
    code === "ECONNREFUSED" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT" ||
    error instanceof TypeError
  ) {
    return new GeminiServiceError({
      kind: "network",
      message: "Unable to reach the Gemini API",
      ...(status === undefined ? {} : { status }),
      retryable: true,
      cause: error,
    });
  }
  return new GeminiServiceError({
    kind: "api",
    message: error instanceof Error ? error.message : "Gemini API request failed",
    ...(status === undefined ? {} : { status }),
    retryable: status === undefined || status >= 500,
    cause: error,
  });
}

export function emptyTokenUsage(): GeminiTokenUsage {
  return { ...EMPTY_USAGE };
}

function toGenerateContentParameters(request: GeminiProviderRequest) {
  return {
    model: request.model,
    contents: request.prompt,
    config: {
      temperature: request.temperature,
      topP: request.topP,
      topK: request.topK,
      maxOutputTokens: request.maxOutputTokens,
      abortSignal: request.signal,
    },
  };
}

function mapTokenUsage(
  usage: SdkUsageMetadata | undefined,
): GeminiTokenUsage {
  return {
    promptTokens: usage?.promptTokenCount ?? 0,
    outputTokens: usage?.candidatesTokenCount ?? 0,
    totalTokens: usage?.totalTokenCount ?? 0,
    ...(usage?.cachedContentTokenCount === undefined
      ? {}
      : { cachedTokens: usage.cachedContentTokenCount }),
  };
}

function getFinishReason(response: SdkResponse): string {
  return response.candidates?.[0]?.finishReason
    ? String(response.candidates[0].finishReason)
    : "UNKNOWN";
}

function getNumericProperty(value: unknown, property: string): number | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = (value as Record<string, unknown>)[property];
  return typeof candidate === "number" ? candidate : undefined;
}

function getStringProperty(value: unknown, property: string): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = (value as Record<string, unknown>)[property];
  return typeof candidate === "string" ? candidate : undefined;
}
