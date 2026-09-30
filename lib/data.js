// ===== DATA FILE =====
// Apni purani script.js se CASES, REFORMS, TIMELINE, SOURCES arrays yahan copy-paste karo
// (bas `const` ki jagah `export const` likhna hai). Format bilkul same rehta hai.

export const FACT_STATUS = {
  verified: 'VERIFIED — supported by reliable primary documentation (court records, government documents, official reports).',
  reported: 'REPORTED — reported by credible media; not yet confirmed by a primary/legal source.',
  alleged: 'ALLEGED — an accusation that has not been established in a judicial process.',
  court: 'COURT FINDING — established through a judicial proceeding.',
  disputed: 'DISPUTED — accounts differ, or the matter remains contested, including by those involved.',
  ongoing: 'ONGOING — the legal or investigative process is still underway.',
};

// Sample entry (Mathura) taaki site out-of-the-box chale. Baaki cases paste karo.
export const CASES = [
  {
    id: 'mathura-1972', title: 'Mathura Custodial Rape Case', year: 1972, era: '1970s',
    location: 'Chandrapur, Maharashtra', type: 'Custodial violence', status: 'landmark',
    desc: "A young woman was allegedly raped by policemen inside a police station; the Supreme Court's 1979 acquittal of the accused ignited a nationwide protest movement.",
    sections: {
      what: 'In 1972, a young woman named Mathura was allegedly raped by two policemen on the premises of a police station in Maharashtra, where she and her family had gone in connection with a complaint filed by her brother.',
      who: 'Mathura, reported to be a young Adivasi woman in her teens at the time.',
      investigation: 'A trial court initially acquitted the accused; the Bombay High Court convicted them on appeal.',
      police: "The alleged assault took place inside a police station, raising questions about custodial safety that shaped the case's later significance.",
      court: 'In 1979, the Supreme Court (Tuka Ram and Anr. v. State of Maharashtra) set aside the High Court conviction and acquitted the accused, reasoning that the absence of visible injury suggested consent \u2014 a judgment that was widely criticised by lawyers and women\u2019s rights groups.',
      public: 'Four law professors published an open letter criticising the judgment, and the case catalysed the country\u2019s modern anti-rape movement.',
      government: 'Public pressure led to legislative review of rape law by Parliament.',
      changed: 'The Criminal Law (Amendment) Act, 1983 introduced provisions on custodial rape, shifted the burden of proof in some circumstances, and made it an offence to disclose a survivor\u2019s identity.',
      notchanged: 'Campaigners have long argued that convictions in custodial-violence cases remained rare relative to reported incidents in the decades that followed.',
      current: 'Referenced as a foundational case in Indian sexual-violence jurisprudence.',
      tags: ['court', 'verified'],
    },
  },
];

export const REFORMS = [
  // { name, promise, implementation, evidence, status: 'impl' | 'partial' | 'fail' | 'unknown' }
];

export const TIMELINE = [
  // { year, title, what, promise, changed }  (title == CASES title ho to auto-link ban jayega)
];

export const SOURCES = [
  { t: 'Tuka Ram and Anr. v. State of Maharashtra (1979)', o: 'Supreme Court of India \u2014 judgment' },
  // baaki sources paste karo
];

// Memorial: `case` = CASES ka id (click par uska page khulega). Jo id CASES me nahi hai, wo link nahi banni chahiye.
export const MEMORIAL = [
  { year: '1972', name: 'Mathura', text: 'A young Adivasi woman whose case catalyzed the modern anti-rape movement in India.', case: 'mathura-1972' },
  { year: '1990', name: 'Ruchika Girhotra', text: 'A 14-year-old tennis player whose family faced systemic intimidation after reporting abuse.', case: 'ruchika-1990' },
  { year: '1996', name: 'Priyadarshini Mattoo', text: 'A law student whose pursuit of justice exposed deep flaws in prosecutorial independence.', case: 'priyadarshini-mattoo-1996' },
  { year: '1999', name: 'Jessica Lal', text: "A model whose tragic death became a defining moment for civil society's demand for witness protection.", case: 'jessica-lal-1999' },
  { year: '2012', name: 'Nirbhaya', text: 'A 23-year-old student whose name became synonymous with the fight for systemic legal reform.', case: 'nirbhaya-2012' },
  { year: '2024', name: 'Trainee Doctor, Kolkata', text: 'A medical professional whose death sparked a nationwide movement for hospital workplace safety.', case: 'rgkar-2024' },
  { year: 'PROTECTED', name: 'Anonymous Survivors', text: 'A survivor whose identity remains protected. Her courage to speak is recorded here with absolute respect.' },
];
