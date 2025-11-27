import z from 'zod/v4';

// TYPE QUERY
export const findAllRolesSchema = z.strictObject({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional().default(''),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
