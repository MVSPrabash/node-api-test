const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log("Validation Middleware: user details not valid");
    return res.status(400).json({
      success: false,
      error: result.error.errors
    });
  }

  req.validatedData = result.data;
  next();
};

module.exports = { validate };
