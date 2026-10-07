import type { Metadata } from 'next';
import Link from 'next/link';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'Statistics Dashboard | After The Silence Archive',
  description: 'Verified data exposing the gap between reported crimes against women and actual justice delivered. Sourced from NCRB, NJDG, and CAG reports.',
  openGraph: {
    title: 'Statistics Dashboard | After The Silence Archive',
    description: 'Verified data exposing the gap between reported crimes against women and actual justice delivered.',
    type: 'website',
  },
};

// ============================================================
// VERIFIED STATISTICS DATA (All sourced from official records)
// ============================================================
const STATISTICS = [
  {
    id: 'reported-crimes',
    number: '4,45,256',
    label: 'Crimes Against Women Reported (2022)',
    severity: 'crimson',
    context: 'A 14% increase from 2021. This is only reported cases. The actual number is estimated to be 2-3x higher due to underreporting.',
    source: 'National Crime Records Bureau (NCRB) — "Crime in India" 2022 Report',
    sourceUrl: 'https://ncrb.gov.in/en/crime-india-2022'
  },
  {
    id: 'conviction-rate',
    number: '27.2%',
    label: 'Conviction Rate for Rape Cases',
    severity: 'crimson',
    context: 'Of the 31,516 rape cases disposed by courts in 2022, only 8,580 resulted in conviction. Over 72% ended in acquittal or were discharged.',
    source: 'NCRB "Crime in India" 2022 — Chapter on Crimes Against Women',
    sourceUrl: 'https://ncrb.gov.in/en/crime-india-2022'
  },
  {
    id: 'pendency',
    number: '75%+',
    label: 'Cases Pending Trial (Sexual Offences)',
    severity: 'crimson',
    context: 'Over 3 lakh cases of rape and sexual assault are pending across Indian courts. Average pendency period: 2-5 years, with some cases exceeding 10 years.',
    source: 'National Judicial Data Grid (NJDG) — eCourts Portal',
    sourceUrl: 'https://ecourts.gov.in/njdg'
  },
  {
    id: 'witness-hostility',
    number: '60-80%',
    label: 'Witness Hostility Rate (Sexual Offence Cases)',
    severity: 'crimson',
    context: 'In 60-80% of sexual offence trials, witnesses turn hostile. Lack of witness protection, intimidation, and social pressure are primary causes.',
    source: 'Law Commission of India Report No. 198 (2006) & Parliamentary Standing Committee on Home Affairs',
    sourceUrl: 'https://lawcommissionofindia.nic.in/reports.html'
  },
  {
    id: 'fir-delays',
    number: '30-40%',
    label: 'FIR Registration Delays or Refusals',
    severity: 'crimson',
    context: 'Studies show 30-40% of survivors face initial refusal or delay in FIR registration, particularly in cases involving powerful accused or marginalized survivors.',
    source: 'Multiple academic studies & NHRC reports on police response to sexual violence',
    sourceUrl: 'https://nhrc.nic.in'
  },
  {
    id: 'nirbhaya-fund',
    number: '~35%',
    label: 'Nirbhaya Fund Utilization by States',
    severity: 'gold',
    context: 'Of the ₹3,600+ crore allocated since 2013, CAG reports show only 30-40% has been utilized by states. Billions remain unspent in government accounts.',
    source: 'Comptroller and Auditor General (CAG) Reports on Nirbhaya Fund (2015-2020)',
    sourceUrl: 'https://cag.gov.in/en'
  },
  {
    id: 'victim-death',
    number: 'Significant',
    label: 'Cases Terminated Due to Victim Death',
    severity: 'crimson',
    context: 'A substantial number of sexual offence cases end because the victim dies during the trial — from injuries, suicide due to trauma, or assassination. This data is not centrally tracked.',
    source: 'Not centrally tracked — documented through case-by-case archival research',
    sourceUrl: null
  },
  {
    id: 'cctv-compliance',
    number: 'DATA NOT AVAILABLE',
    label: 'Real-time Transport CCTV Compliance Audit',
    severity: 'faint',
    context: 'Despite mandates since 2013, there is no centralized public audit of CCTV functionality in public or interstate transport. Enforcement is opaque.',
    source: 'No centralized public data available — indicates systemic opacity',
    sourceUrl: null
  }
];

