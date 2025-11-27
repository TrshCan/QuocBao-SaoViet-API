import z from 'zod/v4';

export const findByIdSchema = z.strictObject({
  roleId: z.uuidv7('Not match id format'),
});
