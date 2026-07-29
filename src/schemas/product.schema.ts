import { z } from 'zod/v4';

export const productImageSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().positive(),
  height: z.number().positive(),
  order: z.number().int().min(0),
});

export const bbqSpecsSchema = z.object({
  fuelType: z.string().optional(),
  cookingAreaCm2: z.number().positive().optional(),
  numberOfBurners: z.number().int().positive().optional(),
  btuRating: z.number().positive().optional(),
  grillMaterial: z.string().optional(),
  dimensions: z.string().optional(),
  weightKg: z.number().positive().optional(),
  color: z.string().optional(),
  ignitionType: z.string().optional(),
  hasSideburner: z.boolean().optional(),
  hasRotisserie: z.boolean().optional(),
  hasThermometer: z.boolean().optional(),
  hasWheels: z.boolean().optional(),
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
  warranty: z.string().optional(),
  manufacturer: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  bbqSpecs: bbqSpecsSchema.optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  isNewArrival: z.boolean(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProductFormData = z.input<typeof productSchema>;
export type ProductImageData = z.infer<typeof productImageSchema>;
export type BbqSpecsData = z.infer<typeof bbqSpecsSchema>;
