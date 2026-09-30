import Link from 'next/link';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';



const serif = Fraunces({ subsets: ['latin'], variable: '--ats-serif', display: 'swap' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--ats-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--ats-mono', display: 'swap' });

type Status = 'Legal landmark' | 'Convicted' | 'Concluded' | 'Trial' | 'Ongoing';

type Entry = {
  slug: string;
  year: string;
  title: string;
  place: string;
  category: string;
  status: Status;
  summary: string;
};

// Sirf chuni hui entries — poora record /cases par hai.
const ENTRIES: Entry[] = [
  {
    slug: 'mathura-1972',
    year: '1972',
    title: 'Mathura Custodial Case',
    place: 'Chandrapur, Maharashtra',
    category: 'Custodial violence',
    status: 'Legal landmark',
    summary: 'A 1979 Supreme Court judgment drew wide criticism and set off the modern movement for reform of rape law.',
  },
  {
    slug: 'phoolan-devi',
    year: '1981',
    title: 'Phoolan Devi',
    place: 'Uttar Pradesh',
    category: 'Sexual violence · Biography',
    status: 'Legal landmark',
    summary: 'A life shaped by violence and institutional failure, and a story still contested between record and portrayal.',
  },
  {
    slug: 'bhanwari-devi-1992',
    year: '1992',
    title: 'Bhanwari Devi Case',
    place: 'Bhateri, Rajasthan',
    category: 'Sexual violence',
    status: 'Legal landmark',
    summary: 'A state social worker’s case led directly to the 1997 Vishaka Guidelines on workplace harassment.',
  },
  {
    slug: 'nirbhaya-2012',
    year: '2012',
    title: 'Nirbhaya Case',
    place: 'New Delhi',
    category: 'Sexual violence',
    status: 'Convicted',
    summary: 'Nationwide protests led to the Verma Committee and the Criminal Law (Amendment) Act, 2013.',
  },
  {
    slug: 'unnao-2017',
    year: '2017',
    title: 'Unnao Case',
    place: 'Unnao, Uttar Pradesh',
    category: 'Sexual violence · Power',
    status: 'Convicted',
    summary: 'A case against a sitting legislator that moved only after Supreme Court intervention.',
  },
  {
    slug: 'hathras-2020',
    year: '2020',
    title: 'Hathras Case',
    place: 'Hathras, Uttar Pradesh',
    category: 'Sexual violence · Caste',
    status: 'Trial',
    summary: 'A contested night-time cremation raised sharp questions about caste, policing and state conduct.',
  },
  {
    slug: 'rgkar-2024',
    year: '2024',
    title: 'RG Kar Medical College Case',
    place: 'Kolkata, West Bengal',
    category: 'Workplace safety',
    status: 'Convicted',
    summary: 'The death of a trainee doctor on duty prompted nationwide protests over hospital safety.',
  },
  {
    slug: 'sleeper-bus-2026',
    year: '2026',
    title: 'Delhi-NCR Sleeper Bus Case',
    place: 'Greater Noida to Delhi',
    category: 'Transport safety',
    status: 'Ongoing',
    summary: 'A developing case involving a minor. No identifying details are published; all matters remain alleged.',
  },
];

const DOORS: { href: string; label: string; note: string }[] = [
  { href: '/cases', label: 'Case Records', note: 'Every case, tagged by evidentiary status.' },
  { href: '/timeline', label: 'Reform Timeline', note: 'What happened, what was promised, what changed.' },
  { href: '/reforms', label: 'Promise vs Reality', note: 'How major reforms were actually implemented.' },
  { href: '/accountability', label: 'Accountability', note: 'Police, transport, government, courts.' },
  { href: '/memorial', label: 'Who Was She?', note: 'The people behind the headlines.' },
  { href: '/sources', label: 'Sources', note: 'Judgments, Acts and official reports.' },
];

const AXIS = ['1972', '1992', '2012', '2020', '2026'];

export default function Home() {
  return (
    <main className={`ats ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <style>{CSS}</style>

      {/* ============ HERO ============ */}
      <section className="ats-hero">
        <div className="ats-grid-bg" aria-hidden="true" />
        <div className="ats-glow" aria-hidden="true" />

        <div className="ats-wrap">
          <div className="ats-eyebrow">
            <span>India · Women · Justice</span>
            <i aria-hidden="true">अभिलेखागार</i>
          </div>

          <h1 className="ats-h1">
            Some cases changed laws.
            <br />
            <em>Did they change reality?</em>
          </h1>

          <p className="ats-lede">
            A small, independent archive documenting notable cases of crime and harassment against women in India, from 1972 to
            today. Factual, non-graphic, and sourced. Built to remember, not to sensationalise.
          </p>

          <div className="ats-actions">
            <Link href="/cases" className="ats-btn ats-btn-primary">Explore the cases</Link>
            <Link href="/timeline" className="ats-btn">Follow the timeline</Link>
          </div>

          {/* Subtle decade axis — visual storytelling */}
          <div className="ats-axis" aria-hidden="true">
            <div className="ats-axis-line" />
            {AXIS.map((y, i) => (
              <div key={y} className="ats-axis-node" style={{ left: `${(i / (AXIS.length - 1)) * 100}%`, animationDelay: `${0.6 + i * 0.18}s` }}>
                <b />
                <span>{y}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTENT NOTE ============ */}
      <div className="ats-wrap">
        <aside className="ats-note" role="note">
          <strong>Content note</strong>
          <p>
            This archive deals with real cases of violence against women. Entries are written in a restrained, non-graphic way, and
            the identities of minors and protected survivors are never published.
          </p>
        </aside>
      </div>

      {/* ============ SELECTED ENTRIES ============ */}
      <section className="ats-section">
        <div className="ats-wrap">
          <header className="ats-head">
            <div className="ats-eyebrow"><span>Selected entries</span></div>
            <h2>Eight cases, five decades</h2>
            <p>A short selection. Each entry opens into a full file with the investigation, court process and what changed.</p>
          </header>

          <ol className="ats-list">
            {ENTRIES.map((e, i) => (
              <li key={e.slug} className="ats-item" style={{ ['--i' as string]: i }}>
                <div className="ats-year">
                  <span>{e.year}</span>
                </div>
                <Link href={`/cases/${e.slug}`} className="ats-card">
                  <div className="ats-card-top">
                    <span className="ats-cat">{e.category}</span>
                    <span className={`ats-pill ats-pill-${e.status.split(' ')[0].toLowerCase()}`}>{e.status}</span>
                  </div>
                  <h3>{e.title}</h3>
                  <p className="ats-place">{e.place}</p>
                  <p className="ats-sum">{e.summary}</p>
                  <span className="ats-open">Open case file <i aria-hidden="true">→</i></span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="ats-more">
            <Link href="/cases" className="ats-btn">View all case records →</Link>
          </div>
        </div>
      </section>

      {/* ============ QUOTE BREAK ============ */}
      <section className="ats-break">
        <div className="ats-wrap">
          <p>A case can end in court. The questions it leaves behind may not.</p>
        </div>
      </section>

      {/* ============ DOORS ============ */}
      <section className="ats-section">
        <div className="ats-wrap">
          <header className="ats-head">
            <div className="ats-eyebrow"><span>Go deeper</span></div>
            <h2>Explore the archive</h2>
          </header>

          <div className="ats-doors">
            {DOORS.map((d, i) => (
              <Link key={d.href} href={d.href} className="ats-door">
                <span className="ats-door-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.label}</h3>
                <p>{d.note}</p>
                <span className="ats-door-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ METHOD ============ */}
      <section className="ats-method">
        <div className="ats-wrap ats-method-in">
          <div>
            <div className="ats-eyebrow"><span>How we record</span></div>
            <p className="ats-method-txt">
              Every entry separates <b>court findings</b> from <b>allegations</b> and <b>reports</b>. Where records differ or are still
              developing, we say so.
            </p>
          </div>
          <Link href="/sources" className="ats-btn">Sources &amp; verification</Link>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
const CSS = `
.ats{
  --ink:#131110; --ink2:#1c1917; --paper:#ece5d8; --dim:#b9b0a0; --faint:#8a8175;
  --crimson:#8f2f2c; --crimson-br:#b23e39; --gold:#a9873f; --rule:#3c3733; --rule2:#2a2623; --ok:#5f7a4f;
  --max:1120px; --edge:clamp(20px,5vw,56px);
  background:var(--ink); color:var(--paper); font-family:var(--ats-sans),system-ui,sans-serif;
  line-height:1.6; -webkit-font-smoothing:antialiased; overflow-x:clip;
}
.ats *,.ats *::before,.ats *::after{box-sizing:border-box}
.ats section{padding:0}
.ats a{color:inherit;text-decoration:none}
.ats h1,.ats h2,.ats h3{font-family:var(--ats-serif),Georgia,serif;font-weight:500;margin:0;letter-spacing:-.01em}
.ats p{margin:0}
.ats-wrap{max-width:var(--max);margin:0 auto;padding:0 var(--edge)}
.ats :focus-visible{outline:2px solid var(--gold);outline-offset:3px}

.ats-eyebrow{font-family:var(--ats-mono),monospace;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:12px}
.ats-eyebrow::before{content:'';width:22px;height:1px;background:var(--gold)}
.ats-eyebrow i{font-style:normal;color:var(--faint);letter-spacing:.04em;text-transform:none;font-size:.8rem}

/* buttons */
.ats-btn{display:inline-block;font-size:.9rem;font-weight:600;padding:13px 22px;border:1px solid var(--paper);color:var(--paper);transition:background .2s,color .2s,border-color .2s}
.ats-btn:hover{background:var(--paper);color:var(--ink)}
.ats-btn-primary{background:var(--crimson);border-color:var(--crimson);color:#fff}
.ats-btn-primary:hover{background:transparent;color:var(--crimson-br);border-color:var(--crimson-br)}

/* hero */
.ats-hero{position:relative;padding:clamp(72px,12vw,140px) 0 72px;overflow:hidden;border-bottom:1px solid var(--rule)}
.ats-grid-bg{position:absolute;inset:0;background-image:linear-gradient(var(--rule2) 1px,transparent 1px),linear-gradient(90deg,var(--rule2) 1px,transparent 1px);background-size:64px 64px;opacity:.35;mask-image:radial-gradient(ellipse at 70% 30%,#000 10%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 70% 30%,#000 10%,transparent 70%)}
.ats-glow{position:absolute;right:-10%;top:-20%;width:60vw;height:60vw;max-width:760px;max-height:760px;background:radial-gradient(circle,rgba(143,47,44,.32),transparent 65%);filter:blur(30px);pointer-events:none}
.ats-hero .ats-wrap{position:relative}
.ats-h1{font-size:clamp(2.3rem,6vw,4.6rem);line-height:1.05;margin-top:26px;max-width:15ch;animation:atsUp .9s cubic-bezier(.2,.7,.2,1) both}
.ats-h1 em{font-style:italic;color:var(--crimson-br);font-weight:400}
.ats-lede{margin-top:28px;max-width:56ch;color:var(--dim);font-weight:300;font-size:1.06rem;animation:atsUp .9s .12s cubic-bezier(.2,.7,.2,1) both}
.ats-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px;animation:atsUp .9s .24s cubic-bezier(.2,.7,.2,1) both}

/* axis */
.ats-axis{position:relative;height:64px;margin-top:72px;max-width:760px}
.ats-axis-line{position:absolute;left:0;top:10px;height:1px;width:100%;background:linear-gradient(90deg,var(--crimson),var(--rule) 60%,var(--rule));transform-origin:left;animation:atsDraw 1.6s .4s cubic-bezier(.6,0,.2,1) both}
.ats-axis-node{position:absolute;top:0;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:14px;animation:atsFade .6s both}
.ats-axis-node:first-of-type{transform:none;align-items:flex-start}
.ats-axis-node b{width:9px;height:9px;border-radius:50%;background:var(--ink);border:2px solid var(--crimson);margin-top:6px}
.ats-axis-node:last-child b{background:var(--crimson-br)}
.ats-axis-node span{font-family:var(--ats-mono),monospace;font-size:.7rem;letter-spacing:.08em;color:var(--faint)}

/* note */
.ats-note{margin:48px 0 0;border:1px solid var(--rule);border-left:3px solid var(--crimson);padding:18px 22px;max-width:78ch;font-size:.9rem;color:var(--dim)}
.ats-note strong{display:block;font-family:var(--ats-mono),monospace;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--paper);margin-bottom:6px;font-weight:500}

/* section heads */
.ats-section{padding:clamp(64px,9vw,110px) 0}
.ats-head{margin-bottom:48px;max-width:62ch}
.ats-head h2{font-size:clamp(1.7rem,3.6vw,2.6rem);margin-top:16px}
.ats-head p{margin-top:14px;color:var(--dim)}

/* timeline list */
.ats-list{list-style:none;margin:0;padding:0;position:relative}
.ats-list::before{content:'';position:absolute;left:calc(84px + 14px);top:8px;bottom:8px;width:1px;background:var(--rule)}
.ats-item{display:grid;grid-template-columns:84px 1fr;gap:28px;padding-bottom:22px;position:relative}
.ats-year{font-family:var(--ats-mono),monospace;font-size:.95rem;color:var(--gold);padding-top:26px;text-align:right;padding-right:0}
.ats-item::before{content:'';position:absolute;left:calc(84px + 9px);top:32px;width:11px;height:11px;border-radius:50%;background:var(--ink);border:2px solid var(--crimson);z-index:1;transition:background .25s}
.ats-item:hover::before{background:var(--crimson-br)}
.ats-item > .ats-card{margin-left:22px}

.ats-card{display:block;position:relative;border:1px solid var(--rule);padding:22px 24px 20px;background:linear-gradient(180deg,rgba(28,25,23,.6),rgba(19,17,16,0));transition:border-color .25s,transform .25s,background .25s;overflow:hidden}
.ats-card::after{content:'';position:absolute;left:0;top:0;height:2px;width:0;background:var(--crimson-br);transition:width .4s ease}
.ats-card:hover{border-color:#5a534c;transform:translateX(4px);background:var(--ink2)}
.ats-card:hover::after{width:100%}
.ats-card-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.ats-cat{font-family:var(--ats-mono),monospace;font-size:.68rem;letter-spacing:.09em;text-transform:uppercase;color:var(--faint)}
.ats-pill{font-family:var(--ats-mono),monospace;font-size:.64rem;letter-spacing:.07em;text-transform:uppercase;padding:3px 9px;border:1px solid var(--rule);color:var(--dim)}
.ats-pill-legal{border-color:var(--crimson);color:var(--crimson-br)}
.ats-pill-convicted,.ats-pill-concluded{border-color:var(--ok);color:var(--ok)}
.ats-pill-trial,.ats-pill-ongoing{border-color:var(--gold);color:var(--gold)}
.ats-card h3{font-size:1.4rem;margin-top:12px;line-height:1.25}
.ats-place{font-size:.84rem;color:var(--faint);margin-top:2px}
.ats-sum{font-size:.94rem;color:var(--dim);margin-top:12px;max-width:62ch}
.ats-open{display:inline-flex;gap:8px;align-items:center;margin-top:16px;font-size:.8rem;font-family:var(--ats-mono),monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--paper)}
.ats-open i{font-style:normal;transition:transform .25s}
.ats-card:hover .ats-open i{transform:translateX(5px)}
.ats-more{margin-top:34px;padding-left:calc(84px + 28px + 22px)}

/* quote break */
.ats-break{background:#0a0908;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:clamp(56px,8vw,96px) 0}
.ats-break p{font-family:var(--ats-serif),Georgia,serif;font-style:italic;font-size:clamp(1.4rem,3.2vw,2.3rem);line-height:1.35;max-width:24ch;padding-left:24px;border-left:2px solid var(--crimson)}

/* doors */
.ats-doors{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;background:var(--rule);border:1px solid var(--rule)}
.ats-door{position:relative;background:var(--ink);padding:26px 24px 30px;transition:background .25s;display:block}
.ats-door:hover{background:var(--ink2)}
.ats-door-n{font-family:var(--ats-mono),monospace;font-size:.72rem;color:var(--gold)}
.ats-door h3{font-size:1.25rem;margin:10px 0 8px}
.ats-door p{font-size:.88rem;color:var(--dim);max-width:34ch}
.ats-door-arrow{position:absolute;right:22px;bottom:22px;color:var(--faint);transition:transform .25s,color .25s}
.ats-door:hover .ats-door-arrow{transform:translateX(5px);color:var(--crimson-br)}

/* method */
.ats-method{background:var(--ink2);border-top:1px solid var(--rule);padding:56px 0}
.ats-method-in{display:flex;flex-wrap:wrap;gap:28px;justify-content:space-between;align-items:center}
.ats-method-txt{margin-top:14px;max-width:58ch;color:var(--dim)}
.ats-method-txt b{color:var(--paper);font-weight:600}

/* motion */
@keyframes atsUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes atsFade{from{opacity:0}to{opacity:1}}
@keyframes atsDraw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@supports (animation-timeline:view()){
  .ats-item,.ats-door,.ats-head{animation:atsUp both linear;animation-timeline:view();animation-range:entry 0% entry 35%}
}

/* mobile */
@media (max-width:680px){
  .ats-list::before{left:9px}
  .ats-item{grid-template-columns:1fr;gap:6px;padding-left:30px}
  .ats-item::before{left:4px;top:8px}
  .ats-year{text-align:left;padding-top:0}
  .ats-item > .ats-card{margin-left:0}
  .ats-more{padding-left:0}
  .ats-axis{margin-top:56px}
}
@media (prefers-reduced-motion:reduce){
  .ats *,.ats *::before,.ats *::after{animation:none!important;transition:none!important}
}
`;