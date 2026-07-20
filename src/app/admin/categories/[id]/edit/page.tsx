export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import CategoryForm from '@/components/admin/CategoryForm';
import { getCategoryById } from '@/data/categories';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <Box>
      <CategoryForm
        initialData={{
          id: category.id,
          name: category.name,
          nameEn: category.nameEn || '',
          slug: category.slug,
          description: category.description || '',
          image: category.image || '',
          order: category.order,
          isActive: category.isActive,
        }}
      />
    </Box>
  );
}
