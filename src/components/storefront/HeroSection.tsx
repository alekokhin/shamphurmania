import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function HeroSection() {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 50%, #1a1a1a 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative fire icon */}
      <LocalFireDepartmentIcon
        sx={{
          position: 'absolute',
          right: { xs: -40, md: '10%' },
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: { xs: 200, md: 350 },
          opacity: 0.05,
          color: '#C62828',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 650 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 2,
              lineHeight: 1.15,
            }}
          >
            პრემიუმ შამფურები და გრილები
            <Box
              component="span"
              sx={{ color: 'primary.light', display: 'block' }}
            >
              საქართველოში
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 400,
              color: 'grey.400',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            აღმოაჩინეთ საუკეთესო შამფურები, გრილები და ბარბექიუს აქსესუარები
            თქვენი გარე სამზარეულოსთვის. წამყვანი ბრენდების პროდუქცია საუკეთესო ფასად.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.05rem',
                }}
              >
                პროდუქტების ნახვა
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
