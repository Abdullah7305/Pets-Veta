"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackRagPerformance = void 0;
const rag_performance_1 = require("../../observability/rag-performance");
const trackRagPerformance = (request, response, next) => {
    const context = (0, rag_performance_1.createRagPerformanceContext)(request.method, request.originalUrl || request.url);
    (0, rag_performance_1.runWithRagPerformanceContext)(context, () => {
        (0, rag_performance_1.emitRagRequestReceived)(context);
        response.once("finish", () => {
            (0, rag_performance_1.completeRagPerformance)(context, response.statusCode);
        });
        response.once("close", () => {
            if (!response.writableFinished) {
                (0, rag_performance_1.completeRagPerformance)(context, response.statusCode || 499);
            }
        });
        next();
    });
};
exports.trackRagPerformance = trackRagPerformance;
//# sourceMappingURL=rag-performance.middleware.js.map