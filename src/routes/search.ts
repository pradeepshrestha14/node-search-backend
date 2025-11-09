import { Router } from "express";
import { searchValidationRules } from "../validators/searchValidator";
import { handleValidation } from "../middleware/validate";
import { searchController } from "../controllers/searchController";

const router = Router();

/**
 * GET /api/search?q=...&page=...&limit=...
 */
router.get("/", searchValidationRules, handleValidation, searchController);

export default router;
