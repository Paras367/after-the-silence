import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CASES, FACT_STATUS, SECTION_LABELS } from '../../../lib/data';

// ============================================================
// STATIC GENERATION & METADATA (Next.js 15 compatible)
// ============================================================
export async function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CASES.find((x) => x.id === id);
  
  if (!c) return { title: 'Case File Not Found | After The Silence' };

  return {
    title: `${c.title} | Case Archive`,
    description: c.desc,
    openGraph: {
      title: `${c.title} | After The Silence Archive`,
      description: c.desc,
      type: 'article',
      publishedTime: `${c.year}-01-01T00:00:00Z`,
      tags: [c.type, c.status, 'Public Interest Archive'],
    },
  };
}

// Cases that have a dedicated deep-dive centerpiece page
const CENTERPIECE_MAP: Record<string, string> = {
  'nirbhaya-2012': '/nirbhaya',
  'sleeper-bus-2026': '/sleeper-bus',
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default async function CaseFilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = CASES.findIndex((c) => c.id === id);
  
  if (idx === -1) notFound();

  const selectedCase = CASES[idx];
  const prev = idx > 0 ? CASES[idx - 1] : null;
  const next = idx < CASES.length - 1 ? CASES[idx + 1] : null;

  const isCourtStatus = ['convicted', 'landmark', 'acquitted'].includes(selectedCase.status);
  const isOpenStatus = ['investigation', 'trial', 'ongoing', 'appeal'].includes(selectedCase.status);

  // Generate a faux archival file number for aesthetic
  const fileNo = `ATS-${selectedCase.year}-${selectedCase.id.split('-').pop()?.toUpperCase()}`;

  return (
    <>
      <style>{CSS}</style>
      <section className="archive-dossier">
        <div className="dossier-wrap">
          
          {/* Breadcrumb Navigation */}
          <nav className="dossier-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/cases">Case Records</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">{selectedCase.year}</span>
          </nav>

          <div className="dossier-grid">
            
            {/* LEFT COLUMN: Sticky Archival Index Card */}
            <aside className="dossier-sidebar">
              <div className="index-card">
                <div className="index-header">
                  <span className="index-label">FILE NO.</span>
                  <span className="index-value">{fileNo}</span>
                </div>
                
                <div className="index-divider" />
                
                <div className="index-row">
                  <span className="index-label">YEAR</span>
                  <span className="index-value">{selectedCase.year}</span>
                </div>
                <div className="index-row">
                  <span className="index-label">LOCATION</span>
                  <span className="index-value">{selectedCase.location}</span>
                </div>
                <div className="index-row">
                  <span className="index-label">CLASSIFICATION</span>
                  <span className="index-value">{selectedCase.type}</span>
                </div>
                <div className="index-row">
                  <span className="index-label">STATUS</span>
                  <span className={`index-value status-badge status-${selectedCase.status}`}>
                    {selectedCase.status.toUpperCase()}
                  </span>
                </div>

                <div className="index-divider" />

                <div className="index-tags">
                  <span className="tag verified" title={FACT_STATUS.verified}>VERIFIED</span>
                  {isCourtStatus && <span className="tag court" title={FACT_STATUS.court}>COURT</span>}
                  {isOpenStatus && <span className="tag ongoing" title={FACT_STATUS.ongoing}>ONGOING</span>}
                </div>

                {CENTERPIECE_MAP[selectedCase.id] && (
                  <Link href={CENTERPIECE_MAP[selectedCase.id]} className="centerpiece-link">
                    <span className="link-icon">◈</span> VIEW CENTERPIECE ARCHIVE
                  </Link>
                )}
              </div>
            </aside>

            {/* RIGHT COLUMN: Main Case Document */}
            <article className="dossier-content">
              <header className="dossier-header">
                <div className="eyebrow dossier-eyebrow">OFFICIAL CASE FILE</div>
                <h1 className="dossier-title">{selectedCase.title}</h1>
                <p className="dossier-lede">{selectedCase.desc}</p>
              </header>

              <div className="dossier-body">
                {Object.entries(selectedCase.sections).map(([key, value], i) => (
                  <div key={key} className="file-section">
                    <h4 className="section-heading">
                      <span className="section-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="section-title">{SECTION_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</span>
                    </h4>
                    <div className="section-content">
                      <p>{value}</p>
                    </div>
                  </div>
                ))}

                {/* Official Sources Disclaimer */}
                <div className="file-section sources-block">
                  <h4 className="section-heading">
                    <span className="section-num">∞</span>
                    <span className="section-title">ARCHIVAL SOURCES & VERIFICATION</span>
                  </h4>
                  <div className="section-content">
                    <p className="sources-text">
                      Cross-check details for this case against the primary sources listed in the archive-wide{' '}
                      <Link href="/sources" className="source-link">Sources & Verification</Link> section, 
                      and current official court records, before treating any detail as final. 
                      This archive separates verified court findings from media allegations and ongoing investigations.
                    </p>
                  </div>
                </div>
              </div>

              {/* File Navigation (Previous / Next) */}
              <footer className="dossier-pager">
                {prev ? (
                  <Link href={`/cases/${prev.id}`} className="pager-btn prev-btn">
                    <span className="pager-arrow">←</span>
                    <div className="pager-meta">
                      <span className="pager-label">Previous File</span>
                      <span className="pager-title">{prev.title}</span>
                    </div>
                  </Link>
                ) : <div className="pager-spacer" />}

                <Link href="/cases" className="pager-btn home-btn">
                  <span className="pager-icon">⊞</span> ALL CASES
                </Link>

                {next ? (
                  <Link href={`/cases/${next.id}`} className="pager-btn next-btn">
                    <div className="pager-meta">
                      <span className="pager-label">Next File</span>
                      <span className="pager-title">{next.title}</span>
                    </div>
                    <span className="pager-arrow">→</span>
                  </Link>
                ) : <div className="pager-spacer" />}
              </footer>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// ARCHIVAL DOSSIER STYLESHEET
// ============================================================
const CSS = `
.archive-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 40px var(--edge, 40px) 120px;
}
.archive-root.light .archive-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.dossier-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.dossier-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dossier-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.dossier-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Grid Layout */
.dossier-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar Index Card */
.dossier-sidebar {
  position: sticky;
  top: 100px;
}
.index-card {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .index-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.index-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--crimson, #8f2f2c);
}

.index-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.index-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
}
.index-value {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  color: var(--paper, #ece5d8);
  font-weight: 500;
}
.archive-root.light .index-value { color: var(--ink-soft, #1c1917); }

.index-divider {
  height: 1px;
  background: var(--rule-lite, #2a2623);
  margin: 16px 0;
}
.archive-root.light .index-divider { background: var(--lp-rule, #d3cabb); }

.index-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}
.index-row .index-value {
  text-align: right;
  max-width: 60%;
  line-height: 1.4;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 0.7rem;
  border: 1px solid var(--rule, #3c3733);
}
.status-badge.status-convicted, .status-badge.status-landmark, .status-badge.status-acquitted {
  border-color: var(--ok, #5f7a4f);
  color: var(--ok, #5f7a4f);
}
.status-badge.status-investigation, .status-badge.status-trial, .status-badge.status-ongoing, .status-badge.status-appeal {
  border-color: var(--gold, #a9873f);
  color: var(--gold, #a9873f);
}

.index-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.tag {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 8px;
  border: 1px solid var(--rule, #3c3733);
  color: var(--paper-dim, #b9b0a0);
  cursor: help;
}
.tag.verified { border-color: var(--ok, #5f7a4f); color: var(--ok, #5f7a4f); }
.tag.court { border-color: var(--gold, #a9873f); color: var(--gold, #a9873f); }
.tag.ongoing { border-color: var(--paper-faint, #8a8175); color: var(--paper-faint, #8a8175); }

.centerpiece-link {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px;
  background: rgba(169, 135, 63, 0.1);
  border: 1px solid var(--gold, #a9873f);
  color: var(--gold, #a9873f);
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: all 0.2s;
}
.centerpiece-link:hover {
  background: var(--gold, #a9873f);
  color: var(--ink, #131110);
}
.archive-root.light .centerpiece-link:hover {
  color: #fff;
}
.link-icon { font-size: 1rem; }

/* Main Content */
.dossier-content {
  padding-top: 12px;
}
.dossier-eyebrow {
  color: var(--crimson-br, #b23e39);
  margin-bottom: 16px;
}
.dossier-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.1;
  margin-bottom: 24px;
  max-width: 20ch;
}
.dossier-lede {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  max-width: 65ch;
  margin-bottom: 64px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--rule, #3c3733);
}
.archive-root.light .dossier-lede { color: #5a5348; }

/* Sections */
.file-section {
  margin-bottom: 48px;
  padding-left: 24px;
  border-left: 1px solid var(--rule, #3c3733);
  position: relative;
}
.file-section::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 6px;
  width: 3px;
  height: 3px;
  background: var(--gold, #a9873f);
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}
.section-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  color: var(--gold, #a9873f);
  letter-spacing: 0.05em;
}
.section-title {
  font-family: var(--font-sans, sans-serif);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper, #ece5d8);
}
.archive-root.light .section-title { color: var(--ink-soft, #1c1917); }

.section-content p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .section-content p { color: #4c4638; }

/* Sources Block */
.sources-block {
  margin-top: 80px;
  padding: 32px;
  background: var(--ink-soft, #1c1917);
  border-left: 3px solid var(--crimson, #8f2f2c);
  border-radius: 0 4px 4px 0;
}
.archive-root.light .sources-block {
  background: var(--lp-paper2, #ece5d8);
}
.sources-block .section-title { color: var(--crimson-br, #b23e39); }
.sources-text {
  font-size: 0.95rem !important;
  font-style: italic;
}
.source-link {
  color: var(--gold, #a9873f);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.source-link:hover { color: var(--paper, #ece5d8); }
.archive-root.light .source-link:hover { color: var(--ink-soft, #1c1917); }

/* Pager */
.dossier-pager {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid var(--rule, #3c3733);
  align-items: center;
}
.pager-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--paper-dim, #b9b0a0);
  transition: all 0.2s;
  padding: 12px;
  border: 1px solid transparent;
}
.archive-root.light .pager-btn { color: #5a5348; }
.pager-btn:hover {
  color: var(--paper, #ece5d8);
  border-color: var(--rule, #3c3733);
  background: var(--ink-soft, #1c1917);
}
.archive-root.light .pager-btn:hover {
  color: var(--ink-soft, #1c1917);
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}

.prev-btn { justify-content: flex-start; }
.next-btn { justify-content: flex-end; text-align: right; }
.home-btn { 
  font-family: var(--font-mono, monospace); 
  font-size: 0.75rem; 
  letter-spacing: 0.1em; 
  color: var(--gold, #a9873f);
  border-color: var(--rule, #3c3733);
}
.home-btn:hover { background: var(--gold, #a9873f); color: var(--ink, #131110); }
.archive-root.light .home-btn:hover { color: #fff; }

.pager-arrow { font-size: 1.2rem; line-height: 1; }
.pager-meta { display: flex; flex-direction: column; gap: 4px; }
.pager-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
}
.pager-title {
  font-family: var(--font-serif, serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: inherit;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pager-spacer { pointer-events: none; }

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .dossier-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .dossier-sidebar {
    position: relative;
    top: 0;
    order: -1; /* Puts the index card above the content on mobile */
  }
  .index-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .index-divider { grid-column: 1 / -1; margin: 8px 0; }
  .index-tags { grid-column: 1 / -1; }
  .centerpiece-link { grid-column: 1 / -1; margin-top: 8px; }
  
  .dossier-pager {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .pager-btn { justify-content: center !important; text-align: center; }
  .pager-meta { align-items: center; }
  .pager-title { max-width: 100%; white-space: normal; }
  .home-btn { order: -1; margin-bottom: 8px; }
}

@media (max-width: 640px) {
  .archive-dossier { padding: 24px var(--edge, 20px) 80px; }
  .index-card { grid-template-columns: 1fr; }
  .dossier-title { font-size: 1.8rem; }
}
`;