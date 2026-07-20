'use client';

import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { Button, Box, Typography, IconButton, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import type { ProductImageData } from '@/schemas/product.schema';

interface ImageUploaderProps {
  images: ProductImageData[];
  onChange: (images: ProductImageData[]) => void;
  folder?: string;
}

export default function ImageUploader({
  images,
  onChange,
  folder = 'bbq-store/products',
}: ImageUploaderProps) {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object') {
      const info = result.info as Record<string, unknown>;
      const newImage: ProductImageData = {
        publicId: info.public_id as string,
        url: info.secure_url as string,
        alt: '',
        width: info.width as number,
        height: info.height as number,
        order: images.length,
      };
      onChange([...images, newImage]);
    }
  };

  const handleRemove = (index: number) => {
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    onChange(updated);
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        სურათები
      </Typography>

      {/* Image preview grid */}
      {images.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 1,
            mb: 2,
          }}
        >
          {images.map((image, index) => (
            <Paper
              key={image.publicId}
              sx={{
                position: 'relative',
                aspectRatio: '1',
                overflow: 'hidden',
                borderRadius: 1,
                border: index === 0 ? '2px solid' : '1px solid',
                borderColor: index === 0 ? 'primary.main' : 'divider',
              }}
            >
              <Image
                src={image.url}
                alt={image.alt || `სურათი ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
              />
              {index === 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    textAlign: 'center',
                    py: 0.25,
                    fontSize: '0.65rem',
                  }}
                >
                  მთავარი
                </Typography>
              )}
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  padding: 0.5,
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      {/* Upload button */}
      <CldUploadWidget
        signatureEndpoint="/api/upload/sign"
        options={{
          folder,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 5_000_000,
          maxFiles: 10,
          multiple: true,
          sources: ['local', 'url'],
        }}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => open()}
            fullWidth
            sx={{ py: 2, borderStyle: 'dashed' }}
          >
            სურათების ატვირთვა
          </Button>
        )}
      </CldUploadWidget>
    </Box>
  );
}
