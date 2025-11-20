import z from 'zod';

export const authForgotPasswordSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Email is required'),
});
