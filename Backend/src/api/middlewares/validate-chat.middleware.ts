import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { parseChatRequest } from "../validators/chat.validator";
import { ChatApiError } from "../types/chat.types";

export function validateChatRequest(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  try {
    request.body = parseChatRequest(request.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(
        new ChatApiError(
          "Invalid chat request",
          400,
          "VALIDATION_ERROR",
          error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
          error,
        ),
      );
      return;
    }
    next(error);
  }
}
