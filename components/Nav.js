'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/', 'Home'], ['/cases', 'Cases'], ['/timeline', 'Timeline'],
  ['/reforms', 'Reforms'], ['/accountability', 'Accountability'],
  ['/memorial', 'Memorial'], ['/sources', 'Sources'],
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="nav">
      <div className="nav-in">
        <Link href="/" className="brand">AFTER THE <span>SILENCE</span></Link>
        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href}
              className={(href === '/' ? path === '/' : path.startsWith(href)) ? 'on' : ''}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
