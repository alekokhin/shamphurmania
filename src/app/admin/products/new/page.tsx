export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import ProductForm from '@/components/admin/ProductForm';
import { getAllBrands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'ახალი პროდუქტი',
};

export default async function NewProductPage() {
  const brands = await getAllBrands();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        ახალი პროდუქტი
      </Typography>
      <ProductForm
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
      />
    </Box>
  );
}
