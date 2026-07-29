import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ResilientCacheStore,
  type RedisCacheClient,
} from "../../src/rag/cache";

class FakeRedisClient implements RedisCacheClient {
  readonly isReady = true;
  readonly values = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.values.get(key) ?? null;
  }

  async set(
    key: string,
    value: string,
    _options: Readonly<{ EX: number }>,
  ): Promise<void> {
    this.values.set(key, value);
  }

  async del(key: string): Promise<void> {
    this.values.delete(key);
  }
}

test("uses bounded in-memory LRU entries and honors TTL expiry", async () => {
  const cache = new ResilientCacheStore({
    maximumEntries: 1,
    redisClient: null,
  });
  await cache.set("first", { value: 1 }, 60);
  await cache.set("second", { value: 2 }, 60);

  assert.equal(await cache.get("first"), undefined);
  assert.deepEqual(await cache.get("second"), { value: 2 });

  await cache.set("short", "expires", 1);
  const originalNow = Date.now;
  Date.now = () => originalNow() + 1_001;
  try {
    assert.equal(await cache.get("short"), undefined);
  } finally {
    Date.now = originalNow;
  }
});

test("writes through to an available Redis client and falls back to memory", async () => {
  const redis = new FakeRedisClient();
  const writer = new ResilientCacheStore({
    keyPrefix: "test:",
    redisClient: redis,
  });
  await writer.set("shared", { answer: "cached" }, 60);
  assert.deepEqual(await writer.get("shared"), { answer: "cached" });

  const reader = new ResilientCacheStore({
    keyPrefix: "test:",
    redisClient: redis,
  });
  assert.deepEqual(await reader.get("shared"), { answer: "cached" });
});
