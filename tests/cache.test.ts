import { getFromCache, setCache, delCache, flushAll } from "../src/cache/cache";

jest.useFakeTimers();

describe("Cache Module", () => {
  const key = "testKey";
  const value = { data: "some data" };

  afterEach(() => {
    flushAll();
  });

  test("should set and get a value from cache", () => {
    setCache(key, value);
    const cached = getFromCache<typeof value>(key);
    expect(cached).toEqual(value);
  });

  test("should return undefined for a key not in cache", () => {
    const cached = getFromCache("nonexistentKey");
    expect(cached).toBeUndefined();
  });

  test("should delete a key from cache", () => {
    setCache(key, value);
    delCache(key);
    const cached = getFromCache<typeof value>(key);
    expect(cached).toBeUndefined();
  });

  test("should flush all keys from cache", () => {
    setCache("key1", 1);
    setCache("key2", 2);
    flushAll();
    expect(getFromCache("key1")).toBeUndefined();
    expect(getFromCache("key2")).toBeUndefined();
  });

  test("should respect custom TTL for a key", () => {
    setCache(key, value, 1); // 1 second TTL
    expect(getFromCache<typeof value>(key)).toEqual(value);

    // Advance time by 2 seconds
    jest.advanceTimersByTime(2000);

    const cached = getFromCache<typeof value>(key);
    expect(cached).toBeUndefined();
  });

  test("should use default TTL if none is provided", () => {
    setCache(key, value);
    expect(getFromCache<typeof value>(key)).toEqual(value);

    // Advance time by default TTL + 1 second
    const defaultTTL = Number(process.env.CACHE_TTL_SECONDS) || 60;
    jest.advanceTimersByTime((defaultTTL + 1) * 1000);

    const cached = getFromCache<typeof value>(key);
    expect(cached).toBeUndefined();
  });

  test("should store and retrieve multiple keys independently", () => {
    setCache("key1", 1);
    setCache("key2", 2);

    expect(getFromCache("key1")).toBe(1);
    expect(getFromCache("key2")).toBe(2);
  });
});
