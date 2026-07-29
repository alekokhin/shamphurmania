export const dynamic = 'force-dynamic';

import HeroSection from '@/components/storefront/HeroSection';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import WhyChooseUs from '@/components/storefront/WhyChooseUs';
import ContactSection from '@/components/storefront/ContactSection';
import { WebsiteJsonLd, LocalBusinessJsonLd } from '@/components/storefront/JsonLd';

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <LocalBusinessJsonLd />
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}
