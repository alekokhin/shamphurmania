'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { productSchema } from '@/schemas/product.schema';
import { generateSlug } from '@/lib/utils';
import cloudinary from '@/lib/cloudinary';

export async function createProduct(data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const slug = generateSlug(parsed.data.nameEn || parsed.data.name);

  const existingSlug = await prisma.product.findUnique({ where: { slug } });
  if (existingSlug) {
    return { error: 'ეს სახელი უკვე გამოყენებულია' };
  }

  const existingSku = await prisma.product.findUnique({
    where: { sku: parsed.data.sku },
  });
  if (existingSku) {
    return { error: 'ეს SKU უკვე გამოყენებულია' };
  }

  const { categoryId, brandId, ...rest } = parsed.data;

  await prisma.product.create({
    data: {
      ...rest,
      slug,
      category: { connect: { id: categoryId } },
      brand: { connect: { id: brandId } },
    },
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, data: unknown) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'ვალიდაციის შეცდომა', fieldErrors: parsed.error.format() };
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return { error: 'პროდუქტი ვერ მოიძებნა' };
  }

  const existingSku = await prisma.product.findFirst({
    where: { sku: parsed.data.sku, id: { not: id } },
  });
  if (existingSku) {
    return { error: 'ეს SKU უკვე გამოყენებულია' };
  }

  const { categoryId, brandId, ...rest } = parsed.data;

  await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      category: { connect: { id: categoryId } },
      brand: { connect: { id: brandId } },
    },
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${product.slug}`);
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return { error: 'პროდუქტი ვერ მოიძებნა' };
  }

  // Delete images from Cloudinary
  for (const image of product.images) {
    try {
      await cloudinary.uploader.destroy(image.publicId);
    } catch {
      // Continue even if Cloudinary deletion fails
    }
  }

  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/products');
  return { success: true };
}

export async function toggleProductPublished(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: 'პროდუქტი ვერ მოიძებნა' };

  await prisma.product.update({
    where: { id },
    data: { isPublished: !product.isPublished },
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/products');
  return { success: true, isPublished: !product.isPublished };
}

export async function toggleProductFeatured(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: 'პროდუქტი ვერ მოიძებნა' };

  await prisma.product.update({
    where: { id },
    data: { isFeatured: !product.isFeatured },
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
  return { success: true, isFeatured: !product.isFeatured };
}
