import { Box, Container, Typography, Paper, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'white' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
            დაგვიკავშირდით
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            გაქვთ შეკითხვა შამფურებზე ან გრილებზე? ჩვენი გუნდი მზად არის
            დაგეხმაროთ იდეალური პროდუქტის შერჩევაში
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <PhoneIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              ტელეფონი
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +995 XXX XXX XXX
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EmailIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              ელ-ფოსტა
            </Typography>
            <Typography variant="body2" color="text.secondary">
              info@bbqstore.ge
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LocationOnIcon
              sx={{ fontSize: 32, color: 'primary.main', mb: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              მისამართი
            </Typography>
            <Typography variant="body2" color="text.secondary">
              თბილისი, საქართველო
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
