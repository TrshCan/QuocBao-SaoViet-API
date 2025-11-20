import { z } from 'zod';

import { authForgotPasswordSchema } from '../validations';

export type AuthForgotPasswordDto = z.infer<typeof authForgotPasswordSchema>;
