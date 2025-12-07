import z from 'zod/v4';

export const findProductByIdSchema = z.strictObject({
  id: z.string().min(1, 'ID sản phẩm là bắt buộc'),
});
