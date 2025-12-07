import z from 'zod/v4';

export const findWarehouseByIdSchema = z.strictObject({
  id: z.string().min(1, 'ID kho là bắt buộc'),
});
