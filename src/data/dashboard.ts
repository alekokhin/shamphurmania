import { prisma } from '@/lib/prisma';

export async function getDashboardStats() {
  const [productCount, publishedCount, categoryCount, brandCount, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

  return {
    productCount,
    publishedCount,
    categoryCount,
    brandCount,
    recentProducts,
  };
}
