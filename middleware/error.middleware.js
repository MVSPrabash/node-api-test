// Handles the response to the error

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.erros
  });
};

module.exports = { errorHandler };

