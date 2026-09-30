'use client';

import { useState, useEffect, useRef } from 'react';

/* ============================================================
   DATA & CONSTANTS
   ============================================================ */
const FACT_STATUS: Record<string, string> = {
  verified: "VERIFIED — supported by reliable primary documentation (court records, government documents, official reports).",
  reported: "REPORTED — reported by credible media; not yet confirmed by a primary/legal source.",
  alleged: "ALLEGED — an accusation that has not been established in a judicial process.",
  court: "COURT FINDING — established through a judicial proceeding.",
  disputed: "DISPUTED — accounts differ, or the matter remains contested, including by those involved.",
  ongoing: "ONGOING — the legal or investigative process is still underway."
};

type CaseStatus = 'investigation' | 'trial' | 'convicted' | 'acquitted' | 'appeal' | 'ongoing' | 'landmark';

interface CaseData {
  id: string;
  title: string;
  year: number;
  era: string;
  location: string;
  type: string;
  status: CaseStatus;
  desc: string;
  sections: Record<string, string>;
}

const SECTION_LABELS: Record<string, string> = {
  what: "What happened",
  who: "Who",
  investigation: "Investigation",
  police: "Police response",
  court: "Court proceedings",
  public: "Public response",
  government: "Government response",
  changed: "What changed",
  notchanged: "What has not changed",
  current: "Current status",
};

const CASES: CaseData[] = [
  {
    id: "mathura-1972", title: "Mathura Custodial Rape Case", year: 1972, era: "1970s",
    location: "Chandrapur, Maharashtra", type: "Custodial violence", status: "landmark",
    desc: "A young woman was allegedly raped by policemen inside a police station; the Supreme Court's 1979 acquittal of the accused ignited a nationwide protest movement.",
    sections: {
      what: "In 1972, a young woman named Mathura was allegedly raped by two policemen on the premises of a police station in Maharashtra, where she and her family had gone in connection with a complaint filed by her brother.",
      who: "Mathura, reported to be a young Adivasi woman in her teens at the time.",
      investigation: "A trial court initially acquitted the accused; the Bombay High Court convicted them on appeal.",
      police: "The alleged assault took place inside a police station, raising questions about custodial safety that shaped the case's later significance.",
      court: "In 1979, the Supreme Court (Tuka Ram and Anr. v. State of Maharashtra) set aside the High Court conviction and acquitted the accused, reasoning that the absence of visible injury suggested consent — a judgment that was widely criticised by lawyers and women's rights groups.",
      public: "Four law professors published an open letter criticising the judgment, and the case catalysed the country's modern anti-rape movement.",
      government: "Public pressure led to legislative review of rape law by Parliament.",
      changed: "The Criminal Law (Amendment) Act, 1983 introduced provisions on custodial rape, shifted the burden of proof in some circumstances, and made it an offence to disclose a survivor's identity.",
      notchanged: "Campaigners have long argued that convictions in custodial-violence cases remained rare relative to reported incidents in the decades that followed.",
      current: "Referenced as a foundational case in Indian sexual-violence jurisprudence.",
    }
  },
  {
    id: "bhanwari-devi-1992", title: "Bhanwari Devi Case", year: 1992, era: "1990s",
    location: "Bhateri, Rajasthan", type: "Sexual violence", status: "landmark",
    desc: "A government saathin worker was allegedly gang-raped after attempting to stop a child marriage; the case led directly to the 1997 Vishaka guidelines on workplace sexual harassment.",
    sections: {
      what: "Bhanwari Devi, a government-employed saathin (village-level social worker) in Rajasthan, was allegedly gang-raped in 1992, reportedly in reprisal for her work opposing a child marriage in her village as part of a state programme.",
      who: "Bhanwari Devi, a survivor who continued to speak publicly about the case in the years that followed.",
      investigation: "The case went to trial in a Rajasthan sessions court.",
      police: "Accounts describe difficulties Bhanwari Devi faced in the investigative process.",
      court: "In 1995, a trial court acquitted the accused; the acquittal drew criticism from women's organisations.",
      public: "Women's rights groups filed a public interest litigation (Vishaka and Ors. v. State of Rajasthan) before the Supreme Court, arguing that the state had failed to protect a working woman.",
      government: "The Supreme Court, rather than the government, ultimately issued the response — see the Vishaka Guidelines entry.",
      changed: "The case is directly credited with prompting the 1997 Vishaka Guidelines, India's first binding framework on workplace sexual harassment, later codified in the POSH Act, 2013.",
      notchanged: "The criminal case itself did not result in convictions of the accused.",
      current: "Referenced as the origin case of India's workplace sexual-harassment law.",
    }
  },
  {
    id: "nirbhaya-2012", title: "Nirbhaya Case", year: 2012, era: "2010-2014",
    location: "New Delhi", type: "Sexual violence", status: "convicted",
    desc: "A centrepiece of this archive. A brutal gang rape on a moving bus triggered unprecedented nationwide protests demanding systemic change.",
    sections: {
      what: "A 23-year-old physiotherapy student was subjected to brutal sexual assault and violence aboard a moving private bus in Delhi. She succumbed to her injuries days later.",
      who: "A 23-year-old student whose name became synonymous with the fight for systemic legal reform.",
      investigation: "The investigation was fast-tracked due to intense public scrutiny.",
      police: "Delhi Police faced immense pressure, leading to rapid arrests and a fast-tracked chargesheet.",
      court: "The trial court convicted four adult accused, sentencing them to death. The verdict was upheld by the High Court and the Supreme Court.",
      public: "The case triggered unprecedented nationwide protests, demanding systemic change, faster justice, and safer public spaces for women.",
      government: "Formed the Justice Verma Committee, which submitted a comprehensive report recommending sweeping reforms in criminal law, police accountability, and political governance.",
      changed: "Criminal Law (Amendment) Act, 2013: Broadened the definition of rape, criminalized acid attacks, stalking, and voyeurism, and introduced stricter penalties.",
      notchanged: "Conviction rates remain a systemic challenge, and the implementation of safety infrastructure (like the Nirbhaya Fund) has seen delays.",
      current: "Four adult convicts were executed in 2020; one convict died in custody in 2013; a juvenile convict was released after serving the maximum term.",
    }
  },
  {
    id: "hathras-2020", title: "Hathras Case", year: 2020, era: "2020-2024",
    location: "Hathras, Uttar Pradesh", type: "Sexual violence", status: "trial",
    desc: "A young Dalit woman died after an alleged gang rape; her body was cremated by police at night without her family's presence, triggering nationwide protests over caste and institutional failure.",
    sections: {
      what: "A 19-year-old Dalit woman in Hathras, Uttar Pradesh, was allegedly gang-raped and assaulted in September 2020, and died from her injuries roughly two weeks later at a Delhi hospital.",
      who: "The victim, a young Dalit woman; her identity has been widely reported in domestic media but this archive follows the practice of not restating identifying details.",
      investigation: "The state government later ordered a Special Investigation Team and the case was also examined by the CBI.",
      police: "Uttar Pradesh police cremated the victim's body at night, reportedly without allowing her family to be present, a decision that drew sharp national condemnation.",
      court: "The case proceeded to trial before a special court; reported trial outcomes have varied by charge, with some accused facing lesser convictions.",
      public: "The case triggered nationwide protests over caste-based violence and alleged institutional cover-up, and drew international attention.",
      government: "The Uttar Pradesh government initially restricted media and opposition access to the victim's village, drawing further criticism.",
      changed: "Intensified national conversation on caste and gender intersecting in cases of sexual violence, and on state conduct around funeral rites for victims.",
      notchanged: "Campaigners have continued to question the adequacy of the state's initial response and the pace of the judicial process.",
      current: "Trial proceedings have continued; readers should consult current court records for the latest status.",
    }
  },
  {
    id: "rgkar-2024", title: "RG Kar Medical College Case", year: 2024, era: "2020-2024",
    location: "Kolkata, West Bengal", type: "Sexual violence", status: "convicted",
    desc: "A trainee doctor was raped and murdered inside her own hospital's seminar hall, triggering nationwide protests by doctors over workplace safety.",
    sections: {
      what: "A trainee doctor was found dead, with evidence of sexual assault, inside a seminar hall at R.G. Kar Medical College and Hospital, Kolkata, in August 2024, after an overnight duty shift.",
      who: "The victim, a postgraduate trainee doctor; her identity has been widely reported in domestic media but this archive follows the practice of not restating identifying details.",
      investigation: "Kolkata Police initially investigated; the case was subsequently transferred to the CBI following public pressure and court intervention.",
      police: "The hospital administration and local police faced accusations of delay and mishandling of the crime scene in the immediate aftermath.",
      court: "A trial court convicted one accused, a civic volunteer who had reported access to the hospital, sentencing him to life imprisonment.",
      public: "The case triggered sustained, nationwide strikes and protests by resident doctors demanding safer working conditions at hospitals.",
      government: "The West Bengal government and hospital administration faced sustained criticism, including over the conduct of a hospital official during the aftermath.",
      changed: "Renewed national attention on the safety of on-duty medical staff, particularly women, in hospital settings, and on protocols for preserving crime scenes at institutions.",
      notchanged: "The victim's family and some doctors' associations have continued to raise concerns about whether all aspects of the case were fully investigated.",
      current: "Conviction of one accused secured; broader questions raised by the family remain a subject of public debate.",
    }
  },
  {
    id: "sleeper-bus-2026", title: "Delhi-NCR Sleeper Bus Case", year: 2026, era: "2025-Present",
    location: "Greater Noida to Delhi", type: "Transport-related crime", status: "investigation",
    desc: "A minor survivor was allegedly assaulted aboard a moving interstate sleeper bus. No identifying details are published; all matters remain alleged.",
    sections: {
      what: "A minor survivor was allegedly assaulted aboard a moving interstate sleeper bus traveling from Greater Noida to Delhi.",
      who: "A 16-year-old survivor; identity protected.",
      investigation: "Authorities are examining reported safety failures, including the functionality of in-bus CCTV systems and driver verification protocols.",
      police: "An FIR was registered, and arrests were made based on initial complaints and digital evidence.",
      court: "Not yet at trial as of this writing.",
      public: "Renewed national scrutiny on interstate transport safety and the enforcement of mandated safety protocols.",
      government: "State transport authorities have issued notices to the operator, though systemic enforcement of transport safety rules remains under severe scrutiny.",
      changed: "To be assessed as the investigation progresses.",
      notchanged: "To be assessed as the investigation progresses.",
      current: "ONGOING — investigation stage.",
    }
  }
];

