import z from 'zod/v4';

export const createSupplierSchema = z.object({
  tenNhaCungCap: z
    .string()
    .min(1, 'Supplier name is required')
    .max(255, 'Supplier name must be at most 255 characters'),
  diaChi: z
    .string()
    .max(255, 'Address must be at most 255 characters')
    .optional(),
  nguoiLienHe: z
    .string()
    .max(100, 'Contact person must be at most 100 characters')
    .optional(),
  soDienThoai: z
    .string()
    .max(20, 'Phone must be at most 20 characters')
    .optional(),
});
