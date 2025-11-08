import { query } from "express-validator";
import { AppError } from "../utils/AppError";

export const searchValidationRules = [
  // q is optional, but if present, must be a string
  query("q").optional().isString().trim(),

  // page and limit must either both be present or both be absent
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer").toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100")
    .toInt(),

  // Custom validator to ensure both page and limit appear together
  query().custom((value, { req }) => {
    const hasPage = req?.query?.page !== undefined;
    const hasLimit = req?.query?.limit !== undefined;
    if (hasPage !== hasLimit) {
      throw new AppError("Both 'page' and 'limit' must be provided together");
    }
    return true;
  }),
];