const REFORMS = [
  { name: "Criminal Law (Amendment) Act, 2013", promise: "Broadened the legal definition of rape, criminalised acid attacks, stalking and voyeurism, and introduced the death penalty for repeat offenders.", implementation: "Enacted into law and applied in subsequent prosecutions.", evidence: "Text of the Act; subsequent trial court judgments.", status: "partial" as const },
  { name: "Fast-track courts for sexual-offence cases", promise: "Dedicated fast-track courts announced after 2012 to reduce trial delays in rape cases.", implementation: "Established in phases in most states, with reported variation in caseload and staffing.", evidence: "State-level judicial data; periodic government statements to Parliament.", status: "partial" as const },
  { name: "POCSO Act amendments, 2019", promise: "Introduced the death penalty for aggravated penetrative sexual assault on children.", implementation: "Enacted into law and applied in subsequent cases.", evidence: "Text of the amendment; subsequent court judgments.", status: "impl" as const },
  { name: "Nirbhaya Fund", promise: "A dedicated central government fund for projects supporting women's safety (CCTV, emergency response, one-stop centres).", implementation: "Reports from parliamentary committees and the CAG have periodically noted delays in states utilising allocated funds.", evidence: "CAG and parliamentary standing committee reports.", status: "partial" as const },
  { name: "Public transport safety measures", promise: "Mandates for panic buttons, GPS tracking, and stricter driver-verification in public and app-based transport.", implementation: "Rules exist in several states, but enforcement has been repeatedly questioned after subsequent incidents.", evidence: "State transport department notifications; post-incident reporting.", status: "fail" as const },
];

const REFORM_MARKS: Record<string, string> = {
  impl: "✓ Implemented",
  partial: "⚠ Partially Implemented",
  fail: "✕ Documented Failure",
  unknown: "? Insufficient Evidence",
};

