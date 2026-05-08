const { ZodError } = require("zod");

function errorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation Failed",
      errors: JSON.parse(err?.message).map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message,
      code: err.statusCode,
    },
  });
}
module.exports = errorMiddleware;
