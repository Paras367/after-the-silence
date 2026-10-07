import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import { SOURCES } from '../../lib/data';

export const metadata: Metadata = { title: 'Sources & Verification' };

export default function SourcesPage() {
  return (
    <section id="sources" className="on-rule">
      <div className="wrap">
        <PageHead eyebrow="Methodology" title="Sources & Verification">
          Every claim in this archive is cross-referenced. We distinguish fact from analysis, and allegation from court finding.
        </PageHead>
        <div className="source-list">
          {SOURCES.map((s, i) => (
            <div key={i} className="source-item">
              <span className="t">{s.t}</span>
              <span className="o">{s.o}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