const TIMELINE = [
  { year: "1972", title: "Mathura Custodial Rape Case", what: "Alleged custodial rape; 1979 Supreme Court acquittal sparks the modern anti-rape movement.", promise: "Legal reform of rape law.", changed: "1983 amendments on custodial rape and burden of proof." },
  { year: "1992", title: "Bhanwari Devi Case", what: "Alleged gang rape of a government worker opposing child marriage.", promise: "Workplace protection for women.", changed: "1997 Vishaka Guidelines." },
  { year: "1997", title: "Vishaka Guidelines", what: "Supreme Court lays down binding workplace sexual-harassment guidelines.", promise: "Legislated protection.", changed: "POSH Act, 2013." },
  { year: "2012", title: "Nirbhaya Case", what: "Gang rape and murder on a moving Delhi bus; nationwide protests.", promise: "Sweeping legal reform.", changed: "Criminal Law (Amendment) Act, 2013; Justice Verma Committee reforms." },
  { year: "2018", title: "Kathua & Muzaffarpur", what: "Child rape-murder case and shelter-home abuse scandal.", promise: "Child-protection reform.", changed: "POCSO amendments introducing the death penalty for child rape." },
  { year: "2020", title: "Hathras Case", what: "Alleged gang rape and death of a young Dalit woman; contested night-time cremation.", promise: "Caste-sensitive investigation reform.", changed: "Renewed debate; outcomes still contested." },
  { year: "2024", title: "RG Kar Medical College Case", what: "Rape and murder of a trainee doctor inside her own hospital.", promise: "Hospital and workplace safety reform for medical staff.", changed: "One conviction secured; nationwide doctor protests over safety." },
  { year: "2026", title: "Delhi-NCR Sleeper Bus Case", what: "Alleged assault of a minor aboard a moving interstate sleeper bus.", promise: "Transport safety enforcement, repeatedly promised since 2012.", changed: "Investigation ongoing." }
];

const SOURCES = [
  { t: "Tuka Ram and Anr. v. State of Maharashtra (1979)", o: "Supreme Court of India — judgment" },
  { t: "Vishaka and Ors. v. State of Rajasthan (1997)", o: "Supreme Court of India — judgment" },
  { t: "The Criminal Law (Amendment) Act, 2013", o: "Ministry of Law and Justice, Government of India" },
  { t: "Report of the Committee on Amendments to Criminal Law (Justice J.S. Verma Committee, 2013)", o: "Government of India" },
  { t: "Protection of Children from Sexual Offences (Amendment) Act, 2019", o: "Ministry of Law and Justice, Government of India" },
  { t: "National Crime Records Bureau — Crime in India (annual reports)", o: "Ministry of Home Affairs, Government of India" },
  { t: "Reporting on the 2026 Greater Noida–Delhi sleeper bus case", o: "Contemporary Indian news media — status developing" }
];

const STATUS_LABELS: Record<CaseStatus, string> = {
  investigation: "Investigation", trial: "Trial", convicted: "Convicted",
  acquitted: "Acquitted", appeal: "Appeal", ongoing: "Ongoing", landmark: "Legal Landmark"
};

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#archive", label: "Cases" },
  { href: "#timeline", label: "Timeline" },
  { href: "#reforms", label: "Reforms" },
  { href: "#accountability", label: "Accountability" },
  { href: "#sources", label: "Sources" },
];

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

