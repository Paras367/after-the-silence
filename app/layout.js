```jsx
import './globals.css';

export const metadata = {
  title: {
    default: 'After The Silence',
    template: '%s — After The Silence',
  },

  description:
    'An independent digital archive documenting incidents, cases, voices, and accountability concerning women in India.',

  keywords: [
    'After The Silence',
    'India',
    'Women',
    'Justice',
    'Accountability',
    'Digital Archive',
  ],

  authors: [
    {
      name: 'Paras Dhiman',
      url: 'https://github.com/Paras367',
    },
  ],

  creator: 'Paras Dhiman',
  publisher: 'Paras Dhiman',

  metadataBase: new URL('https://after-the-silence.vercel.app'),

  openGraph: {
    title: 'After The Silence',
    description:
      'India • Women • Justice • Accountability',
    type: 'website',
    siteName: 'After The Silence',
    locale: 'en_IN',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'After The Silence',
    description:
      'India • Women • Justice • Accountability',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="site-root">
          {children}
        </div>

        <footer
          style={{
            padding: '18px 24px',
            textAlign: 'center',
            fontSize: '11px',
            letterSpacing: '0.08em',
            opacity: 0.55,
          }}
        >
          <span>
            Made by{' '}
            <a
              href="https://github.com/Paras367"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Paras Dhiman
            </a>
            {' '}·{' '}
            <a
              href="https://softwarelabs.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
              }}
            >
              SoftwareLabs
            </a>
          </span>
        </footer>
      </body>
    </html>
  );
}
```
