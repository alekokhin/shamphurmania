import { Box, Container, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const features = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 36 }} />,
    title: 'ორიგინალი პროდუქცია',
    description:
      'ვყიდით მხოლოდ ოფიციალური დილერების ორიგინალ პროდუქციას გარანტიით.',
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 36 }} />,
    title: 'მიწოდება მთელ საქართველოში',
    description:
      'სწრაფი და უსაფრთხო მიწოდება თბილისში და საქართველოს ნებისმიერ წერტილში.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 36 }} />,
    title: 'პროფესიონალური კონსულტაცია',
    description:
      'ჩვენი გუნდი დაგეხმარებათ თქვენთვის იდეალური გრილის შერჩევაში.',
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 36 }} />,
    title: 'საუკეთესო ფასები',
    description:
      'კონკურენტული ფასები და რეგულარული აქციები პრემიუმ ხარისხის გრილებზე.',
  },
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            რატომ ჩვენ?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            რა გამოგვარჩევს სხვებისგან
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {features.map((feature) => (
            <Box key={feature.title} sx={{ textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
