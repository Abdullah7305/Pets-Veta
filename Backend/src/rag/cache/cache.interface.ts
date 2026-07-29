export interface CacheStore {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface CacheStoreOptions {
  keyPrefix?: string;
  maximumEntries?: number;
  redisOperationTimeoutMs?: number;
  redisClient?: RedisCacheClient | null;
}

export interface RedisCacheClient {
  readonly isReady?: boolean;
  get(key: string): Promise<string | null>;
  set(
    key: string,
    value: string,
    options: Readonly<{ EX: number }>,
  ): Promise<unknown>;
  del(key: string): Promise<unknown>;
}
