import Link from 'next/link';
import { MEMORIAL } from '@/lib/data';

export const metadata = { title: 'Who Was She?' };

export default function MemorialPage() {
  return (
    <section className="wrap">
      <div className="eyebrow">Digital Memorial</div>
      <h1 style={{ margin: '14px 0' }}>Who Was She?</h1>
      <p className="dim" style={{ maxWidth: '60ch' }}>Remembering the individuals behind the headlines. Anonymous survivors stay protected by law and by this archive&rsquo;s ethical code.</p>
      <div className="grid">
        {MEMORIAL.map((m) => {
          const inner = (
            <>
              <div className="yr">{m.year}</div><h3>{m.name}</h3><p>{m.text}</p>
              {m.case && <span className="dim" style={{ fontSize: '.8rem' }}>Open case file →</span>}
            </>
          );
          return m.case
            ? <Link key={m.name} href={`/cases/${m.case}`} className="card">{inner}</Link>
            : <div key={m.name} className="card">{inner}</div>;
        })}
      </div>
    </section>
  );
}
