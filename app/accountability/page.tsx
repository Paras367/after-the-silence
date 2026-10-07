import type { Metadata } from 'next';
import Link from 'next/link';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'Institutional Accountability | After The Silence Archive',
  description: 'A systemic review identifying the specific nodes of failure across the ecosystem of justice, policing, transport, and governance in India.',
  openGraph: {
    title: 'Institutional Accountability | After The Silence Archive',
    description: 'A systemic review identifying the specific nodes of failure across the ecosystem of justice and safety.',
    type: 'website',
  },
};

// ============================================================
// INSTITUTIONAL DATA
// ============================================================
const INSTITUTIONS = [
  {
    id: 'police',
    icon: '🛡',
    title: 'Law Enforcement & Police',
    description: 'The first point of contact for survivors, yet frequently the site of secondary trauma and procedural obstruction.',
    failures: [
      'Systemic delays and outright refusals in FIR registration, particularly affecting marginalized communities.',
      'High risk of evidence tampering, loss of chain of custody, and mishandling of crime scenes.',
      'Chronic failure to provide mandated victim protection, leading to witness intimidation.',
      'Undue political interference and pressure to downgrade or close high-profile investigations.'
    ]
  },
  {
    id: 'transport',
    icon: '⊞',
    title: 'Transport Authorities',
    description: 'The regulatory bodies responsible for public and interstate transit safety, repeatedly failing to enforce their own mandates.',
    failures: [
      'Mandated in-vehicle CCTV and panic buttons are frequently non-functional, disconnected, or lack monitored feeds.',
      'Lax or nonexistent driver background verification processes for app-based and interstate operators.',
      'Poor interstate jurisdictional coordination, allowing offending vehicles to cross state lines unchecked.',
      'Weak enforcement of operator compliance, with penalties rarely applied despite repeated violations.'
    ]
  },
  {
    id: 'government',
    icon: '◈',
    title: 'Government & Administration',
    description: 'The executive branch responsible for funding, oversight, and legislative action, often characterized by performative rather than substantive reform.',
    failures: [
      'Chronic under-utilization of dedicated safety funds (e.g., the Nirbhaya Fund), with money remaining unspent in state treasuries.',
      'Delayed or diluted legislative action on critical committee reports (e.g., Justice Verma Committee).',
      'Lack of independent, civilian-led oversight mechanisms to investigate state or police failures.',
      'The politicization of survivor narratives, with officials frequently questioning victim credibility before trials conclude.'
    ]
  },
  {
    id: 'courts',
    icon: '§',
    title: 'Judiciary & Courts',
    description: 'The final arbiter of justice, where systemic bottlenecks and archaic practices often deny survivors timely resolution.',
    failures: [
      'Severe trial pendency, with sexual offence cases routinely taking 5 to 10+ years to reach a verdict.',
      'High rates of witness hostility, exacerbated by a lack of robust, enforced witness protection programs.',
      'Inconsistent and often disproportionately lenient sentencing in sexual offence cases by lower courts.',
      'Archaic evidentiary standards that place an undue burden of proof and character scrutiny on survivors.'
    ]
  }
];

