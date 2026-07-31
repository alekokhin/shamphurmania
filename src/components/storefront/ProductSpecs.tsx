import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import type { ShamfuriSpecs } from '@prisma/client';

interface ProductSpecsProps {
  specs: ShamfuriSpecs | null;
  manufacturer?: string | null;
  countryOfOrigin?: string | null;
}

export default function ProductSpecs({
  specs,
  manufacturer,
  countryOfOrigin,
}: ProductSpecsProps) {
  const rows: { label: string; value: React.ReactNode }[] = [];

  if (specs?.length) rows.push({ label: 'შამფურის სიგრძე', value: specs.length });
  if (specs?.thickness) rows.push({ label: 'შამფურის სისქე', value: specs.thickness });
  if (specs?.material) rows.push({ label: 'შამფურის მასალა', value: specs.material });
  if (manufacturer) rows.push({ label: 'მწარმოებელი', value: manufacturer });
  if (countryOfOrigin) rows.push({ label: 'წარმოშობის ქვეყანა', value: countryOfOrigin });

  if (rows.length === 0) return null;

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, p: 2, pb: 0 }}>
        სპეციფიკაციები
      </Typography>
      <Table>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.label}
              sx={{ bgcolor: i % 2 === 0 ? 'grey.50' : 'white' }}
            >
              <TableCell
                sx={{ fontWeight: 500, width: '40%', borderBottom: 'none' }}
              >
                {row.label}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
