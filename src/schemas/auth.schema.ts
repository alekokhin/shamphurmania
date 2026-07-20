import { z } from 'zod/v4';

export const loginSchema = z.object({
  email: z.email('სწორი ელ-ფოსტა შეიყვანეთ'),
  password: z.string().min(1, 'პაროლი სავალდებულოა'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
