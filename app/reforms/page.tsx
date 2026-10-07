import type { Metadata } from 'next';
import Link from 'next/link';
import { REFORMS, REFORM_MARKS } from '../../lib/data';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'Promise vs Reality | Accountability Audit',
  description: 'A documented audit of major women\'s safety reforms in India — measuring what was promised against what was actually implemented, with evidence.',
  openGraph: {
    title: 'Promise vs Reality | After The Silence Archive',
    description: 'A documented audit of major women\'s safety reforms in India.',
    type: 'website',
  },
};

// ============================================================
// COMPUTED SUMMARY METRICS
// ============================================================
const SUMMARY = {
  total: REFORMS.length,
  implemented: REFORMS.filter((r) => r.status === 'impl').length,
  partial: REFORMS.filter((r) => r.status === 'partial').length,
  failed: REFORMS.filter((r) => r.status === 'fail').length,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ReformsPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="audit-dossier">
        <div className="audit-wrap">
          
          {/* Breadcrumb */}
          <nav className="audit-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Promise vs Reality</span>
          </nav>

          {/* Entrance Header */}
          <div className="audit-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">⚖</span>
              <span className="badge-text">ACCOUNTABILITY AUDIT</span>
            </div>
            <div className="eyebrow">Accountability Dashboard</div>
            <h1 className="audit-title">Promise vs Reality</h1>
            <p className="audit-lede">
              After every major case, governments announce reforms. Promises are made. Funds are allocated. 
              Laws are passed. This audit documents what was announced, what was actually delivered, and 
              where the gap remains. Every status is backed by documented evidence — we never label a reform 
              "failed" without proof.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="audit-grid">
            
            {/* LEFT: Sticky Audit Summary */}
            <aside className="audit-sidebar">
              <div className="audit-index">
                <div className="index-header">
                  <span className="index-label">AUDIT FILE</span>
                  <span className="index-value">REF-AUDIT-001</span>
                </div>
                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">VERDICT SUMMARY</span>
                  <div className="verdict-stats">
                    <div className="verdict-row verdict-impl">
                      <span className="verdict-mark">✓</span>
                      <span className="verdict-label">Implemented</span>
                      <span className="verdict-count">{SUMMARY.implemented}</span>
                    </div>
                    <div className="verdict-row verdict-partial">
                      <span className="verdict-mark">⚠</span>
                      <span className="verdict-label">Partial</span>
                      <span className="verdict-count">{SUMMARY.partial}</span>
                    </div>
                    <div className="verdict-row verdict-fail">
                      <span className="verdict-mark">✕</span>
                      <span className="verdict-label">Failed</span>
                      <span className="verdict-count">{SUMMARY.failed}</span>
                    </div>
                  </div>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">TOTAL REFORMS AUDITED</span>
                  <div className="total-count">{SUMMARY.total}</div>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">STATUS LEGEND</span>
                  <div className="legend-list">
                    <div className="legend-item">
                      <span className="legend-mark mark-impl">✓</span>
                      <span className="legend-text">Fully implemented per official records</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-mark mark-partial">⚠</span>
                      <span className="legend-text">Enacted but uneven or delayed in practice</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-mark mark-fail">✕</span>
                      <span className="legend-text">Documented failure to enforce or implement</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Main Audit Content */}
            <div className="audit-content">
              
              {/* Executive Summary */}
              <section className="audit-section">
                <h2 className="section-heading">
                  <span className="section-num">01</span>
                  <span className="section-title">Executive Summary</span>
                </h2>
                <div className="exec-summary">
                  <p>
                    Of the <strong>{SUMMARY.total} major reforms</strong> audited in this archive, only{' '}
                    <strong className="highlight-impl">{SUMMARY.implemented}</strong> have been fully implemented 
                    as announced. <strong className="highlight-partial">{SUMMARY.partial}</strong> remain 
                    partially implemented with documented gaps, and <strong className="highlight-fail">{SUMMARY.failed}</strong>{' '}
                    have failed to meet their stated objectives despite official announcements.
                  </p>
                  <p className="exec-note">
                    This is not a judgment — it is a documented record. Each status below is cross-referenced 
                    against government reports, parliamentary committee findings, CAG audits, and post-incident 
                    investigations. The methodology mirrors that of a parliamentary accountability review.
                  </p>
                </div>
              </section>

              {/* The Audit Table */}
              <section className="audit-section">
                <h2 className="section-heading">
                  <span className="section-num">02</span>
                  <span className="section-title">The Audit Record</span>
                </h2>
                <p className="section-intro">
                  Each row documents one reform: what was promised, what actually happened, and the evidentiary 
                  basis for the status assigned. Hover over any status mark for its definition.
                </p>

                <div className="pr-scroll" tabIndex={0} role="region" aria-label="Promise vs reality audit table, scrollable horizontally">
                  <table className="pr-table">
                    <thead>
                      <tr>
                        <th className="col-num">#</th>
                        <th className="col-name">Reform / Promise</th>
                        <th className="col-promise">Announced Intent</th>
                        <th className="col-impl">Actual Implementation</th>
                        <th className="col-status">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REFORMS.map((r, i) => (
                        <tr key={i}>
                          <td className="cell-num">{String(i + 1).padStart(2, '0')}</td>
                          <td className="cell-name">{r.name}</td>
                          <td className="cell-promise">{r.promise}</td>
                          <td className="cell-impl">{r.implementation}</td>
                          <td className="cell-status">
                            <span 
                              className={`status-mark mark-${r.status}`}
                              title={REFORM_MARKS[r.status]}
                            >
                              {REFORM_MARKS[r.status]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Key Findings */}
              <section className="audit-section">
                <h2 className="section-heading">
                  <span className="section-num">03</span>
                  <span className="section-title">Key Findings</span>
                </h2>
                <div className="findings-grid">
                  <div className="finding-card">
                    <div className="finding-icon">§</div>
                    <h3 className="finding-title">Legislation ≠ Implementation</h3>
                    <p className="finding-text">
                      Passing a law is only the first step. The gap between statutory enactment and ground-level 
                      enforcement remains the archive's most consistent finding. Fast-track courts exist on paper; 
                      their actual caseloads and staffing vary dramatically across states.
                    </p>
                  </div>
                  <div className="finding-card">
                    <div className="finding-icon">◈</div>
                    <h3 className="finding-title">Funds Allocated, Funds Unused</h3>
                    <p className="finding-text">
                      The Nirbhaya Fund, announced with significant public attention, has been repeatedly flagged 
                      by the CAG for under-utilization by state governments. Money allocated for women's safety 
                      often remains unspent in treasury accounts.
                    </p>
                  </div>
                  <div className="finding-card">
                    <div className="finding-icon">⊞</div>
                    <h3 className="finding-title">Transport Safety: A Recurring Failure</h3>
                    <p className="finding-text">
                      Mandates for panic buttons, GPS tracking, and driver verification have been announced 
                      repeatedly since 2012. Yet every major transport-linked assault since then reveals the 
                      same enforcement gaps.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cross-References */}
              <section className="audit-section">
                <h2 className="section-heading">
                  <span className="section-num">04</span>
                  <span className="section-title">Cross-References</span>
                </h2>
                <div className="cross-ref-block">
                  <p className="cross-ref-intro">
                    This audit does not exist in isolation. Each reform was a response to specific documented 
                    cases. Follow the chain from tragedy → promise → delivery (or failure):
                  </p>
                  <div className="cross-ref-links">
                    <Link href="/cases" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">View Case Records</span>
                      <span className="link-arrow">→</span>
                    </Link>
                    <Link href="/timeline" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">Follow the Reform Timeline</span>
                      <span className="link-arrow">→</span>
                    </Link>
                    <Link href="/sources" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">Review Source Methodology</span>
                      <span className="link-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer Verdict Statement */}
          <footer className="audit-footer">
            <div className="footer-rule" />
            <p className="footer-statement">
              "A promise made to the public is a debt owed to the public. This archive keeps the ledger."
            </p>
            <div className="footer-meta">
              <span>AUDIT VERSION 1.0</span>
              <span className="meta-dot">·</span>
              <span>LAST REVIEWED: OCTOBER 2026</span>
              <span className="meta-dot">·</span>
              <span>{SUMMARY.total} REFORMS DOCUMENTED</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

// ============================================================
// ACCOUNTABILITY AUDIT STYLESHEET
// ============================================================
const CSS = `
.audit-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .audit-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.audit-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.audit-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.audit-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.audit-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Entrance */
.audit-entrance {
  margin-bottom: 64px;
  max-width: 800px;
}
.entrance-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--crimson, #8f2f2c);
  color: #fff;
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 24px;
  border-radius: 2px;
}
.badge-icon { font-size: 0.9rem; }
.badge-text { font-weight: 600; }

.eyebrow {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold, #a9873f);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.eyebrow::before {
  content: '';
  width: 22px;
  height: 1px;
  background: var(--gold, #a9873f);
}

.audit-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.audit-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .audit-lede { color: #5a5348; }

/* Grid Layout */
.audit-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar */
.audit-sidebar {
  position: sticky;
  top: 100px;
}
.audit-index {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .audit-index {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.audit-index::before {
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
  display: block;
  margin-bottom: 8px;
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

.index-section {
  margin-bottom: 4px;
}

/* Verdict Stats */
.verdict-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.verdict-row {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255,255,255,0.02);
  border-left: 2px solid transparent;
}
.archive-root.light .verdict-row { background: rgba(0,0,0,0.02); }
.verdict-impl { border-left-color: var(--ok, #5f7a4f); }
.verdict-partial { border-left-color: var(--warn, #a9873f); }
.verdict-fail { border-left-color: var(--fail, #8f2f2c); }

.verdict-mark {
  font-family: var(--font-mono, monospace);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
}
.verdict-impl .verdict-mark { color: var(--ok, #5f7a4f); }
.verdict-partial .verdict-mark { color: var(--warn, #a9873f); }
.verdict-fail .verdict-mark { color: var(--fail, #8f2f2c); }

.verdict-label {
  font-size: 0.85rem;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .verdict-label { color: #5a5348; }

.verdict-count {
  font-family: var(--font-serif, serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
  line-height: 1;
}
.archive-root.light .verdict-count { color: var(--ink-soft, #1c1917); }

.total-count {
  font-family: var(--font-serif, serif);
  font-size: 3rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
  line-height: 1;
  text-align: center;
  padding: 8px 0;
}
.archive-root.light .total-count { color: var(--ink-soft, #1c1917); }

/* Legend */
.legend-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.legend-mark {
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  font-weight: 700;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.mark-impl { color: var(--ok, #5f7a4f); }
.mark-partial { color: var(--warn, #a9873f); }
.mark-fail { color: var(--fail, #8f2f2c); }

.legend-text {
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .legend-text { color: #5a5348; }

/* Main Content */
.audit-content {
  padding-top: 12px;
}
.audit-section {
  margin-bottom: 80px;
  scroll-margin-top: 100px;
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule, #3c3733);
}
.archive-root.light .section-heading { border-color: var(--lp-rule, #d3cabb); }

.section-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  color: var(--gold, #a9873f);
  letter-spacing: 0.05em;
}
.section-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(1.5rem, 2.8vw, 2rem);
  font-weight: 500;
  color: var(--paper, #ece5d8);
  letter-spacing: -0.01em;
}
.archive-root.light .section-title { color: var(--ink-soft, #1c1917); }

.section-intro {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
  margin-bottom: 28px;
}
.archive-root.light .section-intro { color: #5a5348; }

/* Executive Summary */
.exec-summary {
  padding: 28px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-left: 3px solid var(--gold, #a9873f);
  border-radius: 0 4px 4px 0;
}
.archive-root.light .exec-summary {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  border-left-color: var(--gold, #a9873f);
}
.exec-summary p {
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  margin: 0 0 16px 0;
}
.archive-root.light .exec-summary p { color: #4c4638; }
.exec-summary p:last-child { margin-bottom: 0; }
.exec-summary strong { color: var(--paper, #ece5d8); font-weight: 600; }
.archive-root.light .exec-summary strong { color: var(--ink-soft, #1c1917); }
.highlight-impl { color: var(--ok, #5f7a4f) !important; }
.highlight-partial { color: var(--warn, #a9873f) !important; }
.highlight-fail { color: var(--fail, #8f2f2c) !important; }

.exec-note {
  font-size: 0.88rem !important;
  font-style: italic;
  padding-top: 12px;
  border-top: 1px dashed var(--rule-lite, #2a2623);
}
.archive-root.light .exec-note { border-color: var(--lp-rule, #d3cabb); }

/* Audit Table */
.pr-scroll {
  overflow-x: auto;
  border: 1px solid var(--rule, #3c3733);
  background: var(--ink-soft, #1c1917);
}
.archive-root.light .pr-scroll {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.pr-scroll:focus-visible {
  outline: 2px solid var(--gold, #a9873f);
  outline-offset: 2px;
}

.pr-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}
.pr-table th {
  text-align: left;
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
  padding: 16px 18px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid var(--rule, #3c3733);
  font-weight: 500;
  white-space: nowrap;
}
.archive-root.light .pr-table th {
  background: var(--lp-paper2, #ece5d8);
  color: #5a5348;
  border-color: var(--lp-rule, #d3cabb);
}

.col-num { width: 50px; }
.col-name { width: 22%; }
.col-promise { width: 28%; }
.col-impl { width: 32%; }
.col-status { width: 100px; text-align: center !important; }

.pr-table td {
  padding: 20px 18px;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
  font-size: 0.92rem;
  vertical-align: top;
  color: var(--paper-dim, #b9b0a0);
  line-height: 1.6;
}
.archive-root.light .pr-table td {
  color: #4c4638;
  border-color: var(--lp-rule, #d3cabb);
}

.pr-table tr:hover td {
  background: rgba(169, 135, 63, 0.04);
}
.archive-root.light .pr-table tr:hover td {
  background: rgba(169, 135, 63, 0.08);
}
.pr-table tr:last-child td { border-bottom: none; }

.cell-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  color: var(--gold, #a9873f);
  letter-spacing: 0.05em;
}
.cell-name {
  font-family: var(--font-serif, serif);
  font-size: 1.02rem;
  color: var(--paper, #ece5d8);
  font-weight: 500;
  line-height: 1.4;
}
.archive-root.light .cell-name { color: var(--ink-soft, #1c1917); }

.cell-status {
  text-align: center;
  vertical-align: middle;
}

.status-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-family: var(--font-mono, monospace);
  font-size: 1.1rem;
  font-weight: 700;
  border: 1px solid;
  border-radius: 2px;
  cursor: help;
  transition: transform 0.2s;
}
.status-mark:hover { transform: scale(1.1); }

.mark-impl {
  border-color: var(--ok, #5f7a4f);
  color: var(--ok, #5f7a4f);
  background: rgba(95, 122, 79, 0.1);
}
.mark-partial {
  border-color: var(--warn, #a9873f);
  color: var(--warn, #a9873f);
  background: rgba(169, 135, 63, 0.1);
}
.mark-fail {
  border-color: var(--fail, #8f2f2c);
  color: var(--fail, #8f2f2c);
  background: rgba(143, 47, 44, 0.1);
}

/* Findings Grid */
.findings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.finding-card {
  padding: 28px 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 2px solid var(--crimson, #8f2f2c);
  transition: transform 0.2s, border-color 0.2s;
}
.archive-root.light .finding-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.finding-card:hover {
  transform: translateY(-2px);
  border-color: var(--crimson, #8f2f2c);
}
.finding-icon {
  font-size: 1.6rem;
  color: var(--crimson-br, #b23e39);
  margin-bottom: 12px;
  line-height: 1;
}
.finding-title {
  font-family: var(--font-serif, serif);
  font-size: 1.15rem;
  margin-bottom: 10px;
  color: var(--paper, #ece5d8);
}
.archive-root.light .finding-title { color: var(--ink-soft, #1c1917); }
.finding-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .finding-text { color: #5a5348; }

/* Cross References */
.cross-ref-block {
  padding: 28px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-radius: 2px;
}
.archive-root.light .cross-ref-block {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.cross-ref-intro {
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
  margin: 0 0 24px 0;
}
.archive-root.light .cross-ref-intro { color: #5a5348; }

.cross-ref-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.cross-ref-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(169, 135, 63, 0.06);
  border: 1px solid var(--rule, #3c3733);
  text-decoration: none;
  color: var(--paper, #ece5d8);
  transition: all 0.2s;
}
.archive-root.light .cross-ref-link {
  background: rgba(169, 135, 63, 0.06);
  border-color: var(--lp-rule, #d3cabb);
  color: var(--ink-soft, #1c1917);
}
.cross-ref-link:hover {
  background: var(--gold, #a9873f);
  border-color: var(--gold, #a9873f);
  color: var(--ink, #131110);
}
.archive-root.light .cross-ref-link:hover { color: #fff; }

.link-icon {
  color: var(--gold, #a9873f);
  font-size: 1rem;
  transition: color 0.2s;
}
.cross-ref-link:hover .link-icon { color: inherit; }

.link-text {
  flex: 1;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.link-arrow {
  font-size: 1rem;
  transition: transform 0.2s;
}
.cross-ref-link:hover .link-arrow { transform: translateX(4px); }

/* Footer */
.audit-footer {
  margin-top: 80px;
  padding-top: 32px;
}
.footer-rule {
  height: 1px;
  background: var(--rule, #3c3733);
  margin-bottom: 32px;
}
.archive-root.light .footer-rule { background: var(--lp-rule, #d3cabb); }
.footer-statement {
  font-family: var(--font-serif, serif);
  font-size: clamp(1.2rem, 2.4vw, 1.6rem);
  font-style: italic;
  line-height: 1.5;
  color: var(--paper-dim, #b9b0a0);
  max-width: 60ch;
  padding-left: 24px;
  border-left: 2px solid var(--crimson, #8f2f2c);
  margin: 0 0 24px 0;
}
.archive-root.light .footer-statement { color: #5a5348; }
.footer-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--paper-faint, #8a8175);
  text-transform: uppercase;
}
.meta-dot { color: var(--rule, #3c3733); }
.archive-root.light .meta-dot { color: var(--lp-rule, #d3cabb); }

/* Responsive */
@media (max-width: 900px) {
  .audit-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .audit-sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
  .audit-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .index-header { grid-column: 1 / -1; }
  .index-divider { grid-column: 1 / -1; margin: 8px 0; }
  .index-section:last-child { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .audit-dossier {
    padding: 32px var(--edge, 20px) 80px;
  }
  .audit-title {
    font-size: 1.8rem;
  }
  .audit-index {
    grid-template-columns: 1fr;
  }
  .findings-grid {
    grid-template-columns: 1fr;
  }
  .cross-ref-links {
    grid-template-columns: 1fr;
  }
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .meta-dot { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .finding-card:hover,
  .status-mark:hover,
  .cross-ref-link:hover .link-arrow {
    transition: none;
    transform: none;
  }
}
`;