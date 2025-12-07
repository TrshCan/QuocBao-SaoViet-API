import z from 'zod/v4';

export const findCustomerByIdSchema = z.strictObject({
  customerId: z.uuid('Not match id format'),
});
