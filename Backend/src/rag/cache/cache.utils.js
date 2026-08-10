"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheKey = createCacheKey;
exports.readPositiveInteger = readPositiveInteger;
const node_crypto_1 = require("node:crypto");
function createCacheKey(namespace, value) {
    return `${namespace}:${(0, node_crypto_1.createHash)("sha256")
        .update(stableStringify(value))
        .digest("hex")}`;
}
function readPositiveInteger(value, fallback) {
    if (value === undefined || value.trim() === "")
        return fallback;
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
function stableStringify(value) {
    if (value === null || typeof value !== "object") {
        return JSON.stringify(value) ?? undefined;
    }
    if (Array.isArray(value)) {
        return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
    }
    const record = value;
    return `{${Object.keys(record)
        .sort()
        .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
        .join(",")}}`;
}
//# sourceMappingURL=cache.utils.js.map