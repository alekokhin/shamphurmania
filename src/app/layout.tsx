import type { Metadata } from 'next';
import { georgianFont } from '@/lib/fonts';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BBQ Store Georgia | ბარბექიუ გრილების მაღაზია',
    template: '%s | BBQ Store Georgia',
  },
  description:
    'საქართველოში ბარბექიუ გრილების ყველაზე დიდი არჩევანი. გაზის, ნახშირის, ელექტრო და პელეტის გრილები საუკეთესო ფასად.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'ka_GE',
    siteName: 'BBQ Store Georgia',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={georgianFont.variable}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
