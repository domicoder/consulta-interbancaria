/**
 * Wraps an async route handler and forwards any thrown error to next().
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
