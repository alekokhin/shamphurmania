export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById } from '@/data/products';
import { getAllBrands } from '@/data/brands';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, brands] = await Promise.all([
    getProductById(id),
    getAllBrands(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        პროდუქტის რედაქტირება
      </Typography>
      <ProductForm
        initialData={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          nameEn: product.nameEn || '',
          sku: product.sku,
          shortDescription: product.shortDescription || '',
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          availability: product.availability as
            | 'IN_STOCK'
            | 'OUT_OF_STOCK'
            | 'PREORDER',
          brandId: product.brandId,
          images: product.images.map((img) => ({
            publicId: img.publicId,
            url: img.url,
            alt: img.alt || '',
            width: img.width,
            height: img.height,
            order: img.order,
          })),
          tags: product.tags,
          manufacturer: product.manufacturer || '',
          countryOfOrigin: product.countryOfOrigin || '',
          shamfuriSpecs: product.shamfuriSpecs
            ? {
                length: product.shamfuriSpecs.length || '',
                thickness: product.shamfuriSpecs.thickness || '',
                material: product.shamfuriSpecs.material || '',
              }
            : undefined,
          isFeatured: product.isFeatured,
          isPublished: product.isPublished,
          isNewArrival: product.isNewArrival,
          metaTitle: product.metaTitle || '',
          metaDescription: product.metaDescription || '',
        }}
        brands={brands.map((b) => ({ id: b.id, name: b.name }))}
      />
    </Box>
  );
}
