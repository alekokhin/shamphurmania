export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { getBrandBySlug } from '@/data/brands';
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
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: 'ბრენდი ვერ მოიძებნა' };

  return {
    title: `${brand.name} | შამფურმანია`,
    description: brand.description || `${brand.name} - შამფურმანია`,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const brand = await getBrandBySlug(slug);

  if (!brand || !brand.isActive) {
    notFound();
  }

  const data = await getPublishedProducts({
    page: Number(sp.page) || 1,
    brandSlug: slug,
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'მთავარი', href: '/' },
          { name: 'ბრენდები', href: '/products' },
          { name: brand.name, href: `/brands/${slug}` },
        ]}
      />
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        {brand.name}
      </Typography>
      {brand.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {brand.description}
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
