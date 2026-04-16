const express = require('express');
const router = express.Router();

const { registerController, loginController, forgotPasswordController, resetPasswordController } = require('../controllers/auth.controller.js');
const { validate } = require('../middleware/validate.middleware.js');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../schemas/auth.schema.js');

router.post(
  '/register',
  validate(registerSchema),
  registerController
);

router.post(
  '/login',
  validate(loginSchema),
  loginController
);

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  forgotPasswordController
);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  resetPasswordController
);

router.get("/reset-password", (req, res) => {
  const { token } = req.query;

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
</head>
<body>
  <h2>Reset Password</h2>

  <form method="POST" action="/api/auth/reset-password">
    <input type="hidden" name="token" value="${token}" />

    <label>New Password:</label><br>
    <input type="password" name="password" required /><br><br>

    <button type="submit">Reset Password</button>
  </form>
</body>
</html>
  `);
});

module.exports = router;

