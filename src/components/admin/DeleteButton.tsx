'use client';

import { useState, useTransition } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
  onDelete: () => Promise<{ success?: boolean; error?: string } | undefined>;
  itemName: string;
}

export default function DeleteButton({ onDelete, itemName }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleDelete = () => {
    startTransition(async () => {
      const result = await onDelete();
      if (result?.error) {
        setError(result.error);
        setOpen(false);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        color="error"
        size="small"
        aria-label="წაშლა"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>წაშლის დადასტურება</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ნამდვილად გსურთ &quot;{itemName}&quot;-ის წაშლა? ეს ქმედება
            შეუქცევადია.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isPending}>
            გაუქმება
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? 'წაშლა...' : 'წაშლა'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
