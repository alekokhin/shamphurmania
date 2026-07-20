'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { categorySchema } from '@/schemas/category.schema';

export async function createCategory(data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const existing = await prisma.category.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: 'ეს სლაგი უკვე გამოყენებულია' };
  }

  await prisma.category.create({ data: parsed.data });
  revalidatePath('/admin/categories');
  revalidatePath('/');
  redirect('/admin/categories');
}

export async function updateCategory(id: string, data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const existing = await prisma.category.findFirst({
    where: { slug: parsed.data.slug, id: { not: id } },
  });
  if (existing) {
    return { error: 'ეს სლაგი უკვე გამოყენებულია' };
  }

  await prisma.category.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePath('/admin/categories');
  revalidatePath('/');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });
  if (productCount > 0) {
    return {
      error: `ამ კატეგორიას აქვს ${productCount} პროდუქტი. პირველად წაშალეთ ან გადაიტანეთ პროდუქტები.`,
    };
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { success: true };
}
