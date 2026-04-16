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

module.exports = router;

