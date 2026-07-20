import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import { getActiveCategories } from '@/data/categories';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BoltIcon from '@mui/icons-material/Bolt';
import GrainIcon from '@mui/icons-material/Grain';
import BuildIcon from '@mui/icons-material/Build';

const categoryIcons: Record<string, React.ReactNode> = {
  'gas-grills': <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />,
  'charcoal-grills': <WhatshotIcon sx={{ fontSize: 40 }} />,
  'electric-grills': <BoltIcon sx={{ fontSize: 40 }} />,
  'pellet-grills': <GrainIcon sx={{ fontSize: 40 }} />,
  accessories: <BuildIcon sx={{ fontSize: 40 }} />,
};

export default async function CategoryShowcase() {
  const categories = await getActiveCategories();

  if (categories.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            კატეგორიები
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            იპოვეთ თქვენთვის სასურველი გრილის ტიპი
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: `repeat(${Math.min(categories.length, 5)}, 1fr)`,
            },
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  px: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '& .MuiTypography-root': { color: 'white' },
                    '& .MuiSvgIcon-root': { color: 'white' },
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 1.5 }}>
                    {categoryIcons[category.slug] || (
                      <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
