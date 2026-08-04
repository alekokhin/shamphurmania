import type { Product, Brand } from '@prisma/client';

type ProductWithRelations = Product & { brand: Brand };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export function ProductJsonLd({ product }: { product: ProductWithRelations }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    url: `${siteUrl}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: product.brand.name,
    },
    manufacturer: product.manufacturer
      ? { '@type': 'Organization', name: product.manufacturer }
      : undefined,
    countryOfOrigin: product.countryOfOrigin
      ? { '@type': 'Country', name: product.countryOfOrigin }
      : undefined,
    category: 'შამფურები და გრილები',
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
      url: `${siteUrl}/products/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'შამფურმანია',
        url: siteUrl,
      },
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
          },
        },
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
          alternateName: ['Shamfurmania', 'შამფურების მაღაზია'],
          url: siteUrl,
          inLanguage: 'ka',
          description:
            'შამფურები, გრილები და ბარბექიუ აქსესუარები საქართველოში. საჩუქარი მამაკაცისთვის.',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteUrl}/products?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
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
          alternateName: 'Shamfurmania',
          description:
            'შამფურების, გრილების და ბარბექიუ აქსესუარების ონლაინ მაღაზია საქართველოში. პრემიუმ საჩუქრები მამაკაცისთვის.',
          image: `${siteUrl}/logo.jpg`,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'GE',
            addressLocality: 'თბილისი',
            addressRegion: 'თბილისი',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 41.7151,
            longitude: 44.8271,
          },
          priceRange: '₾₾',
          url: siteUrl,
          currenciesAccepted: 'GEL',
          paymentAccepted: 'Cash, Credit Card, Bank Transfer',
          areaServed: {
            '@type': 'Country',
            name: 'Georgia',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'შამფურები და გრილები',
            itemListElement: [
              {
                '@type': 'OfferCatalog',
                name: 'შამფურები',
                description: 'პრემიუმ და უჟანგავი ფოლადის შამფურები',
              },
              {
                '@type': 'OfferCatalog',
                name: 'გრილები და ბარბექიუ',
                description: 'გრილები და ბარბექიუ სისტემები',
              },
              {
                '@type': 'OfferCatalog',
                name: 'აქსესუარები',
                description: 'ბარბექიუ და მწვადის აქსესუარები',
              },
              {
                '@type': 'OfferCatalog',
                name: 'საჩუქრები',
                description: 'საჩუქარი მამაკაცისთვის - შამფურის ნაკრები',
              },
            ],
          },
        }),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'შამფურმანია',
          alternateName: 'Shamfurmania',
          url: siteUrl,
          logo: `${siteUrl}/logo.jpg`,
          description:
            'შამფურების, გრილების და ბარბექიუ აქსესუარების ონლაინ მაღაზია საქართველოში',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'თბილისი',
            addressCountry: 'GE',
          },
          areaServed: 'GE',
          knowsLanguage: 'ka',
        }),
      }}
    />
  );
}

export function FaqJsonLd() {
  const faqs = [
    {
      question: 'სად შემიძლია შამფურების ყიდვა საქართველოში?',
      answer:
        'შამფურმანიაში შეგიძლიათ შეიძინოთ პრემიუმ ხარისხის შამფურები ონლაინ. ვახორციელებთ მიწოდებას მთელ საქართველოში, მათ შორის თბილისში უფასო მიწოდებით.',
    },
    {
      question: 'რა საჩუქარი ვაჩუქო მამაკაცს?',
      answer:
        'შამფურის ნაკრები ან გრილის აქსესუარები იდეალური საჩუქარია მამაკაცისთვის. შამფურმანიაში ნახავთ პრემიუმ ხარისხის შამფურებს, გრილებს და ბარბექიუ ნაკრებს, რომლებიც შესანიშნავი საჩუქარია დაბადების დღეზე, საახალწლოდ ან ნებისმიერ დღესასწაულზე.',
    },
    {
      question: 'რა ტიპის შამფურებს ყიდით?',
      answer:
        'შამფურმანიაში გთავაზობთ უჟანგავი ფოლადის შამფურებს, ხის ტარიანი შამფურებს, ბრტყელ შამფურებს, მრგვალ შამფურებს, შამფურის ნაკრებს და სპეციალურ შამფურებს მწვადისთვის.',
    },
    {
      question: 'აქვს თუ არა შამფურმანიას მიწოდების სერვისი?',
      answer:
        'დიახ, შამფურმანია ახორციელებს მიწოდებას მთელ საქართველოში. თბილისში მიწოდება ხდება 1-2 სამუშაო დღეში, ხოლო რეგიონებში 3-5 სამუშაო დღეში.',
    },
    {
      question: 'როგორ შევუკვეთო შამფურები ონლაინ?',
      answer:
        'შამფურმანიაში შამფურების ონლაინ შეკვეთა მარტივია. აირჩიეთ სასურველი პროდუქტი, დაგვიკავშირდით ტელეფონით და ჩვენ მოგაწვდით პროდუქციას თქვენს მისამართზე. მიწოდება ხდება მთელ საქართველოში.',
    },
    {
      question: 'რა ფასი აქვს შამფურებს?',
      answer:
        'შამფურების ფასები იწყება რამდენიმე ლარიდან ერთეულ შამფურზე. შამფურის ნაკრების ფასები იწყება 30 ლარიდან. შამფურმანიაში გთავაზობთ საუკეთესო ფასებს საქართველოში.',
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
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
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name,
          description,
          url: `${siteUrl}${url}`,
          isPartOf: {
            '@type': 'WebSite',
            name: 'შამფურმანია',
            url: siteUrl,
          },
        }),
      }}
    />
  );
}
