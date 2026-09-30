import { SOURCES } from '@/lib/data';

export const metadata = { title: 'Sources & Verification' };

export default function SourcesPage() {
  return (
    <section className="wrap">
      <div className="eyebrow">Methodology</div>
      <h1 style={{ margin: '14px 0' }}>Sources &amp; Verification</h1>
      <p className="dim">We distinguish fact from analysis, and allegation from court finding.</p>
      {SOURCES.map((s) => (
        <div key={s.t} className="sec" style={{ gridTemplateColumns: '1fr auto' }}>
          <span>{s.t}</span><span className="dim" style={{ fontSize: '.8rem' }}>{s.o}</span>
        </div>
      ))}
    </section>
  );
}
