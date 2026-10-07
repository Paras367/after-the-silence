import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

// ============================================================
// SEO & METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  // Base URL for resolving relative paths in Open Graph images, etc.
  // TODO: Replace with your actual deployed domain (e.g., 'https://afterthesilence.vercel.app')
  metadataBase: new URL('https://after-the-silence.vercel.app'), 
  
  title: {
    default: 'After The Silence — Public Interest Archive',
    template: '%s | After The Silence'
  },
  description: 'An independent public-interest archive documenting major cases of violence against women in India, the reforms that followed, and what remains unresolved. Engineered by Paras Dhiman (CyberVex).',
  
  keywords: [
    'women safety India',
    'gender-based violence archive',
    'legal accountability India',
    'public interest archive',
    'Paras Dhiman',
    'CyberVex',
    'Nirbhaya case',
    'POCSO act',
    'women rights documentation',
    'systemic accountability'
  ],

  // Authorship & Creator Credits (Visible to search engines)
  authors: [
    { name: 'Paras Dhiman', url: 'https://paras367.github.io/' },
    { name: 'CyberVex', url: 'https://github.com/Paras367' }
  ],
  creator: 'Paras Dhiman (CyberVex)',
  publisher: 'After The Silence Archive',

  // Prevents OS from auto-linking numbers/emails and messing up layout
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph (Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://afterthesilence.archive',
    siteName: 'After The Silence',
    title: 'After The Silence — Public Interest Archive',
    description: 'Documenting major cases of violence against women in India, the reforms that followed, and what remains unresolved.',
    images: [
      {
        url: '#', // TODO: Add a 1200x630px image to your /public folder
        width: 1200,
        height: 630,
        alt: 'After The Silence Archive - Remember, Document, Question',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'After The Silence — Public Interest Archive',
    description: 'Documenting major cases of violence against women in India, the reforms that followed, and what remains unresolved.', 
    images: ['#'],
  },

  // Search Engine Crawling Instructions
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

 
  verification: {
    google: 'your-google-site-verification-code-here', // TODO: Add your Google Search Console code
  },

  // Icons & Manifest
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  
  // Alternative languages (if you ever add Hindi/regional translations)
  alternates: {
    canonical: 'https://afterthesilence.archive',
  },
};

// ============================================================
// VIEWPORT CONFIGURATION (Mobile & Theme)
// ============================================================
export const viewport: Viewport = {
  themeColor: '#131110', // Matches the dark mode background
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents iOS zoom on input focus
  userScalable: true,
};

// ============================================================
// JSON-LD STRUCTURED DATA (Advanced SEO)
// This explicitly tells Google who built and owns this site.
// ============================================================
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'After The Silence',
  url: 'https://after-the-silence.vercel.app/',
  description: 'An independent public-interest archive documenting major cases of violence against women in India.',
  author: {
    '@type': 'Person',
    name: 'Paras Dhiman',
    alternateName: 'CyberVex',
    url: 'https://paras367.github.io/',
    sameAs: [
      'https://github.com/Paras367',
    ]
  },
  publisher: {
    '@type': 'Organization',
    name: 'After The Silence Archive',
    logo: {
      '@type': 'ImageObject',
      url: 'https://afterthesilence.archive/logo.png' // TODO: Add logo to /public
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://afterthesilence.archive/archive?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

// ============================================================
// ROOT LAYOUT COMPONENT
// ============================================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Inject JSON-LD Structured Data for Advanced SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Accessibility: Skip to main content for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <Nav />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}