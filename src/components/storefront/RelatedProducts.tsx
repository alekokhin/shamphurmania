import { Box, Typography } from '@mui/material';
import { getRelatedProducts } from '@/data/products';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

export default async function RelatedProducts({
  productId,
  categoryId,
}: RelatedProductsProps) {
  const products = await getRelatedProducts(productId, categoryId, 4);

  if (products.length === 0) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        მსგავსი პროდუქტები
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
