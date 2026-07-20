import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MobileNav from './MobileNav';

const navLinks = [
  { label: 'მთავარი', href: '/' },
  { label: 'პროდუქტები', href: '/products' },
];

export default function Header() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <LocalFireDepartmentIcon
              sx={{ color: 'primary.main', mr: 1, fontSize: 32 }}
            />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              BBQ Store
            </Typography>
          </Link>

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  color="inherit"
                  sx={{ fontSize: '0.95rem' }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Stack>

          {/* Mobile nav */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileNav links={navLinks} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
