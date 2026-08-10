"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMeasuredJson = sendMeasuredJson;
const rag_performance_1 = require("../../observability/rag-performance");
function sendMeasuredJson(response, statusCode, body) {
    const serialized = (0, rag_performance_1.measureRagStageSync)("jsonSerialization", () => JSON.stringify(body));
    response
        .status(statusCode)
        .set("Content-Type", "application/json; charset=utf-8")
        .send(serialized);
}
//# sourceMappingURL=measured-json-response.js.map