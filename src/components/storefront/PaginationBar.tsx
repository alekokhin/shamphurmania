'use client';

import { Pagination, Box } from '@mui/material';
import { useQueryParams } from '@/hooks/useQueryParams';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const { setQueryParam } = useQueryParams();

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setQueryParam('page', String(page))}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
