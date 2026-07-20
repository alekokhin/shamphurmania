export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  Button,
  Breadcrumbs as MuiBreadcrumbs,
} from '@mui/material';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import { getProductBySlug } from '@/data/products';
import { prisma } from '@/lib/prisma';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { AVAILABILITY_MAP } from '@/lib/constants';
import ProductGallery from '@/components/storefront/ProductGallery';
import ProductSpecs from '@/components/storefront/ProductSpecs';
import RelatedProducts from '@/components/storefront/RelatedProducts';
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
} from '@/components/storefront/JsonLd';

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'პროდუქტი ვერ მოიძებნა' };

  const primaryImage = product.images[0];

  return {
    title: product.metaTitle || product.name,
    description:
      product.metaDescription ||
      product.shortDescription ||
      product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description.slice(0, 160),
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              width: primaryImage.width,
              height: primaryImage.height,
            },
          ]
        : [],
      locale: 'ka_GE',
      type: 'website',
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.isPublished) {
    notFound();
  }

  const discount = product.discountPrice
    ? getDiscountPercentage(product.price, product.discountPrice)
    : 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: 'მთავარი', href: '/' },
          { name: 'პროდუქტები', href: '/products' },
          { name: product.category.name, href: `/categories/${product.category.slug}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />

      {/* Breadcrumbs */}
      <MuiBreadcrumbs sx={{ mb: 3 }}>
        <Link href="/">
          <Typography variant="body2" color="text.secondary">
            მთავარი
          </Typography>
        </Link>
        <Link href="/products">
          <Typography variant="body2" color="text.secondary">
            პროდუქტები
          </Typography>
        </Link>
        <Link href={`/categories/${product.category.slug}`}>
          <Typography variant="body2" color="text.secondary">
            {product.category.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.primary">
          {product.name}
        </Typography>
      </MuiBreadcrumbs>

      {/* Product layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 3, md: 5 },
        }}
      >
        {/* Left - Gallery */}
        <ProductGallery
          images={product.images.map((img) => ({
            publicId: img.publicId,
            url: img.url,
            alt: img.alt || undefined,
            width: img.width,
            height: img.height,
            order: img.order,
          }))}
          productName={product.name}
        />

        {/* Right - Info */}
        <Box>
          <Typography variant="caption" color="text.secondary">
            {product.brand.name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Chip
              label={AVAILABILITY_MAP[product.availability] || product.availability}
              size="small"
              color={product.availability === 'IN_STOCK' ? 'success' : 'default'}
            />
            <Typography variant="caption" color="text.secondary">
              SKU: {product.sku}
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ mb: 3 }}>
            {product.discountPrice ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800 }}
                  color="error.main"
                >
                  {formatPrice(product.discountPrice)}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                  }}
                >
                  {formatPrice(product.price)}
                </Typography>
                {discount > 0 && (
                  <Chip
                    label={`-${discount}%`}
                    color="error"
                    size="small"
                  />
                )}
              </Box>
            ) : (
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {formatPrice(product.price)}
              </Typography>
            )}
          </Box>

          {/* Short description */}
          {product.shortDescription && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {product.shortDescription}
            </Typography>
          )}

          {/* Contact button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<PhoneIcon />}
            sx={{ mb: 3, px: 4 }}
            href="tel:+995XXXXXXXXX"
          >
            დაგვიკავშირდით
          </Button>

          {/* Tags */}
          {product.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Specifications */}
          <ProductSpecs
            specs={product.bbqSpecs}
            warranty={product.warranty}
            manufacturer={product.manufacturer}
            countryOfOrigin={product.countryOfOrigin}
          />
        </Box>
      </Box>

      {/* Full description */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          აღწერა
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
        >
          {product.description}
        </Typography>
      </Box>

      {/* Related products */}
      <RelatedProducts
        productId={product.id}
        categoryId={product.categoryId}
      />
    </Container>
  );
}
