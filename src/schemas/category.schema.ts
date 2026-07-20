import { z } from 'zod/v4';

export const categorySchema = z.object({
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  nameEn: z.string().optional(),
  slug: z.string().min(2, 'სლაგი სავალდებულოა'),
  description: z.string().optional(),
  image: z.string().optional(),
  order: z.number().int().min(0),
  isActive: z.boolean(),
});

export type CategoryFormData = z.input<typeof categorySchema>;
