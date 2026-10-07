import Link from 'next/link';
import HeroVisual from '../components/HeroVisual';

// Enhanced with archival "File Codes" for that authentic dossier feel
const ARCHIVE_INDEX = [
  { href: "/cases", code: "IDX-001", tag: "THE ARCHIVE", title: "Case Records", desc: "Search and filter every documented case. Each one opens as its own verified case file." },
  { href: "/nirbhaya", code: "CP-2012", tag: "CENTERPIECE", title: "Nirbhaya Case", desc: "The case that changed India's legal landscape — and what remains unresolved." },
  { href: "/sleeper-bus", code: "CP-2026", tag: "CENTERPIECE · ONGOING", title: "Delhi-NCR Sleeper Bus", desc: "14 years later: why are we still talking about transport safety?" },
  { href: "/timeline", code: "HST-001", tag: "HISTORICAL RECORD", title: "The Reform Timeline", desc: "Tracing the gap between what happened, what was promised, and what actually changed." },
  { href: "/reforms", code: "AUD-001", tag: "ACCOUNTABILITY", title: "Promise vs Reality", desc: "Measuring the implementation of major safety reforms against official data." },
  { href: "/accountability", code: "SYS-001", tag: "SYSTEMIC REVIEW", title: "Institutional Failures", desc: "Nodes of failure across police, transport, government, and courts." },
  { href: "/statistics", code: "DAT-001", tag: "VERIFIED DATA", title: "Statistics Dashboard", desc: "Numbers from official government datasets. Where data is opaque, we state it." },
  { href: "/sources", code: "MTH-001", tag: "METHODOLOGY", title: "Sources & Verification", desc: "Every claim cross-referenced. Fact from analysis, allegation from court finding." },
];

