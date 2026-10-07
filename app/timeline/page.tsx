import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import { TIMELINE } from '../../lib/data';

export const metadata: Metadata = { title: 'The Reform Timeline' };

export default function TimelinePage() {
  return (
    <section id="timeline">
      <div className="wrap">
        <PageHead eyebrow="Historical Record" title="The Reform Timeline">
          Tracing the gap between what happened, what was promised, and what actually changed.
        </PageHead>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className="tl-node">
              <div className="tl-year">{t.year}</div>
              <h4>{t.title}</h4>
              <div className="tl-grid">
                <div><span>What Happened</span><p>{t.what}</p></div>
                <div><span>What Was Promised</span><p>{t.promise}</p></div>
                <div><span>What Changed</span><p>{t.changed}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
