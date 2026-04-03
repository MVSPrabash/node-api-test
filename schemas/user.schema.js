const { z } = require('zod');

const id = z.string().regex(/^[0-9a-fA-F]{24}$/);
const name = z.string().min(1);
const email = z.string().email();
const age = z.coerce.number().min(0);
const isActive = z.boolean();

const idParamScheme = z.object({
  id
});

const createUserSchema = z.object({
  name,
  email,
  age,
});

const updateUserSchema = z.object({
  name: name.optional(),
  email: email.optional(),
  age: age.optional(),
  isActive: isActive.optional()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idParamScheme
};