export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      
      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              INDIA • WOMEN • JUSTICE • ACCOUNTABILITY
            </div>
            <h1 className="hero-title">
              “Some cases changed laws.<br />
              <span className="highlight">Did they change reality?</span>”
            </h1>
            <p className="lede">
              India has witnessed cases that shook the nation, exposed institutional failures, changed legislation and forced governments to promise reform.
            </p>
            <p className="lede">
              This archive asks what happened after the headlines disappeared.
            </p>
            <div className="hero-actions">
              <Link href="/cases" className="btn primary">
                EXPLORE THE CASES
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/timeline" className="btn secondary">
                FOLLOW THE TIMELINE
              </Link>
            </div>
            <div className="hero-strip">
              <span>REMEMBER</span>
              <span className="strip-dot">•</span>
              <span>DOCUMENT</span>
              <span className="strip-dot">•</span>
              <span>QUESTION</span>
              <span className="strip-dot">•</span>
              <span>ACCOUNT</span>
            </div>
          </div>
          
          <div className="hero-visual-wrapper">
            <div className="public-record-stamp" aria-hidden="true">PUBLIC RECORD</div>
            <div className="hero-visual">
              <HeroVisual />
            </div>
            <blockquote className="hero-quote">
              “A case can end in court. The questions it leaves behind may not.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* CONTENT WARNING */}
      <div className="warning-section">
        <div className="wrap">
          <div className="warning-box">
            <span className="warning-icon" aria-hidden="true">⚠</span>
            <div className="warning-content">
              <strong>CONTENT WARNING</strong>
              <p>This archive discusses real cases involving sexual violence, murder, child abuse, and other forms of violence against women. Content is presented strictly for education, historical documentation, and institutional accountability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ARCHIVE INDEX (EXPLORE) */}
      <section id="explore" className="explore-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Explore the Archive
            </div>
            <h2>Where would you like to begin?</h2>
            <p>Each section of the archive has its own dedicated dossier. Select a file to proceed.</p>
          </div>
          
          <div className="explore-grid">
            {ARCHIVE_INDEX.map((e, i) => (
              <Link 
                key={e.href} 
                href={e.href} 
                className="explore-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="card-header">
                  <span className="file-code">{e.code}</span>
                  <span className="card-tag">{e.tag}</span>
                </div>
                <h3 className="card-title">{e.title}</h3>
                <p className="card-desc">{e.desc}</p>
                <div className="card-footer">
                  <span className="go-text">OPEN FILE</span>
                  <span className="go-arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINALE */}
      <section className="finale-section">
        <div className="wrap finale-wrap">
          <div className="finale-rule" />
          <div className="finale-content">
            <p>These are not merely cases.</p>
            <p>They were people.</p>
            <p>Some survived.</p>
            <p>Some did not.</p>
            <p>Some cases changed laws.</p>
            <p>Some exposed failures.</p>
            <p>And some questions are still waiting for an answer.</p>
            <p className="final-line">
              REMEMBER.<br />
              DOCUMENT.<br />
              QUESTION.<br />
              DEMAND ACCOUNTABILITY.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// HOMEPAGE STYLESHEET (Serious, Archival, Subtle Effects)
// ============================================================
const CSS = `
/* Base & Utilities */
.wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
  padding: 0 var(--edge, 40px);
}
.eyebrow {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold, #a9873f);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.eyebrow-line {
  width: 22px;
  height: 1px;
  background: var(--gold, #a9873f);
}

/* HERO SECTION */
.hero-section {
  position: relative;
  padding: clamp(80px, 10vw, 140px) 0 100px;
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  overflow: hidden;
}
body.light .hero-section {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(var(--rule, #3c3733) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule, #3c3733) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.15;
  mask-image: radial-gradient(ellipse at 80% 50%, #000 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 80% 50%, #000 20%, transparent 70%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Hero Animations */
@keyframes archive-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-copy > * {
  opacity: 0;
  animation: archive-fade-up 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.hero-eyebrow { animation-delay: 0.1s; }
.hero-title { animation-delay: 0.2s; }
.hero-copy .lede:nth-of-type(1) { animation-delay: 0.3s; }
.hero-copy .lede:nth-of-type(2) { animation-delay: 0.4s; }
.hero-actions { animation-delay: 0.5s; }
.hero-strip { animation-delay: 0.6s; }

.hero-title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 32px;
  letter-spacing: -0.01em;
}
.hero-title .highlight {
  color: var(--crimson-br, #b23e39);
  font-style: italic;
  font-weight: 400;
}

.lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 54ch;
  margin-bottom: 16px;
}
body.light .lede { color: #5a5348; }

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 40px 0 48px;
}

.btn {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 14px 24px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--paper, #ece5d8);
  color: var(--paper, #ece5d8);
}
body.light .btn { border-color: var(--ink-soft, #1c1917); color: var(--ink-soft, #1c1917); }

.btn.primary {
  background: var(--crimson, #8f2f2c);
  border-color: var(--crimson, #8f2f2c);
  color: #fff;
}
.btn.primary:hover {
  background: transparent;
  color: var(--crimson-br, #b23e39);
  border-color: var(--crimson-br, #b23e39);
}
.btn-arrow { transition: transform 0.3s ease; }
.btn.primary:hover .btn-arrow { transform: translateX(4px); }

.btn.secondary:hover {
  background: var(--paper, #ece5d8);
  color: var(--ink, #131110);
}
body.light .btn.secondary:hover {
  background: var(--ink-soft, #1c1917);
  color: var(--lp-paper, #f7f4ec);
}

.hero-strip {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--paper-faint, #8a8175);
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--rule, #3c3733);
}
.strip-dot { color: var(--crimson, #8f2f2c); }

/* Hero Visual & Quote */
.hero-visual-wrapper {
  position: relative;
  opacity: 0;
  animation: archive-fade-up 1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.4s forwards;
}

.public-record-stamp {
  position: absolute;
  top: -20px;
  right: 20px;
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--crimson, #8f2f2c);
  border: 2px solid var(--crimson, #8f2f2c);
  padding: 6px 12px;
  transform: rotate(12deg);
  opacity: 0.6;
  z-index: 2;
  pointer-events: none;
}

.hero-visual {
  border: 1px solid var(--rule, #3c3733);
  background: var(--ink-soft, #1c1917);
  position: relative;
  overflow: hidden;
}
body.light .hero-visual {
  border-color: var(--lp-rule, #d3cabb);
  background: #fff;
}

.hero-quote {
  position: absolute;
  bottom: -30px;
  left: -20px;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--paper-dim, #b9b0a0);
  background: var(--ink, #131110);
  padding: 16px 20px;
  border-left: 3px solid var(--gold, #a9873f);
  max-width: 280px;
  line-height: 1.5;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
body.light .hero-quote {
  color: #5a5348;
  background: var(--lp-paper, #f7f4ec);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

/* WARNING SECTION */
.warning-section {
  background: var(--ink, #131110);
  padding: 0 0 80px;
}
body.light .warning-section { background: var(--lp-paper, #f7f4ec); }

.warning-box {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  border: 1px solid var(--rule, #3c3733);
  border-left: 4px solid var(--crimson, #8f2f2c);
  padding: 24px;
  background: rgba(143, 47, 44, 0.03);
  max-width: 80ch;
  margin: 0 auto;
}
body.light .warning-box {
  border-color: var(--lp-rule, #d3cabb);
  background: rgba(143, 47, 44, 0.04);
}

.warning-icon {
  font-size: 1.4rem;
  color: var(--crimson-br, #b23e39);
  margin-top: 2px;
  flex-shrink: 0;
}

.warning-content strong {
  display: block;
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--crimson-br, #b23e39);
  margin-bottom: 8px;
}

.warning-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0;
}
body.light .warning-content p { color: #5a5348; }

/* EXPLORE SECTION */
.explore-section {
  padding: 100px 0;
  background: var(--ink-soft, #1c1917);
  border-top: 1px solid var(--rule, #3c3733);
}
body.light .explore-section {
  background: var(--lp-paper2, #ece5d8);
  border-top-color: var(--lp-rule, #d3cabb);
}

.section-head {
  margin-bottom: 64px;
  max-width: 60ch;
}
.section-head h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  margin-top: 16px;
  color: var(--paper, #ece5d8);
}
body.light .section-head h2 { color: var(--ink-soft, #1c1917); }
.section-head p {
  margin-top: 16px;
  color: var(--paper-dim, #b9b0a0);
  font-size: 1.05rem;
}
body.light .section-head p { color: #5a5348; }

.explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Archival Card Effects */
.explore-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  background: var(--ink, #131110);
  border: 1px solid var(--rule, #3c3733);
  border-left: 3px solid var(--rule, #3c3733);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: archive-fade-up 0.6s ease-out forwards;
  overflow: hidden;
}
body.light .explore-card {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  border-left-color: var(--lp-rule, #d3cabb);
}

.explore-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(169, 135, 63, 0.05) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.explore-card:hover {
  transform: translateY(-4px);
  border-left-color: var(--crimson, #8f2f2c);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}
body.light .explore-card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

.explore-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.file-code {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--paper-faint, #8a8175);
  background: rgba(138, 129, 117, 0.1);
  padding: 4px 8px;
  border-radius: 2px;
}
body.light .file-code { background: rgba(138, 129, 117, 0.15); }

.card-tag {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold, #a9873f);
}

.card-title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--paper, #ece5d8);
  margin: 0 0 12px 0;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}
body.light .card-title { color: var(--ink-soft, #1c1917); }

.card-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
  margin: 0 0 24px 0;
  flex: 1;
  position: relative;
  z-index: 1;
}
body.light .card-desc { color: #5a5348; }

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}
.explore-card:hover .card-footer {
  color: var(--crimson-br, #b23e39);
}

.go-arrow {
  transition: transform 0.3s ease;
}
.explore-card:hover .go-arrow {
  transform: translateX(6px);
}

/* FINALE SECTION */
.finale-section {
  background: #0a0908;
  padding: 120px 0;
  text-align: center;
}

.finale-wrap {
  max-width: 800px;
}

.finale-rule {
  width: 60px;
  height: 2px;
  background: var(--crimson, #8f2f2c);
  margin: 0 auto 48px;
}

.finale-content p {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: var(--paper-dim, #b9b0a0);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.final-line {
  margin-top: 48px !important;
  font-family: var(--font-mono, monospace) !important;
  font-size: clamp(0.85rem, 1.5vw, 1rem) !important;
  letter-spacing: 0.15em !important;
  color: var(--gold, #a9873f) !important;
  line-height: 2.2 !important;
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero-quote {
    position: relative;
    bottom: auto;
    left: auto;
    margin-top: 24px;
    max-width: 100%;
  }
  .public-record-stamp {
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 640px) {
  .wrap { padding: 0 var(--edge, 20px); }
  .hero-title { font-size: 2rem; }
  .explore-grid { grid-template-columns: 1fr; }
  .warning-box { flex-direction: column; gap: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy > *, .hero-visual-wrapper, .explore-card, .btn-arrow, .go-arrow, .explore-card {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;