import { z } from 'zod/v4';

export const productImageSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().positive(),
  height: z.number().positive(),
  order: z.number().int().min(0),
});

export const shamfuriSpecsSchema = z.object({
  length: z.string().optional(),
  thickness: z.string().optional(),
  material: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, 'სახელი სავალდებულოა'),
  nameEn: z.string().optional(),
  sku: z.string().min(1, 'SKU სავალდებულოა'),
  shortDescription: z.string().optional(),
  description: z.string().min(10, 'აღწერა უნდა იყოს მინიმუმ 10 სიმბოლო'),
  price: z.number().positive('ფასი უნდა იყოს დადებითი'),
  discountPrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0, 'მარაგი არ შეიძლება იყოს უარყოფითი'),
  availability: z.enum(['IN_STOCK', 'OUT_OF_STOCK', 'PREORDER']),
  brandId: z.string().min(1, 'ბრენდი სავალდებულოა'),
  images: z.array(productImageSchema).min(1, 'მინიმუმ ერთი სურათი სავალდებულოა'),
  tags: z.array(z.string()),
  manufacturer: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  shamfuriSpecs: shamfuriSpecsSchema.optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  isNewArrival: z.boolean(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProductFormData = z.input<typeof productSchema>;
export type ProductImageData = z.infer<typeof productImageSchema>;
export type ShamfuriSpecsData = z.infer<typeof shamfuriSpecsSchema>;
