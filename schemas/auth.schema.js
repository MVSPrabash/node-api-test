const { z } = require('zod');

const name = z.string().min(1);
const email = z.email();
const age = z.number().min(1);
const password = z.string().min(6);

const registerSchema = z.object({
  name,
  email,
  age,
  password
});

const loginSchema = z.object({
  email,
  password: z.string()
});

const forgotPasswordSchema = z.object({
    email: z.string().min(1)
});

const resetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(6)
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};

