import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (err: Error | AppError, req: Request, res: Response) => {
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
