import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import type { Product, Brand } from '@prisma/client';

type ProductWithRelations = Product & { brand: Brand };

interface ProductCardProps {
  product: ProductWithRelations;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.discountPrice
      ? getDiscountPercentage(product.price, product.discountPrice)
      : 0;

  const primaryImage = product.images[0];

  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '4/3',
          bgcolor: 'grey.100',
          overflow: 'hidden',
        }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'grey.400',
            }}
          >
            <Typography>სურათი არ არის</Typography>
          </Box>
        )}
        {/* Discount badge */}
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 700,
            }}
          />
        )}
        {product.isNewArrival && (
          <Chip
            label="ახალი"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          {product.brand.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 1,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          {product.discountPrice ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 700 }} color="error.main">
                {formatPrice(product.discountPrice)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {formatPrice(product.price)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
    </Link>
  );
}
