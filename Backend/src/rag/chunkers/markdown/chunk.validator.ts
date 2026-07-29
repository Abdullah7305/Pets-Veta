import type { ChunkValidationResult } from "./chunk.types";

/** Rejects whitespace and Markdown syntax that carries no textual information. */
export function validateChunkContent(content: string): ChunkValidationResult {
  const trimmed = content.trim();
  if (!trimmed) return { valid: false, reason: "empty" };

  const semanticText = trimmed
    .replace(/<!--[^]*?-->/gu, "")
    .replace(/<[^>]+>/gu, "")
    .replace(/[`*_~>#\-[\](){}|\\]/gu, "")
    .replace(/&(?:nbsp|amp|lt|gt|quot);/giu, "")
    .trim();

  return /[\p{L}\p{N}]/u.test(semanticText)
    ? { valid: true, content: trimmed }
    : { valid: false, reason: "formatting-only" };
}

export function validateChunkingConfiguration(
  chunkSize: number,
  chunkOverlap: number,
): void {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError("chunkSize must be a positive integer");
  }
  if (
    !Number.isInteger(chunkOverlap) ||
    chunkOverlap < 0 ||
    chunkOverlap >= chunkSize
  ) {
    throw new RangeError(
      "chunkOverlap must be a non-negative integer smaller than chunkSize",
    );
  }
}
