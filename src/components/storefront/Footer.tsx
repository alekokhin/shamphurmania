import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2fr 1fr 1fr',
            },
            gap: 4,
          }}
        >
          {/* Brand */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image
                src="/logo.jpg"
                alt="შამფურმანია"
                width={32}
                height={32}
                style={{ marginRight: 8, borderRadius: 4 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                შამფურმანია
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
              შამფურმანია - შამფურების, გრილების და ბარბექიუ აქსესუარების
              ონლაინ მაღაზია საქართველოში. პრემიუმ ხარისხის პროდუქცია საუკეთესო ფასად.
              იდეალური საჩუქარი მამაკაცისთვის და ბარბექიუს მოყვარულთათვის.
            </Typography>
          </Box>

          {/* Links */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
              ნავიგაცია
            </Typography>
            <Stack spacing={1}>
              <Link href="/">
                <Typography
                  variant="body2"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  მთავარი
                </Typography>
              </Link>
              <Link href="/products">
                <Typography
                  variant="body2"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  პროდუქტები
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
              კონტაქტი
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  +995 XXX XXX XXX
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  info@bbqstore.ge
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  თბილისი, საქართველო
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.800',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            &copy; {new Date().getFullYear()} შამფურმანია.
            ყველა უფლება დაცულია.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
