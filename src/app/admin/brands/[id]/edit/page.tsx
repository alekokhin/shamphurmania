export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import BrandForm from '@/components/admin/BrandForm';
import { getBrandById } from '@/data/brands';

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await getBrandById(id);

  if (!brand) {
    notFound();
  }

  return (
    <Box>
      <BrandForm
        initialData={{
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          logo: brand.logo || '',
          description: brand.description || '',
          website: brand.website || '',
          isActive: brand.isActive,
        }}
      />
    </Box>
  );
}
