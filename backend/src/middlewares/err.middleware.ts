import { success, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.statusCode,
      },
    });
    return;
  }

  // Unknown/unexpected error
  res.status(500).json({
    success: false,
    error: {
      message: "Internal Server Error",
    },
  });
}

export default errorMiddleware;
