import z from 'zod/v4';

export const createUnitSchema = z.object({
  ten: z
    .string()
    .min(1, 'Tên đơn vị tính là bắt buộc')
    .max(255, 'Tên đơn vị tính không được vượt quá 255 ký tự'),
  moTa: z.string().max(255, 'Mô tả không được vượt quá 255 ký tự').optional(),
});
