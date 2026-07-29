import { z } from "zod";

import type { ChatRequestDto } from "../dto/chat.dto";

export const chatRequestSchema = z
  .object({
    question: z.string().trim().min(1).max(4_000),
    conversationId: z.uuid().optional(),
    topK: z.number().int().min(1).max(100).optional(),
    minimumSimilarity: z.number().min(-1).max(1).optional(),
    filters: z
      .object({
        animal: z.enum(["dog", "cat", "bird", "rabbit", "general"]).optional(),
        category: z.string().trim().min(1).max(100).optional(),
        subCategory: z.string().trim().min(1).max(100).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export function parseChatRequest(input: unknown): ChatRequestDto {
  return chatRequestSchema.parse(input) as ChatRequestDto;
}
