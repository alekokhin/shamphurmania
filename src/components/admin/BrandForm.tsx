'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  Alert,
  Switch,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { useTransition, useState, useEffect } from 'react';
import { brandSchema, type BrandFormData } from '@/schemas/brand.schema';
import { createBrand, updateBrand } from '@/actions/brand.actions';
import { generateSlug } from '@/lib/utils';

interface BrandFormProps {
  initialData?: BrandFormData & { id?: string };
}

export default function BrandForm({ initialData }: BrandFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      description: '',
      website: '',
      isActive: true,
    },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (!initialData?.id && nameValue) {
      setValue('slug', generateSlug(nameValue));
    }
  }, [nameValue, setValue, initialData?.id]);

  const onSubmit = (data: BrandFormData) => {
    setError('');
    startTransition(async () => {
      const result = initialData?.id
        ? await updateBrand(initialData.id, data)
        : await createBrand(data);

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {initialData?.id ? 'ბრენდის რედაქტირება' : 'ახალი ბრენდი'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          label="სახელი"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register('slug')}
          label="სლაგი (URL)"
          fullWidth
          error={!!errors.slug}
          helperText={errors.slug?.message || 'მაგ: weber'}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register('description')}
          label="აღწერა"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register('website')}
          label="ვებსაიტი"
          fullWidth
          error={!!errors.website}
          helperText={errors.website?.message || 'მაგ: https://weber.com'}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              {...register('isActive')}
              defaultChecked={initialData?.isActive ?? true}
            />
          }
          label="აქტიური"
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            size="large"
          >
            {isPending
              ? 'შენახვა...'
              : initialData?.id
                ? 'განახლება'
                : 'შექმნა'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