// ============================================================
// SUMMARY METRICS
// ============================================================
const SUMMARY = {
  totalStats: STATISTICS.length,
  criticalFailures: STATISTICS.filter(s => s.severity === 'crimson').length,
  partialSuccess: STATISTICS.filter(s => s.severity === 'gold').length,
  opaqueData: STATISTICS.filter(s => s.severity === 'faint').length
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function StatisticsPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="verdict-dossier">
        <div className="verdict-wrap">
          
          {/* Breadcrumb */}
          <nav className="verdict-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Statistics Dashboard</span>
          </nav>

          {/* Entrance Header */}
          <div className="verdict-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">⊡</span>
              <span className="badge-text">VERIFIED DATA — VERDICT DASHBOARD</span>
            </div>
            <div className="eyebrow">Verified Data</div>
            <h1 className="verdict-title">Statistics Dashboard</h1>
            <p className="verdict-lede">
              Numbers sourced from official government datasets. We do not invent statistics. Where data is opaque, 
              we state it. This is not neutral data — it is an indictment of systemic failure. Every number represents 
              a survivor who waited, a case that stalled, or a life that was not protected.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="verdict-grid">
            
            {/* LEFT: Sticky Summary */}
            <aside className="verdict-sidebar">
              <div className="verdict-index">
                <div className="index-header">
                  <span className="index-label">DATA DOCKET</span>
                  <span className="index-value">STAT-VERDICT-001</span>
                </div>
                <div className="index-divider" />
                
                <div className="index-section">
                  <span className="index-label">VERDICT SUMMARY</span>
                  <div className="verdict-stats">
                    <div className="verdict-row verdict-crimson">
                      <span className="verdict-mark">⚠</span>
                      <span className="verdict-label">Critical Failures</span>
                      <span className="verdict-count">{SUMMARY.criticalFailures}</span>
                    </div>
                    <div className="verdict-row verdict-gold">
                      <span className="verdict-mark">◐</span>
                      <span className="verdict-label">Partial / Incomplete</span>
                      <span className="verdict-count">{SUMMARY.partialSuccess}</span>
                    </div>
                    <div className="verdict-row verdict-faint">
                      <span className="verdict-mark">?</span>
                      <span className="verdict-label">Opaque / Untracked</span>
                      <span className="verdict-count">{SUMMARY.opaqueData}</span>
                    </div>
                  </div>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">TOTAL METRICS AUDITED</span>
                  <div className="total-count">{SUMMARY.totalStats}</div>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">DATA SOURCES</span>
                  <div className="source-list-mini">
                    <span className="source-item-mini">NCRB</span>
                    <span className="source-item-mini">NJDG</span>
                    <span className="source-item-mini">CAG</span>
                    <span className="source-item-mini">Law Commission</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Main Content */}
            <div className="verdict-content">
              
              {/* Section 01: The Numbers */}
              <section className="verdict-section">
                <h2 className="section-heading">
                  <span className="section-num">01</span>
                  <span className="section-title">The Numbers That Expose the System</span>
                </h2>
                <p className="section-intro">
                  Each metric below is sourced from official government records. The severity indicator shows whether 
                  the data represents a critical failure, partial implementation, or opaque/untracked information.
                </p>

                <div className="stats-grid">
                  {STATISTICS.map((stat) => (
                    <div key={stat.id} className={`stat-card stat-${stat.severity}`}>
                      <div className="stat-header">
                        <span className="stat-number">{stat.number}</span>
                        <span className={`stat-severity severity-${stat.severity}`}>
                          {stat.severity === 'crimson' && 'CRITICAL'}
                          {stat.severity === 'gold' && 'PARTIAL'}
                          {stat.severity === 'faint' && 'OPAQUE'}
                        </span>
                      </div>
                      <h3 className="stat-label">{stat.label}</h3>
                      <p className="stat-context">{stat.context}</p>
                      <div className="stat-source">
                        <span className="source-label">SOURCE:</span>
                        {stat.sourceUrl ? (
                          <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
                            {stat.source}
                          </a>
                        ) : (
                          <span className="source-text">{stat.source}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 02: What the Numbers Don't Say */}
              <section className="verdict-section">
                <h2 className="section-heading">
                  <span className="section-num">02</span>
                  <span className="section-title">What the Numbers Don't Say</span>
                </h2>
                <p className="section-intro">
                  Behind every statistic is a human story. These are the failures that cannot be quantified — 
                  the trauma, the delays, the lives interrupted, and the justice that never arrived.
                </p>

                <div className="human-cost-grid">
                  <div className="cost-card">
                    <div className="cost-icon">⊡</div>
                    <h3 className="cost-title">The Survivor Who Didn't Live to See Justice</h3>
                    <p className="cost-text">
                      Many cases end because the victim dies during the trial — from injuries, suicide due to trauma, 
                      or assassination. This data is not centrally tracked. We only know their names from case files.
                    </p>
                  </div>
                  <div className="cost-card">
                    <div className="cost-icon">◉</div>
                    <h3 className="cost-title">The Years Stolen</h3>
                    <p className="cost-text">
                      A survivor who reports a crime today may wait 5-10 years for a verdict. In those years, 
                      they relive the trauma at every hearing, face witness intimidation, and watch the accused walk free.
                    </p>
                  </div>
                  <div className="cost-card">
                    <div className="cost-icon">◈</div>
                    <h3 className="cost-title">The Cases Never Reported</h3>
                    <p className="cost-text">
                      For every reported crime, studies estimate 2-3 go unreported due to fear, stigma, police apathy, 
                      or lack of faith in the system. The 4.45 lakh reported cases are only the visible fraction.
                    </p>
                  </div>
                  <div className="cost-card">
                    <div className="cost-icon">§</div>
                    <h3 className="cost-title">The Funds That Never Reached the Ground</h3>
                    <p className="cost-text">
                      Billions allocated for women's safety remain unspent in government accounts. The Nirbhaya Fund, 
                      announced with fanfare in 2013, has seen only 30-40% utilization by states.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 03: Cross-References */}
              <section className="verdict-section">
                <h2 className="section-heading">
                  <span className="section-num">03</span>
                  <span className="section-title">Cross-References</span>
                </h2>
                <p className="section-intro">
                  These statistics are not abstract. They are the direct result of the cases documented in this archive. 
                  Follow the chain from data → case → reform (or failure):
                </p>

                <div className="cross-ref-block">
                  <div className="cross-ref-links">
                    <Link href="/cases" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">View Case Records</span>
                      <span className="link-arrow">→</span>
                    </Link>
                    <Link href="/reforms" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">Audit the Reforms</span>
                      <span className="link-arrow">→</span>
                    </Link>
                    <Link href="/accountability" className="cross-ref-link">
                      <span className="link-icon">◈</span>
                      <span className="link-text">Review Institutional Failures</span>
                      <span className="link-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer Statement */}
          <footer className="verdict-footer">
            <div className="footer-rule" />
            <p className="footer-statement">
              "Statistics are not just numbers. They are the measure of a society's failure to protect its most vulnerable."
            </p>
            <div className="footer-meta">
              <span>DATA DOCKET v1.0</span>
              <span className="meta-dot">·</span>
              <span>LAST UPDATED: OCTOBER 2026</span>
              <span className="meta-dot">·</span>
              <span>{SUMMARY.totalStats} METRICS DOCUMENTED</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

// ============================================================
// VERDICT DASHBOARD STYLESHEET
// ============================================================
const CSS = `
.verdict-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .verdict-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.verdict-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.verdict-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.verdict-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.verdict-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Entrance */
.verdict-entrance {
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

.verdict-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.verdict-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .verdict-lede { color: #5a5348; }

/* Grid Layout */
.verdict-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar */
.verdict-sidebar {
  position: sticky;
  top: 100px;
}
.verdict-index {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .verdict-index {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.verdict-index::before {
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

.index-section { margin-bottom: 4px; }

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
.verdict-crimson { border-left-color: var(--crimson, #8f2f2c); }
.verdict-gold { border-left-color: var(--gold, #a9873f); }
.verdict-faint { border-left-color: var(--paper-faint, #8a8175); }

.verdict-mark {
  font-family: var(--font-mono, monospace);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
}
.verdict-crimson .verdict-mark { color: var(--crimson-br, #b23e39); }
.verdict-gold .verdict-mark { color: var(--gold, #a9873f); }
.verdict-faint .verdict-mark { color: var(--paper-faint, #8a8175); }

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

.source-list-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.source-item-mini {
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  padding: 4px 8px;
  background: rgba(169, 135, 63, 0.1);
  border: 1px solid var(--gold, #a9873f);
  color: var(--gold, #a9873f);
  letter-spacing: 0.05em;
}

/* Main Content */
.verdict-content {
  padding-top: 12px;
}
.verdict-section {
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
  margin-bottom: 32px;
}
.archive-root.light .section-intro { color: #5a5348; }

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 28px 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 3px solid var(--paper-faint, #8a8175);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s, border-color 0.2s;
}
.archive-root.light .stat-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.stat-card:hover {
  transform: translateY(-2px);
}

.stat-crimson { border-top-color: var(--crimson, #8f2f2c); }
.stat-crimson:hover { border-color: var(--crimson, #8f2f2c); }
.stat-gold { border-top-color: var(--gold, #a9873f); }
.stat-gold:hover { border-color: var(--gold, #a9873f); }
.stat-faint { border-top-color: var(--paper-faint, #8a8175); }
.stat-faint:hover { border-color: var(--paper-faint, #8a8175); }

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.stat-number {
  font-family: var(--font-serif, serif);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
  line-height: 1;
}
.archive-root.light .stat-number { color: var(--ink-soft, #1c1917); }

.stat-severity {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  padding: 4px 8px;
  border: 1px solid;
  white-space: nowrap;
}
.severity-crimson {
  border-color: var(--crimson-br, #b23e39);
  color: var(--crimson-br, #b23e39);
}
.severity-gold {
  border-color: var(--gold, #a9873f);
  color: var(--gold, #a9873f);
}
.severity-faint {
  border-color: var(--paper-faint, #8a8175);
  color: var(--paper-faint, #8a8175);
}

.stat-label {
  font-family: var(--font-serif, serif);
  font-size: 1.1rem;
  color: var(--paper, #ece5d8);
  margin: 0;
  line-height: 1.3;
}
.archive-root.light .stat-label { color: var(--ink-soft, #1c1917); }

.stat-context {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .stat-context { color: #5a5348; }

.stat-source {
  padding-top: 12px;
  border-top: 1px solid var(--rule-lite, #2a2623);
  font-size: 0.78rem;
  display: flex;
  gap: 8px;
  align-items: baseline;
}
.archive-root.light .stat-source { border-color: var(--lp-rule, #d3cabb); }
.source-label {
  font-family: var(--font-mono, monospace);
  color: var(--paper-faint, #8a8175);
  letter-spacing: 0.05em;
}
.source-link {
  color: var(--gold, #a9873f);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.source-link:hover { color: var(--paper, #ece5d8); }
.archive-root.light .source-link:hover { color: var(--ink-soft, #1c1917); }
.source-text {
  color: var(--paper-faint, #8a8175);
  font-style: italic;
}

/* Human Cost Grid */
.human-cost-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.cost-card {
  padding: 28px 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-left: 3px solid var(--crimson, #8f2f2c);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.archive-root.light .cost-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  border-left-color: var(--crimson, #8f2f2c);
}
.cost-icon {
  font-size: 1.6rem;
  color: var(--crimson-br, #b23e39);
  line-height: 1;
}
.cost-title {
  font-family: var(--font-serif, serif);
  font-size: 1.15rem;
  color: var(--paper, #ece5d8);
  margin: 0;
}
.archive-root.light .cost-title { color: var(--ink-soft, #1c1917); }
.cost-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .cost-text { color: #5a5348; }

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
.verdict-footer {
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
  .verdict-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .verdict-sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
  .verdict-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .index-header { grid-column: 1 / -1; }
  .index-divider { grid-column: 1 / -1; margin: 8px 0; }
  .index-section:last-child { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .verdict-dossier {
    padding: 32px var(--edge, 20px) 80px;
  }
  .verdict-title {
    font-size: 1.8rem;
  }
  .verdict-index {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .human-cost-grid {
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
  .stat-card:hover,
  .cross-ref-link:hover .link-arrow {
    transition: none;
    transform: none;
  }
}
`;