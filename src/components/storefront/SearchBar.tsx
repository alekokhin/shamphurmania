'use client';

import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function SearchBar() {
  const { getParam, setQueryParam } = useQueryParams();
  const [value, setValue] = useState(getParam('search') || '');

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQueryParam('search', value || null);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value, setQueryParam]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="პროდუქტის ძებნა..."
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
