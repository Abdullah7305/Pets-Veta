import type {
  CacheStore,
  CacheStoreOptions,
  RedisCacheClient,
} from "./cache.interface";
import { readPositiveInteger } from "./cache.utils";

type MemoryEntry = Readonly<{
  serializedValue: string;
  expiresAt: number;
}>;

const DEFAULT_CACHE_KEY_PREFIX = "pets-veta:rag:v1:";
const DEFAULT_MAXIMUM_ENTRIES = 1_000;
const DEFAULT_REDIS_OPERATION_TIMEOUT_MS = 100;

/**
 * A bounded process-local LRU cache backed by Redis when the application has
 * an active Redis connection. Slow or failed Redis operations degrade to
 * memory without failing a chat request.
 */
export class ResilientCacheStore implements CacheStore {
  private readonly entries = new Map<string, MemoryEntry>();
  private readonly keyPrefix: string;
  private readonly maximumEntries: number;
  private readonly redisOperationTimeoutMs: number;
  private readonly configuredRedisClient?: RedisCacheClient | null;

  constructor(options: CacheStoreOptions = {}) {
    this.keyPrefix = options.keyPrefix ?? DEFAULT_CACHE_KEY_PREFIX;
    this.maximumEntries =
      options.maximumEntries ??
      readPositiveInteger(
        process.env.RAG_CACHE_MAX_ENTRIES,
        DEFAULT_MAXIMUM_ENTRIES,
      );
    this.configuredRedisClient = options.redisClient;
    this.redisOperationTimeoutMs =
      options.redisOperationTimeoutMs ??
      readPositiveInteger(
        process.env.RAG_CACHE_OPERATION_TIMEOUT_MS,
        DEFAULT_REDIS_OPERATION_TIMEOUT_MS,
      );
  }

  async get<T>(key: string): Promise<T | undefined> {
    const namespacedKey = this.namespaced(key);
    const memoryValue = this.getFromMemory<T>(namespacedKey);
    if (memoryValue !== undefined) return memoryValue;

    const redis = this.redisClient();
    if (!redis?.isReady) return undefined;
    try {
      const serialized = await withTimeout(
        redis.get(namespacedKey),
        this.redisOperationTimeoutMs,
      );
      if (serialized === null) return undefined;
      return JSON.parse(serialized) as T;
    } catch {
      return undefined;
    }
  }

  async set<T>(
    key: string,
    value: T,
    ttlSeconds: number,
  ): Promise<void> {
    if (!Number.isSafeInteger(ttlSeconds) || ttlSeconds <= 0) return;
    let serialized: string;
    try {
      serialized = JSON.stringify(value);
    } catch {
      return;
    }

    const namespacedKey = this.namespaced(key);
    this.setMemory(
      namespacedKey,
      serialized,
      Date.now() + ttlSeconds * 1_000,
    );

    const redis = this.redisClient();
    if (!redis?.isReady) return;
    try {
      await withTimeout(
        redis.set(namespacedKey, serialized, { EX: ttlSeconds }),
        this.redisOperationTimeoutMs,
      );
    } catch {
      // The in-memory value remains available if Redis is interrupted.
    }
  }

  async delete(key: string): Promise<void> {
    const namespacedKey = this.namespaced(key);
    this.entries.delete(namespacedKey);
    const redis = this.redisClient();
    if (!redis?.isReady) return;
    try {
      await withTimeout(
        redis.del(namespacedKey),
        this.redisOperationTimeoutMs,
      );
    } catch {
      // Cache invalidation failures must not fail the request path.
    }
  }

  private getFromMemory<T>(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= Date.now()) {
      this.entries.delete(key);
      return undefined;
    }
    try {
      const value = JSON.parse(entry.serializedValue) as T;
      this.entries.delete(key);
      this.entries.set(key, entry);
      return value;
    } catch {
      this.entries.delete(key);
      return undefined;
    }
  }

  private setMemory(
    key: string,
    serializedValue: string,
    expiresAt: number,
  ): void {
    this.entries.delete(key);
    this.entries.set(key, { serializedValue, expiresAt });
    while (this.entries.size > this.maximumEntries) {
      const oldestKey = this.entries.keys().next().value as
        | string
        | undefined;
      if (oldestKey === undefined) break;
      this.entries.delete(oldestKey);
    }
  }

  private namespaced(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  private redisClient(): RedisCacheClient | null | undefined {
    if (this.configuredRedisClient !== undefined) {
      return this.configuredRedisClient;
    }
    return (
      globalThis as typeof globalThis & {
        __petsVetaRedisClient?: RedisCacheClient | null;
      }
    ).__petsVetaRedisClient;
  }
}

export function createRagCacheStore(
  options?: CacheStoreOptions,
): CacheStore {
  return new ResilientCacheStore(options);
}

async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  let timeout: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(
          () => reject(new Error("Cache operation timed out")),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