const UNANSWERED_QUESTIONS = [
  "Are laws being enforced, or do they exist only as performative gestures on paper?",
  "Are public transport safety rules actually monitored, or are they merely mandated to create an illusion of security?",
  "Are survivors protected during investigations, or are they systematically re-traumatized by the very institutions meant to serve them?",
  "How long do cases take to reach judgment, and who pays the psychological and financial price for the delay?",
  "Who investigates institutional failures when the institution itself is the state?",
  "When a reform is announced with fanfare, who is tasked with auditing its ground-level implementation five years later?"
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AccountabilityPage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="accountability-dossier">
        <div className="accountability-wrap">
          
          {/* Breadcrumb */}
          <nav className="accountability-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Institutional Accountability</span>
          </nav>

          {/* Entrance Header */}
          <div className="accountability-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">◉</span>
              <span className="badge-text">SYSTEMIC REVIEW</span>
            </div>
            <div className="eyebrow">Systemic Review</div>
            <h1 className="accountability-title">Institutional Accountability</h1>
            <p className="accountability-lede">
              Identifying the specific nodes of failure across the ecosystem of justice and safety. 
              When a case fails, it is rarely an isolated incident. It is the predictable result of 
              interconnected institutional breakdowns. This review maps those failure points.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="accountability-grid">
            
            {/* LEFT: Sticky Index */}
            <aside className="accountability-sidebar">
              <div className="accountability-index">
                <div className="index-header">
                  <span className="index-label">REVIEW DOCKET</span>
                  <span className="index-value">SYS-REV-001</span>
                </div>
                <div className="index-divider" />
                
                <div className="index-section">
                  <span className="index-label">INSTITUTIONS AUDITED</span>
                  <nav className="index-nav">
                    {INSTITUTIONS.map((inst) => (
                      <a key={inst.id} href={`#${inst.id}`} className="index-link">
                        <span className="link-icon">{inst.icon}</span>
                        <span className="link-text">{inst.title}</span>
                      </a>
                    ))}
                    <a href="#questions" className="index-link">
                      <span className="link-icon">?</span>
                      <span className="link-text">The Unanswered Questions</span>
                    </a>
                  </nav>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">SCOPE</span>
                  <div className="index-stats">
                    <div className="index-stat">
                      <span className="stat-num">4</span>
                      <span className="stat-label">Core Institutions</span>
                    </div>
                    <div className="index-stat">
                      <span className="stat-num">16</span>
                      <span className="stat-label">Documented Failures</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Main Content */}
            <div className="accountability-content">
              
              {/* Section 01: Institutional Failures */}
              <section className="accountability-section">
                <h2 className="section-heading">
                  <span className="section-num">01</span>
                  <span className="section-title">Nodes of Institutional Failure</span>
                </h2>
                <p className="section-intro">
                  Each institution below represents a critical checkpoint in the journey from incident to justice. 
                  The documented failures represent recurring patterns observed across multiple case files in this archive.
                </p>

                <div className="institutions-grid">
                  {INSTITUTIONS.map((inst) => (
                    <div key={inst.id} id={inst.id} className="institution-panel">
                      <div className="panel-header">
                        <span className="panel-icon">{inst.icon}</span>
                        <h3 className="panel-title">{inst.title}</h3>
                      </div>
                      <p className="panel-description">{inst.description}</p>
                      <ul className="panel-failures">
                        {inst.failures.map((failure, i) => (
                          <li key={i} className="failure-item">
                            <span className="failure-marker">—</span>
                            <span className="failure-text">{failure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 02: The Unanswered Questions */}
              <section id="questions" className="accountability-section">
                <h2 className="section-heading">
                  <span className="section-num">02</span>
                  <span className="section-title">The Questions That Remain</span>
                </h2>
                <p className="section-intro">
                  Data and case files can document what happened. But they also reveal the glaring gaps in our collective 
                  response. These are the questions this archive demands the public and the state answer.
                </p>

                <div className="questions-docket">
                  {UNANSWERED_QUESTIONS.map((q, i) => (
                    <div key={i} className="question-item">
                      <span className="question-num">{String(i + 1).padStart(2, '0')}</span>
                      <p className="question-text">{q}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* Footer Statement */}
          <footer className="accountability-footer">
            <div className="footer-rule" />
            <p className="footer-statement">
              "Accountability is not a destination. It is the continuous, rigorous demand that institutions answer for their failures."
            </p>
            <div className="footer-meta">
              <span>REVIEW DOCKET v1.0</span>
              <span className="meta-dot">·</span>
              <span>LAST UPDATED: OCTOBER 2026</span>
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
// SYSTEMIC REVIEW STYLESHEET
// ============================================================
const CSS = `
.accountability-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .accountability-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.accountability-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.accountability-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.accountability-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.accountability-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Entrance */
.accountability-entrance {
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

.accountability-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.accountability-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .accountability-lede { color: #5a5348; }

/* Grid Layout */
.accountability-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar */
.accountability-sidebar {
  position: sticky;
  top: 100px;
}
.accountability-index {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .accountability-index {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.accountability-index::before {
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

.index-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.index-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  text-decoration: none;
  color: var(--paper-dim, #b9b0a0);
  border-left: 2px solid transparent;
  transition: all 0.2s;
}
.archive-root.light .index-link { color: #5a5348; }
.index-link:hover {
  color: var(--paper, #ece5d8);
  background: rgba(255,255,255,0.03);
  border-left-color: var(--gold, #a9873f);
}
.archive-root.light .index-link:hover {
  color: var(--ink-soft, #1c1917);
  background: rgba(0,0,0,0.03);
}

.link-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}
.link-text {
  font-size: 0.82rem;
  line-height: 1.4;
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
.accountability-content {
  padding-top: 12px;
}
.accountability-section {
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

/* Institutions Grid */
.institutions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.institution-panel {
  padding: 28px 24px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 3px solid var(--crimson, #8f2f2c);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s, border-color 0.2s;
}
.archive-root.light .institution-panel {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}
.institution-panel:hover {
  transform: translateY(-2px);
  border-color: var(--gold, #a9873f);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.panel-icon {
  font-size: 1.4rem;
  line-height: 1;
}
.panel-title {
  font-family: var(--font-serif, serif);
  font-size: 1.2rem;
  color: var(--paper, #ece5d8);
  margin: 0;
}
.archive-root.light .panel-title { color: var(--ink-soft, #1c1917); }

.panel-description {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .panel-description { color: #5a5348; }

.panel-failures {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--rule-lite, #2a2623);
}
.archive-root.light .panel-failures { border-color: var(--lp-rule, #d3cabb); }

.failure-item {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.failure-marker {
  font-family: var(--font-mono, monospace);
  color: var(--crimson-br, #b23e39);
  font-size: 1.1rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}
.failure-text {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .failure-text { color: #4c4638; }

/* Questions Docket */
.questions-docket {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--rule, #3c3733);
  background: var(--ink-soft, #1c1917);
}
.archive-root.light .questions-docket {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}

.question-item {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;
  padding: 24px 28px;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
  align-items: baseline;
  transition: background 0.2s;
}
.archive-root.light .question-item { border-color: var(--lp-rule, #d3cabb); }
.question-item:last-child { border-bottom: none; }
.question-item:hover {
  background: rgba(169, 135, 63, 0.04);
}
.archive-root.light .question-item:hover {
  background: rgba(169, 135, 63, 0.06);
}

.question-num {
  font-family: var(--font-mono, monospace);
  font-size: 1.2rem;
  color: var(--gold, #a9873f);
  font-weight: 600;
  line-height: 1.4;
}
.question-text {
  font-family: var(--font-serif, serif);
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  line-height: 1.5;
  color: var(--paper, #ece5d8);
  margin: 0;
  font-style: italic;
}
.archive-root.light .question-text { color: var(--ink-soft, #1c1917); }

/* Footer */
.accountability-footer {
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
@media (max-width: 1024px) {
  .institutions-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .accountability-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .accountability-sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
  .accountability-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .index-header { grid-column: 1 / -1; }
  .index-divider { grid-column: 1 / -1; margin: 8px 0; }
  .index-section:last-child { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .accountability-dossier {
    padding: 32px var(--edge, 20px) 80px;
  }
  .accountability-title {
    font-size: 1.8rem;
  }
  .accountability-index {
    grid-template-columns: 1fr;
  }
  .question-item {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 20px;
  }
  .question-num {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .meta-dot { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .institution-panel:hover,
  .question-item:hover,
  .index-link {
    transition: none;
    transform: none;
  }
}
`;