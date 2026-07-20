import type { Product, Category, Brand } from '@prisma/client';

type ProductWithRelations = Product & { brand: Brand; category: Category };

export function ProductJsonLd({ product }: { product: ProductWithRelations }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand.name,
    },
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      price: product.discountPrice || product.price,
      priceCurrency: 'GEL',
      availability:
        product.availability === 'IN_STOCK'
          ? 'https://schema.org/InStock'
          : product.availability === 'PREORDER'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'BBQ Store Georgia',
      },
    },
    ...(product.bbqSpecs?.weightKg && {
      weight: {
        '@type': 'QuantitativeValue',
        value: product.bbqSpecs.weightKg,
        unitCode: 'KGM',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'BBQ Store Georgia',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          inLanguage: 'ka',
          description:
            'საქართველოში ბარბექიუ გრილების ყველაზე დიდი არჩევანი',
        }),
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'BBQ Store Georgia',
          description: 'ბარბექიუ გრილების მაღაზია საქართველოში',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'GE',
            addressLocality: 'თბილისი',
          },
          priceRange: '₾₾',
          url: process.env.NEXT_PUBLIC_SITE_URL,
        }),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
