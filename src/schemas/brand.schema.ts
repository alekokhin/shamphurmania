import { z } from 'zod/v4';

export const brandSchema = z.object({
  name: z.string().min(1, 'სახელი სავალდებულოა'),
  slug: z.string().min(1, 'სლაგი სავალდებულოა'),
  logo: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean(),
});

export type BrandFormData = z.input<typeof brandSchema>;
