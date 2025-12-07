import z from 'zod/v4';

export const findUnitByIdSchema = z.strictObject({
  id: z.string().min(1, 'ID đơn vị tính là bắt buộc'),
});

