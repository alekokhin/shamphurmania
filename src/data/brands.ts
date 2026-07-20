import { prisma } from '@/lib/prisma';

export async function getActiveBrands() {
  return prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
}

export async function getBrandBySlug(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
  });
}

export async function getAllBrands() {
  return prisma.brand.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getBrandById(id: string) {
  return prisma.brand.findUnique({
    where: { id },
  });
}
