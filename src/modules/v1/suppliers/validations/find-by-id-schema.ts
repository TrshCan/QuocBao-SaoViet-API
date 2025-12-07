import z from 'zod/v4';

export const findSupplierByIdSchema = z.strictObject({
  supplierId: z.uuidv7('Not match id format'),
});
