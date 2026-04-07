const { z } = require('zod');

const allowedSortFields = ["name", "age", "createdAt"];

const paginationSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
  sort: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true

      const fields = val.split(",");

      return fields.every(field => {
        const clean = field.startsWith("-") ? field.slice(1) : field;
        return allowedSortFields.includes(clean);
      });
    }, {
      message: "Invalid sort field"
    }),
  search: z.string().optional(),
  fields: z.string().optional()
}).passthrough();

module.exports = { paginationSchema }

