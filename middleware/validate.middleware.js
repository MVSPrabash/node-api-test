const { ApiError } = require("../utils/ApiError");

const validate = (schema, source = "body") => (req, res, next) => {
  const data = req[source];

  const result = schema.safeParse(data);

  if (!result.success) {
    return next(
      new ApiError(
        400,
        "Validation failed",
        result.error.errors
      )
    );
  }

  if (!req.validated) {
    req.validated = {};
  }

  req.validated[source] = result.data;

  next();
};

module.exports = { validate };
