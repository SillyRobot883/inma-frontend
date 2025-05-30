import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'البريد الإلكتروني مطلوب').email('البريد الإلكتروني غير صحيح'),
  nationalId: z.string().min(1, 'رقم الهوية مطلوب'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
