import z from 'zod/v4';

export const validateReceiptSchema = z.strictObject({
  id: z.string().min(1, 'ID phiếu nhập là bắt buộc'),
});
