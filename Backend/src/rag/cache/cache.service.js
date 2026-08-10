"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilientCacheStore = void 0;
exports.createRagCacheStore = createRagCacheStore;
const cache_utils_1 = require("./cache.utils");
const DEFAULT_CACHE_KEY_PREFIX = "pets-veta:rag:v1:";
const DEFAULT_MAXIMUM_ENTRIES = 1_000;
const DEFAULT_REDIS_OPERATION_TIMEOUT_MS = 100;
/**
 * A bounded process-local LRU cache backed by Redis when the application has
 * an active Redis connection. Slow or failed Redis operations degrade to
 * memory without failing a chat request.
 */
class ResilientCacheStore {
    entries = new Map();
    keyPrefix;
    maximumEntries;
    redisOperationTimeoutMs;
    configuredRedisClient;
    constructor(options = {}) {
        this.keyPrefix = options.keyPrefix ?? DEFAULT_CACHE_KEY_PREFIX;
        this.maximumEntries =
            options.maximumEntries ??
                (0, cache_utils_1.readPositiveInteger)(process.env.RAG_CACHE_MAX_ENTRIES, DEFAULT_MAXIMUM_ENTRIES);
        this.configuredRedisClient = options.redisClient;
        this.redisOperationTimeoutMs =
            options.redisOperationTimeoutMs ??
                (0, cache_utils_1.readPositiveInteger)(process.env.RAG_CACHE_OPERATION_TIMEOUT_MS, DEFAULT_REDIS_OPERATION_TIMEOUT_MS);
    }
    async get(key) {
        const namespacedKey = this.namespaced(key);
        const memoryValue = this.getFromMemory(namespacedKey);
        if (memoryValue !== undefined)
            return memoryValue;
        const redis = this.redisClient();
        if (!redis?.isReady)
            return undefined;
        try {
            const serialized = await withTimeout(redis.get(namespacedKey), this.redisOperationTimeoutMs);
            if (serialized === null)
                return undefined;
            return JSON.parse(serialized);
        }
        catch {
            return undefined;
        }
    }
    async set(key, value, ttlSeconds) {
        if (!Number.isSafeInteger(ttlSeconds) || ttlSeconds <= 0)
            return;
        let serialized;
        try {
            serialized = JSON.stringify(value);
        }
        catch {
            return;
        }
        const namespacedKey = this.namespaced(key);
        this.setMemory(namespacedKey, serialized, Date.now() + ttlSeconds * 1_000);
        const redis = this.redisClient();
        if (!redis?.isReady)
            return;
        try {
            await withTimeout(redis.set(namespacedKey, serialized, { EX: ttlSeconds }), this.redisOperationTimeoutMs);
        }
        catch {
            // The in-memory value remains available if Redis is interrupted.
        }
    }
    async delete(key) {
        const namespacedKey = this.namespaced(key);
        this.entries.delete(namespacedKey);
        const redis = this.redisClient();
        if (!redis?.isReady)
            return;
        try {
            await withTimeout(redis.del(namespacedKey), this.redisOperationTimeoutMs);
        }
        catch {
            // Cache invalidation failures must not fail the request path.
        }
    }
    getFromMemory(key) {
        const entry = this.entries.get(key);
        if (!entry)
            return undefined;
        if (entry.expiresAt <= Date.now()) {
            this.entries.delete(key);
            return undefined;
        }
        try {
            const value = JSON.parse(entry.serializedValue);
            this.entries.delete(key);
            this.entries.set(key, entry);
            return value;
        }
        catch {
            this.entries.delete(key);
            return undefined;
        }
    }
    setMemory(key, serializedValue, expiresAt) {
        this.entries.delete(key);
        this.entries.set(key, { serializedValue, expiresAt });
        while (this.entries.size > this.maximumEntries) {
            const oldestKey = this.entries.keys().next().value;
            if (oldestKey === undefined)
                break;
            this.entries.delete(oldestKey);
        }
    }
    namespaced(key) {
        return `${this.keyPrefix}${key}`;
    }
    redisClient() {
        if (this.configuredRedisClient !== undefined) {
            return this.configuredRedisClient;
        }
        return globalThis.__petsVetaRedisClient;
    }
}
exports.ResilientCacheStore = ResilientCacheStore;
function createRagCacheStore(options) {
    return new ResilientCacheStore(options);
}
async function withTimeout(operation, timeoutMs) {
    let timeout;
    try {
        return await Promise.race([
            operation,
            new Promise((_resolve, reject) => {
                timeout = setTimeout(() => reject(new Error("Cache operation timed out")), timeoutMs);
            }),
        ]);
    }
    finally {
        if (timeout)
            clearTimeout(timeout);
    }
}
//# sourceMappingURL=cache.service.js.map