import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://stickerpedia.com'),
  title: {
    default: 'Sticker.pedia // Custom Die-Cut Stickers & Precision Vinyl Prints',
    template: '%s | Sticker.pedia',
  },
  description:
    'Industrial-grade custom die-cut vinyl stickers, prismatic holographic foils, and high-performance weatherproof decals. Instant live proofing, 100% waterproof solvent adhesive, and 48-hour lab dispatch.',
  keywords: [
    'custom stickers',
    'die-cut stickers',
    'holographic stickers',
    'vinyl stickers',
    'waterproof stickers',
    'custom vinyl decals',
    'prismatic stickers',
    'matte stickers',
    'custom label printing',
    'laptop stickers',
    'hydroflask stickers',
    'streetwear stickers',
    'sticker printing service',
    'sticker pedia',
  ],
  authors: [{ name: 'Sticker.pedia Printworks', url: 'https://stickerpedia.com' }],
  creator: 'Sticker.pedia',
  publisher: 'Sticker.pedia',
  applicationName: 'Sticker.pedia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://stickerpedia.com',
  },
  openGraph: {
    title: 'Sticker.pedia // Custom Die-Cut Stickers & Precision Vinyl Prints',
    description:
      'Industrial-grade custom die-cut vinyl stickers, prismatic holographic foils, and weatherproof print production with instant live proofing.',
    url: 'https://stickerpedia.com',
    siteName: 'Sticker.pedia',
    images: [
      {
        url: '/brand-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sticker.pedia Custom Vinyl Stickers and Precision Printworks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sticker.pedia // Precision Die-Cut Stickers & Vinyl Lab',
    description:
      'Industrial-grade custom die-cut vinyl stickers, prismatic holographic foils, and weatherproof decals.',
    images: ['/brand-logo.png'],
    creator: '@stickerpedia',
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
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

const jsonLdData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://stickerpedia.com/#organization',
    name: 'Sticker.pedia',
    url: 'https://stickerpedia.com',
    logo: 'https://stickerpedia.com/brand-logo.png',
    description:
      'Precision custom die-cut vinyl stickers, prismatic holographic foils, and high-performance print production.',
    sameAs: [
      'https://instagram.com/sticker.pedia',
      'https://x.com/stickerpedia',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98450-11223',
      contactType: 'customer service',
      email: 'contact@sticker.pedia',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://stickerpedia.com/#website',
    name: 'Sticker.pedia',
    url: 'https://stickerpedia.com',
    description: 'Precision Custom Die-Cut Stickers & High-Performance Vinyl Prints',
    publisher: {
      '@id': 'https://schema.org/#organization',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Custom Die-Cut Vinyl Stickers',
    image: [
      'https://stickerpedia.com/stickers/streetwear-skull.png',
      'https://stickerpedia.com/stickers/acid-smile.png',
      'https://stickerpedia.com/stickers/anime-mecha.png',
    ],
    description:
      'Precision printed 6-mil vinyl custom die-cut stickers with UV shield armor, 100% dishwasher-safe solvent acrylic adhesive, and clean residue-free release.',
    brand: {
      '@type': 'Brand',
      name: 'Sticker.pedia',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '14280',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '1.20',
      highPrice: '4.50',
      priceCurrency: 'USD',
      offerCount: '100+',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What file formats do you accept for custom die-cut stickers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vector files (.AI, .EPS, .PDF, .SVG) with embedded cutlines are ideal, but high-resolution raster images (300+ DPI PNG or TIFF with transparent backgrounds) work great too. Our prepress RIP software automatically generates smooth micro-contour cut paths with bleed protection.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your stickers waterproof, weatherproof, and UV-resistant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. All stickers are precision printed onto commercial 6-mil vinyl with permanent solvent acrylic adhesive and finished with outdoor-grade UV barrier laminates. They are dishwasher safe, pressure-washer rated, and tested for 5+ years of direct desert sun exposure without fading or peeling.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Prismatic Holographic and Velvet Matte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prismatic Holographic utilizes micro-embossed Japanese diffraction foil that refracts ambient light into dynamic rainbow beams. Velvet Matte features a zero-glare, silk-touch protective over-laminate that eliminates surface reflections and fingerprints, engineered for laptops and electronics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is production and how does the live queue work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Once you enter your delivery coordinates, your job is automatically dispatched to our Roland TrueVIS RIP queue. Custom batches typically print and cure within 24 to 48 hours, followed by express tracked shipping straight to your address.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum order quantity (MOQ)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no minimum for standard catalog drops and sample packs—you can order individual units. For custom die-cut production runs, batches start at just 10 pieces, with automated wholesale tier discounting at 50, 100, 250, and 500+ stickers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I test finishes and substrates before placing a bulk order?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can order our curated Sample Pack directly from the catalog. Each sample kit includes samples of Prismatic Holographic, Velvet Matte, High-Gloss UV, and Optical Clear Polyester on real substrate sheets so you can test tactile adhesion and durability.',
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Oswald:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {jsonLdData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="bg-[#000000] text-[#F4F5F6] antialiased selection:bg-[#CCFF00] selection:text-[#000000] w-full min-h-screen font-sans overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
