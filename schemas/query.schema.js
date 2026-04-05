const { z } = require('zod');

const paginationSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional()
});

module.exports = { paginationSchema }

