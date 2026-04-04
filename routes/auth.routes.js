const express = require('express');
const router = express.Router();

const { registerController, loginController } = require('../controllers/auth.controller.js');
const { validate } = require('../middleware/validate.middleware.js');
const { registerSchema, loginSchema } = require('../schemas/auth.schema.js');

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

module.exports = router;

