import { z } from "zod";

import type { MarkdownFrontMatter } from "../types/markdown-loader.interfaces";
import type { MarkdownMetadataValidationResult } from "../types/markdown-loader.types";

const requiredMarkdownMetadataSchema = z
  .object({
    id: z.string().trim().min(1, "id must be a non-empty string"),
    title: z.string().trim().min(1, "title must be a non-empty string"),
    animal: z.string().trim().min(1, "animal must be a non-empty string"),
    category: z.string().trim().min(1, "category must be a non-empty string"),
  })
  .passthrough();

export function validateMarkdownMetadata(
  data: unknown,
): MarkdownMetadataValidationResult {
  const result = requiredMarkdownMetadataSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      issues: result.error.issues.map((issue) => ({
        path: issue.path.map(String).join(".") || "frontMatter",
        message: issue.message,
      })),
    };
  }

  return {
    success: true,
    metadata: result.data as MarkdownFrontMatter,
  };
}
