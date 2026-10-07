'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

declare const NAV_LINKS: Array<{ href: string; label: string }> | undefined;

// Fallback in case lib/data is temporarily unavailable
const DEFAULT_NAV_LINKS = [
  { href: '/cases', label: 'Case Records' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/reforms', label: 'Reforms' },
  { href: '/accountability', label: 'Accountability' },
  { href: '/sources', label: 'Sources' },
  { href: '/statistics', label: 'Statistics' },
];

export default function Nav() {
  const pathname = usePathname();
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize theme from localStorage (prevents hydration mismatch)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ats-theme');
      if (savedTheme === 'light') {
        setIsLightMode(true);
        document.documentElement.classList.add('light');
      }
    } catch (e) {
      // Ignore localStorage errors (e.g., private browsing)
    }
  }, []);

  // Scroll listener for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    try {
      localStorage.setItem('ats-theme', next ? 'light' : 'dark');
    } catch (e) {}
  }, [isLightMode]);

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')),
    [pathname]
  );

  const navLinks = typeof NAV_LINKS !== 'undefined' ? NAV_LINKS : DEFAULT_NAV_LINKS;

  return (
    <>
      <style>{CSS}</style>
      <header className={`archive-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          
          {/* Brand */}
          <Link href="/" className="nav-brand">
            <span className="brand-pre">AFTER THE</span>
            <span className="brand-main">SILENCE</span>
            <span className="brand-dot" aria-hidden="true">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  className={`nav-link ${active ? 'active' : ''}`} 
                  aria-current={active ? 'page' : undefined}
                >
                  {active && <span className="active-indicator">[</span>}
                  {l.label}
                  {active && <span className="active-indicator">]</span>}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-pressed={isLightMode}
              aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span className="theme-icon">{isLightMode ? '☀' : '☾'}</span>
              <span className="theme-text">{isLightMode ? 'LIGHT' : 'DARK'}</span>
            </button>
            
            <Link href="/cases" className="explore-btn">
              EXPLORE
              <span className="explore-arrow">→</span>
            </Link>

            <button 
              className="hamburger" 
              onClick={() => setIsMobileMenuOpen(v => !v)} 
              aria-expanded={isMobileMenuOpen} 
              aria-controls="mobile-menu" 
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-lines">
                <span className={`line line-1 ${isMobileMenuOpen ? 'open' : ''}`} />
                <span className={`line line-2 ${isMobileMenuOpen ? 'open' : ''}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-menu" aria-hidden={!isMobileMenuOpen}>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  className={`mobile-link ${active ? 'active' : ''}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="mobile-link-text">{l.label}</span>
                  {active && <span className="mobile-active-mark">◈</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}

// ============================================================
// ARCHIVAL NAVIGATION STYLESHEET
// ============================================================
const CSS = `
/* Base Nav Container */
.archive-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(19, 17, 16, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.archive-nav.scrolled {
  background: rgba(19, 17, 16, 0.85);
  border-bottom-color: var(--rule, #3c3733);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.archive-root.light .archive-nav {
  background: rgba(247, 244, 236, 0.6);
}
.archive-root.light .archive-nav.scrolled {
  background: rgba(247, 244, 236, 0.85);
  border-bottom-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  max-width: var(--max, 1180px);
  margin: 0 auto;
  padding: 0 var(--edge, 40px);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: baseline;
  gap: 6px;
  text-decoration: none;
  color: var(--paper, #ece5d8);
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}
.archive-root.light .nav-brand { color: var(--ink-soft, #1c1917); }
.nav-brand:hover { opacity: 0.8; }

.brand-pre {
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .brand-pre { color: #5a5348; }

.brand-main {
  color: var(--crimson, #8f2f2c);
}

.brand-dot {
  color: var(--gold, #a9873f);
  font-size: 1.4rem;
  line-height: 0;
  margin-left: 2px;
}

/* Desktop Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper-dim, #b9b0a0);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}
.archive-root.light .nav-link { color: #5a5348; }

.nav-link:hover {
  color: var(--paper, #ece5d8);
  background: rgba(255, 255, 255, 0.05);
}
.archive-root.light .nav-link:hover {
  color: var(--ink-soft, #1c1917);
  background: rgba(0, 0, 0, 0.04);
}

.nav-link.active {
  color: var(--gold, #a9873f);
  font-weight: 600;
}

.active-indicator {
  color: var(--crimson, #8f2f2c);
  opacity: 0.7;
  font-size: 0.85rem;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--rule, #3c3733);
  color: var(--paper-dim, #b9b0a0);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.archive-root.light .theme-toggle {
  border-color: var(--lp-rule, #d3cabb);
  color: #5a5348;
}

.theme-toggle:hover {
  border-color: var(--gold, #a9873f);
  color: var(--gold, #a9873f);
}

.theme-icon { font-size: 0.9rem; line-height: 1; }

.explore-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink, #131110);
  background: var(--gold, #a9873f);
  padding: 9px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}
.archive-root.light .explore-btn { color: #fff; }

.explore-btn:hover {
  background: var(--crimson, #8f2f2c);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(143, 47, 44, 0.3);
}

.explore-arrow {
  transition: transform 0.2s;
}
.explore-btn:hover .explore-arrow {
  transform: translateX(3px);
}

/* Hamburger */
.hamburger {
  display: none;
  background: transparent;
  border: 1px solid var(--rule, #3c3733);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}
.archive-root.light .hamburger { border-color: var(--lp-rule, #d3cabb); }
.hamburger:hover { border-color: var(--gold, #a9873f); }

.hamburger-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 18px;
}

.line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--paper, #ece5d8);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.archive-root.light .line { background: var(--ink-soft, #1c1917); }

.line-1.open { transform: translateY(3.5px) rotate(45deg); }
.line-2.open { transform: translateY(-3.5px) rotate(-45deg); }

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(19, 17, 16, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid var(--rule, #3c3733);
}
.archive-root.light .mobile-menu-overlay {
  background: rgba(247, 244, 236, 0.95);
  border-top-color: var(--lp-rule, #d3cabb);
}

.mobile-menu-overlay.open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.mobile-nav {
  max-width: var(--max, 1180px);
  margin: 0 auto;
  padding: 24px var(--edge, 40px);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  text-decoration: none;
  color: var(--paper-dim, #b9b0a0);
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
  opacity: 0;
  transform: translateX(-10px);
  animation: mobile-link-fade-in 0.3s ease forwards;
}
.archive-root.light .mobile-link {
  color: #5a5348;
  border-bottom-color: var(--lp-rule, #d3cabb);
}

.mobile-link.active {
  color: var(--gold, #a9873f);
}

.mobile-active-mark {
  color: var(--crimson, #8f2f2c);
  font-size: 0.9rem;
}

@keyframes mobile-link-fade-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links { display: none; }
  .explore-btn { display: none; }
  .hamburger { display: flex; }
  .nav-inner { padding: 0 var(--edge, 20px); }
}

@media (max-width: 480px) {
  .brand-pre { display: none; }
  .theme-text { display: none; }
  .theme-toggle { padding: 8px 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .archive-nav, .nav-link, .explore-btn, .explore-arrow, .line, 
  .mobile-menu-overlay, .mobile-link {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
`;