'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { settingsSchema } from '@/schemas/settings.schema';

export async function updateSettings(data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = settingsSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა' };
  }

  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: parsed.data,
    });
  } else {
    await prisma.siteSettings.create({
      data: parsed.data,
    });
  }

  revalidatePath('/');
  return { success: true };
}
