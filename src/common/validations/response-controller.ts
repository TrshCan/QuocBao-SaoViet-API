import { z } from 'zod/v4';

export const responseControllerSchema = (dataSchema: z.ZodType) =>
  z.object({
    message: z.string().optional(),
    metadata: dataSchema,
  });
