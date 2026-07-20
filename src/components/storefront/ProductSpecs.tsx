import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import type { BbqSpecs } from '@prisma/client';

interface ProductSpecsProps {
  specs: BbqSpecs | null;
  warranty?: string | null;
  manufacturer?: string | null;
  countryOfOrigin?: string | null;
}

export default function ProductSpecs({
  specs,
  warranty,
  manufacturer,
  countryOfOrigin,
}: ProductSpecsProps) {
  const rows: { label: string; value: React.ReactNode }[] = [];

  if (specs?.fuelType) rows.push({ label: 'საწვავის ტიპი', value: specs.fuelType });
  if (specs?.cookingAreaCm2)
    rows.push({ label: 'სამზარეულო ფართობი', value: `${specs.cookingAreaCm2} სმ²` });
  if (specs?.numberOfBurners)
    rows.push({ label: 'ბურნერების რაოდენობა', value: specs.numberOfBurners });
  if (specs?.btuRating) rows.push({ label: 'BTU სიმძლავრე', value: specs.btuRating.toLocaleString() });
  if (specs?.grillMaterial) rows.push({ label: 'მასალა', value: specs.grillMaterial });
  if (specs?.dimensions) rows.push({ label: 'ზომები', value: specs.dimensions });
  if (specs?.weightKg) rows.push({ label: 'წონა', value: `${specs.weightKg} კგ` });
  if (specs?.color) rows.push({ label: 'ფერი', value: specs.color });
  if (specs?.ignitionType) rows.push({ label: 'ანთების ტიპი', value: specs.ignitionType });
  if (warranty) rows.push({ label: 'გარანტია', value: warranty });
  if (manufacturer) rows.push({ label: 'მწარმოებელი', value: manufacturer });
  if (countryOfOrigin) rows.push({ label: 'წარმოშობის ქვეყანა', value: countryOfOrigin });

  // Boolean features
  const booleanFeature = (val: boolean | null | undefined, label: string) => {
    if (val === null || val === undefined) return;
    rows.push({
      label,
      value: val ? (
        <CheckIcon color="success" sx={{ fontSize: 20 }} />
      ) : (
        <CloseIcon color="disabled" sx={{ fontSize: 20 }} />
      ),
    });
  };

  booleanFeature(specs?.hasSideburner, 'გვერდითი ბურნერი');
  booleanFeature(specs?.hasRotisserie, 'როტისერი');
  booleanFeature(specs?.hasThermometer, 'თერმომეტრი');
  booleanFeature(specs?.hasWheels, 'ბორბლები');

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
