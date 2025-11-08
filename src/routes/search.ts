// src/routes/searchRoutes.ts
import { Router } from "express";
import { searchValidationRules } from "../validators/searchValidator";
import { handleValidation } from "../middleware/validate";
import { handleSearch } from "../controllers/searchController";

const router = Router();

router.get("/", searchValidationRules, handleValidation, handleSearch);

const foo = 123;
console.log(foo);

export default router;
