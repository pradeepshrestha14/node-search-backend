/**
 * Controller: pure function to handle HTTP layer.
 */
/**
 * GET /api/search?q=...&page=...&limit=...
 */
import { Request, Response, NextFunction } from "express";
import { getProducts } from "../services/productService";

export const handleSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, page, limit } = req.query;
    const query = typeof q === "string" ? q : undefined;

    const data = await getProducts({
      query,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    res.json({
      success: true, // ✅ Add this
      ...data,
    });
  } catch (err) {
    next(err); // passes to global error handler
  }
};
