'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../lib/data';

export default function Nav() {
  const pathname = usePathname();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Saved theme wapas lagao (refresh ke baad bhi yaad rahe)
  useEffect(() => {
    try {
      if (localStorage.getItem('ats-theme') === 'light') {
        setIsLightMode(true);
        document.body.classList.add('light');
      }
    } catch {}
  }, []);

  // Page badalte hi mobile menu band
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    document.body.classList.toggle('light', next);
    try { localStorage.setItem('ats-theme', next ? 'light' : 'dark'); } catch {}
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="brand">AFTER THE <span>SILENCE</span></Link>
        <nav className="links" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''} aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="mode-toggle" onClick={toggleTheme} aria-pressed={isLightMode}>
            {isLightMode ? 'DARK MODE' : 'LIGHT MODE'}
          </button>
          <Link href="/cases" className="btn-explore">EXPLORE ARCHIVE →</Link>
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(v => !v)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" aria-label="Toggle menu">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''}>{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
