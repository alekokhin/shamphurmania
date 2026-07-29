import { prisma } from '@/lib/prisma';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';
import type { Prisma } from '@prisma/client';

interface ProductQueryParams {
  page?: number;
  limit?: number;
  brandSlug?: string;
  search?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
}

function getSortOrder(
  sortBy?: string
): Prisma.ProductOrderByWithRelationInput {
  switch (sortBy) {
    case 'price-asc':
      return { price: 'asc' };
    case 'price-desc':
      return { price: 'desc' };
    case 'name-asc':
      return { name: 'asc' };
    case 'newest':
    default:
      return { createdAt: 'desc' };
  }
}

export async function getPublishedProducts(params: ProductQueryParams = {}) {
  const { page = 1, limit = PRODUCTS_PER_PAGE, ...filters } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = { isPublished: true };

  if (filters.brandSlug) {
    where.brand = { slug: filters.brandSlug };
  }
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { nameEn: { contains: filters.search, mode: 'insensitive' } },
      { tags: { has: filters.search } },
    ];
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }
  if (filters.fuelType) {
    where.bbqSpecs = { is: { fuelType: filters.fuelType } };
  }

  const orderBy = getSortOrder(filters.sortBy);

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: { brand: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true },
  });
}

export async function getFeaturedProducts(take = 8) {
  return prisma.product.findMany({
    where: { isPublished: true, isFeatured: true },
    include: { brand: true },
    take,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getNewArrivals(take = 4) {
  return prisma.product.findMany({
    where: { isPublished: true, isNewArrival: true },
    include: { brand: true },
    take,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getRelatedProducts(
  productId: string,
  brandId: string,
  take = 4
) {
  return prisma.product.findMany({
    where: {
      isPublished: true,
      brandId,
      id: { not: productId },
    },
    include: { brand: true },
    take,
    orderBy: { createdAt: 'desc' },
  });
}

// Admin queries (no caching, always fresh)
export async function getAllProducts(params: ProductQueryParams = {}) {
  const { page = 1, limit = PRODUCTS_PER_PAGE } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {};

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: 'insensitive' } },
      { sku: { contains: params.search, mode: 'insensitive' } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { brand: true },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, totalPages: Math.ceil(total / limit) };
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { brand: true },
  });
}

export async function getProductCount() {
  return prisma.product.count();
}

export async function getPublishedProductCount() {
  return prisma.product.count({ where: { isPublished: true } });
}
