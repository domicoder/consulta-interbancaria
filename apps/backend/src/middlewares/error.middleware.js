import { logger } from "../utils/logger.js";
import { AppError } from "../utils/appError.js";

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
    code: "NOT_FOUND",
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  logger.error({ err }, "Unhandled error");

  res.status(500).json({
    success: false,
    message: "An unexpected error occurred.",
    code: "INTERNAL_SERVER_ERROR",
  });
}
