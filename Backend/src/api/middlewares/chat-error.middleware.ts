import type { ErrorRequestHandler } from "express";

import { ChatApiError } from "../types/chat.types";

import { markRagRequestFailure } from '../../observability/rag-performance';
import { sendMeasuredJson } from '../utils/measured-json-response';

export const chatErrorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  const apiError =
    error instanceof ChatApiError
      ? error
      : new ChatApiError(
          "An unexpected error occurred while processing the chat request",
          500,
          "INTERNAL_ERROR",
          undefined,
          error,
        );

  markRagRequestFailure(apiError.code);
  sendMeasuredJson(response, apiError.statusCode, {
    success: false,
    error: {
      code: apiError.code,
      message: apiError.message,
      ...(apiError.details === undefined ? {} : { details: apiError.details }),
    },
  });
};
