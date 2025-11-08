import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => {
      // Type guard to safely access properties
      return {
        field: "param" in err ? err.param : "",
        message: err.msg,
        value: "value" in err ? err.value : undefined,
        location: "location" in err ? err.location : undefined,
      };
    });

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  next();
};
