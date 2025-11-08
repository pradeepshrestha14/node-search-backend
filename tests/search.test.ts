import request from "supertest";
import app from "../src/app";
import { flushAll } from "../src/cache/cache";

describe("GET /api/search", () => {
  beforeEach(() => {
    flushAll(); // reset cache before each test
  });

  // --- Valid queries ---
  test("returns results for valid query", async () => {
    const res = await request(app).get("/api/search").query({ q: "phone" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("limit");
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("returns all products when q is missing", async () => {
    const res = await request(app).get("/api/search");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10); // default limit
    expect(res.body.total).toBeGreaterThan(0);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // --- Validation errors ---
  test("throws error if only page is provided", async () => {
    const res = await request(app).get("/api/search").query({ page: 1 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body.errors[0].message).toBe("Both 'page' and 'limit' must be provided together");
  });

  test("throws error if only limit is provided", async () => {
    const res = await request(app).get("/api/search").query({ limit: 5 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body.errors[0].message).toBe("Both 'page' and 'limit' must be provided together");
  });

  test("throws error for invalid limit (>100)", async () => {
    const res = await request(app).get("/api/search").query({ page: 1, limit: 500 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body.errors[0].message).toMatch(/limit must be between 1 and 100/);
  });

  // --- Pagination ---
  test("returns paginated results when page and limit are provided", async () => {
    const res = await request(app).get("/api/search").query({ q: "phone", page: 1, limit: 2 });
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(2);
    expect(res.body.data.length).toBeLessThanOrEqual(2);
  });

  test("returns empty array if no products match query", async () => {
    const res = await request(app).get("/api/search").query({ q: "nonexistent" });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(0);
    expect(res.body.data).toEqual([]);
  });

  //Test Driven Development: this feature will be done later in future
  // test("trims query string and still returns results", async () => {
  //   const res = await request(app).get("/api/search").query({ q: "  phone  " });
  //   expect(res.status).toBe(200);
  //   expect(res.body.total).toBeGreaterThan(0);
  // });

  // --- Cache ---
  test("caches repeated queries (responses equal)", async () => {
    const res1 = await request(app).get("/api/search").query({ q: "iphone", page: 1, limit: 2 });
    expect(res1.status).toBe(200);

    const res2 = await request(app).get("/api/search").query({ q: "iphone", page: 1, limit: 2 });
    expect(res2.status).toBe(200);

    expect(res1.body).toEqual(res2.body);
  });
});
