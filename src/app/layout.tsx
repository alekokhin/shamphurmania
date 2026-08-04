import type { Metadata } from 'next';
import { georgianFont } from '@/lib/fonts';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'შამფურმანია - შამფურები, გრილები, საჩუქრები | ონლაინ მაღაზია საქართველოში',
    template: '%s | შამფურმანია - შამფურების ონლაინ მაღაზია',
  },
  description:
    'შამფურმანია - შამფურების, გრილების და ბარბექიუს აქსესუარების #1 ონლაინ მაღაზია საქართველოში. ' +
    'პრემიუმ შამფურები, მწვადის აქსესუარები, საჩუქარი მამაკაცისთვის. ' +
    'უფასო მიწოდება თბილისში. საუკეთესო ფასები და ორიგინალი პროდუქცია.',
  keywords: [
    'შამფური',
    'შამფურები',
    'შამფურების მაღაზია',
    'შამფური ყიდვა',
    'შამფური ფასი',
    'პრემიუმ შამფური',
    'უჟანგავი შამფური',
    'შამფურის ნაკრები',
    'საჩუქარი',
    'საჩუქარი მამაკაცისთვის',
    'საჩუქარი მეგობრისთვის',
    'დაბადების დღის საჩუქარი',
    'კორპორატიული საჩუქარი',
    'საჩუქარი ბარბექიუს მოყვარულისთვის',
    'საახალწლო საჩუქარი მამაკაცისთვის',
    'გრილი',
    'გრილი ყიდვა',
    'გრილის აქსესუარები',
    'ბარბექიუ',
    'ბარბექიუ აქსესუარები',
    'ბარბექიუ ნაკრები',
    'შამფურის ნაკრები საჩუქრად',
    'ბარბექიუ საქართველო',
    'მწვადი',
    'მწვადის აქსესუარები',
    'გარე სამზარეულო',
    'ხორცის მომზადება',
    'თბილისი',
    'საქართველო',
    'ონლაინ მაღაზია',
    'shamfuri',
    'shamfurmania',
    'bbq georgia',
    'grill tbilisi',
    'skewers georgia',
  ],
  authors: [{ name: 'შამფურმანია', url: siteUrl }],
  creator: 'შამფურმანია',
  publisher: 'შამფურმანია',
  openGraph: {
    type: 'website',
    locale: 'ka_GE',
    url: siteUrl,
    siteName: 'შამფურმანია',
    title: 'შამფურმანია - შამფურები, გრილები და საჩუქრები საქართველოში',
    description:
      'პრემიუმ შამფურები, გრილები და ბარბექიუ აქსესუარები. საუკეთესო საჩუქარი მამაკაცისთვის. ონლაინ მაღაზია თბილისში.',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'შამფურმანია - შამფურების ონლაინ მაღაზია საქართველოში',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'შამფურმანია - შამფურები და გრილები საქართველოში',
    description:
      'პრემიუმ შამფურები, გრილები და ბარბექიუ აქსესუარები. საჩუქარი მამაკაცისთვის. მიწოდება მთელ საქართველოში.',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'ka-GE': siteUrl,
    },
  },
  category: 'ecommerce',
  other: {
    'geo.region': 'GE',
    'geo.placename': 'Tbilisi',
    'geo.position': '41.7151;44.8271',
    ICBM: '41.7151, 44.8271',
    'content-language': 'ka',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={georgianFont.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#C62828" />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
