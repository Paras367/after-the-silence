import type { Metadata } from 'next';
import PageHead from '../../components/PageHead';
import CaseExplorer from '../../components/CaseExplorer';

// ============================================================
// METADATA CONFIGURATION
// ============================================================
export const metadata: Metadata = {
  title: 'Case Records | After The Silence Archive',
  description: 'Browse the complete archive of documented cases involving violence against women in India. Each entry includes verified facts, institutional responses, and legal outcomes.',
  openGraph: {
    title: 'Case Records | After The Silence Archive',
    description: 'Browse the complete archive of documented cases involving violence against women in India.',
    type: 'website',
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CasesPage() {
  return (
    <>
      <style>{CSS}</style>
      <section id="archive" className="archive-research-room">
        <div className="research-wrap">
          
          {/* Archive Entrance Header */}
          <div className="archive-entrance">
            <div className="entrance-badge">
              <span className="badge-icon">◈</span>
              <span className="badge-text">PUBLIC INTEREST ARCHIVE</span>
            </div>
            
            <PageHead 
              eyebrow="The Archive" 
              title="Case Records"
            >
              Every entry is tagged with its evidentiary status. Hover over tags for definitions. 
              Click a case to open its full file. This archive documents cases from 1972 to present, 
              tracking institutional responses, legal outcomes, and what remains unresolved.
            </PageHead>

            {/* Archive Statistics Bar */}
            <div className="archive-stats">
              <div className="stat-item">
                <span className="stat-label">TOTAL FILES</span>
                <span className="stat-value">6</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-label">DECADES COVERED</span>
                <span className="stat-value">5</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-label">LEGAL LANDMARKS</span>
                <span className="stat-value">2</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-label">ONGOING CASES</span>
                <span className="stat-value">2</span>
              </div>
            </div>
          </div>

          {/* Research Interface Instructions */}
          <div className="research-instructions">
            <div className="instruction-block">
              <span className="instruction-icon">⊞</span>
              <div className="instruction-text">
                <strong>How to use this archive:</strong> Use the search bar and filters below to locate specific cases 
                by year, location, type, or legal status. Each case card opens a complete dossier with verified facts, 
                institutional responses, and current status.
              </div>
            </div>
            <div className="instruction-block">
              <span className="instruction-icon">◉</span>
              <div className="instruction-text">
                <strong>Evidentiary standards:</strong> All entries are cross-referenced against court records, 
                government reports, and credible journalism. Tags indicate whether information is verified, 
                alleged, disputed, or established through judicial proceedings.
              </div>
            </div>
          </div>

          {/* Case Explorer Component */}
          <div className="explorer-container">
            <CaseExplorer />
          </div>

          {/* Archive Footer Note */}
          <footer className="archive-footnote">
            <div className="footnote-rule" />
            <p className="footnote-text">
              This archive is continuously updated as new information becomes available and legal proceedings conclude. 
              If you have verified information about any case that is not yet documented here, please consult our{' '}
              <a href="/sources" className="footnote-link">Sources & Verification</a> page for submission guidelines.
            </p>
            <div className="footnote-meta">
              <span className="meta-item">LAST UPDATED: October 2026</span>
              <span className="meta-divider">·</span>
              <span className="meta-item">MAINTAINED BY: After The Silence Archive Team</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
}

// ============================================================
// ARCHIVAL RESEARCH ROOM STYLESHEET
// ============================================================
const CSS = `
.archive-research-room {
  background: var(--ink, #131110);
  color: var(--paper, #ece5d8);
  min-height: 100vh;
  padding: 60px var(--edge, 40px) 120px;
}
.archive-root.light .archive-research-room {
  background: var(--lp-paper, #f7f4ec);
  color: var(--ink-soft, #1c1917);
}

.research-wrap {
  max-width: var(--max, 1180px);
  margin: 0 auto;
}

/* Archive Entrance */
.archive-entrance {
  margin-bottom: 64px;
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
.badge-icon {
  font-size: 0.9rem;
  line-height: 1;
}
.badge-text {
  font-weight: 600;
}

/* Archive Statistics Bar */
.archive-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--rule, #3c3733);
  border-bottom: 1px solid var(--rule, #3c3733);
  margin-top: 40px;
  flex-wrap: wrap;
}
.archive-root.light .archive-stats {
  border-color: var(--lp-rule, #d3cabb);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint, #8a8175);
}
.stat-value {
  font-family: var(--font-serif, serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--paper, #ece5d8);
  line-height: 1;
}
.archive-root.light .stat-value {
  color: var(--ink-soft, #1c1917);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--rule, #3c3733);
}
.archive-root.light .stat-divider {
  background: var(--lp-rule, #d3cabb);
}

/* Research Instructions */
.research-instructions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
  padding: 32px;
  background: var(--ink-soft, #1c1917);
  border: 1px solid var(--rule, #3c3733);
  border-radius: 4px;
}
.archive-root.light .research-instructions {
  background: #fff;
  border-color: var(--lp-rule, #d3cabb);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.instruction-block {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.instruction-icon {
  font-size: 1.4rem;
  color: var(--gold, #a9873f);
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}
.instruction-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--paper-dim, #b9b0a0);
}
.archive-root.light .instruction-text {
  color: #5a5348;
}
.instruction-text strong {
  color: var(--paper, #ece5d8);
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}
.archive-root.light .instruction-text strong {
  color: var(--ink-soft, #1c1917);
}

/* Explorer Container */
.explorer-container {
  margin-bottom: 80px;
}

/* Archive Footer Note */
.archive-footnote {
  margin-top: 80px;
}
.footnote-rule {
  height: 1px;
  background: var(--rule, #3c3733);
  margin-bottom: 24px;
}
.archive-root.light .footnote-rule {
  background: var(--lp-rule, #d3cabb);
}

.footnote-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--paper-dim, #b9b0a0);
  max-width: 80ch;
  margin-bottom: 16px;
}
.archive-root.light .footnote-text {
  color: #5a5348;
}

.footnote-link {
  color: var(--gold, #a9873f);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.footnote-link:hover {
  color: var(--paper, #ece5d8);
}
.archive-root.light .footnote-link:hover {
  color: var(--ink-soft, #1c1917);
}

.footnote-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--paper-faint, #8a8175);
  text-transform: uppercase;
}
.meta-divider {
  color: var(--rule, #3c3733);
}
.archive-root.light .meta-divider {
  color: var(--lp-rule, #d3cabb);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .archive-research-room {
    padding: 40px var(--edge, 20px) 80px;
  }
  
  .archive-stats {
    gap: 16px;
    padding: 20px 0;
  }
  
  .stat-item {
    flex: 1;
    min-width: 120px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .research-instructions {
    grid-template-columns: 1fr;
    padding: 24px;
  }
  
  .footnote-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .meta-divider {
    display: none;
  }
}

@media (max-width: 480px) {
  .archive-stats {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 20px;
  }
  
  .stat-item {
    min-width: 0;
  }
  
  .instruction-block {
    flex-direction: column;
    gap: 12px;
  }
  
  .instruction-icon {
    font-size: 1.2rem;
  }
}
`;