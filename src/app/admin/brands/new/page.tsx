import type { Metadata } from 'next';
import { Box } from '@mui/material';
import BrandForm from '@/components/admin/BrandForm';

export const metadata: Metadata = {
  title: 'ახალი ბრენდი',
};

export default function NewBrandPage() {
  return (
    <Box>
      <BrandForm />
    </Box>
  );
}
