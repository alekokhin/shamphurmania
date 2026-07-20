export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { getAllBrands } from '@/data/brands';
import DeleteButton from '@/components/admin/DeleteButton';
import { deleteBrand } from '@/actions/brand.actions';

export const metadata: Metadata = {
  title: 'ბრენდები',
};

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          ბრენდები
        </Typography>
        <Link href="/admin/brands/new" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            დამატება
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>სახელი</TableCell>
              <TableCell>სლაგი</TableCell>
              <TableCell>სტატუსი</TableCell>
              <TableCell align="right">მოქმედებები</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 4 }}
                  >
                    ბრენდები ჯერ არ არის
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {brand.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{brand.slug}</TableCell>
                  <TableCell>
                    <Chip
                      label={brand.isActive ? 'აქტიური' : 'არააქტიური'}
                      size="small"
                      color={brand.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/brands/${brand.id}/edit`}>
                      <IconButton
                        size="small"
                        aria-label="რედაქტირება"
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <DeleteButton
                      onDelete={async () => {
                        'use server';
                        return deleteBrand(brand.id);
                      }}
                      itemName={brand.name}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
