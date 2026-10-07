import type { Metadata } from 'next';
import Link from 'next/link';
import { TIMELINE } from '../../lib/data';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'The Reform Timeline | After The Silence Archive',
  description: 'A chronological record of major cases, the reforms they triggered, and the gap between what was promised and what actually changed.',
  openGraph: {
    title: 'The Reform Timeline | After The Silence Archive',
    description: 'A chronological record of major cases, the reforms they triggered, and the gap between what was promised and what actually changed.',
    type: 'website',
  },
};

// ============================================================
// COMPUTED TIMELINE METRICS
// ============================================================
const FIRST_YEAR = TIMELINE[0]?.year || '1972';
const LAST_YEAR = TIMELINE[TIMELINE.length - 1]?.year || '2026';
const TOTAL_EVENTS = TIMELINE.length;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TimelinePage() {
  return (
    <>
      <style>{CSS}</style>
      <section className="timeline-dossier">
        <div className="timeline-wrap">
          
          {/* Breadcrumb */}
          <nav className="timeline-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Reform Timeline</span>
          </nav>

          {/* Entrance Header */}
          <div className="timeline-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">◷</span>
              <span className="badge-text">CHRONOLOGICAL RECORD</span>
            </div>
            <div className="eyebrow">Historical Record</div>
            <h1 className="timeline-title">The Reform Timeline</h1>
            <p className="timeline-lede">
              Tracing the gap between what happened, what was promised, and what actually changed. 
              This timeline documents the causal chain from tragedy to legislative action, and the 
              ongoing struggle to turn paper promises into ground-level reality.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="timeline-grid">
            
            {/* LEFT: Sticky Timeline Index */}
            <aside className="timeline-sidebar">
              <div className="timeline-index">
                <div className="index-header">
                  <span className="index-label">TIMELINE SCOPE</span>
                  <span className="index-value">{FIRST_YEAR} — {LAST_YEAR}</span>
                </div>
                <div className="index-divider" />
                
                <div className="index-section">
                  <span className="index-label">QUICK JUMP</span>
                  <nav className="index-nav">
                    {TIMELINE.map((t, i) => (
                      <a key={i} href={`#event-${i}`} className="index-link">
                        <span className="link-year">{t.year}</span>
                        <span className="link-title">{t.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="index-divider" />

                <div className="index-section">
                  <span className="index-label">ARCHIVE METRICS</span>
                  <div className="index-stats">
                    <div className="index-stat">
                      <span className="stat-num">{TOTAL_EVENTS}</span>
                      <span className="stat-label">Major Events</span>
                    </div>
                    <div className="index-stat">
                      <span className="stat-num">5</span>
                      <span className="stat-label">Decades Covered</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT: Main Timeline Content */}
            <div className="timeline-content">
              <div className="timeline-track">
                {TIMELINE.map((t, i) => (
                  <div key={i} id={`event-${i}`} className="timeline-node">
                    <div className="node-marker">
                      <span className="node-year">{t.year}</span>
                      <span className="node-dot" />
                      {i < TIMELINE.length - 1 && <span className="node-line" />}
                    </div>
                    <div className="node-content">
                      <h3 className="node-title">{t.title}</h3>
                      <div className="node-grid">
                        <div className="node-card card-happened">
                          <span className="card-label">What Happened</span>
                          <p>{t.what}</p>
                        </div>
                        <div className="node-card card-promised">
                          <span className="card-label">What Was Promised</span>
                          <p>{t.promise}</p>
                        </div>
                        <div className="node-card card-changed">
                          <span className="card-label">What Changed</span>
                          <p>{t.changed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Statement */}
          <footer className="timeline-footer">
            <div className="footer-rule" />
            <p className="footer-statement">
              "History is not just what happened. It is what we choose to remember, what we promise to fix, and what we actually fix."
            </p>
            <div className="footer-meta">
              <span>TIMELINE VERSION 1.0</span>
              <span className="meta-dot">·</span>
              <span>LAST UPDATED: OCTOBER 2026</span>
              <span className="meta-dot">·</span>
              <span>{TOTAL_EVENTS} EVENTS DOCUMENTED</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

// ============================================================
// CHRONOLOGICAL RECORD STYLESHEET
// ============================================================
const CSS = `
.timeline-dossier {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .timeline-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.timeline-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Breadcrumb */
.timeline-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.timeline-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.timeline-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Entrance */
.timeline-entrance {
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

.timeline-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.timeline-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 70ch;
}
.archive-root.light .timeline-lede { color: #5a5348; }

/* Grid Layout */
.timeline-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* Sidebar */
.timeline-sidebar {
  position: sticky;
  top: 100px;
}
.timeline-index {
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  padding: 24px;
  position: relative;
}
.archive-root.light .timeline-index {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.timeline-index::before {
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
  align-items: baseline;
  gap: 12px;
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

.link-year {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  color: var(--gold, #a9873f);
  min-width: 36px;
}
.link-title {
  font-size: 0.82rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
.timeline-content {
  padding-top: 12px;
}
.timeline-track {
  position: relative;
  padding-left: 20px;
}

/* Timeline Node */
.timeline-node {
  display: flex;
  gap: 32px;
  margin-bottom: 64px;
  scroll-margin-top: 100px; /* Prevents sticky header from covering the node on jump */
}
.timeline-node:last-child { margin-bottom: 0; }

.node-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: 60px;
}
.node-year {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gold, #a9873f);
  background: var(--ink, #131110);
  padding: 4px 8px;
  border: 1px solid var(--rule, #3c3733);
  z-index: 2;
  margin-bottom: 12px;
}
.archive-root.light .node-year {
  background: var(--lp-paper, #f7f4ec);
  border-color: var(--lp-rule, #d3cabb);
}

.node-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--crimson, #8f2f2c);
  border: 3px solid var(--ink, #131110);
  z-index: 2;
  flex-shrink: 0;
}
.archive-root.light .node-dot { border-color: var(--lp-paper, #f7f4ec); }

.node-line {
  position: absolute;
  top: 32px;
  bottom: -64px;
  left: 50%;
  width: 2px;
  background: var(--rule, #3c3733);
  transform: translateX(-50%);
  z-index: 1;
}
.archive-root.light .node-line { background: var(--lp-rule, #d3cabb); }

/* Node Content */
.node-content {
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
}
.node-title {
  font-family: var(--font-serif, serif);
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  color: var(--paper, #ece5d8);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule, #3c3733);
}
.archive-root.light .node-title { color: var(--ink-soft, #1c1917); border-color: var(--lp-rule, #d3cabb); }

.node-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.node-card {
  padding: 20px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-top: 3px solid var(--paper-faint, #8a8175);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.archive-root.light .node-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
}

/* Color-coded top borders for semantic meaning */
.card-happened { border-top-color: var(--crimson, #8f2f2c); }
.card-promised { border-top-color: var(--gold, #a9873f); }
.card-changed { border-top-color: var(--ok, #5f7a4f); }

.card-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
  font-weight: 600;
}
.archive-root.light .card-label { color: #78716c; }

.node-card p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
.archive-root.light .node-card p { color: #4c4638; }

/* Footer */
.timeline-footer {
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
  .node-grid {
    grid-template-columns: 1fr 1fr;
  }
  .card-happened {
    grid-column: 1 / -1; /* Spans full width on tablet */
  }
}

@media (max-width: 900px) {
  .timeline-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .timeline-sidebar {
    position: relative;
    top: 0;
    order: -1;
  }
  .timeline-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .index-header { grid-column: 1 / -1; }
  .index-divider { grid-column: 1 / -1; margin: 8px 0; }
  .index-section:last-child { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .timeline-dossier {
    padding: 32px var(--edge, 20px) 80px;
  }
  .timeline-title {
    font-size: 1.8rem;
  }
  .timeline-index {
    grid-template-columns: 1fr;
  }
  .timeline-node {
    flex-direction: column;
    gap: 16px;
    padding-left: 24px;
    border-left: 2px solid var(--rule, #3c3733);
  }
  .archive-root.light .timeline-node { border-left-color: var(--lp-rule, #d3cabb); }
  
  .node-marker {
    flex-direction: row;
    width: auto;
    margin-left: -38px; /* Pulls marker onto the border line */
    margin-bottom: 0;
  }
  .node-year {
    margin-bottom: 0;
    margin-right: 12px;
    border: none;
    background: transparent;
    padding: 0;
  }
  .node-line { display: none; }
  
  .node-grid {
    grid-template-columns: 1fr;
  }
  .card-happened { grid-column: auto; }
  
  .footer-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .meta-dot { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .index-link { transition: none; }
}
`;