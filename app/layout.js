import './globals.css';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';

const serif = Fraunces({ subsets: ['latin'], variable: '--serif' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--sans' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--mono' });

export const metadata = {
  title: { default: "AFTER THE SILENCE | Women's Safety & Accountability Archive", template: '%s | After The Silence' },
  description: "An Independent Indian Women's Safety & Accountability Archive. Remembering the cases. Recording the promises. Measuring the change.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <footer>
          <p>An independent public-interest archive. Dedicated to truth, dignity, and systemic accountability.</p>
          <p>© 2026 After The Silence Archive.</p>
        </footer>
      </body>
    </html>
  );
}

