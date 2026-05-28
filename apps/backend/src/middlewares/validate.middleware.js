import { AppError } from "../utils/appError.js";

/**
 * Returns an Express middleware that validates req.body against a Zod schema.
 */
export function validateBody(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      return next(new AppError(message, 422, "VALIDATION_ERROR"));
    }
    req.body = result.data;
    next();
  };
}

/**
 * Returns an Express middleware that validates req.params against a Zod schema.
 */
export function validateParams(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      return next(new AppError(message, 422, "VALIDATION_ERROR"));
    }
    req.params = result.data;
    next();
  };
}
