'use client';

import { useState } from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export default function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <IconButton onClick={() => setOpen(true)} aria-label="მენიუ">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.jpg"
              alt="შამფურმანია"
              width={28}
              height={28}
              style={{ marginRight: 8, borderRadius: 4 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              შამფურმანია
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} aria-label="დახურვა">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {links.map((link) => (
            <ListItem key={link.href} disablePadding>
              <Link href={link.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton
                  onClick={() => setOpen(false)}
                  selected={pathname === link.href}
                >
                  <ListItemText
                    primary={link.label}
                    slotProps={{ primary: { sx: { fontWeight: 500 } } }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
