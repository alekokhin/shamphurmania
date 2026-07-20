'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Alert,
  Paper,
  Typography,
  Box,
  Divider,
  Snackbar,
} from '@mui/material';
import { useTransition, useState } from 'react';
import {
  settingsSchema,
  type SettingsFormData,
} from '@/schemas/settings.schema';
import { updateSettings } from '@/actions/settings.actions';

interface SettingsFormProps {
  initialData: SettingsFormData;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: SettingsFormData) => {
    setError('');
    startTransition(async () => {
      const result = await updateSettings(data);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            საიტის ინფორმაცია
          </Typography>
          <TextField
            {...register('siteName')}
            label="საიტის სახელი"
            fullWidth
            error={!!errors.siteName}
            helperText={errors.siteName?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('siteDescription')}
            label="საიტის აღწერა"
            fullWidth
            multiline
            rows={3}
          />
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            საკონტაქტო ინფორმაცია
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            <TextField
              {...register('contactPhone')}
              label="ტელეფონი"
              placeholder="+995 XXX XXX XXX"
            />
            <TextField
              {...register('contactEmail')}
              label="ელ-ფოსტა"
              placeholder="info@bbqstore.ge"
            />
            <TextField
              {...register('contactAddress')}
              label="მისამართი"
              placeholder="თბილისი, საქართველო"
              sx={{ gridColumn: { sm: 'span 2' } }}
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            სოციალური ქსელები
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            <TextField
              {...register('socialFacebook')}
              label="Facebook URL"
            />
            <TextField
              {...register('socialInstagram')}
              label="Instagram URL"
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            მთავარი გვერდის ჰერო
          </Typography>
          <TextField
            {...register('heroTitle')}
            label="სათაური"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('heroSubtitle')}
            label="ქვესათაური"
            fullWidth
            multiline
            rows={2}
          />
        </Paper>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
        >
          {isPending ? 'შენახვა...' : 'შენახვა'}
        </Button>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="პარამეტრები წარმატებით შეინახა"
      />
    </>
  );
}
