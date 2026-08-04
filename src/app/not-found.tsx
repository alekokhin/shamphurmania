import type { Metadata } from 'next';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'გვერდი ვერ მოიძებნა (404)',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
          გვერდი ვერ მოიძებნა
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          მოთხოვნილი გვერდი არ არსებობს ან გადატანილია.
        </Typography>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Link href="/">
            <Button variant="contained" size="large">
              მთავარ გვერდზე დაბრუნება
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outlined" size="large">
              შამფურების ნახვა
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
