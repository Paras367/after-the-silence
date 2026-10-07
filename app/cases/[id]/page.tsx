import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASES, FACT_STATUS, SECTION_LABELS } from '../../../lib/data';

// Har case ka apna static page banega
export function generateStaticParams() {
  return CASES.map(c => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const c = CASES.find(x => x.id === params.id);
  return c ? { title: c.title, description: c.desc } : { title: 'Case not found' };
}

// Jin cases ka alag centerpiece page bhi hai
const CENTERPIECE: Record<string, string> = {
  "nirbhaya-2012": "/nirbhaya",
  "sleeper-bus-2026": "/sleeper-bus",
};

export default function CaseFilePage({ params }: { params: { id: string } }) {
  const idx = CASES.findIndex(c => c.id === params.id);
  if (idx === -1) notFound();

  const selectedCase = CASES[idx];
  const prev = idx > 0 ? CASES[idx - 1] : null;
  const next = idx < CASES.length - 1 ? CASES[idx + 1] : null;

  const isCourtStatus = ['convicted', 'landmark', 'acquitted'].includes(selectedCase.status);
  const isOpenStatus = ['investigation', 'trial', 'ongoing', 'appeal'].includes(selectedCase.status);

  return (
    <section>
      <div className="wrap">
        <Link href="/cases" className="back-link">← ALL CASES</Link>
        <article className="case-file">
          <div className="eyebrow">Case File</div>
          <h1>{selectedCase.title}</h1>
          <div className="file-meta">{selectedCase.year} · {selectedCase.location} · {selectedCase.type}</div>
          <div className="tag-row">
            <span className="tag verified" title={FACT_STATUS.verified}>VERIFIED</span>
            {isCourtStatus && <span className="tag court" title={FACT_STATUS.court}>COURT</span>}
            {isOpenStatus && <span className="tag ongoing" title={FACT_STATUS.ongoing}>ONGOING</span>}
          </div>

          {Object.entries(selectedCase.sections).map(([key, value], i) => (
            <div key={key} className="file-section">
              <h4>{String(i + 1).padStart(2, '0')} — {SECTION_LABELS[key] ?? key}</h4>
              <p>{value}</p>
            </div>
          ))}

          <div className="file-section">
            <h4>Sources</h4>
            <p className="file-sources">Cross-check details for this case against the primary sources listed in the archive-wide <Link href="/sources" style={{ textDecoration: 'underline' }}>Sources</Link> section, and current court records, before treating any detail as final.</p>
          </div>

          {CENTERPIECE[selectedCase.id] && (
            <p className="file-link"><Link href={CENTERPIECE[selectedCase.id]}>→ VIEW THE CENTERPIECE ARCHIVE PAGE</Link></p>
          )}

          <div className="case-pager">
            {prev && <Link href={`/cases/${prev.id}`} className="prev">← {prev.title}</Link>}
            {next && <Link href={`/cases/${next.id}`} className="next">{next.title} →</Link>}
          </div>
        </article>
      </div>
    </section>
  );
}
