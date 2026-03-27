const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required")
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional()
});

module.exports = {
  createUserSchema,
  updateUserSchema
};
