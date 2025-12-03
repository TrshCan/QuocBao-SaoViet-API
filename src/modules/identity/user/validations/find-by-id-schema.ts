import z from 'zod/v4';

export const findUserByIdSchema = z.strictObject({
  userId: z.uuidv7('Not match id format'),
});
