import { Router } from "express";

import { ChatController } from "../controllers/chat.controller";
import { chatErrorHandler } from "../middlewares/chat-error.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validateChatRequest } from "../middlewares/validate-chat.middleware";
import { AiService } from "../services/ai.service";
import type { AiChatOrchestrator } from "../types/chat.types";

import { trackRagPerformance } from "../middlewares/rag-performance.middleware";

export function createChatRouter(
  aiService: AiChatOrchestrator = new AiService(),
): Router {
  const router = Router();
  const controller = new ChatController(aiService);

  router.post(
    "/chat",
    trackRagPerformance,
    validateChatRequest,
    asyncHandler((request, response) => controller.chat(request, response)),
  );
  router.use(chatErrorHandler);
  return router;
}
