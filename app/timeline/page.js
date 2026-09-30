import Link from 'next/link';
import { TIMELINE, CASES } from '@/lib/data';

export const metadata = { title: 'Reform Timeline' };

export default function TimelinePage() {
  return (
    <section className="wrap">
      <div className="eyebrow">Historical Record</div>
      <h1 style={{ margin: '14px 0' }}>The Reform Timeline</h1>
      <p className="dim">Tracing the gap between what happened, what was promised, and what actually changed.</p>
      <div className="tl">
        {TIMELINE.map((t) => {
          const match = CASES.find((c) => c.title === t.title);
          return (
            <div className="tl-node" key={t.year + t.title}>
              <div className="eyebrow">{t.year}</div>
              <h3>{match ? <Link href={`/cases/${match.id}`}>{t.title} →</Link> : t.title}</h3>
              <div className="tl3">
                <div><span>What Happened</span>{t.what}</div>
                <div><span>What Was Promised</span>{t.promise}</div>
                <div><span>What Changed</span>{t.changed}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
