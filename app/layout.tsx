import type { Metadata } from 'next';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export const metadata: Metadata = {
  title: { default: 'After The Silence — Public Interest Archive', template: '%s | After The Silence' },
  description: 'An independent public-interest archive documenting major cases of violence against women in India, the reforms that followed, and what remains unresolved.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
