import { Box, Typography } from '@mui/material';
import type { Product, Brand } from '@prisma/client';
import ProductCard from './ProductCard';

type ProductWithRelations = Product & { brand: Brand };

interface ProductGridProps {
  products: ProductWithRelations[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
          პროდუქტები ვერ მოიძებნა
        </Typography>
        <Typography variant="body1" color="text.secondary">
          სცადეთ სხვა ფილტრები ან ძიება
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
