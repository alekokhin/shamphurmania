export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import ProductForm from '@/components/admin/ProductForm';
import { getAllCategories } from '@/data/categories';
import { getAllBrands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'ახალი პროდუქტი',
};

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        ახალი პროდუქტი
      </Typography>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
      />
    </Box>
  );
}
