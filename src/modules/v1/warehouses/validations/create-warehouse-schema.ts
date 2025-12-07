import z from 'zod/v4';

export const createWarehouseSchema = z.object({
  maKho: z
    .string()
    .min(1, 'Mã kho là bắt buộc')
    .max(100, 'Mã kho không được vượt quá 100 ký tự'),
  tenKho: z
    .string()
    .min(1, 'Tên kho là bắt buộc')
    .max(255, 'Tên kho không được vượt quá 255 ký tự'),
  diaChi: z
    .string()
    .max(255, 'Địa chỉ không được vượt quá 255 ký tự')
    .optional(),
  dienTich: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Diện tích phải là số hợp lệ (tối đa 2 chữ số thập phân)',
    )
    .optional(),
});
