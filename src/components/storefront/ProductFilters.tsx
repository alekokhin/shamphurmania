'use client';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Paper,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useQueryParams } from '@/hooks/useQueryParams';
import { FUEL_TYPE_OPTIONS, SORT_OPTIONS } from '@/lib/constants';

interface ProductFiltersProps {
  brands: { slug: string; name: string }[];
}

export default function ProductFilters({
  brands,
}: ProductFiltersProps) {
  const { getParam, setQueryParam, setMultipleParams } = useQueryParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const activeFiltersCount = [
    getParam('brand'),
    getParam('fuelType'),
    getParam('sort'),
  ].filter(Boolean).length;

  const filterContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: isMobile ? 2 : 0 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">ფილტრები</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <FormControl size="small" fullWidth>
        <InputLabel>დალაგება</InputLabel>
        <Select
          value={getParam('sort') || ''}
          label="დალაგება"
          onChange={(e) => setQueryParam('sort', e.target.value || null)}
        >
          <MenuItem value="">ნაგულისხმევი</MenuItem>
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>ბრენდი</InputLabel>
        <Select
          value={getParam('brand') || ''}
          label="ბრენდი"
          onChange={(e) => setQueryParam('brand', e.target.value || null)}
        >
          <MenuItem value="">ყველა</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand.slug} value={brand.slug}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>საწვავის ტიპი</InputLabel>
        <Select
          value={getParam('fuelType') || ''}
          label="საწვავის ტიპი"
          onChange={(e) => setQueryParam('fuelType', e.target.value || null)}
        >
          <MenuItem value="">ყველა</MenuItem>
          {FUEL_TYPE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {activeFiltersCount > 0 && (
        <Button
          variant="text"
          size="small"
          onClick={() =>
            setMultipleParams({
              brand: null,
              fuelType: null,
              sort: null,
            })
          }
        >
          ფილტრების გასუფთავება
        </Button>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{ mb: 2 }}
        >
          ფილტრები
          {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
        </Button>
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } },
          }}
        >
          {filterContent}
        </Drawer>
      </>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      {filterContent}
    </Paper>
  );
}