// Counter ab React state se chalta hai — direct DOM chhedna band.
function Stat({ target, suffix = "", label, source }: { target?: number; suffix?: string; label: string; source: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === undefined || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    const run = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(target);
        return;
      }
      const start = performance.now();
      const dur = 1100;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return (
    <div className="stat" ref={ref}>
      <div className="num">{target === undefined ? "N/A" : value.toLocaleString('en-IN') + suffix}</div>
      <div className="lbl">{label}</div>
      <div className="src">{source}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 620" role="img" aria-label="Illustration of a public record document with three questions: what happened, what changed, what remains">
      <defs>
        <radialGradient id="glow"><stop offset="0" stopColor="#a51d29" stopOpacity=".55" /><stop offset="1" stopColor="#a51d29" stopOpacity="0" /></radialGradient>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1eee6" /><stop offset="1" stopColor="#c8c2b7" /></linearGradient>
      </defs>
      <rect width="460" height="620" fill="#0f0d0c" />
      <ellipse cx="230" cy="310" rx="220" ry="280" fill="url(#glow)" />
      <g transform="rotate(4 230 310)">
        <rect x="55" y="50" width="350" height="520" rx="4" fill="url(#paper)" />
        <path d="M345 50H405V110Z" fill="#aaa59f" />
        <text x="82" y="100" fill="#252525" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">THE RECORD</text>
        <text x="82" y="120" fill="#666" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="2">PUBLIC INTEREST ARCHIVE</text>
        <line x1="82" y1="140" x2="378" y2="140" stroke="#333" strokeOpacity=".3" />
        <text x="82" y="185" fill="#333" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT HAPPENED?</text>
        <rect x="82" y="202" width="240" height="6" rx="3" fill="#555" opacity=".5" />
        <rect x="82" y="218" width="280" height="6" rx="3" fill="#555" opacity=".3" />
        <text x="82" y="285" fill="#333" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT CHANGED?</text>
        <rect x="82" y="302" width="270" height="6" rx="3" fill="#555" opacity=".4" />
        <rect x="82" y="318" width="210" height="6" rx="3" fill="#555" opacity=".3" />
        <text x="82" y="385" fill="#8d171f" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold">WHAT REMAINS?</text>
        <rect x="82" y="402" width="260" height="6" rx="3" fill="#8d171f" opacity=".4" />
        <rect x="82" y="418" width="180" height="6" rx="3" fill="#8d171f" opacity=".3" />
        <line x1="82" y1="500" x2="378" y2="500" stroke="#333" strokeOpacity=".25" />
        <text x="82" y="530" fill="#555" fontFamily="Arial, sans-serif" fontSize="10" letterSpacing="2">EVIDENCE · SOURCES · TIMELINE</text>
      </g>
    </svg>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [showTop, setShowTop] = useState(false);

  const [search, setSearch] = useState("");
  const [era, setEra] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.body.classList.toggle('light', isLightMode);
    return () => document.body.classList.remove('light');
  }, [isLightMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedCase(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Modal khula ho toh peeche ka page scroll na kare
  useEffect(() => {
    document.body.style.overflow = selectedCase ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCase]);

  const q = search.trim().toLowerCase();
  const filteredCases = CASES.filter(c => {
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    return matchQ && (!era || c.era === era) && (!type || c.type === type) && (!status || c.status === status);
  });

  const isCourtStatus = selectedCase && ['convicted', 'landmark', 'acquitted'].includes(selectedCase.status);
  const isOpenStatus = selectedCase && ['investigation', 'trial', 'ongoing', 'appeal'].includes(selectedCase.status);

  return (
    <div className="archive-root">
      <style>{CSS}</style>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* NAVIGATION */}
      <header className="site-nav">
        <div className="nav-inner">
          <div className="brand">AFTER THE <span>SILENCE</span></div>
          <nav className="links" aria-label="Main navigation">
            {NAV_LINKS.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="mode-toggle" onClick={() => setIsLightMode(v => !v)} aria-pressed={isLightMode}>
              {isLightMode ? "DARK MODE" : "LIGHT MODE"}
            </button>
            <a href="#archive" className="btn-explore">EXPLORE ARCHIVE →</a>
            <button className="hamburger" onClick={() => setIsMobileMenuOpen(v => !v)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" aria-label="Toggle menu">
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)}>{l.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">INDIA • WOMEN • JUSTICE • ACCOUNTABILITY</div>
              <h1>“Some cases changed laws. Did they change reality?”</h1>
              <p className="lede">India has witnessed cases that shook the nation, exposed institutional failures, changed legislation and forced governments to promise reform.</p>
              <p className="lede">This archive asks what happened after the headlines disappeared.</p>
              <div className="hero-actions">
                <a href="#archive" className="btn primary">EXPLORE THE CASES</a>
                <a href="#timeline" className="btn">FOLLOW THE TIMELINE</a>
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

        {/* NIRBHAYA CENTERPIECE */}
        <section id="nirbhaya" className="on-rule">
          <div className="wrap">
            <div className="cp-head">
              <div>
                <div className="eyebrow">Centerpiece Archive</div>
                <h3>NIRBHAYA — 2012</h3>
              </div>
              <div className="cp-years">16 DECEMBER 2012 · DELHI</div>
            </div>
            <div className="cp-statement">“A case that changed India’s legal landscape.”</div>

            <div className="cp-block">
              <div><span className="cp-block-num">01</span><h4>What Happened</h4></div>
              <div className="cp-block-body">
                <p>A 23-year-old physiotherapy student was subjected to brutal sexual assault and violence aboard a moving private bus in Delhi. She succumbed to her injuries days later. The facts are presented here without graphic detail, respecting the victim’s dignity.</p>
              </div>
            </div>

            <div className="cp-block">
              <div><span className="cp-block-num">02</span><h4>Investigation &amp; Public Response</h4></div>
              <div className="cp-block-body">
                <p>The case triggered unprecedented nationwide protests, demanding systemic change, faster justice, and safer public spaces for women. The investigation was fast-tracked due to intense public scrutiny.</p>
              </div>
            </div>

            <div className="cp-block">
              <div><span className="cp-block-num">03</span><h4>What Changed vs What Remains Unresolved</h4></div>
              <div className="cp-block-body">
                <div className="ba-grid">
                  <div className="ba-col">
                    <h5>BEFORE 2012</h5>
                    <ul>
                      <li>Narrow legal definitions of sexual offences.</li>
                      <li>Lack of specific statutory laws for workplace harassment.</li>
                      <li>Minimal public discourse on transport safety audits.</li>
                      <li>Weak witness protection mechanisms.</li>
                    </ul>
                  </div>
                  <div className="ba-col">
                    <h5>AFTER 2012</h5>
                    <ul>
                      <li>Expanded legal definitions and harsher penalties.</li>
                      <li>Establishment of fast-track courts (with mixed efficacy).</li>
                      <li>Creation of the Nirbhaya Fund for women’s safety initiatives.</li>
                      <li>Increased public awareness, though conviction rates remain a systemic challenge.</li>
                    </ul>
                  </div>
                </div>
                <div className="change-grid">
                  <span>LAW</span><span>POLICING</span><span>SEXUAL OFFENCES</span><span>WORKPLACE SAFETY</span><span>PUBLIC AWARENESS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 SLEEPER BUS CENTERPIECE */}
        <section id="sleeper-bus-2026">
          <div className="wrap">
            <div className="cp-head">
              <div>
                <div className="eyebrow">Centerpiece Archive</div>
                <h3>DELHI-NCR SLEEPER BUS CASE</h3>
              </div>
              <div className="cp-years">2026 · ONGOING</div>
            </div>

            <div className="status-ribbon">ONGOING / DEVELOPING CASE</div>

            <div className="cp-statement">“14 YEARS LATER: Why are we still talking about buses?”</div>

            <div className="cp-block">
              <div><span className="cp-block-num">01</span><h4>The Incident</h4></div>
              <div className="cp-block-body">
                <p><strong>REPORTED:</strong> A minor survivor was allegedly assaulted aboard a moving interstate sleeper bus traveling from Greater Noida to Delhi.</p>
                <p><strong>PROTECTED:</strong> The survivor is a minor. In accordance with legal and ethical standards, no identifying information, photographs, or specific location details that could compromise her identity are published here.</p>
              </div>
            </div>

            <div className="cp-block">
              <div><span className="cp-block-num">02</span><h4>Current Legal Status</h4></div>
              <div className="cp-block-body">
                <p><strong>ONGOING:</strong> The case is in the investigation/chargesheet phase. No court findings have been established yet. All accusations remain alleged until proven in a court of law.</p>
                <div className="tag-row">
                  <span className="tag alleged" title={FACT_STATUS.alleged}>ALLEGED</span>
                  <span className="tag reported" title={FACT_STATUS.reported}>REPORTED</span>
                  <span className="tag ongoing" title={FACT_STATUS.ongoing}>ONGOING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASE ARCHIVE */}
        <section id="archive" className="on-rule">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">The Archive</div>
              <h2>Case Records</h2>
              <p>Every entry is tagged with its evidentiary status. Hover over tags for definitions.</p>
            </div>

            <div className="archive-controls">
              <div className="search-box">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cases, locations, or keywords..." aria-label="Search cases" />
              </div>
              <select value={era} onChange={(e) => setEra(e.target.value)} className="filter-select" aria-label="Filter by era">
                <option value="">All Eras</option>
                <option value="1970s">1970s</option>
                <option value="1990s">1990s</option>
                <option value="2010-2014">2010–2014</option>
                <option value="2020-2024">2020–2024</option>
                <option value="2025-Present">2025–Present</option>
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)} className="filter-select" aria-label="Filter by type">
                <option value="">All Types</option>
                <option value="Sexual violence">Sexual violence</option>
                <option value="Custodial violence">Custodial violence</option>
                <option value="Transport-related crime">Transport-related crime</option>
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-select" aria-label="Filter by status">
                <option value="">All Statuses</option>
                <option value="investigation">Investigation</option>
                <option value="trial">Trial</option>
                <option value="convicted">Convicted</option>
                <option value="ongoing">Ongoing</option>
                <option value="landmark">Legal Landmark</option>
              </select>
              <div className="filter-count" aria-live="polite">{filteredCases.length} of {CASES.length} cases</div>
            </div>

            <div className="case-grid">
              {filteredCases.length === 0 ? (
                <div className="empty-state">No cases match this search. Try clearing a filter.</div>
              ) : (
                filteredCases.map(c => (
                  <button key={c.id} className="case-card" onClick={() => setSelectedCase(c)} aria-haspopup="dialog">
                    <span className="year">{c.year} · {c.location}</span>
                    <span className="ctitle">{c.title}</span>
                    <span className="desc">{c.desc}</span>
                    <span className="foot">
                      <span className={`status-pill ${c.status}`}>{STATUS_LABELS[c.status]}</span>
                      <span className="loc">{c.type}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        {/* REFORM TIMELINE */}
        <section id="timeline">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Historical Record</div>
              <h2>The Reform Timeline</h2>
              <p>Tracing the gap between what happened, what was promised, and what actually changed.</p>
            </div>
            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div key={i} className="tl-node">
                  <div className="tl-year">{t.year}</div>
                  <h4>{t.title}</h4>
                  <div className="tl-grid">
                    <div><span>What Happened</span><p>{t.what}</p></div>
                    <div><span>What Was Promised</span><p>{t.promise}</p></div>
                    <div><span>What Changed</span><p>{t.changed}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROMISE VS REALITY */}
        <section id="reforms" className="on-rule">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Accountability Dashboard</div>
              <h2>Promise vs Reality</h2>
              <p>Measuring the implementation of major safety reforms. Never labeled “failed” without documented evidence.</p>
            </div>
            <div className="pr-scroll" tabIndex={0} role="region" aria-label="Promise vs reality table, scrollable">
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>Reform / Promise</th>
                    <th>Announced Intent</th>
                    <th>Actual Implementation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {REFORMS.map((r, i) => (
                    <tr key={i}>
                      <td className="rname">{r.name}</td>
                      <td>{r.promise}</td>
                      <td>{r.implementation}</td>
                      <td><span className={`status-mark ${r.status}`}>{REFORM_MARKS[r.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL ACCOUNTABILITY */}
        <section id="accountability">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Systemic Review</div>
              <h2>Institutional Accountability</h2>
              <p>Identifying the specific nodes of failure across the ecosystem of justice and safety.</p>
            </div>
            <div className="panel-grid">
              <div className="panel">
                <h4>POLICE</h4>
                <ul>
                  <li>FIR registration delays</li>
                  <li>Evidence tampering risks</li>
                  <li>Victim protection failures</li>
                  <li>Political interference in investigations</li>
                </ul>
              </div>
              <div className="panel">
                <h4>TRANSPORT AUTHORITIES</h4>
                <ul>
                  <li>Non-functional mandated CCTV</li>
                  <li>Lax driver background verification</li>
                  <li>Poor interstate jurisdictional coordination</li>
                  <li>Weak enforcement of operator compliance</li>
                </ul>
              </div>
              <div className="panel">
                <h4>GOVERNMENT</h4>
                <ul>
                  <li>Under-utilization of safety funds (e.g., Nirbhaya Fund)</li>
                  <li>Delayed legislative action on committee reports</li>
                  <li>Lack of independent oversight mechanisms</li>
                  <li>Politicization of survivor narratives</li>
                </ul>
              </div>
              <div className="panel">
                <h4>COURTS</h4>
                <ul>
                  <li>Severe trial pendency and delays</li>
                  <li>High rates of witness hostility</li>
                  <li>Inconsistent sentencing in sexual offence cases</li>
                  <li>Burden of proof challenges for survivors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section id="stats" className="on-rule">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Verified Data</div>
              <h2>Statistics Dashboard</h2>
              <p>Numbers sourced from official government datasets. We do not invent statistics. Where data is opaque, we state it.</p>
            </div>
            <div className="stat-grid">
              <Stat target={31000} suffix="+" label="Reported Crimes Against Women (Annual)" source='SOURCE: NCRB "Crime in India" 2022' />
              <Stat target={75} suffix="%" label="Cases Pending Trial (Avg. Pendency)" source="SOURCE: National Judicial Data Grid (NJDG)" />
              <Stat target={20} suffix="-30%" label="Conviction Rate (Specific IPC Sections)" source="SOURCE: NCRB / Parliamentary Committee Reports" />
              <Stat label="Real-time Transport CCTV Compliance Audit" source="SOURCE: DATA NOT AVAILABLE (No centralized public audit)" />
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section id="questions">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">The Unanswered</div>
              <h2>The Questions That Remain</h2>
            </div>
            <div className="q-list">
              <div className="q-item">Are laws being enforced, or do they exist only on paper?</div>
              <div className="q-item">Are public transport safety rules actually monitored, or just mandated?</div>
              <div className="q-item">Are survivors protected during investigations, or re-traumatized by the system?</div>
              <div className="q-item">How long do cases take to reach judgment, and who pays the price for the delay?</div>
              <div className="q-item">Who investigates institutional failures when the institution is the state?</div>
            </div>
          </div>
        </section>

        {/* SOURCES */}
        <section id="sources" className="on-rule">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Methodology</div>
              <h2>Sources &amp; Verification</h2>
              <p>Every claim in this archive is cross-referenced. We distinguish fact from analysis, and allegation from court finding.</p>
            </div>
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
      </main>

      <footer>
        <div className="brand">AFTER THE <span>SILENCE</span></div>
        <p>An independent public-interest archive. Dedicated to truth, dignity, and systemic accountability.</p>
        <p className="copyright">© 2026 After The Silence Archive. All rights reserved. Content licensed for educational and public-interest use.</p>
      </footer>

      {/* MODAL */}
      {selectedCase && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Case file: ${selectedCase.title}`} onClick={(e) => { if (e.target === e.currentTarget) setSelectedCase(null); }}>
          <div className="modal">
            <div className="modal-top">
              <div className="eyebrow">Case File</div>
              <button className="modal-close" onClick={() => setSelectedCase(null)} aria-label="Close case file" autoFocus>CLOSE ✕</button>
            </div>
            <div className="modal-body">
              <h2>{selectedCase.title}</h2>
              <div className="modal-meta">{selectedCase.year} · {selectedCase.location} · {selectedCase.type}</div>
              <div className="tag-row">
                <span className="tag verified" title={FACT_STATUS.verified}>VERIFIED</span>
                {isCourtStatus && <span className="tag court" title={FACT_STATUS.court}>COURT</span>}
                {isOpenStatus && <span className="tag ongoing" title={FACT_STATUS.ongoing}>ONGOING</span>}
              </div>
              {Object.entries(selectedCase.sections).map(([key, value], idx) => (
                <div key={key} className="modal-section">
                  <h4>{String(idx + 1).padStart(2, '0')} — {SECTION_LABELS[key] ?? key}</h4>
                  <p>{value}</p>
                </div>
              ))}
              <div className="modal-section">
                <h4>Sources</h4>
                <p className="modal-sources">Cross-check details for this case against the primary sources listed in the archive-wide Sources section, and current court records, before treating any detail as final.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTop && (
        <button id="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}
    </div>
  );
}

/* ============================================================
   STYLESHEET
   Light mode ab sirf CSS variables swap karta hai — alag overrides ki zaroorat nahi.
   ============================================================ */
const CSS = `
:root{
  --ink:#131110; --ink-soft:#1c1917; --paper:#ece5d8; --paper-dim:#b9b0a0; --paper-faint:#8a8175;
  --crimson:#8f2f2c; --crimson-br:#c24a44; --gold:#a9873f; --rule:#3c3733; --rule-lite:#2a2623;
  --ok:#7a9a66; --warn:#c09a45; --fail:#c24a44; --nav-bg:rgba(19,17,16,0.92);
  --max:1180px; --edge:clamp(20px,5vw,64px);
  --sans:Arial,Helvetica,sans-serif; --serif:Georgia,"Times New Roman",serif; --mono:"Courier New",Courier,monospace;
}
body.light{
  --ink:#f7f4ec; --ink-soft:#ece5d8; --paper:#1c1917; --paper-dim:#4c4638; --paper-faint:#6b6356;
  --crimson:#8f2f2c; --crimson-br:#8f2f2c; --gold:#7a5f22; --rule:#cfc5b4; --rule-lite:#ddd4c4;
  --ok:#3f6a2f; --warn:#7a5f22; --fail:#8f2f2c; --nav-bg:rgba(247,244,236,0.94);
}

*,*::before,*::after{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }
@media (prefers-reduced-motion:reduce){
  html{ scroll-behavior:auto; }
  *,*::before,*::after{ animation:none !important; transition:none !important; scroll-behavior:auto !important; }
}
body{ margin:0; background:var(--ink); color:var(--paper); font-family:var(--sans); font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
a{ color:inherit; }
::selection{ background:var(--crimson); color:#fff; }
h1,h2,h3,h4,h5,p,ul{ margin:0; }
h1,h2,h3,h4{ font-family:var(--serif); font-weight:500; letter-spacing:-0.01em; }
:focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }

.wrap{ width:100%; max-width:var(--max); margin:0 auto; padding-left:var(--edge); padding-right:var(--edge); }
section{ padding:90px 0; scroll-margin-top:72px; }
.on-rule{ background:var(--ink-soft); }
a.skip-link{ position:absolute; left:-999px; top:0; background:var(--crimson); color:#fff; padding:12px 18px; z-index:999; font-weight:600; }
a.skip-link:focus{ left:12px; top:12px; }

.eyebrow{ font-family:var(--mono); font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); display:flex; align-items:center; gap:10px; }
.eyebrow::before{ content:''; flex:none; width:22px; height:1px; background:var(--gold); }

/* NAV */
.site-nav{ position:sticky; top:0; z-index:80; background:var(--nav-bg); backdrop-filter:blur(8px); border-bottom:1px solid var(--rule); }
.nav-inner{ display:flex; align-items:center; justify-content:space-between; gap:20px; max-width:var(--max); margin:0 auto; padding:14px var(--edge); }
.brand{ font-family:var(--serif); font-size:1.15rem; font-weight:600; white-space:nowrap; }
.brand span{ color:var(--crimson-br); }
nav.links{ display:flex; gap:22px; font-size:0.9rem; }
nav.links a{ text-decoration:none; color:var(--paper-dim); border-bottom:1px solid transparent; padding-bottom:2px; white-space:nowrap; }
nav.links a:hover{ color:var(--paper); border-color:var(--crimson); }
.nav-actions{ display:flex; align-items:center; gap:12px; }
.btn-explore{ font-family:var(--mono); font-size:0.75rem; letter-spacing:0.08em; color:var(--ink); background:var(--gold); padding:9px 16px; text-decoration:none; white-space:nowrap; border:1px solid var(--gold); }
.btn-explore:hover{ background:transparent; color:var(--gold); }
.mode-toggle,.hamburger{ background:none; border:1px solid var(--rule); color:inherit; font-family:var(--mono); font-size:0.72rem; padding:8px 10px; cursor:pointer; letter-spacing:0.06em; white-space:nowrap; }
.mode-toggle:hover{ border-color:var(--gold); color:var(--gold); }
.hamburger{ display:none; }
.mobile-menu{ display:flex; flex-direction:column; padding:8px var(--edge) 20px; background:var(--ink-soft); border-top:1px solid var(--rule); }
.mobile-menu a{ text-decoration:none; color:var(--paper-dim); padding:12px 4px; border-top:1px solid var(--rule-lite); }
.mobile-menu a:first-child{ border-top:none; }
@media (min-width:1081px){ .mobile-menu{ display:none; } }
@media (max-width:1240px){ .btn-explore{ display:none; } }
@media (max-width:1080px){ nav.links{ display:none; } .hamburger{ display:inline-block; } }

/* HERO — text left, visual right, kuch bhi ek doosre ke upar nahi */
.hero{ padding:80px 0 60px; }
.hero-grid{ display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,0.75fr); gap:56px; align-items:center; }
.hero .eyebrow{ margin-bottom:24px; }
.hero h1{ font-size:clamp(2.1rem,5vw,3.9rem); line-height:1.1; max-width:18ch; }
.lede{ margin-top:26px; max-width:56ch; font-size:1.08rem; color:var(--paper-dim); }
.lede + .lede{ margin-top:14px; }
.hero-actions{ display:flex; flex-wrap:wrap; gap:14px; margin-top:36px; }
.btn{ font-size:0.92rem; font-weight:600; padding:14px 24px; text-decoration:none; border:1px solid var(--paper); background:none; color:var(--paper); }
.btn:hover{ background:var(--paper); color:var(--ink); }
.btn.primary{ background:var(--crimson); border-color:var(--crimson); color:#fff; }
.btn.primary:hover{ background:transparent; color:var(--crimson-br); }
.hero-strip{ margin-top:52px; display:flex; flex-wrap:wrap; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); }
.hero-strip span{ font-family:var(--mono); font-size:0.72rem; letter-spacing:0.1em; color:var(--paper-faint); padding:14px 22px 14px 0; margin-right:22px; border-right:1px solid var(--rule); }
.hero-strip span:last-child{ border-right:none; margin-right:0; }
.hero-visual{ display:flex; flex-direction:column; gap:20px; }
.hero-visual svg{ width:100%; height:auto; display:block; border:1px solid var(--rule); }
.hero-quote{ font-family:var(--serif); font-style:italic; color:var(--paper-dim); font-size:1.02rem; }
@media (max-width:980px){
  .hero-grid{ grid-template-columns:1fr; gap:44px; }
  .hero-visual{ max-width:420px; }
}

/* WARNING */
.warning{ padding-bottom:48px; }
.warning .box{ border:1px solid var(--rule); border-left:3px solid var(--crimson); padding:20px 24px; font-size:0.92rem; color:var(--paper-dim); max-width:80ch; }
.warning strong{ color:var(--paper); }

.section-head{ margin-bottom:44px; max-width:70ch; }
.section-head h2{ font-size:clamp(1.7rem,3.4vw,2.6rem); margin-top:16px; }
.section-head p{ margin-top:16px; color:var(--paper-dim); max-width:60ch; }

/* CENTERPIECES */
.cp-head{ display:flex; flex-wrap:wrap; justify-content:space-between; gap:16px 24px; align-items:flex-end; margin-bottom:34px; }
.cp-head h3{ font-size:clamp(1.9rem,4.4vw,3.2rem); margin-top:10px; line-height:1.1; overflow-wrap:anywhere; }
.cp-years{ font-family:var(--mono); font-size:0.85rem; color:var(--paper-faint); }
.cp-statement{ font-family:var(--serif); font-size:clamp(1.25rem,2.4vw,1.9rem); line-height:1.4; max-width:34ch; padding:6px 0 6px 24px; border-left:2px solid var(--crimson); margin-bottom:44px; }
.cp-block{ display:grid; grid-template-columns:220px minmax(0,1fr); gap:44px; padding:36px 0; border-top:1px solid var(--rule); }
.cp-statement + .cp-block{ border-top:none; padding-top:0; }
.cp-block h4{ font-size:1.2rem; }
.cp-block-num{ font-family:var(--mono); font-size:0.75rem; color:var(--paper-faint); display:block; margin-bottom:8px; }
.cp-block-body p{ max-width:66ch; color:var(--paper-dim); margin-bottom:14px; }
.cp-block-body p:last-child{ margin-bottom:0; }
.cp-block-body strong{ color:var(--paper); }
@media (max-width:760px){ .cp-block{ grid-template-columns:1fr; gap:12px; } }

.tag-row{ display:flex; flex-wrap:wrap; gap:8px; margin:14px 0; }
.tag{ font-family:var(--mono); font-size:0.68rem; letter-spacing:0.06em; padding:5px 10px; border:1px solid var(--rule); color:var(--paper-dim); white-space:nowrap; cursor:help; }
.tag.verified{ border-color:var(--ok); color:var(--ok); }
.tag.court{ border-color:var(--gold); color:var(--gold); }
.tag.disputed,.tag.alleged{ border-color:var(--crimson-br); color:var(--crimson-br); }
.tag.ongoing,.tag.reported{ border-color:var(--paper-faint); color:var(--paper-faint); }

.ba-grid{ display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:8px; }
@media (max-width:720px){ .ba-grid{ grid-template-columns:1fr; } }
.ba-col{ border:1px solid var(--rule); padding:24px; }
.ba-col h5{ font-family:var(--mono); font-size:0.78rem; letter-spacing:0.08em; color:var(--paper-faint); margin-bottom:14px; }
.ba-col ul{ padding:0; list-style:none; }
.ba-col li{ padding:9px 0; border-top:1px solid var(--rule-lite); color:var(--paper-dim); font-size:0.94rem; }
.ba-col li:first-child{ border-top:none; }
.change-grid{ display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
.change-grid span{ font-family:var(--mono); font-size:0.72rem; letter-spacing:0.06em; padding:9px 14px; border:1px solid var(--rule); }

.status-ribbon{ display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:0.72rem; letter-spacing:0.08em; color:var(--crimson-br); border:1px solid var(--crimson-br); padding:8px 14px; margin-bottom:24px; }
.status-ribbon::before{ content:''; width:7px; height:7px; background:var(--crimson-br); border-radius:50%; animation:pulse 1.8s infinite; }
@keyframes pulse{ 0%,100%{opacity:1;} 50%{opacity:0.3;} }

/* ARCHIVE */
.archive-controls{ display:flex; flex-wrap:wrap; gap:14px; align-items:center; margin-bottom:32px; }
.search-box{ flex:1 1 260px; border:1px solid var(--rule); padding:0 14px; }
.search-box input{ width:100%; background:none; border:none; color:inherit; font-family:var(--sans); font-size:0.95rem; padding:13px 0; outline:none; }
.search-box:focus-within{ border-color:var(--gold); }
.search-box input::placeholder{ color:var(--paper-faint); }
.filter-select{ background:var(--ink); color:var(--paper); border:1px solid var(--rule); font-family:var(--sans); font-size:0.88rem; padding:12px 10px; max-width:100%; }
.filter-count{ font-family:var(--mono); font-size:0.75rem; color:var(--paper-faint); margin-left:auto; }
.case-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr)); gap:1px; background:var(--rule); border:1px solid var(--rule); }
.case-card{ background:var(--ink); padding:26px 24px; cursor:pointer; text-align:left; border:none; color:inherit; font-family:inherit; font-size:inherit; display:flex; flex-direction:column; gap:12px; min-height:200px; }
.case-card:hover{ background:var(--ink-soft); }
.case-card .year{ font-family:var(--mono); font-size:0.75rem; color:var(--gold); }
.case-card .ctitle{ font-family:var(--serif); font-size:1.22rem; line-height:1.3; }
.case-card .desc{ font-size:0.87rem; color:var(--paper-dim); flex:1; }
.case-card .foot{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px; margin-top:auto; }
.case-card .loc{ font-size:0.82rem; color:var(--paper-faint); }
.status-pill{ font-family:var(--mono); font-size:0.66rem; letter-spacing:0.06em; text-transform:uppercase; padding:4px 9px; border:1px solid var(--rule); }
.status-pill.convicted{ border-color:var(--ok); color:var(--ok); }
.status-pill.ongoing,.status-pill.investigation,.status-pill.trial,.status-pill.appeal{ border-color:var(--gold); color:var(--gold); }
.status-pill.acquitted{ border-color:var(--paper-faint); color:var(--paper-faint); }
.status-pill.landmark{ border-color:var(--crimson-br); color:var(--crimson-br); }
.empty-state{ padding:60px 20px; text-align:center; color:var(--paper-faint); font-family:var(--mono); font-size:0.85rem; grid-column:1/-1; background:var(--ink); }

/* MODAL */
.modal-overlay{ position:fixed; inset:0; background:rgba(8,7,6,0.86); z-index:200; display:flex; align-items:flex-start; justify-content:center; overflow-y:auto; padding:32px 16px; }
.modal{ background:var(--ink); color:var(--paper); border:1px solid var(--rule); max-width:840px; width:100%; margin:auto; padding-bottom:48px; }
.modal-top{ display:flex; justify-content:space-between; align-items:center; padding:18px 28px; border-bottom:1px solid var(--rule); position:sticky; top:0; background:var(--ink); z-index:2; }
.modal-close{ background:none; border:1px solid var(--rule); color:inherit; font-family:var(--mono); font-size:0.8rem; padding:8px 12px; cursor:pointer; }
.modal-close:hover{ border-color:var(--crimson-br); color:var(--crimson-br); }
.modal-body{ padding:30px 28px 0; }
.modal-body h2{ font-size:clamp(1.6rem,3.4vw,2.2rem); margin-bottom:8px; }
.modal-meta{ font-family:var(--mono); font-size:0.78rem; color:var(--paper-faint); }
.modal-section{ border-top:1px solid var(--rule); padding:22px 0; }
.modal-section h4{ font-family:var(--mono); font-size:0.85rem; letter-spacing:0.05em; color:var(--gold); margin-bottom:10px; }
.modal-section p{ color:var(--paper-dim); font-size:0.95rem; }
.modal-sources{ font-size:0.85rem !important; color:var(--paper-faint) !important; }

/* TIMELINE */
.timeline{ margin-left:6px; padding-left:34px; border-left:1px solid var(--rule); }
.tl-node{ position:relative; padding-bottom:44px; }
.tl-node:last-child{ padding-bottom:0; }
.tl-node::before{ content:''; position:absolute; left:-40px; top:4px; width:11px; height:11px; border-radius:50%; background:var(--ink-soft); border:2px solid var(--crimson-br); }
.tl-year{ font-family:var(--mono); color:var(--gold); font-size:0.85rem; }
.tl-node h4{ font-size:1.3rem; margin-top:6px; }
.tl-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; margin-top:16px; }
@media (max-width:760px){ .tl-grid{ grid-template-columns:1fr; } }
.tl-grid span{ display:block; font-family:var(--mono); font-size:0.68rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--paper-faint); margin-bottom:6px; }
.tl-grid p{ font-size:0.9rem; color:var(--paper-dim); }

/* REFORMS TABLE */
.pr-scroll{ overflow-x:auto; border:1px solid var(--rule); }
.pr-table{ width:100%; min-width:760px; border-collapse:collapse; }
.pr-table th{ text-align:left; font-family:var(--mono); font-size:0.7rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--paper-faint); padding:12px 14px; border-bottom:1px solid var(--rule); }
.pr-table td{ padding:16px 14px; border-bottom:1px solid var(--rule-lite); font-size:0.9rem; vertical-align:top; color:var(--paper-dim); }
.pr-table tr:last-child td{ border-bottom:none; }
.pr-table tr:hover td{ background:var(--ink); }
.pr-table .rname{ font-family:var(--serif); font-size:1.02rem; color:var(--paper); }
.status-mark{ font-family:var(--mono); font-weight:700; font-size:0.85rem; white-space:nowrap; }
.status-mark.impl{ color:var(--ok); }
.status-mark.partial{ color:var(--warn); }
.status-mark.fail{ color:var(--fail); }
.status-mark.unknown{ color:var(--paper-faint); }

/* PANELS & STATS */
.panel-grid,.stat-grid{ display:grid; gap:1px; background:var(--rule); border:1px solid var(--rule); }
.panel-grid{ grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr)); }
.stat-grid{ grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr)); }
.panel,.stat{ background:var(--ink); padding:26px 22px; }
.on-rule .panel,.on-rule .stat{ background:var(--ink-soft); }
.panel h4{ font-size:1.1rem; margin-bottom:14px; }
.panel ul{ padding:0; list-style:none; }
.panel li{ font-size:0.87rem; color:var(--paper-dim); padding:8px 0; border-top:1px solid var(--rule-lite); }
.panel li:first-child{ border-top:none; }
.stat .num{ font-family:var(--serif); font-size:clamp(2rem,3.4vw,2.6rem); line-height:1.15; overflow-wrap:anywhere; }
.stat .lbl{ font-size:0.86rem; color:var(--paper-dim); margin-top:8px; }
.stat .src{ font-family:var(--mono); font-size:0.68rem; color:var(--paper-faint); margin-top:14px; }

