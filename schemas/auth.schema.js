const { z } = require('zod');

const name = z.string().min(1);
const email = z.email();
const password = z.string().min(6);

const registerSchema = z.object({
  name,
  email,
  password
});

const loginSchema = z.object({
  email,
  password: z.string()
});

module.exports = {
  registerSchema,
  loginSchema
};

