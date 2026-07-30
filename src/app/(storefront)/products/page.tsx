export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import { getPublishedProducts } from '@/data/products';
import { getActiveBrands } from '@/data/brands';
import ProductGrid from '@/components/storefront/ProductGrid';
import ProductFilters from '@/components/storefront/ProductFilters';
import SearchBar from '@/components/storefront/SearchBar';
import PaginationBar from '@/components/storefront/PaginationBar';
import { BreadcrumbJsonLd } from '@/components/storefront/JsonLd';

export const metadata: Metadata = {
  title: 'პროდუქტები | შამფურმანია',
  description:
    'შამფურების და ბარბექიუს აქსესუარების სრული კატალოგი საუკეთესო ფასად საქართველოში.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const sp = await searchParams;

  const [data, brands] = await Promise.all([
    getPublishedProducts({
      page: Number(sp.page) || 1,
      brandSlug: sp.brand,
      search: sp.search,
      sortBy: sp.sort,
      minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
      maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    }),
    getActiveBrands(),
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'მთავარი', href: '/' },
          { name: 'პროდუქტები', href: '/products' },
        ]}
      />

      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        პროდუქტები
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {data.total > 0
          ? `ნაპოვნია ${data.total} პროდუქტი`
          : 'პროდუქტები ვერ მოიძებნა'}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '250px 1fr' },
          gap: 3,
        }}
      >
        {/* Sidebar filters */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Suspense fallback={<Skeleton variant="rounded" height={40} />}>
              <SearchBar />
            </Suspense>
          </Box>
          <Suspense
            fallback={<Skeleton variant="rounded" height={300} />}
          >
            <ProductFilters
              brands={brands.map((b) => ({ slug: b.slug, name: b.name }))}
            />
          </Suspense>
        </Box>

        {/* Product grid */}
        <Box>
          <ProductGrid products={data.products} />
          <PaginationBar
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        </Box>
      </Box>
    </Container>
  );
}
