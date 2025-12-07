import z from 'zod/v4';

export const updateCustomerSchema = z.object({
  code: z
    .string()
    .max(20, 'Code must be at most 20 characters')
    .optional()
    .nullable(),
  ten: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters')
    .optional(),
  soDienThoai: z
    .string()
    .max(20, 'Phone must be at most 20 characters')
    .optional()
    .nullable(),
  soDienThoai2: z
    .string()
    .max(20, 'Secondary phone must be at most 20 characters')
    .optional()
    .nullable(),
  email: z
    .email('Invalid email format')
    .max(120, 'Email must be at most 120 characters')
    .optional()
    .nullable(),
  diaChi: z
    .string()
    .max(255, 'Address must be at most 255 characters')
    .optional()
    .nullable(),
  loaiKhach: z
    .string()
    .max(50, 'Customer type must be at most 50 characters')
    .optional()
    .nullable(),
  tenCongTy: z
    .string()
    .max(150, 'Company name must be at most 150 characters')
    .optional()
    .nullable(),
});
