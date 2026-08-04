import { Box, Container, Typography, Grid } from '@mui/material';

export default function SeoContent() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
        >
          შამფურები და გრილები საქართველოში
        </Typography>

        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              პრემიუმ შამფურები
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              შამფურმანია გთავაზობთ უმაღლესი ხარისხის შამფურებს საქართველოში.
              ჩვენი ასორტიმენტი მოიცავს უჟანგავი ფოლადის შამფურებს, ხის ტარიანი
              შამფურებს, ბრტყელ და მრგვალ შამფურებს. შამფურის ნაკრები იდეალური
              საჩუქარია მამაკაცისთვის - დაბადების დღეზე, საახალწლოდ ან
              ნებისმიერ დღესასწაულზე.
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              გრილები და ბარბექიუ
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              გრილი აუცილებელი აქსესუარია მწვადის მოყვარულთათვის.
              შამფურმანიაში ნახავთ პორტატულ და სტაციონარულ გრილებს, ბარბექიუ
              სისტემებს და გრილის აქსესუარებს. ჩვენი პროდუქცია შექმნილია
              გარე სამზარეულოსთვის და პიკნიკისთვის.
            </Typography>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              საჩუქარი მამაკაცისთვის
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              ეძებთ საჩუქარს მამაკაცისთვის ან მეგობრისთვის? შამფურის ნაკრები,
              გრილის აქსესუარები და ბარბექიუ კომპლექტი საუკეთესო არჩევანია.
              კორპორატიული საჩუქრებისთვისაც გვაქვს სპეციალური შეთავაზებები.
              მიწოდება მთელ საქართველოში - თბილისი, ბათუმი, ქუთაისი და სხვა
              ქალაქები.
            </Typography>
          </Grid>
        </Grid>

        {/* Additional keyword-rich paragraph */}
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}
          >
            რატომ უნდა აირჩიოთ შამფურმანია?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, textAlign: 'center', maxWidth: 800, mx: 'auto' }}
          >
            შამფურმანია არის შამფურების, გრილების და ბარბექიუ აქსესუარების
            ონლაინ მაღაზია საქართველოში. ჩვენ ვყიდით მხოლოდ ორიგინალ,
            სერთიფიცირებულ პროდუქციას წამყვანი ბრენდებისგან. გთავაზობთ
            საუკეთესო ფასებს შამფურებზე, გრილებზე და მწვადის
            აქსესუარებზე. მიწოდება ხდება მთელ საქართველოში - თბილისში,
            ბათუმში, ქუთაისში, რუსთავში და სხვა ქალაქებში. შამფურმანია -
            თქვენი სანდო პარტნიორი ბარბექიუს სამყაროში.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
