'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

// Import your links, with a safe fallback if the file is being edited
import { NAV_LINKS } from '../lib/data';

const DEFAULT_LINKS = [
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

  const navLinks = NAV_LINKS || DEFAULT_LINKS;

  // Initialize theme from localStorage on mount (prevents hydration mismatch)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ats-theme');
      const isLight = savedTheme === 'light';
      setIsLightMode(isLight);
      
      // Reverted to body.classList to match your original working setup
      if (isLight) {
        document.body.classList.add('light');
      } else {
        document.body.classList.remove('light');
      }
    } catch (e) {
      // Ignore localStorage errors (e.g., private browsing mode)
    }
  }, []);

  // Scroll listener for subtle "document tab" border enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll(); // Set initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    const next = !isLightMode;
    setIsLightMode(next);
    
    // Toggle class on the <body> element for global, reliable CSS targeting
    if (next) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    
    try {
      localStorage.setItem('ats-theme', next ? 'light' : 'dark');
    } catch (e) {}
  }, [isLightMode]);

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')),
    [pathname]
  );

  return (
    <>
      <style>{CSS}</style>
      <header className={`archive-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          
          {/* Brand */}
          <Link href="/" className="nav-brand" aria-label="After The Silence Home">
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
                  {l.label}
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
              title={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span className={`theme-icon ${isLightMode ? 'rotate-in' : 'rotate-out'}`} aria-hidden="true">
                {isLightMode ? '☀' : '☾'}
              </span>
              <span className="theme-text">{isLightMode ? 'LIGHT' : 'DARK'}</span>
            </button>
            
            <Link href="/cases" className="explore-btn">
              EXPLORE ARCHIVE
              <span className="explore-arrow" aria-hidden="true">→</span>
            </Link>

            <button 
              className="hamburger" 
              onClick={() => setIsMobileMenuOpen(v => !v)} 
              aria-expanded={isMobileMenuOpen} 
              aria-controls="mobile-menu" 
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-lines" aria-hidden="true">
                <span className={`line line-1 ${isMobileMenuOpen ? 'open' : ''}`} />
                <span className={`line line-2 ${isMobileMenuOpen ? 'open' : ''}`} />
                <span className={`line line-3 ${isMobileMenuOpen ? 'open' : ''}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
          id="mobile-menu" 
          aria-hidden={!isMobileMenuOpen}
        >
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
                  {active && <span className="mobile-active-mark" aria-hidden="true">◈</span>}
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
// ARCHIVAL NAVIGATION STYLESHEET (Subtle, Authoritative Effects)
// ============================================================
const CSS = `
/* Base Nav Container - Solid, Opaque, Authoritative */
.archive-nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--ink, #131110);
  border-bottom: 1px solid var(--rule, #3c3733);
  border-top: 1px solid transparent; /* Prepares for scroll effect */
  transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
}

/* Scroll Effect: Mimics a physical file folder tab being highlighted */
.archive-nav.scrolled {
  border-top-color: rgba(143, 47, 44, 0.4); /* Subtle crimson top glow */
  border-bottom-color: var(--crimson, #8f2f2c);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background: rgba(19, 17, 16, 0.95);
}

/* Light Mode Overrides */
body.light .archive-nav {
  background: var(--lp-paper, #f7f4ec);
  border-bottom-color: var(--lp-rule, #d3cabb);
  border-top-color: transparent;
}
body.light .archive-nav.scrolled {
  border-top-color: rgba(143, 47, 44, 0.2);
  border-bottom-color: var(--crimson, #8f2f2c);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  background: rgba(247, 244, 236, 0.95);
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
  gap: 8px;
  text-decoration: none;
  color: var(--paper, #ece5d8);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
body.light .nav-brand { color: var(--ink-soft, #1c1917); }

.nav-brand:hover {
  opacity: 0.85;
  transform: translateX(2px); /* Subtle archival shift */
}

.brand-pre {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--gold, #a9873f);
}

.brand-main {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--paper, #ece5d8);
}
body.light .brand-main { color: var(--ink-soft, #1c1917); }

.brand-dot {
  color: var(--crimson, #8f2f2c);
  font-size: 1.6rem;
  line-height: 0;
  margin-left: 2px;
  margin-bottom: 4px;
}

/* Desktop Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
}

.nav-link {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-dim, #b9b0a0);
  text-decoration: none;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  transition: color 0.3s ease, background 0.3s ease;
  border-radius: 4px 4px 0 0; /* Archival tab shape */
}
body.light .nav-link { color: #5a5348; }

/* Archival highlight effect on hover */
.nav-link:hover {
  color: var(--paper, #ece5d8);
  background: rgba(169, 135, 63, 0.08); /* Subtle gold highlight */
}
body.light .nav-link:hover {
  color: var(--ink-soft, #1c1917);
  background: rgba(169, 135, 63, 0.1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--gold, #a9873f);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link.active {
  color: var(--gold, #a9873f);
  font-weight: 600;
  background: rgba(169, 135, 63, 0.05);
}

.nav-link.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Theme Toggle - Tactile, Inverting Box with Icon Spin */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--rule, #3c3733);
  color: var(--paper-dim, #b9b0a0);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}
body.light .theme-toggle {
  border-color: var(--lp-rule, #d3cabb);
  color: #5a5348;
}

.theme-toggle:hover {
  background: var(--paper, #ece5d8);
  color: var(--ink, #131110);
  border-color: var(--paper, #ece5d8);
}
body.light .theme-toggle:hover {
  background: var(--ink-soft, #1c1917);
  color: var(--lp-paper, #f7f4ec);
  border-color: var(--ink-soft, #1c1917);
}

.theme-icon { 
  font-size: 0.9rem; 
  line-height: 1; 
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-icon.rotate-in { transform: rotate(0deg) scale(1); }
.theme-icon.rotate-out { transform: rotate(-15deg) scale(0.9); }

/* Explore Button - Sharp, Authoritative */
.explore-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--crimson, #8f2f2c);
  padding: 10px 18px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid var(--crimson, #8f2f2c);
  border-radius: 4px;
}

.explore-btn:hover {
  background: transparent;
  color: var(--crimson-br, #b23e39);
  border-color: var(--crimson-br, #b23e39);
  box-shadow: 0 0 15px rgba(143, 47, 44, 0.2);
}

.explore-arrow {
  transition: transform 0.3s ease;
}
.explore-btn:hover .explore-arrow {
  transform: translateX(4px);
}

/* Hamburger - Sharp, 3-line to X animation */
.hamburger {
  display: none;
  background: transparent;
  border: 1px solid var(--rule, #3c3733);
  padding: 10px;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s, background 0.3s;
  border-radius: 4px;
}
body.light .hamburger { border-color: var(--lp-rule, #d3cabb); }
.hamburger:hover { 
  border-color: var(--gold, #a9873f); 
  background: rgba(169, 135, 63, 0.05);
}

.hamburger-lines {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 18px;
  height: 14px;
  position: relative;
}

.line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--paper, #ece5d8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  border-radius: 2px;
}
body.light .line { background: var(--ink-soft, #1c1917); }

.line-1.open { transform: translateY(7px) rotate(45deg); }
.line-2.open { opacity: 0; transform: scaleX(0); }
.line-3.open { transform: translateY(-7px) rotate(-45deg); }

/* Mobile Menu Overlay - Solid, Editorial, Premium Stagger */
.mobile-menu-overlay {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--ink, #131110);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-15px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid var(--rule, #3c3733);
  overflow-y: auto;
}
body.light .mobile-menu-overlay {
  background: var(--lp-paper, #f7f4ec);
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
  padding: 32px var(--edge, 40px);
  display: flex;
  flex-direction: column;
}

.mobile-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  text-decoration: none;
  color: var(--paper-dim, #b9b0a0);
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.5rem;
  font-weight: 500;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
  opacity: 0;
  transform: translateY(10px);
  animation: mobile-link-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transition: color 0.3s, padding-left 0.3s;
}
body.light .mobile-link {
  color: #5a5348;
  border-bottom-color: var(--lp-rule, #d3cabb);
}

.mobile-link:hover {
  color: var(--paper, #ece5d8);
  padding-left: 8px;
}
body.light .mobile-link:hover {
  color: var(--ink-soft, #1c1917);
}

.mobile-link.active {
  color: var(--gold, #a9873f);
}

.mobile-active-mark {
  color: var(--crimson, #8f2f2c);
  font-size: 1.2rem;
}

@keyframes mobile-link-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
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
  .theme-toggle { padding: 10px; }
  .mobile-link { font-size: 1.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .archive-nav, .nav-link, .nav-link::after, .explore-btn, .explore-arrow, 
  .line, .mobile-menu-overlay, .mobile-link, .theme-icon {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
`;