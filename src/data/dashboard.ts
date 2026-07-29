import { prisma } from '@/lib/prisma';

export async function getDashboardStats() {
  const [productCount, publishedCount, brandCount, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.brand.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

  return {
    productCount,
    publishedCount,
    brandCount,
    recentProducts,
  };
}
