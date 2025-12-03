import { UserStatus } from '@/generated/prisma/enums';
import z from 'zod/v4';

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters')
    .optional(),
  email: z.email('Invalid email format').optional().nullable(),
  phone: z
    .string()
    .max(20, 'Phone must be at most 20 characters')
    .optional()
    .nullable(),
  role: z.string().min(1).optional(),
  avatar: z.url('Invalid avatar URL').optional().nullable(),
  status: z.enum(UserStatus).optional(),
});
