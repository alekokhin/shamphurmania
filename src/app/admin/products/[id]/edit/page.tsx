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
          warranty: product.warranty || '',
          manufacturer: product.manufacturer || '',
          countryOfOrigin: product.countryOfOrigin || '',
          bbqSpecs: product.bbqSpecs
            ? {
                fuelType: product.bbqSpecs.fuelType || '',
                cookingAreaCm2: product.bbqSpecs.cookingAreaCm2 ?? undefined,
                numberOfBurners:
                  product.bbqSpecs.numberOfBurners ?? undefined,
                btuRating: product.bbqSpecs.btuRating ?? undefined,
                grillMaterial: product.bbqSpecs.grillMaterial || '',
                dimensions: product.bbqSpecs.dimensions || '',
                weightKg: product.bbqSpecs.weightKg ?? undefined,
                color: product.bbqSpecs.color || '',
                ignitionType: product.bbqSpecs.ignitionType || '',
                hasSideburner: product.bbqSpecs.hasSideburner ?? false,
                hasRotisserie: product.bbqSpecs.hasRotisserie ?? false,
                hasThermometer: product.bbqSpecs.hasThermometer ?? false,
                hasWheels: product.bbqSpecs.hasWheels ?? false,
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
