import { Box } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Sidebar, { DRAWER_WIDTH } from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: { xs: 8, md: 3 },
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </SessionProvider>
  );
}
