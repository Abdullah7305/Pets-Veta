import type { Response } from "express";

import { measureRagStageSync } from "../../observability/rag-performance";

export function sendMeasuredJson(
  response: Response,
  statusCode: number,
  body: unknown,
): void {
  const serialized = measureRagStageSync("jsonSerialization", () =>
    JSON.stringify(body),
  );
  response
    .status(statusCode)
    .set("Content-Type", "application/json; charset=utf-8")
    .send(serialized);
}
