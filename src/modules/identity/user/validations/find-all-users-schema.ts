import { UserStatus } from '@/generated/prisma/enums';
import z from 'zod/v4';

export const findAllUsersSchema = z.strictObject({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional().default(''),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  status: z.enum(UserStatus).optional(),
});
