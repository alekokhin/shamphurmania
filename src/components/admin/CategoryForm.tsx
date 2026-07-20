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
import { categorySchema, type CategoryFormData } from '@/schemas/category.schema';
import { createCategory, updateCategory } from '@/actions/category.actions';
import { generateSlug } from '@/lib/utils';

interface CategoryFormProps {
  initialData?: CategoryFormData & { id?: string };
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: '',
      nameEn: '',
      slug: '',
      description: '',
      order: 0,
      isActive: true,
    },
  });

  const nameValue = watch('name');
  const nameEnValue = watch('nameEn');

  // Auto-generate slug from English name or Georgian name
  useEffect(() => {
    if (!initialData?.id) {
      const source = nameEnValue || nameValue;
      if (source) {
        setValue('slug', generateSlug(source));
      }
    }
  }, [nameValue, nameEnValue, setValue, initialData?.id]);

  const onSubmit = (data: CategoryFormData) => {
    setError('');
    startTransition(async () => {
      const result = initialData?.id
        ? await updateCategory(initialData.id, data)
        : await createCategory(data);

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {initialData?.id ? 'კატეგორიის რედაქტირება' : 'ახალი კატეგორია'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          label="სახელი (ქართული)"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          {...register('nameEn')}
          label="სახელი (English)"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          {...register('slug')}
          label="სლაგი (URL)"
          fullWidth
          error={!!errors.slug}
          helperText={errors.slug?.message || 'მაგ: gas-grills'}
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
          {...register('order', { valueAsNumber: true })}
          label="რიგი"
          type="number"
          fullWidth
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
