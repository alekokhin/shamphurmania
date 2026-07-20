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
import Image from 'next/image';
import { getAllProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import DeleteButton from '@/components/admin/DeleteButton';
import { deleteProduct } from '@/actions/product.actions';
import ProductToggleButtons from '@/components/admin/ProductToggleButtons';

export const metadata: Metadata = {
  title: 'პროდუქტები',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { products, total, totalPages } = await getAllProducts({
    page,
    search: sp.search,
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          პროდუქტები ({total})
        </Typography>
        <Link href="/admin/products/new" style={{ textDecoration: 'none' }}>
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
              <TableCell>სურათი</TableCell>
              <TableCell>სახელი</TableCell>
              <TableCell>კატეგორია</TableCell>
              <TableCell>ფასი</TableCell>
              <TableCell>მარაგი</TableCell>
              <TableCell>სტატუსი</TableCell>
              <TableCell align="right">მოქმედებები</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 4 }}
                  >
                    პროდუქტები ჯერ არ არის
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell sx={{ width: 60 }}>
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        width={48}
                        height={48}
                        style={{
                          objectFit: 'cover',
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    {product.discountPrice ? (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                          }}
                        >
                          {formatPrice(product.price)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600 }}
                          color="error"
                        >
                          {formatPrice(product.discountPrice)}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatPrice(product.price)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock}
                      size="small"
                      color={product.stock > 0 ? 'default' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <ProductToggleButtons
                      productId={product.id}
                      isPublished={product.isPublished}
                      isFeatured={product.isFeatured}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/products/${product.id}/edit`}>
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
                        return deleteProduct(product.id);
                      }}
                      itemName={product.name}
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
