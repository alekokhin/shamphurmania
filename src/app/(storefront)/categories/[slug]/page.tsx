export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import { getCategoryBySlug } from '@/data/categories';
import { getPublishedProducts } from '@/data/products';
import ProductGrid from '@/components/storefront/ProductGrid';
import PaginationBar from '@/components/storefront/PaginationBar';
import { BreadcrumbJsonLd } from '@/components/storefront/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'კატეგორია ვერ მოიძებნა' };

  return {
    title: `${category.name} | ბარბექიუ გრილები`,
    description: category.description || `${category.name} - BBQ Store Georgia`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category || !category.isActive) {
    notFound();
  }

  const data = await getPublishedProducts({
    page: Number(sp.page) || 1,
    categorySlug: slug,
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'მთავარი', href: '/' },
          { name: 'კატეგორიები', href: '/products' },
          { name: category.name, href: `/categories/${slug}` },
        ]}
      />
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        {category.name}
      </Typography>
      {category.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {category.description}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {data.total} პროდუქტი
      </Typography>
      <ProductGrid products={data.products} />
      <PaginationBar
        currentPage={data.currentPage}
        totalPages={data.totalPages}
      />
    </Container>
  );
}