/* QUESTIONS & SOURCES */
.q-item{ border-top:1px solid var(--rule); padding:24px 0; font-family:var(--serif); font-size:clamp(1.15rem,2.4vw,1.55rem); max-width:56ch; }
.q-item:last-child{ border-bottom:1px solid var(--rule); }
.source-item{ border-top:1px solid var(--rule); padding:18px 0; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px 24px; align-items:baseline; }
.source-item:last-child{ border-bottom:1px solid var(--rule); }
.source-item .t{ font-size:0.95rem; }
.source-item .o{ font-family:var(--mono); font-size:0.72rem; color:var(--paper-faint); text-align:right; }
@media (max-width:720px){ .source-item{ grid-template-columns:1fr; } .source-item .o{ text-align:left; } }

/* FINALE & FOOTER — hamesha dark rehte hain */
.finale{ background:#0a0908; text-align:center; padding:120px 0; }
.finale p{ font-family:var(--serif); font-size:clamp(1.3rem,3.6vw,2.2rem); margin:12px 0; color:#ece5d8; }
.finale .final-line{ margin-top:64px; font-family:var(--mono); font-size:clamp(0.85rem,2vw,1rem); letter-spacing:0.14em; color:#c9a24f; line-height:2.2; }
footer{ background:#0a0908; border-top:1px solid #3c3733; padding:48px var(--edge) 40px; text-align:center; color:#ece5d8; }
footer .brand{ font-size:1.3rem; }
footer .brand span{ color:#c24a44; }
footer p{ color:#8a8175; font-size:0.85rem; margin-top:10px; }
footer p.copyright{ margin-top:20px; font-size:0.75rem; }

/* BACK TO TOP */
#back-top{ position:fixed; bottom:20px; right:20px; z-index:60; background:var(--ink-soft); border:1px solid var(--rule); color:var(--paper); width:44px; height:44px; cursor:pointer; font-size:1.1rem; }
#back-top:hover{ border-color:var(--gold); color:var(--gold); }

@media (max-width:640px){
  section{ padding:60px 0; }
  .hero{ padding:52px 0 40px; }
  .filter-count{ margin-left:0; width:100%; }
  .filter-select{ flex:1 1 100%; }
  .modal-top,.modal-body{ padding-left:20px; padding-right:20px; }
}
`;