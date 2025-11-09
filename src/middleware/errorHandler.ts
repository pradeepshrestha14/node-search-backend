import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction, // <- this is mandatory for Express to detect it
) => {
  console.error("❌ Error caught:", err);

  const statusCode = (err as AppError).statusCode || 500;
  const message =
    err instanceof AppError ? err.message : "Something went wrong. Please try again later.";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};
