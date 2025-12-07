import z from 'zod/v4';

export const createCustomerSchema = z.object({
  code: z.string().max(20, 'Code must be at most 20 characters').optional(),
  ten: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters'),
  soDienThoai: z
    .string()
    .max(20, 'Phone must be at most 20 characters')
    .optional(),
  soDienThoai2: z
    .string()
    .max(20, 'Secondary phone must be at most 20 characters')
    .optional(),
  email: z
    .email('Invalid email format')
    .max(120, 'Email must be at most 120 characters')
    .optional(),
  diaChi: z
    .string()
    .max(255, 'Address must be at most 255 characters')
    .optional(),
  loaiKhach: z
    .string()
    .max(50, 'Customer type must be at most 50 characters')
    .optional(),
  tenCongTy: z
    .string()
    .max(150, 'Company name must be at most 150 characters')
    .optional(),
});
