export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { prisma } from '@/lib/prisma';
import SettingsForm from '@/components/admin/SettingsForm';

export const metadata: Metadata = {
  title: 'პარამეტრები',
};

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        პარამეტრები
      </Typography>
      <SettingsForm
        initialData={{
          siteName: settings?.siteName || 'BBQ Store Georgia',
          siteDescription: settings?.siteDescription || '',
          contactPhone: settings?.contactPhone || '',
          contactEmail: settings?.contactEmail || '',
          contactAddress: settings?.contactAddress || '',
          socialFacebook: settings?.socialFacebook || '',
          socialInstagram: settings?.socialInstagram || '',
          heroTitle: settings?.heroTitle || '',
          heroSubtitle: settings?.heroSubtitle || '',
        }}
      />
    </Box>
  );
}
