import type { Metadata } from 'next';
import { SOURCES } from '../../lib/data';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'Sources & Verification | After The Silence Archive',
  description: 'The complete methodology, evidentiary standards, and primary source documentation for the After The Silence public-interest archive.',
  openGraph: {
    title: 'Sources & Verification | After The Silence Archive',
    description: 'The complete methodology and primary source documentation for the archive.',
    type: 'website',
  },
};

// ============================================================
// CATEGORIZED SOURCES DATA
// ============================================================
type SourceCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sources: { t: string; o: string; note?: string }[];
};

const CATEGORIZED_SOURCES: SourceCategory[] = [
  {
    id: 'court',
    title: 'Supreme Court & High Court Judgments',
    description: 'Primary legal documents establishing precedent, verdicts, and judicial reasoning.',
    icon: '⚖',
    sources: [
      { t: 'Tuka Ram and Anr. v. State of Maharashtra (1979)', o: 'Supreme Court of India', note: 'Mathura custodial case acquittal' },
      { t: 'Vishaka and Ors. v. State of Rajasthan (1997)', o: 'Supreme Court of India', note: 'Workplace harassment guidelines' },
      { t: 'Bilkis Bano v. Union of India & Ors. (2024)', o: 'Supreme Court of India', note: 'Remission order quashed' },
      { t: 'Bobby Art International v. Om Pal Singh Hoon (1996)', o: 'Supreme Court of India', note: 'Phoolan Devi / Bandit Queen case' },
    ],
  },
  {
    id: 'legislation',
    title: 'Acts of Parliament & Legal Amendments',
    description: 'Statutory law enacted in response to documented cases and public pressure.',
    icon: '§',
    sources: [
      { t: 'The Criminal Law (Amendment) Act, 2013', o: 'Ministry of Law and Justice, Govt. of India' },
      { t: 'Protection of Children from Sexual Offences (Amendment) Act, 2019', o: 'Ministry of Law and Justice, Govt. of India' },
      { t: 'Sexual Harassment of Women at Workplace (POSH) Act, 2013', o: 'Ministry of Women and Child Development' },
      { t: 'Report of the Justice J.S. Verma Committee (2013)', o: 'Government of India' },
    ],
  },
  {
    id: 'government',
    title: 'Government Reports & Official Data',
    description: 'Audits, committee reports, and statistical records published by state bodies.',
    icon: '◈',
    sources: [
      { t: 'National Crime Records Bureau — Crime in India (Annual)', o: 'Ministry of Home Affairs, Govt. of India' },
      { t: 'TISS Social Audit Report on Bihar Shelter Homes (2018)', o: 'Tata Institute of Social Sciences' },
      { t: 'CAG Reports on Nirbhaya Fund Utilisation', o: 'Comptroller and Auditor General of India' },
      { t: 'Parliamentary Standing Committee Reports on Women\'s Safety', o: 'Rajya Sabha Secretariat' },
    ],
  },
  {
    id: 'media',
    title: 'Credible Investigative Journalism',
    description: 'Reporting from verified news organizations, used only where primary records are unavailable or developing.',
    icon: '✎',
    sources: [
      { t: 'Reporting on the 2026 Greater Noida–Delhi sleeper bus case', o: 'Contemporary Indian news media', note: 'Status developing — flagged as REPORTED' },
      { t: 'Investigations on transport safety enforcement gaps', o: 'Multiple national dailies', note: 'Cross-referenced with government notifications' },
    ],
  },
];

