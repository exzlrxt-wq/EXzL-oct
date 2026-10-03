import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import GrainOverlay from "@/components/GrainOverlay";
import GlobalTransition from "@/components/GlobalTransition";

export const metadata = {
  metadataBase: new URL('https://exzlr.com'),
  title: {
    default: 'EXZLR',
    template: '%s | EXZLR',
  },
  description: 'EXZLR builds workflow automation, custom web apps, and AI-assisted systems for founders and operators. Working globally.',
  keywords: ['workflow automation', 'custom software', 'web apps', 'business automation', 'CRM', 'AI automation', 'freelance developer'],
  authors: [{ name: 'Ojas', url: 'https://exzlr.com' }],
  creator: 'Ojas / EXZLR',
  publisher: 'EXZLR',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://exzlr.com',
    siteName: 'EXZLR',
    title: 'EXZLR \u2014 Automation & Custom Software for Growing Businesses',
    description: 'EXZLR builds workflow automation, custom web apps, and AI-assisted systems for founders and operators. Working globally.',
    images: [{ url: '/exzlr-og.png', width: 1200, height: 630, alt: 'EXZLR' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@exzlr',
    creator: '@exzlr',
    title: 'EXZLR \u2014 Automation & Custom Software for Growing Businesses',
    description: 'EXZLR builds workflow automation, custom web apps, and AI-assisted systems for founders and operators.',
    images: ['/exzlr-og.png'],
  },
  alternates: {
    canonical: 'https://exzlr.com',
  },
};

// themeColor must live in viewport export in Next.js 15+
export const viewport = {
  themeColor: '#0b0a09',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://exzlr.com/#ojas',
      name: 'Ojas',
      url: 'https://exzlr.com',
      jobTitle: 'Automation & Software Developer',
      worksFor: { '@id': 'https://exzlr.com/#organization' },
      sameAs: ['https://exzlr.com'],
    },
    {
      '@type': 'Organization',
      '@id': 'https://exzlr.com/#organization',
      name: 'EXZLR',
      url: 'https://exzlr.com',
      logo: 'https://exzlr.com/exzlr-logo.png',
      foundingDate: '2023',
      founder: { '@id': 'https://exzlr.com/#ojas' },
      areaServed: 'Worldwide',
      description: 'EXZLR builds workflow automation, custom web apps, and AI-assisted systems for founders and operators.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'admin@exzlr.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://exzlr.com/#website',
      url: 'https://exzlr.com',
      name: 'EXZLR',
      publisher: { '@id': 'https://exzlr.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preload critical hero fonts to eliminate FOUT */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=Syne:wght@700;800&display=swap"
        />

        {/* All fonts — single consolidated request */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalTransition />
        <GrainOverlay />
        <div id="progress-bar" />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
