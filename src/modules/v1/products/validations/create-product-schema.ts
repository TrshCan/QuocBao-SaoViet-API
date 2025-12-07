import z from 'zod/v4';

export const createProductSchema = z.object({
  maSanPham: z
    .string()
    .min(1, 'Mã sản phẩm là bắt buộc')
    .max(100, 'Mã sản phẩm không được vượt quá 100 ký tự'),
  tenSanPham: z
    .string()
    .min(1, 'Tên sản phẩm là bắt buộc')
    .max(255, 'Tên sản phẩm không được vượt quá 255 ký tự'),
  nhom: z.string().max(100, 'Nhóm không được vượt quá 100 ký tự').optional(),
  moTa: z.string().max(255, 'Mô tả không được vượt quá 255 ký tự').optional(),
  donViTinhId: z.string().min(1, 'Đơn vị tính là bắt buộc'),
  quanLyLo: z.boolean().optional().default(false),
  quanLyHSD: z.boolean().optional().default(false),
  quanLySerial: z.boolean().optional().default(false),
});
