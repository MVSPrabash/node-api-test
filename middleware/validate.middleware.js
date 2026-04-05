const validate = (schema, source = "body") => (req, res, next) => {
  const data = req[source];

  const result = schema.safeParse(data);

  if (!result.success) {
    console.log("Validation Middleware: user details not valid");
    return res.status(400).json({
      success: false,
      error: result.error.issues
    });
  }

  if (!req.validated) {
    req.validated = {};
  }

  req.validated[source] = result.data;

  next();
};

module.exports = { validate };
