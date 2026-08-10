"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const cache_1 = require("../../src/rag/cache");
class FakeRedisClient {
    isReady = true;
    values = new Map();
    async get(key) {
        return this.values.get(key) ?? null;
    }
    async set(key, value, _options) {
        this.values.set(key, value);
    }
    async del(key) {
        this.values.delete(key);
    }
}
(0, node_test_1.test)("uses bounded in-memory LRU entries and honors TTL expiry", async () => {
    const cache = new cache_1.ResilientCacheStore({
        maximumEntries: 1,
        redisClient: null,
    });
    await cache.set("first", { value: 1 }, 60);
    await cache.set("second", { value: 2 }, 60);
    strict_1.default.equal(await cache.get("first"), undefined);
    strict_1.default.deepEqual(await cache.get("second"), { value: 2 });
    await cache.set("short", "expires", 1);
    const originalNow = Date.now;
    Date.now = () => originalNow() + 1_001;
    try {
        strict_1.default.equal(await cache.get("short"), undefined);
    }
    finally {
        Date.now = originalNow;
    }
});
(0, node_test_1.test)("writes through to an available Redis client and falls back to memory", async () => {
    const redis = new FakeRedisClient();
    const writer = new cache_1.ResilientCacheStore({
        keyPrefix: "test:",
        redisClient: redis,
    });
    await writer.set("shared", { answer: "cached" }, 60);
    strict_1.default.deepEqual(await writer.get("shared"), { answer: "cached" });
    const reader = new cache_1.ResilientCacheStore({
        keyPrefix: "test:",
        redisClient: redis,
    });
    strict_1.default.deepEqual(await reader.get("shared"), { answer: "cached" });
});
