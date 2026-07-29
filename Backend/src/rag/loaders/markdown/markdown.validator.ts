import { z } from "zod";

import type {
  MarkdownFrontMatter,
  MetadataValidationResult,
} from "./markdown.types";
import { SUPPORTED_ANIMALS } from "./markdown.types";

const nonEmptyString = z.string().trim().min(1);

export const markdownFrontMatterSchema = z
  .object({
    id: nonEmptyString.max(255),
    title: nonEmptyString.max(500),
    animal: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(SUPPORTED_ANIMALS)),
    category: nonEmptyString.max(100),
    subcategory: nonEmptyString.max(100).optional(),
    tags: z.array(nonEmptyString.max(100)).max(100).default([]),
  })
  .passthrough();

export function validateMarkdownFrontMatter(
  input: unknown,
): MetadataValidationResult {
  const result = markdownFrontMatterSchema.safeParse(input);
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
