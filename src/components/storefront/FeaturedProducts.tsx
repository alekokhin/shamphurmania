import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from './ProductCard';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);

  if (products.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
              გამორჩეული შამფურები და გრილები
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              ჩვენი საუკეთესო და ყველაზე პოპულარული შამფურები, გრილები და აქსესუარები
            </Typography>
          </Box>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              ყველას ნახვა
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">
              ყველას ნახვა
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
