import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <style>{CSS}</style>
      <main className="not-found-dossier">
        <div className="not-found-wrap">
          
          {/* Archival Breadcrumb */}
          <nav className="not-found-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Archive</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">Error 404</span>
          </nav>

          {/* Main Content Grid */}
          <div className="not-found-grid">
            
            {/* Left: Visual / Stamp */}
            <div className="not-found-visual">
              <div className="missing-stamp">
                <span className="stamp-text">RECORD<br />NOT<br />FOUND</span>
              </div>
              <div className="redacted-blocks">
                <span className="redacted-line" style={{ width: '80%' }} />
                <span className="redacted-line" style={{ width: '65%' }} />
                <span className="redacted-line" style={{ width: '90%' }} />
                <span className="redacted-line" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Right: Explanation & Actions */}
            <div className="not-found-content">
              <div className="eyebrow">
                <span className="eyebrow-line" />
                SYSTEMIC ERROR
              </div>
              <h1 className="not-found-title">File Missing or Redacted</h1>
              <p className="not-found-lede">
                The document you are attempting to access does not exist in this archive, 
                has been permanently redacted, or the URL is incorrect.
              </p>
              
              <div className="file-metadata">
                <div className="meta-row">
                  <span className="meta-label">STATUS:</span>
                  <span className="meta-value error">UNRECOVERABLE</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">ERROR CODE:</span>
                  <span className="meta-value">404</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">ACTION REQUIRED:</span>
                  <span className="meta-value">RETURN TO INDEX</span>
                </div>
              </div>

              <div className="not-found-actions">
                <Link href="/" className="btn primary">
                  RETURN TO ARCHIVE INDEX
                </Link>
                <Link href="/cases" className="btn secondary">
                  SEARCH CASE RECORDS
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

// ============================================================
// 404 DOSSIER STYLESHEET
// ============================================================
const CSS = `
.not-found-dossier {
  min-height: 100vh;
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  display: flex;
  align-items: center;
  padding: 120px var(--edge, 40px) 80px;
}
html.light .not-found-dossier {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.not-found-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
  width: 100%;
}

/* Breadcrumb */
.not-found-breadcrumb {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.not-found-breadcrumb a {
  color: var(--gold, #a9873f);
  text-decoration: none;
  transition: opacity 0.2s;
}
.not-found-breadcrumb a:hover { opacity: 0.7; text-decoration: underline; }
.breadcrumb-sep { color: var(--rule, #3c3733); }
.breadcrumb-current { color: var(--paper-dim, #b9b0a0); }

/* Grid Layout */
.not-found-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 80px;
  align-items: center;
}

/* Left: Visual / Stamp */
.not-found-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border: 1px dashed var(--rule, #3c3733);
  padding: 40px;
  background: rgba(19, 17, 16, 0.5);
}
html.light .not-found-visual {
  border-color: var(--lp-rule, #d3cabb);
  background: rgba(247, 244, 236, 0.5);
}

.missing-stamp {
  border: 4px solid var(--crimson, #8f2f2c);
  color: var(--crimson, #8f2f2c);
  font-family: var(--font-mono, monospace);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 16px 24px;
  transform: rotate(-12deg);
  opacity: 0.8;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.1;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
}

.redacted-blocks {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 280px;
  opacity: 0.6;
}

.redacted-line {
  height: 14px;
  background: var(--paper-faint, #8a8175);
  border-radius: 2px;
}
html.light .redacted-line { background: #d3cabb; }

/* Right: Content */
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

.not-found-title {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
  color: var(--paper, #ece5d8);
}
html.light .not-found-title { color: var(--ink-soft, #1c1917); }

.not-found-lede {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 50ch;
  margin-bottom: 48px;
}
html.light .not-found-lede { color: #5a5348; }

/* Metadata Block */
.file-metadata {
  border: 1px solid var(--rule, #3c3733);
  background: var(--ink-soft, #1c1917);
  padding: 24px;
  margin-bottom: 40px;
  max-width: 400px;
}
html.light .file-metadata {
  border-color: var(--lp-rule, #d3cabb);
  background: #fff;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule-lite, #2a2623);
}
html.light .meta-row { border-bottom-color: var(--lp-rule, #d3cabb); }
.meta-row:last-child { border-bottom: none; }

.meta-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--paper-faint, #8a8175);
}

.meta-value {
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
}
html.light .meta-value { color: var(--ink-soft, #1c1917); }
.meta-value.error { color: var(--crimson-br, #b23e39); }

/* Actions */
.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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
}

.btn.primary {
  background: var(--crimson, #8f2f2c);
  border: 1px solid var(--crimson, #8f2f2c);
  color: #fff;
}
.btn.primary:hover {
  background: transparent;
  color: var(--crimson-br, #b23e39);
  border-color: var(--crimson-br, #b23e39);
}

.btn.secondary {
  border: 1px solid var(--paper, #ece5d8);
  color: var(--paper, #ece5d8);
  background: transparent;
}
html.light .btn.secondary {
  border-color: var(--ink-soft, #1c1917);
  color: var(--ink-soft, #1c1917);
}
.btn.secondary:hover {
  background: var(--paper, #ece5d8);
  color: var(--ink, #131110);
}
html.light .btn.secondary:hover {
  background: var(--ink-soft, #1c1917);
  color: var(--lp-paper, #f7f4ec);
}

/* Responsive */
@media (max-width: 900px) {
  .not-found-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .not-found-visual {
    min-height: 200px;
    order: -1;
  }
  .file-metadata {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .not-found-dossier {
    padding: 100px var(--edge, 20px) 60px;
  }
  .not-found-actions {
    flex-direction: column;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
  .missing-stamp {
    font-size: 1.4rem;
  }
}
`;