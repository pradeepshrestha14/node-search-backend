import NodeCache from "node-cache";

const ttlSeconds = Number(process.env.CACHE_TTL_SECONDS) || 60;
const cache = new NodeCache({
  stdTTL: ttlSeconds,
  checkperiod: Math.max(1, Math.floor(ttlSeconds / 2)),
});

export function getFromCache<T>(key: string): T | undefined {
  return cache.get<T>(key);
}

export function setCache<T>(key: string, value: T, ttl?: number): void {
  if (ttl) cache.set(key, value, ttl);
  else cache.set(key, value);
}

export function delCache(key: string): void {
  cache.del(key);
}

export function flushAll(): void {
  cache.flushAll();
}
