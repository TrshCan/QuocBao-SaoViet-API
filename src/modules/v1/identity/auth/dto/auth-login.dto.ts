import { z } from 'zod/v4';
import { createZodDto } from 'nestjs-zod';

import {
  requestAuthLoginSchema,
  responseAuthLoginSchema,
} from '../validations/auth-login-schema';

export type RequestAuthLoginDto = z.infer<typeof requestAuthLoginSchema>;

export class ClassRequestAuthLoginDto extends createZodDto(
  requestAuthLoginSchema,
) {}
export class ClassAuthLoginDto extends createZodDto(responseAuthLoginSchema) {}
