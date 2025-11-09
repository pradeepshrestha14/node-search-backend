import { Request, Response, NextFunction } from "express";
import { getProducts } from "../services/productService";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

/**
 * Controller for: GET /api/search?q=...&page=...&limit=...
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for products
 *     description: Returns paginated product search results.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: The search query string.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page.
 *     responses:
 *       200:
 *         description: Successful search results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 */
export const searchController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { q, page, limit } = req.query;

    const query = typeof q === "string" ? q.trim() : undefined;
    const pageNumber = Number(page) || DEFAULT_PAGE;
    const limitNumber = Number(limit) || DEFAULT_LIMIT;

    const data = await getProducts({
      query,
      page: pageNumber,
      limit: limitNumber,
    });

    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    next(err); // Forward error to global handler
  }
};
