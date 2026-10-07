/* ============================================================
   DATA & CONSTANTS — records jaisi thi waisi hi hain, koi change nahi
   ============================================================ */
export const FACT_STATUS: Record<string, string> = {
  verified: "VERIFIED — supported by reliable primary documentation (court records, government documents, official reports).",
  reported: "REPORTED — reported by credible media; not yet confirmed by a primary/legal source.",
  alleged: "ALLEGED — an accusation that has not been established in a judicial process.",
  court: "COURT FINDING — established through a judicial proceeding.",
  disputed: "DISPUTED — accounts differ, or the matter remains contested, including by those involved.",
  ongoing: "ONGOING — the legal or investigative process is still underway."
};

export type CaseStatus = 'investigation' | 'trial' | 'convicted' | 'acquitted' | 'appeal' | 'ongoing' | 'landmark';

export interface CaseData {
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

export const SECTION_LABELS: Record<string, string> = {
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

export const CASES: CaseData[] = [
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

export const REFORMS = [
  { name: "Criminal Law (Amendment) Act, 2013", promise: "Broadened the legal definition of rape, criminalised acid attacks, stalking and voyeurism, and introduced the death penalty for repeat offenders.", implementation: "Enacted into law and applied in subsequent prosecutions.", evidence: "Text of the Act; subsequent trial court judgments.", status: "partial" as const },
  { name: "Fast-track courts for sexual-offence cases", promise: "Dedicated fast-track courts announced after 2012 to reduce trial delays in rape cases.", implementation: "Established in phases in most states, with reported variation in caseload and staffing.", evidence: "State-level judicial data; periodic government statements to Parliament.", status: "partial" as const },
  { name: "POCSO Act amendments, 2019", promise: "Introduced the death penalty for aggravated penetrative sexual assault on children.", implementation: "Enacted into law and applied in subsequent cases.", evidence: "Text of the amendment; subsequent court judgments.", status: "impl" as const },
  { name: "Nirbhaya Fund", promise: "A dedicated central government fund for projects supporting women's safety (CCTV, emergency response, one-stop centres).", implementation: "Reports from parliamentary committees and the CAG have periodically noted delays in states utilising allocated funds.", evidence: "CAG and parliamentary standing committee reports.", status: "partial" as const },
  { name: "Public transport safety measures", promise: "Mandates for panic buttons, GPS tracking, and stricter driver-verification in public and app-based transport.", implementation: "Rules exist in several states, but enforcement has been repeatedly questioned after subsequent incidents.", evidence: "State transport department notifications; post-incident reporting.", status: "fail" as const },
];

export const REFORM_MARKS: Record<string, string> = {
  impl: "✓ Implemented",
  partial: "⚠ Partially Implemented",
  fail: "✕ Documented Failure",
  unknown: "? Insufficient Evidence",
};

export const TIMELINE = [
  { year: "1972", title: "Mathura Custodial Rape Case", what: "Alleged custodial rape; 1979 Supreme Court acquittal sparks the modern anti-rape movement.", promise: "Legal reform of rape law.", changed: "1983 amendments on custodial rape and burden of proof." },
  { year: "1992", title: "Bhanwari Devi Case", what: "Alleged gang rape of a government worker opposing child marriage.", promise: "Workplace protection for women.", changed: "1997 Vishaka Guidelines." },
  { year: "1997", title: "Vishaka Guidelines", what: "Supreme Court lays down binding workplace sexual-harassment guidelines.", promise: "Legislated protection.", changed: "POSH Act, 2013." },
  { year: "2012", title: "Nirbhaya Case", what: "Gang rape and murder on a moving Delhi bus; nationwide protests.", promise: "Sweeping legal reform.", changed: "Criminal Law (Amendment) Act, 2013; Justice Verma Committee reforms." },
  { year: "2018", title: "Kathua & Muzaffarpur", what: "Child rape-murder case and shelter-home abuse scandal.", promise: "Child-protection reform.", changed: "POCSO amendments introducing the death penalty for child rape." },
  { year: "2020", title: "Hathras Case", what: "Alleged gang rape and death of a young Dalit woman; contested night-time cremation.", promise: "Caste-sensitive investigation reform.", changed: "Renewed debate; outcomes still contested." },
  { year: "2024", title: "RG Kar Medical College Case", what: "Rape and murder of a trainee doctor inside her own hospital.", promise: "Hospital and workplace safety reform for medical staff.", changed: "One conviction secured; nationwide doctor protests over safety." },
  { year: "2026", title: "Delhi-NCR Sleeper Bus Case", what: "Alleged assault of a minor aboard a moving interstate sleeper bus.", promise: "Transport safety enforcement, repeatedly promised since 2012.", changed: "Investigation ongoing." }
];

export const SOURCES = [
  { t: "Tuka Ram and Anr. v. State of Maharashtra (1979)", o: "Supreme Court of India — judgment" },
  { t: "Vishaka and Ors. v. State of Rajasthan (1997)", o: "Supreme Court of India — judgment" },
  { t: "The Criminal Law (Amendment) Act, 2013", o: "Ministry of Law and Justice, Government of India" },
  { t: "Report of the Committee on Amendments to Criminal Law (Justice J.S. Verma Committee, 2013)", o: "Government of India" },
  { t: "Protection of Children from Sexual Offences (Amendment) Act, 2019", o: "Ministry of Law and Justice, Government of India" },
  { t: "National Crime Records Bureau — Crime in India (annual reports)", o: "Ministry of Home Affairs, Government of India" },
  { t: "Reporting on the 2026 Greater Noida–Delhi sleeper bus case", o: "Contemporary Indian news media — status developing" }
];

export const STATUS_LABELS: Record<CaseStatus, string> = {
  investigation: "Investigation", trial: "Trial", convicted: "Convicted",
  acquitted: "Acquitted", appeal: "Appeal", ongoing: "Ongoing", landmark: "Legal Landmark"
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cases", label: "Cases" },
  { href: "/timeline", label: "Timeline" },
  { href: "/reforms", label: "Reforms" },
  { href: "/accountability", label: "Accountability" },
  { href: "/statistics", label: "Statistics" },
  { href: "/sources", label: "Sources" },
];
