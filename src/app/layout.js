import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import GrainOverlay from "@/components/GrainOverlay";
import GlobalTransition from "@/components/GlobalTransition";
import {
  Cormorant_Garamond,
  Syne,
  JetBrains_Mono,
  Space_Grotesk,
  Inter,
} from "next/font/google";

// Self-hosted via Vercel CDN — zero external DNS, zero render block
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-grotesk",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Fonts are now self-hosted via next/font — no external link tags needed */}
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
