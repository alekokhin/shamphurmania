export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import HeroSection from '@/components/storefront/HeroSection';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import WhyChooseUs from '@/components/storefront/WhyChooseUs';
import ContactSection from '@/components/storefront/ContactSection';
import SeoContent from '@/components/storefront/SeoContent';
import {
  WebsiteJsonLd,
  LocalBusinessJsonLd,
  FaqJsonLd,
  OrganizationJsonLd,
} from '@/components/storefront/JsonLd';

export const metadata: Metadata = {
  title:
    'შამფურმანია - შამფურები, გრილები, საჩუქარი მამაკაცისთვის | ონლაინ მაღაზია',
  description:
    'შამფურმანია - #1 ონლაინ მაღაზია საქართველოში შამფურების, გრილების და ბარბექიუ აქსესუარებისთვის. ' +
    'იდეალური საჩუქარი მამაკაცისთვის - პრემიუმ შამფურის ნაკრები, გრილის აქსესუარები. ' +
    'უფასო მიწოდება თბილისში. მწვადის მოყვარულთათვის საუკეთესო არჩევანი.',
  openGraph: {
    title: 'შამფურმანია - შამფურები, გრილები და საჩუქრები | საქართველო',
    description:
      'პრემიუმ შამფურები და გრილები. საჩუქარი მამაკაცისთვის, მეგობრისთვის. ონლაინ შეკვეთა და მიწოდება მთელ საქართველოში.',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <LocalBusinessJsonLd />
      <OrganizationJsonLd />
      <FaqJsonLd />
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <SeoContent />
      <ContactSection />
    </>
  );
}
