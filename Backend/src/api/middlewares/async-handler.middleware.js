"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
function asyncHandler(handler) {
    return (request, response, next) => {
        void Promise.resolve(handler(request, response, next)).catch(next);
    };
}
//# sourceMappingURL=async-handler.middleware.js.map