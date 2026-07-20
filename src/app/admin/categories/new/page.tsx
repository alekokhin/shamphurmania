import type { Metadata } from 'next';
import { Box } from '@mui/material';
import CategoryForm from '@/components/admin/CategoryForm';

export const metadata: Metadata = {
  title: 'ახალი კატეგორია',
};

export default function NewCategoryPage() {
  return (
    <Box>
      <CategoryForm />
    </Box>
  );
}
