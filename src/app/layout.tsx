import type { Metadata } from 'next';
import { georgianFont } from '@/lib/fonts';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'შამფურმანია | Shamfurmania',
    template: '%s | შამფურმანია',
  },
  description:
    'შამფურები, გრილები და ბარბექიუს აქსესუარები საქართველოში. პრემიუმ ხარისხის პროდუქცია საუკეთესო ფასად.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'ka_GE',
    siteName: 'შამფურმანია',
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
    <html lang="ka" className={georgianFont.variable} suppressHydrationWarning>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
