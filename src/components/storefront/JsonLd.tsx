import type { Product, Brand } from '@prisma/client';

type ProductWithRelations = Product & { brand: Brand };

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
        name: 'შამფურმანია',
      },
    },
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
          name: 'შამფურმანია',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          inLanguage: 'ka',
          description:
            'შამფურები, გრილები და ბარბექიუს აქსესუარები საქართველოში',
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
          name: 'შამფურმანია',
          description: 'შამფურების და გრილების მაღაზია საქართველოში',
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
