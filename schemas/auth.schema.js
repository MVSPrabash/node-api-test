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

module.exports = {
  registerSchema,
  loginSchema
};

