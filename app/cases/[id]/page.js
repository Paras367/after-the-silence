import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASES } from '@/lib/data';
import { CENTERPIECES } from '@/lib/centerpieces';
import Tags from '@/components/Tags';

export const dynamicParams = false;
export const generateStaticParams = () => CASES.map((c) => ({ id: c.id }));
export function generateMetadata({ params }) {
  const c = CASES.find((x) => x.id === params.id);
  return { title: c?.title, description: c?.desc };
}

const ROWS = [
  ['what', '01 — What Happened'], ['who', '02 — Who Was Affected'], ['investigation', '03 — Investigation'],
  ['police', '04 — Police Response'], ['court', '05 — Court Process'], ['public', '06 — Public Response'],
  ['government', '07 — Government Response'], ['changed', '08 — What Changed'],
  ['notchanged', '09 — What Did Not Change'], ['current', '10 — Current Status'],
];

export default function CasePage({ params }) {
  const c = CASES.find((x) => x.id === params.id);
  if (!c) notFound();
  const cp = CENTERPIECES[c.id]; // centerpiece ho to uska detailed page dikhao

  return (
    <article className="wrap">
      <Link href="/cases" className="back">← ALL CASES</Link>
      <div className="eyebrow" style={{ marginTop: 28 }}>{c.year} · {c.location} · {c.type}</div>
      <h1 style={{ margin: '12px 0' }}>{c.title}</h1>
      <Tags tags={c.sections.tags} />

      {cp ? (
        <>
          <p className="statement">{cp.statement}</p>
          {cp.blocks.map((b, i) => (
            <div className="sec" key={b.h}>
              <h4>{String(i + 1).padStart(2, '0')} — {b.h}</h4>
              <div>{b.p.map((t, j) => <p key={j}>{t}</p>)}</div>
            </div>
          ))}
        </>
      ) : (
        ROWS.map(([k, h]) => (
          <div className="sec" key={k}><h4>{h}</h4><p>{c.sections[k]}</p></div>
        ))
      )}

      <div className="sec">
        <h4>Sources</h4>
        <p>Cross-check this case against the <Link href="/sources" style={{ color: 'var(--gold)' }}>archive sources</Link> and current court records before treating any detail as final.</p>
      </div>
    </article>
  );
}
