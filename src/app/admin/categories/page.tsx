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
import { getAllCategories } from '@/data/categories';
import DeleteButton from '@/components/admin/DeleteButton';
import { deleteCategory } from '@/actions/category.actions';

export const metadata: Metadata = {
  title: 'კატეგორიები',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

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
          კატეგორიები
        </Typography>
        <Link href="/admin/categories/new" style={{ textDecoration: 'none' }}>
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
              <TableCell>რიგი</TableCell>
              <TableCell>სტატუსი</TableCell>
              <TableCell align="right">მოქმედებები</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 4 }}
                  >
                    კატეგორიები ჯერ არ არის
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {category.name}
                      </Typography>
                      {category.nameEn && (
                        <Typography variant="body2" color="text.secondary">
                          {category.nameEn}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell>
                    <Chip
                      label={category.isActive ? 'აქტიური' : 'არააქტიური'}
                      size="small"
                      color={category.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/categories/${category.id}/edit`}>
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
                        return deleteCategory(category.id);
                      }}
                      itemName={category.name}
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
