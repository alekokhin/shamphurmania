'use client';

import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import type { ProductImageData } from '@/schemas/product.schema';

interface ProductGalleryProps {
  images: ProductImageData[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <Box
        sx={{
          aspectRatio: '1',
          bgcolor: 'grey.100',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        სურათი არ არის
      </Box>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <Box>
      {/* Main image */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1',
          bgcolor: 'grey.50',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {images.length > 1 && (
          <>
            <IconButton
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1
                )
              }
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
              }}
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0
                )
              }
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
              }}
              size="small"
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {images.map((image, index) => (
            <Box
              key={image.publicId}
              onClick={() => setSelectedIndex(index)}
              sx={{
                position: 'relative',
                width: 64,
                height: 64,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid',
                borderColor:
                  index === selectedIndex ? 'primary.main' : 'transparent',
                opacity: index === selectedIndex ? 1 : 0.6,
                '&:hover': { opacity: 1 },
                transition: 'all 0.2s',
              }}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} - ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="64px"
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
