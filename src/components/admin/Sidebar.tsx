'use client';

import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const DRAWER_WIDTH = 260;

const iconMap: Record<string, React.ReactElement> = {
  Dashboard: <DashboardIcon />,
  Inventory: <InventoryIcon />,
  Storefront: <StorefrontIcon />,
  Settings: <SettingsIcon />,
};

const navItems = [
  { label: 'მთავარი', href: '/admin/dashboard', icon: 'Dashboard' },
  { label: 'პროდუქტები', href: '/admin/products', icon: 'Inventory' },
  { label: 'ბრენდები', href: '/admin/brands', icon: 'Storefront' },
  { label: 'პარამეტრები', href: '/admin/settings', icon: 'Settings' },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Image
          src="/logo.jpg"
          alt="შამფურმანია"
          width={28}
          height={28}
          style={{ marginRight: 8, borderRadius: 4 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ადმინ პანელი
        </Typography>
      </Box>

      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin/dashboard' &&
              pathname.startsWith(item.href));
          return (
            <ListItem key={item.href} disablePadding sx={{ px: 1, mb: 0.5 }}>
              <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton
                  onClick={() => isMobile && setMobileOpen(false)}
                  selected={isActive}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      '& .MuiListItemIcon-root': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {iconMap[item.icon]}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', p: 1 }}>
        <ListItemButton
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="გასვლა" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 1200,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
          aria-label="მენიუ"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
