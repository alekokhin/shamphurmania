import { z } from 'zod/v4';

export const settingsSchema = z.object({
  siteName: z.string().min(1, 'სახელი სავალდებულოა'),
  siteDescription: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactAddress: z.string().optional(),
  socialFacebook: z.string().optional(),
  socialInstagram: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
