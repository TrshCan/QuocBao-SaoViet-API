import { z } from 'zod/v4';
import { createZodDto } from 'nestjs-zod';

import { authForgotPasswordSchema } from '../validations';

export type RequestAuthForgotPasswordDto = z.infer<
  typeof authForgotPasswordSchema
>;

export class ClassRequestAuthForgotPasswordDto extends createZodDto(
  authForgotPasswordSchema,
) {}
