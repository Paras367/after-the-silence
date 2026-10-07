import Link from 'next/link';
import HeroVisual from '../components/HeroVisual';

const EXPLORE = [
  { href: "/nirbhaya", tag: "CENTERPIECE · 2012", title: "Nirbhaya", desc: "The case that changed India's legal landscape — and what remains unresolved." },
  { href: "/sleeper-bus", tag: "CENTERPIECE · 2026 · ONGOING", title: "Delhi-NCR Sleeper Bus Case", desc: "14 years later: why are we still talking about buses?" },
  { href: "/cases", tag: "THE ARCHIVE", title: "Case Records", desc: "Search and filter every documented case. Each one opens as its own case file." },
  { href: "/timeline", tag: "HISTORICAL RECORD", title: "The Reform Timeline", desc: "What happened, what was promised, and what actually changed." },
  { href: "/reforms", tag: "ACCOUNTABILITY DASHBOARD", title: "Promise vs Reality", desc: "Measuring the implementation of major safety reforms." },
  { href: "/accountability", tag: "SYSTEMIC REVIEW", title: "Institutional Accountability", desc: "Nodes of failure across police, transport, government and courts — and the questions that remain." },
  { href: "/statistics", tag: "VERIFIED DATA", title: "Statistics Dashboard", desc: "Numbers from official government datasets. Where data is opaque, we say so." },
  { href: "/sources", tag: "METHODOLOGY", title: "Sources & Verification", desc: "Every claim cross-referenced. Fact from analysis, allegation from court finding." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">INDIA • WOMEN • JUSTICE • ACCOUNTABILITY</div>
            <h1>“Some cases changed laws. Did they change reality?”</h1>
            <p className="lede">India has witnessed cases that shook the nation, exposed institutional failures, changed legislation and forced governments to promise reform.</p>
            <p className="lede">This archive asks what happened after the headlines disappeared.</p>
            <div className="hero-actions">
              <Link href="/cases" className="btn primary">EXPLORE THE CASES</Link>
              <Link href="/timeline" className="btn">FOLLOW THE TIMELINE</Link>
            </div>
            <div className="hero-strip">
              <span>REMEMBER</span><span>DOCUMENT</span><span>QUESTION</span><span>ACCOUNT</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="false">
            <HeroVisual />
            <p className="hero-quote">“A case can end in court. The questions it leaves behind may not.”</p>
          </div>
        </div>
      </section>

      {/* CONTENT WARNING */}
      <div className="warning">
        <div className="wrap">
          <div className="box">
            <strong>CONTENT WARNING:</strong> This archive discusses real cases involving sexual violence, murder, child abuse and other forms of violence against women. Content is presented strictly for education, historical documentation and institutional accountability.
          </div>
        </div>
      </div>

      {/* EXPLORE — har section ka apna page */}
      <section id="explore" className="on-rule">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Explore the Archive</div>
            <h2>Where would you like to begin?</h2>
            <p>Each section of the archive has its own page.</p>
          </div>
          <div className="explore-grid">
            {EXPLORE.map(e => (
              <Link key={e.href} href={e.href} className="explore-card">
                <span className="tagline">{e.tag}</span>
                <span className="etitle">{e.title}</span>
                <span className="edesc">{e.desc}</span>
                <span className="go">OPEN →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINALE */}
      <section className="finale">
        <div className="wrap">
          <p>These are not merely cases.</p>
          <p>They were people.</p>
          <p>Some survived.</p>
          <p>Some did not.</p>
          <p>Some cases changed laws.</p>
          <p>Some exposed failures.</p>
          <p>And some questions are still waiting for an answer.</p>
          <p className="final-line">REMEMBER.<br />DOCUMENT.<br />QUESTION.<br />DEMAND ACCOUNTABILITY.</p>
        </div>
      </section>
    </>
  );
}