// ============================================================
// FACT STATUS DEFINITIONS
// ============================================================
const FACT_DEFINITIONS = [
  {
    tag: 'VERIFIED',
    color: 'ok',
    definition: 'Supported by reliable primary documentation — court records, government documents, or official reports. The highest evidentiary standard in this archive.',
  },
  {
    tag: 'COURT FINDING',
    color: 'gold',
    definition: 'Established through a judicial proceeding. Represents the official legal record, regardless of whether the verdict was conviction or acquittal.',
  },
  {
    tag: 'REPORTED',
    color: 'faint',
    definition: 'Reported by credible media outlets but not yet confirmed by a primary legal or government source. Used for developing cases.',
  },
  {
    tag: 'ALLEGED',
    color: 'crimson',
    definition: 'An accusation that has not been established in a judicial process. All cases begin as allegations until proven otherwise.',
  },
  {
    tag: 'DISPUTED',
    color: 'crimson',
    definition: 'Accounts differ, or the matter remains contested — including by those directly involved. The archive presents multiple perspectives.',
  },
  {
    tag: 'ONGOING',
    color: 'faint',
    definition: 'The legal or investigative process is still underway. Information may change as proceedings conclude.',
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SourcesPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="methodology-dossier">
        <div className="methodology-wrap">
          
          {/* Breadcrumb */}
          <nav className="method-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Archive</a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Sources & Verification</span>
          </nav>

          {/* Entrance Header */}
          <div className="method-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">◈</span>
              <span className="badge-text">METHODOLOGY DOCUMENT</span>
            </div>
            <div className="eyebrow">Methodology</div>
            <h1 className="method-title">Sources & Verification</h1>
            <p className="method-lede">
              This archive operates under strict evidentiary standards. Every claim is cross-referenced against 
              primary documentation. We distinguish fact from analysis, allegation from court finding, and 
              verified record from media report. This page documents exactly how we verify, what each tag means, 
              and where our information comes from.
            </p>
          </div>

          {/* Grid Layout: Sidebar + Main Content */}
          <div className="method-grid">
            
            {/* LEFT: Sticky Methodology Index */}
            <aside className="method-sidebar">
              <div className="method-index">
                <div className="index-header">
                  <span className="index-label">DOCUMENT</span>
                  <span className="index-value">METH-001</span>
                </div>
                <div className="index-divider" />
                
                <div className="index-section">
                  <span className="index-label">ON THIS PAGE</span>
                  <nav className="index-nav">
                    <a href="#principles">01 — Editorial Principles</a>
                    <a href="#fact-status">02 — Fact-Status Definitions</a>
                    <a href="#primary-sources">03 — Primary Sources</a>
                    <a href="#corrections">04 — Corrections Protocol</a>
                    <a href="#statistics">05 — Archive Statistics</a>
                  </nav>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">ARCHIVE METRICS</span>
                  <div className="index-stats">
                    <div className="index-stat">
                      <span className="stat-num">4</span>
                      <span className="stat-label">Source Categories</span>
                    </div>
                    <div className="index-stat">
                      <span className="stat-num">14</span>
                      <span className="stat-label">Primary Sources</span>
                    </div>
                    <div className="index-stat">
                      <span className="stat-num">6</span>
                      <span className="stat-label">Fact-Status Tags</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Main Content */}
            <div className="method-content">
              
              {/* 01 — Editorial Principles */}
              <section id="principles" className="method-section">
                <h2 className="section-heading">
                  <span className="section-num">01</span>
                  <span className="section-title">Editorial Principles</span>
                </h2>
                <p className="section-intro">
                  This archive is built on three non-negotiable principles. They govern every entry, every tag, 
                  and every correction.
                </p>

                <div className="principles-grid">
                  <div className="principle-card">
                    <div className="principle-icon">⊡</div>
                    <h3 className="principle-title">Verification First</h3>
                    <p className="principle-text">
                      No entry is published without cross-referencing against at least one primary source — 
                      a court judgment, government report, or official document. Media reports alone are 
                      never sufficient for a VERIFIED tag.
                    </p>
                  </div>
                  <div className="principle-card">
                    <div className="principle-icon">◉</div>
                    <h3 className="principle-title">Transparency Always</h3>
                    <p className="principle-text">
                      When information is disputed, alleged, or developing, we say so explicitly. We never 
                      present uncertainty as fact. Every tag is clickable and defines its own evidentiary status.
                    </p>
                  </div>
                  <div className="principle-card">
                    <div className="principle-icon">⊞</div>
                    <h3 className="principle-title">Accountability to the Record</h3>
                    <p className="principle-text">
                      When court proceedings conclude, when governments release new data, or when errors are 
                      identified, the archive is updated. We publish a corrections protocol and maintain a 
                      public record of changes.
                    </p>
                  </div>
                </div>
              </section>

              {/* 02 — Fact-Status Definitions */}
              <section id="fact-status" className="method-section">
                <h2 className="section-heading">
                  <span className="section-num">02</span>
                  <span className="section-title">Fact-Status Definitions</span>
                </h2>
                <p className="section-intro">
                  Every case file in this archive is tagged with one or more evidentiary markers. These are 
                  not opinions — they are precise legal and editorial classifications.
                </p>

                <div className="fact-definitions">
                  {FACT_DEFINITIONS.map((f) => (
                    <div key={f.tag} className={`fact-def fact-def-${f.color}`}>
                      <span className={`fact-tag tag-${f.color}`}>{f.tag}</span>
                      <p className="fact-text">{f.definition}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 03 — Primary Sources */}
              <section id="primary-sources" className="method-section">
                <h2 className="section-heading">
                  <span className="section-num">03</span>
                  <span className="section-title">Primary Sources</span>
                </h2>
                <p className="section-intro">
                  Sources are organized by category. Each entry notes its origin and, where relevant, 
                  the specific case or legal provision it documents.
                </p>

                <div className="source-categories">
                  {CATEGORIZED_SOURCES.map((cat) => (
                    <div key={cat.id} className="source-category">
                      <div className="category-header">
                        <span className="category-icon">{cat.icon}</span>
                        <div className="category-meta">
                          <h3 className="category-title">{cat.title}</h3>
                          <span className="category-count">{cat.sources.length} sources</span>
                        </div>
                      </div>
                      <p className="category-desc">{cat.description}</p>
                      
                      <div className="category-sources">
                        {cat.sources.map((s, i) => (
                          <div key={i} className="source-entry">
                            <div className="source-row">
                              <span className="source-num">{String(i + 1).padStart(2, '0')}</span>
                              <div className="source-info">
                                <span className="source-title">{s.t}</span>
                                <span className="source-origin">{s.o}</span>
                                {s.note && <span className="source-note">{s.note}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legacy flat list (preserved for compatibility) */}
                <div className="legacy-sources">
                  <div className="legacy-label">Complete Source Index</div>
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

              {/* 04 — Corrections Protocol */}
              <section id="corrections" className="method-section">
                <h2 className="section-heading">
                  <span className="section-num">04</span>
                  <span className="section-title">Corrections & Submissions Protocol</span>
                </h2>
                
                <div className="corrections-block">
                  <p className="corrections-intro">
                    This archive is a living document. If you identify a factual error, have access to a 
                    primary source not yet cited, or can provide verified information about an ongoing case, 
                    we welcome your input under the following conditions:
                  </p>

                  <div className="protocol-steps">
                    <div className="protocol-step">
                      <span className="step-num">01</span>
                      <div className="step-content">
                        <h4>Submit with Evidence</h4>
                        <p>All corrections must be accompanied by a primary source — a court document URL, 
                        government report reference, or official record. Anonymous tips without evidence 
                        cannot be verified.</p>
                      </div>
                    </div>
                    <div className="protocol-step">
                      <span className="step-num">02</span>
                      <div className="step-content">
                        <h4>Editorial Review</h4>
                        <p>Submissions are reviewed against existing records. If the correction is verified, 
                        the entry is updated and the change is logged in our public revision history.</p>
                      </div>
                    </div>
                    <div className="protocol-step">
                      <span className="step-num">03</span>
                      <div className="step-content">
                        <h4>Public Acknowledgment</h4>
                        <p>Contributors who provide verified corrections are acknowledged (with permission) 
                        in the archive's contributor record. We believe in crediting those who strengthen 
                        the public record.</p>
                      </div>
                    </div>
                  </div>

                  <div className="corrections-contact">
                    <span className="contact-label">SUBMISSIONS:</span>
                    <a href="mailto:corrections@afterthesilence.archive" className="contact-link">
                      corrections@afterthesilence.archive
                    </a>
                  </div>
                </div>
              </section>

              {/* 05 — Archive Statistics */}
              <section id="statistics" className="method-section">
                <h2 className="section-heading">
                  <span className="section-num">05</span>
                  <span className="section-title">Archive Statistics</span>
                </h2>
                <p className="section-intro">
                  A transparent accounting of the archive's current scope and evidentiary composition.
                </p>

                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-number">6</span>
                    <span className="stat-label">Documented Cases</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">14</span>
                    <span className="stat-label">Primary Sources Cited</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Source Categories</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Decades Covered</span>
                  </div>
                </div>

                <div className="stats-breakdown">
                  <h4 className="breakdown-title">Evidentiary Composition</h4>
                  <div className="breakdown-row">
                    <span className="breakdown-label">Court-verified entries</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{ width: '66%' }} />
                    </div>
                    <span className="breakdown-value">66%</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-label">Reported (media-sourced)</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill fill-faint" style={{ width: '17%' }} />
                    </div>
                    <span className="breakdown-value">17%</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-label">Ongoing / developing</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill fill-gold" style={{ width: '17%' }} />
                    </div>
                    <span className="breakdown-value">17%</span>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Footer Statement */}
          <footer className="method-footer">
            <div className="footer-rule" />
            <p className="footer-statement">
              "An archive is only as trustworthy as its methodology. We publish ours so you can judge for yourself."
            </p>
            <div className="footer-meta">
              <span>METHODOLOGY VERSION 1.0</span>
              <span className="meta-dot">·</span>
              <span>LAST REVIEWED: OCTOBER 2026</span>
              <span className="meta-dot">·</span>
              <span>MAINTAINED BY THE ARCHIVE TEAM</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

// ============================================================
// METHODOLOGY DOSSIER STYLESHEET
// ============================================================
const CSS = `
.methodology-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .methodology-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.methodology-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.method-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.method-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.method-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Entrance */
.method-entrance {
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

.method-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.method-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .method-lede { color: #5a5348; }

/* Grid Layout */
.method-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar Index */
.method-sidebar {
  position: sticky;
  top: 100px;
}
.method-index {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .method-index {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.method-index::before {
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

.index-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.index-nav a {
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  color: var(--paper-dim, #b9b0a0);
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
  display: block;
}
.archive-root.light .index-nav a { color: #5a5348; }
.index-nav a:hover {
  color: var(--gold, #a9873f);
  padding-left: 4px;
}

.index-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.index-stat {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.stat-num {
  font-family: var(--font-serif, serif);
  font-size: 1.4rem;
  color: var(--paper, #ece5d8);
  font-weight: 600;
}
.archive-root.light .stat-num { color: var(--ink-soft, #1c1917); }
.stat-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: var(--paper-faint, #8a8175);
  letter-spacing: 0.05em;
}

/* Main Content */
.method-content {
  padding-top: 12px;
}

.method-section {
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
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
  margin-bottom: 32px;
}
.archive-root.light .section-intro { color: #5a5348; }

/* Editorial Principles */
.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.principle-card {
  padding: 28px 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 2px solid var(--gold, #a9873f);
  transition: transform 0.2s, border-color 0.2s;
}
.archive-root.light .principle-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.principle-card:hover {
  transform: translateY(-2px);
  border-color: var(--gold, #a9873f);
}
.principle-icon {
  font-size: 1.6rem;
  color: var(--gold, #a9873f);
  margin-bottom: 12px;
  line-height: 1;
}
.principle-title {
  font-family: var(--font-serif, serif);
  font-size: 1.15rem;
  margin-bottom: 10px;
  color: var(--paper, #ece5d8);
}
.archive-root.light .principle-title { color: var(--ink-soft, #1c1917); }
.principle-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .principle-text { color: #5a5348; }

/* Fact Definitions */
.fact-definitions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.fact-def {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 24px;
  padding: 20px 24px;
  background: var(--ink-soft, #1c1917);
  border-left: 3px solid var(--rule, #3c3733);
  align-items: center;
}
.archive-root.light .fact-def { background: #fff; }
.fact-def-ok { border-left-color: var(--ok, #5f7a4f); }
.fact-def-gold { border-left-color: var(--gold, #a9873f); }
.fact-def-faint { border-left-color: var(--paper-faint, #8a8175); }
.fact-def-crimson { border-left-color: var(--crimson-br, #b23e39); }

.fact-tag {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  padding: 6px 12px;
  border: 1px solid;
  text-align: center;
  font-weight: 500;
}
.tag-ok { border-color: var(--ok, #5f7a4f); color: var(--ok, #5f7a4f); }
.tag-gold { border-color: var(--gold, #a9873f); color: var(--gold, #a9873f); }
.tag-faint { border-color: var(--paper-faint, #8a8175); color: var(--paper-faint, #8a8175); }
.tag-crimson { border-color: var(--crimson-br, #b23e39); color: var(--crimson-br, #b23e39); }

.fact-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .fact-text { color: #4c4638; }

/* Source Categories */
.source-categories {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 48px;
}
.source-category {
  padding: 28px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-radius: 2px;
}
.archive-root.light .source-category {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}
.category-icon {
  font-size: 1.8rem;
  color: var(--gold, #a9873f);
  line-height: 1;
  flex-shrink: 0;
}
.category-meta { flex: 1; }
.category-title {
  font-family: var(--font-serif, serif);
  font-size: 1.25rem;
  margin-bottom: 4px;
  color: var(--paper, #ece5d8);
}
.archive-root.light .category-title { color: var(--ink-soft, #1c1917); }
.category-count {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  text-transform: uppercase;
}
.category-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0 0 20px 0;
  padding-left: 44px;
}
.archive-root.light .category-desc { color: #5a5348; }

.category-sources {
  border-top: 1px solid var(--rule-lite, #2a2623);
  padding-top: 16px;
}
.archive-root.light .category-sources { border-color: var(--lp-rule, #d3cabb); }

.source-entry {
  padding: 12px 0;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
}
.archive-root.light .source-entry { border-color: var(--lp-rule, #d3cabb); }
.source-entry:last-child { border-bottom: none; }

.source-row {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  align-items: baseline;
}
.source-num {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  color: var(--gold, #a9873f);
  letter-spacing: 0.05em;
}
.source-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.source-title {
  font-family: var(--font-serif, serif);
  font-size: 1rem;
  color: var(--paper, #ece5d8);
  line-height: 1.4;
}
.archive-root.light .source-title { color: var(--ink-soft, #1c1917); }
.source-origin {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: var(--paper-faint, #8a8175);
  letter-spacing: 0.05em;
}
.source-note {
  font-size: 0.82rem;
  color: var(--paper-dim, #b9b0a0);
  font-style: italic;
  margin-top: 2px;
}
.archive-root.light .source-note { color: #5a5348; }

/* Legacy source list */
.legacy-sources {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px dashed var(--rule, #3c3733);
}
.archive-root.light .legacy-sources { border-color: var(--lp-rule, #d3cabb); }
.legacy-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 16px;
}
.source-list { margin-top: 10px; }
.source-item {
  border-top: 1px solid var(--rule-lite, #2a2623);
  padding: 14px 0;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: baseline;
}
.archive-root.light .source-item { border-color: var(--lp-rule, #d3cabb); }
.source-item:last-child { border-bottom: 1px solid var(--rule-lite, #2a2623); }
.archive-root.light .source-item:last-child { border-color: var(--lp-rule, #d3cabb); }
.source-item .t { font-size: 0.95rem; color: var(--paper, #ece5d8); }
.archive-root.light .source-item .t { color: var(--ink-soft, #1c1917); }
.source-item .o {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  color: var(--paper-faint, #8a8175);
  text-align: right;
}

/* Corrections Protocol */
.corrections-block {
  padding: 32px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-left: 3px solid var(--crimson, #8f2f2c);
  border-radius: 0 4px 4px 0;
}
.archive-root.light .corrections-block {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  border-left-color: var(--crimson, #8f2f2c);
}
.corrections-intro {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
  margin: 0 0 32px 0;
}
.archive-root.light .corrections-intro { color: #5a5348; }

.protocol-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}
.protocol-step {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;
  align-items: start;
}
.step-num {
  font-family: var(--font-mono, monospace);
  font-size: 1.4rem;
  color: var(--gold, #a9873f);
  font-weight: 500;
  line-height: 1;
  padding-top: 4px;
}
.step-content h4 {
  font-family: var(--font-serif, serif);
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--paper, #ece5d8);
}
.archive-root.light .step-content h4 { color: var(--ink-soft, #1c1917); }
.step-content p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .step-content p { color: #5a5348; }

.corrections-contact {
  padding-top: 24px;
  border-top: 1px solid var(--rule-lite, #2a2623);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.archive-root.light .corrections-contact { border-color: var(--lp-rule, #d3cabb); }
.contact-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--paper-faint, #8a8175);
  text-transform: uppercase;
}
.contact-link {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  color: var(--gold, #a9873f);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.contact-link:hover { color: var(--paper, #ece5d8); }
.archive-root.light .contact-link:hover { color: var(--ink-soft, #1c1917); }

/* Archive Statistics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
.stat-card {
  padding: 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 2px solid var(--crimson, #8f2f2c);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.archive-root.light .stat-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.stat-number {
  font-family: var(--font-serif, serif);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
  line-height: 1;
}
.archive-root.light .stat-number { color: var(--ink-soft, #1c1917); }
.stat-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
}

.stats-breakdown {
  padding: 28px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
}
.archive-root.light .stats-breakdown {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.breakdown-title {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold, #a9873f);
  margin: 0 0 20px 0;
}
.breakdown-row {
  display: grid;
  grid-template-columns: 200px 1fr 60px;
  gap: 16px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
}
.archive-root.light .breakdown-row { border-color: var(--lp-rule, #d3cabb); }
.breakdown-row:last-child { border-bottom: none; }
.breakdown-label {
  font-size: 0.88rem;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .breakdown-label { color: #5a5348; }
.breakdown-bar {
  height: 6px;
  background: var(--rule-lite, #2a2623);
  border-radius: 3px;
  overflow: hidden;
}
.archive-root.light .breakdown-bar { background: var(--lp-rule, #d3cabb); }
.breakdown-fill {
  height: 100%;
  background: var(--crimson-br, #b23e39);
  border-radius: 3px;
  transition: width 0.6s ease;
}
.breakdown-fill.fill-faint { background: var(--paper-faint, #8a8175); }
.breakdown-fill.fill-gold { background: var(--gold, #a9873f); }
.breakdown-value {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  color: var(--paper, #ece5d8);
  text-align: right;
  font-weight: 500;
}
.archive-root.light .breakdown-value { color: var(--ink-soft, #1c1917); }

/* Footer */
.method-footer {
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
  .method-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .method-sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
  .fact-def {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .fact-tag {
    justify-self: start;
  }
  .breakdown-row {
    grid-template-columns: 1fr 60px;
    gap: 12px;
  }
  .breakdown-label {
    grid-column: 1 / -1;
  }
  .breakdown-bar {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .methodology-dossier {
    padding: 32px var(--edge, 20px) 80px;
  }
  .method-title {
    font-size: 1.8rem;
  }
  .protocol-step {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .source-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .source-num {
    display: none;
  }
  .category-desc {
    padding-left: 0;
  }
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .meta-dot { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .principle-card:hover,
  .breakdown-fill {
    transition: none;
  }
}
`;