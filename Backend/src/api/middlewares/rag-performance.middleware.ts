import type { RequestHandler } from "express";

import {
  completeRagPerformance,
  createRagPerformanceContext,
  emitRagRequestReceived,
  runWithRagPerformanceContext,
} from "../../observability/rag-performance";

export const trackRagPerformance: RequestHandler = (
  request,
  response,
  next,
) => {
  const context = createRagPerformanceContext(
    request.method,
    request.originalUrl || request.url,
  );

  runWithRagPerformanceContext(context, () => {
    emitRagRequestReceived(context);
    response.once("finish", () => {
      completeRagPerformance(context, response.statusCode);
    });
    response.once("close", () => {
      if (!response.writableFinished) {
        completeRagPerformance(context, response.statusCode || 499);
      }
    });
    next();
  });
};
