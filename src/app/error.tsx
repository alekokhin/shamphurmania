'use client';

import { Box, Container, Typography, Button } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          დაფიქსირდა შეცდომა
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          რაღაც შეცდომა მოხდა. გთხოვთ სცადოთ თავიდან.
        </Typography>
        <Button variant="contained" onClick={() => reset()} size="large">
          თავიდან ცდა
        </Button>
      </Box>
    </Container>
  );
}
