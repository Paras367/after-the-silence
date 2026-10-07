import Link from 'next/link';
import { NAV_LINKS } from '../lib/data';

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="brand">AFTER THE <span>SILENCE</span></Link>
      <p>An independent public-interest archive. Dedicated to truth, dignity, and systemic accountability.</p>
      <nav className="footer-links" aria-label="Footer navigation">
        {NAV_LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>
      <p className="copyright">© 2026 After The Silence Archive. All rights reserved. Content licensed for educational and public-interest use.</p>
      <p className="made-by">MADE BY <strong>PARAS DHIMAN</strong></p>
    </footer>
  );
}
