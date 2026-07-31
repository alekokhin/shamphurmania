'use client';

import { useForm, Controller } from 'react-hook-form';
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
  MenuItem,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { useTransition, useState } from 'react';
import { productSchema, type ProductFormData } from '@/schemas/product.schema';
import { createProduct, updateProduct } from '@/actions/product.actions';
import ImageUploader from './ImageUploader';
import { AVAILABILITY_OPTIONS } from '@/lib/constants';

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string; slug?: string };
  brands: { id: string; name: string }[];
}

export default function ProductForm({
  initialData,
  brands,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      nameEn: '',
      sku: '',
      shortDescription: '',
      description: '',
      price: 0,
      discountPrice: null,
      stock: 0,
      availability: 'IN_STOCK',
      brandId: '',
      images: [],
      tags: [],
      manufacturer: '',
      countryOfOrigin: '',
      shamfuriSpecs: {
        length: '',
        thickness: '',
        material: '',
      },
      isFeatured: false,
      isPublished: false,
      isNewArrival: false,
      metaTitle: '',
      metaDescription: '',
    },
  });

  const tags = watch('tags') || [];

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tagToRemove)
    );
  };

  const onSubmit = (data: ProductFormData) => {
    setError('');
    startTransition(async () => {
      const result = initialData?.id
        ? await updateProduct(initialData.id, data)
        : await createProduct(data);

      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Left column - Main info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Info */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ძირითადი ინფორმაცია
            </Typography>
            <TextField
              {...register('name')}
              label="სახელი (ქართული) *"
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
              {...register('sku')}
              label="SKU *"
              fullWidth
              error={!!errors.sku}
              helperText={errors.sku?.message}
              sx={{ mb: 2 }}
            />
            <TextField
              {...register('shortDescription')}
              label="მოკლე აღწერა"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
            <TextField
              {...register('description')}
              label="სრული აღწერა *"
              fullWidth
              multiline
              rows={6}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Paper>

          {/* Pricing */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ფასი და მარაგი
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                {...register('price', { valueAsNumber: true })}
                label="ფასი (GEL) *"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
              />
              <TextField
                {...register('discountPrice', { valueAsNumber: true })}
                label="ფასდაკლებული ფასი (GEL)"
                type="number"
                slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
              />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
              }}
            >
              <TextField
                {...register('stock', { valueAsNumber: true })}
                label="მარაგი"
                type="number"
                error={!!errors.stock}
                helperText={errors.stock?.message}
                slotProps={{ htmlInput: { min: '0' } }}
              />
              <TextField
                {...register('availability')}
                label="ხელმისაწვდომობა"
                select
                defaultValue={initialData?.availability || 'IN_STOCK'}
              >
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>

          {/* Shamfuri Specs */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              შამფურის ინფორმაცია
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                {...register('shamfuriSpecs.length')}
                label="შამფურის სიგრძე"
                placeholder="მაგ: 40 სმ"
              />
              <TextField
                {...register('shamfuriSpecs.thickness')}
                label="შამფურის სისქე"
                placeholder="მაგ: 2 მმ"
              />
              <TextField
                {...register('shamfuriSpecs.material')}
                label="შამფურის მასალა"
                placeholder="მაგ: უჟანგავი ფოლადი"
              />
            </Box>
          </Paper>

          {/* Additional Info */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              დამატებითი ინფორმაცია
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
<TextField
                {...register('manufacturer')}
                label="მწარმოებელი"
              />
              <TextField
                {...register('countryOfOrigin')}
                label="წარმოშობის ქვეყანა"
              />
            </Box>
          </Paper>

          {/* SEO */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              SEO
            </Typography>
            <TextField
              {...register('metaTitle')}
              label="Meta სათაური"
              fullWidth
              sx={{ mb: 2 }}
              helperText="დატოვეთ ცარიელი პროდუქტის სახელის გამოსაყენებლად"
            />
            <TextField
              {...register('metaDescription')}
              label="Meta აღწერა"
              fullWidth
              multiline
              rows={2}
            />
          </Paper>
        </Box>

        {/* Right column - Status, images, tags */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Status */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              სტატუსი
            </Typography>
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  }
                  label="გამოქვეყნებული"
                />
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  }
                  label="გამორჩეული"
                />
              )}
            />
            <Controller
              name="isNewArrival"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  }
                  label="ახალი"
                />
              )}
            />
          </Paper>

          {/* Brand */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ბრენდი
            </Typography>
            <TextField
              {...register('brandId')}
              label="ბრენდი *"
              select
              fullWidth
              error={!!errors.brandId}
              helperText={errors.brandId?.message}
              defaultValue={initialData?.brandId || ''}
            >
              <MenuItem value="">აირჩიეთ</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
          </Paper>

          {/* Images */}
          <Paper sx={{ p: 3 }}>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  images={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.images && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.images.message}
              </Typography>
            )}
          </Paper>

          {/* Tags */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              ტეგები
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="ტეგის დამატება"
                size="small"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddTag}
              >
                +
              </Button>
            </Box>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Stack>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
        >
          {isPending
            ? 'შენახვა...'
            : initialData?.id
              ? 'განახლება'
              : 'შექმნა'}
        </Button>
      </Box>
    </form>
  );
}
