'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { brandSchema } from '@/schemas/brand.schema';

export async function createBrand(data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = brandSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const existing = await prisma.brand.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existing) {
    return { error: 'ეს სლაგი უკვე გამოყენებულია' };
  }

  const brandData = {
    ...parsed.data,
    website: parsed.data.website || undefined,
  };

  await prisma.brand.create({ data: brandData });
  revalidatePath('/admin/brands');
  revalidatePath('/');
  redirect('/admin/brands');
}

export async function updateBrand(id: string, data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = brandSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const existing = await prisma.brand.findFirst({
    where: { slug: parsed.data.slug, id: { not: id } },
  });
  if (existing) {
    return { error: 'ეს სლაგი უკვე გამოყენებულია' };
  }

  const brandData = {
    ...parsed.data,
    website: parsed.data.website || undefined,
  };

  await prisma.brand.update({
    where: { id },
    data: brandData,
  });
  revalidatePath('/admin/brands');
  revalidatePath('/');
  redirect('/admin/brands');
}

export async function deleteBrand(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const productCount = await prisma.product.count({
    where: { brandId: id },
  });
  if (productCount > 0) {
    return {
      error: `ამ ბრენდს აქვს ${productCount} პროდუქტი. პირველად წაშალეთ ან გადაიტანეთ პროდუქტები.`,
    };
  }

  await prisma.brand.delete({ where: { id } });
  revalidatePath('/admin/brands');
  revalidatePath('/');
  return { success: true };
}
