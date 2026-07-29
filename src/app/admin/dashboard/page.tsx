export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PublishIcon from '@mui/icons-material/Publish';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getDashboardStats } from '@/data/dashboard';
import { formatPrice, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'მთავარი პანელი',
};

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        მთავარი პანელი
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="სულ პროდუქტი"
          value={stats.productCount}
          icon={<InventoryIcon />}
          color="#C62828"
        />
        <StatCard
          title="გამოქვეყნებული"
          value={stats.publishedCount}
          icon={<PublishIcon />}
          color="#2E7D32"
        />
        <StatCard
          title="ბრენდები"
          value={stats.brandCount}
          icon={<StorefrontIcon />}
          color="#E65100"
        />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        ბოლო პროდუქტები
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>სახელი</TableCell>
              <TableCell>ფასი</TableCell>
              <TableCell>სტატუსი</TableCell>
              <TableCell>თარიღი</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.recentProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 4 }}
                  >
                    პროდუქტები ჯერ არ არის დამატებული
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              stats.recentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        product.isPublished ? 'გამოქვეყნებული' : 'დრაფტი'
                      }
                      size="small"
                      color={product.isPublished ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
