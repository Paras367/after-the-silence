import Link from 'next/link';

// Fallback links in case ../lib/data is not yet populated
const DEFAULT_FOOTER_LINKS = [
  { href: '/archive', label: 'Case Records' },
  { href: '/timeline', label: 'Reform Timeline' },
  { href: '/reforms', label: 'Promise vs Reality' },
  { href: '/accountability', label: 'Institutional Accountability' },
  { href: '/sources', label: 'Sources & Verification' },
  { href: '/memorial', label: 'Digital Memorial' },
];

export default function Footer() {
  return (
    <footer className="archive-footer" role="contentinfo">
      <div className="footer-inner">
        
        {/* Top Section: Brand & Navigation Grid */}
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand">
              AFTER THE <span>SILENCE</span>
            </Link>
            <p className="footer-tagline">
              An independent public-interest archive. Dedicated to truth, dignity, and systemic accountability.
            </p>
            <div className="footer-helpline">
              <span className="helpline-label">Immediate Support:</span>
              <a href="tel:1091" className="helpline-number">1091 (Women Helpline)</a>
              <span className="helpline-divider">|</span>
              <a href="tel:1098" className="helpline-number">1098 (Childline)</a>
            </div>
          </div>

          {/* Navigation Column */}
          <nav className="footer-nav-col" aria-label="Footer navigation">
            <h4 className="footer-nav-title">Archive</h4>
            <ul className="footer-link-list">
              {DEFAULT_FOOTER_LINKS.slice(0, 3).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Column */}
          <nav className="footer-nav-col" aria-label="Resources navigation">
            <h4 className="footer-nav-title">Resources</h4>
            <ul className="footer-link-list">
              {DEFAULT_FOOTER_LINKS.slice(3).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Bottom Section: Divider, Copyright, and Credits */}
        <div className="footer-bottom">
          <div className="footer-rule" />
          <div className="footer-meta">
            <p className="copyright">
              © 2026 After The Silence Archive. All rights reserved. <br className="mobile-break" />
              Content licensed for educational and public-interest use.
            </p>
            <p className="credits">
              Designed & Engineered by <strong>Paras Dhiman</strong>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}