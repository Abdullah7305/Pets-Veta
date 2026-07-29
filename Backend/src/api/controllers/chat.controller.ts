import type { Request, Response } from "express";

import type { ChatRequestDto } from "../dto/chat.dto";
import type { AiChatOrchestrator } from "../types/chat.types";

import { sendMeasuredJson } from "../utils/measured-json-response";

export class ChatController {
  constructor(private readonly aiService: AiChatOrchestrator) {}

  async chat(request: Request, response: Response): Promise<void> {
    const result = await this.aiService.chat(request.body as ChatRequestDto);
    sendMeasuredJson(response, 200, {
      success: true,
      message: "AI response generated successfully",
      data: result,
    });
  }
}
