'use client';

import { useTransition } from 'react';
import { Chip, Stack } from '@mui/material';
import {
  toggleProductPublished,
  toggleProductFeatured,
} from '@/actions/product.actions';

interface ProductToggleButtonsProps {
  productId: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export default function ProductToggleButtons({
  productId,
  isPublished,
  isFeatured,
}: ProductToggleButtonsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Stack direction="row" spacing={0.5}>
      <Chip
        label={isPublished ? 'გამოქვეყნ.' : 'დრაფტი'}
        size="small"
        color={isPublished ? 'success' : 'default'}
        onClick={() => {
          startTransition(async () => {
            await toggleProductPublished(productId);
          });
        }}
        disabled={isPending}
        sx={{ cursor: 'pointer' }}
      />
      {isFeatured && (
        <Chip
          label="გამორჩეული"
          size="small"
          color="warning"
          onClick={() => {
            startTransition(async () => {
              await toggleProductFeatured(productId);
            });
          }}
          disabled={isPending}
          sx={{ cursor: 'pointer' }}
        />
      )}
    </Stack>
  );
}
