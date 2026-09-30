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

type CaseStatus = 'investigation' | 'trial' | 'convicted' | 'acquitted' | 'appeal' | 'ongoing' | 'landmark' | 'historical';

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
    id: "mathura-1972",
    title: "Mathura Custodial Rape Case",
    year: 1972,
    era: "1970s",
    location: "Chandrapur, Maharashtra",
    type: "Custodial violence",
    status: "landmark",
    desc: "A young Adivasi woman was allegedly raped by policemen inside a police station. The Supreme Court's later acquittal became a landmark moment in India's history of sexual-violence cases.",
    sections: {
      what: "In 1972, Mathura, a young Adivasi woman, was allegedly raped by two policemen inside a police station in Maharashtra, where she and her family had gone in connection with a complaint involving her brother.",
      who: "Mathura was reportedly a teenager at the time. Her case later became one of the most important examples of the difficulties faced by women seeking justice after custodial sexual violence.",
      investigation: "A trial court initially acquitted the accused. The Bombay High Court later convicted them on appeal.",
      police: "The alleged assault taking place inside a police station became central to the case's significance: a place expected to provide protection had itself become the setting of the alleged crime.",
      court: "In 1979, the Supreme Court in Tuka Ram and Anr. v. State of Maharashtra acquitted the accused. The reasoning surrounding consent and the absence of visible injuries was widely criticised by lawyers and women's rights groups.",
      public: "Four law professors published an open letter criticising the judgment. The case became a major catalyst for India's modern anti-rape movement.",
      government: "Public pressure eventually contributed to Parliament reviewing the law concerning rape and custodial sexual violence.",
      changed: "The Criminal Law (Amendment) Act, 1983 introduced specific provisions concerning custodial rape and changed important evidentiary rules in specified circumstances.",
      notchanged: "The case left a lasting question about how much protection a person can realistically expect when the institution responsible for protection is itself accused of abuse.",
      current: "Mathura remains one of the foundational cases in India's modern history of sexual-violence jurisprudence."
    }
  },

  {
    id: "rameeza-bee-1978",
    title: "Rameeza Bee Case",
    year: 1978,
    era: "1970s",
    location: "Hyderabad, Telangana",
    type: "Custodial violence",
    status: "landmark",
    desc: "The alleged custodial rape of Rameeza Bee and the death of her husband triggered major protests in Hyderabad and brought police violence into national discussion.",
    sections: {
      what: "In 1978, Rameeza Bee and her husband were taken into police custody in Hyderabad. Rameeza Bee alleged that she was raped while in custody, while her husband died after being detained.",
      who: "Rameeza Bee, a young woman whose case became associated with allegations of custodial sexual violence and police brutality.",
      investigation: "The incident generated an official investigation and intense public pressure.",
      police: "The allegations against police officers created widespread anger because the alleged violence occurred while the couple were under state custody.",
      court: "The case generated legal proceedings and became part of a wider debate over custodial violence and police accountability.",
      public: "Large protests took place in Hyderabad, with demonstrators demanding accountability and changes to police practices.",
      government: "The scale of the protests forced authorities to publicly confront allegations of police abuse.",
      changed: "The case became an important historical example of public mobilisation against custodial violence in India.",
      notchanged: "Decades later, allegations of custodial violence continue to appear in Indian human-rights discussions.",
      current: "Remembered as an important early case in India's history of protests against custodial abuse."
    }
  },

  {
    id: "phoolan-devi-1980",
    title: "Phoolan Devi and the Behmai Massacre",
    year: 1980,
    era: "1980s",
    location: "Behmai, Uttar Pradesh",
    type: "Sexual violence and mass killing",
    status: "historical",
    desc: "Phoolan Devi's life became one of India's most complex stories of caste, sexual violence, revenge, outlawry and politics.",
    sections: {
      what: "Phoolan Devi, from a poor Mallah family in Uttar Pradesh, was married as a child and later became associated with armed gangs in the Chambal region. She alleged that she had been subjected to repeated sexual violence and abuse before the 1981 Behmai killings.",
      who: "Phoolan Devi later became known as the 'Bandit Queen'. Her life was shaped by poverty, caste discrimination, child marriage, sexual violence and years spent outside the law.",
      investigation: "Following the Behmai killings, Phoolan Devi became one of India's most wanted fugitives. She eventually surrendered in 1983.",
      police: "Her years as an outlaw produced a nationwide manhunt, while her allegations of earlier abuse raised questions about how violence, caste and gender can intersect long before a person becomes a criminal defendant.",
      court: "Phoolan Devi was imprisoned for years without a completed trial for the Behmai killings. She was eventually released in 1994 after the Uttar Pradesh government withdrew the cases against her.",
      public: "She became a deeply polarising figure. Some viewed her as a symbol of resistance by an oppressed woman, while others focused on the violence attributed to her and the victims of the Behmai killings.",
      government: "Her surrender and subsequent release became matters of major political controversy. She later entered electoral politics.",
      changed: "Her story entered Indian popular culture and public debate as an extreme example of the relationship between caste, gender, poverty, violence and political power.",
      notchanged: "Her life also raises a difficult question: when someone experiences years of violence before becoming involved in violence themselves, where does society draw the line between victimhood, responsibility and justice?",
      current: "Phoolan Devi became a Member of Parliament before being assassinated in Delhi in 2001. Her life remains one of India's most controversial and widely discussed stories involving gender, caste and violence."
    }
  },

  {
    id: "bhanwari-devi-1992",
    title: "Bhanwari Devi Case",
    year: 1992,
    era: "1990s",
    location: "Bhateri, Rajasthan",
    type: "Sexual violence",
    status: "landmark",
    desc: "A government saathin worker was allegedly gang-raped after attempting to stop a child marriage. Her case became a defining story of institutional failure and women's resistance.",
    sections: {
      what: "Bhanwari Devi, a government-employed saathin in Rajasthan, was allegedly gang-raped in 1992 after working to prevent a child marriage as part of a government programme.",
      who: "Bhanwari Devi was a village-level social worker who continued speaking about the case despite the personal and social consequences.",
      investigation: "The case proceeded through the criminal justice system and attracted widespread criticism from women's organisations.",
      police: "Accounts surrounding the case described serious difficulties in the investigative and medical process.",
      court: "A Rajasthan sessions court acquitted the accused in 1995. The decision was strongly criticised by women's organisations.",
      public: "The case became the basis for a wider legal challenge concerning women's safety at work.",
      government: "The Supreme Court's Vishaka judgment established workplace sexual-harassment guidelines after the failure to adequately protect Bhanwari Devi.",
      changed: "The 1997 Vishaka Guidelines became India's first major judicial framework specifically addressing workplace sexual harassment.",
      notchanged: "The criminal case itself did not produce convictions of the accused, leaving a lasting contrast between institutional reform and individual justice.",
      current: "Bhanwari Devi remains a central figure in India's history of workplace sexual-harassment law and women's rights."
    }
  },

  {
    id: "priyadarshini-mattoo-1996",
    title: "Priyadarshini Mattoo Case",
    year: 1996,
    era: "1990s",
    location: "New Delhi",
    type: "Sexual violence and murder",
    status: "convicted",
    desc: "A law student was sexually assaulted and murdered in her home after years of alleged harassment and stalking, raising questions about influence, investigation and justice.",
    sections: {
      what: "Priyadarshini Mattoo, a 25-year-old law student, was found dead at her home in Delhi in 1996. The prosecution alleged that she had been stalked and harassed by Santosh Kumar Singh before her murder.",
      who: "Priyadarshini Mattoo was a young law student. Her case became one of the most closely followed criminal trials in Delhi.",
      investigation: "The investigation and prosecution faced criticism, particularly over the handling of evidence and the influence allegedly available to the accused's family.",
      police: "The case raised concerns about whether earlier complaints and allegations of harassment had been taken seriously enough.",
      court: "In 1999, a trial court acquitted the accused, citing reasonable doubt. The acquittal generated intense public criticism. The Delhi High Court later convicted him and sentenced him to death; the Supreme Court subsequently commuted the sentence to life imprisonment.",
      public: "The case received extensive media attention and became associated with public frustration over perceived failures in the criminal justice system.",
      government: "The case became part of a wider public debate about police investigations, influential accused persons and the ability of ordinary families to obtain justice.",
      changed: "The case became an important example of how persistent public scrutiny can accompany long-running criminal proceedings.",
      notchanged: "The initial acquittal left a painful question for the family: if the evidence existed but justice failed at one stage, how many families would have the resources to keep fighting?",
      current: "Santosh Kumar Singh was ultimately convicted and sentenced to life imprisonment."
    }
  },

  {
    id: "jessica-lal-1999",
    title: "Jessica Lal Murder Case",
    year: 1999,
    era: "1990s",
    location: "New Delhi",
    type: "Murder",
    status: "convicted",
    desc: "A model working at a Delhi party was shot dead after refusing to serve a man alcohol. The initial acquittal triggered extraordinary public pressure.",
    sections: {
      what: "Jessica Lal was working as a celebrity bartender at a private party in Delhi in April 1999. She was shot after refusing to serve alcohol after hours.",
      who: "Jessica Lal was a 34-year-old model and television personality. Her death became one of India's most prominent cases involving witness intimidation and public pressure.",
      investigation: "The investigation involved numerous witnesses, and several witnesses later became hostile or changed their accounts.",
      police: "The investigation attracted criticism over the handling of witnesses and evidence.",
      court: "A trial court acquitted Manu Sharma and other accused in 2006. The acquittal triggered enormous public anger. The Delhi High Court later convicted Sharma and sentenced him to life imprisonment, a decision upheld by the Supreme Court.",
      public: "Media campaigns and public protests turned the case into a national debate over whether powerful or well-connected accused persons could escape justice.",
      government: "The case placed enormous pressure on the criminal justice system to respond to public concerns about witness protection and prosecution.",
      changed: "The case became a landmark example of the role of media scrutiny and public pressure in criminal justice.",
      notchanged: "The initial acquittal demonstrated how fragile a prosecution can become when witnesses withdraw or evidence is contested.",
      current: "Manu Sharma was convicted and sentenced to life imprisonment and was released from prison in 2020 after remission."
    }
  },

  {
    id: "nitish-katara-2002",
    title: "Nitish Katara Murder Case",
    year: 2002,
    era: "2000s",
    location: "Ghaziabad, Uttar Pradesh",
    type: "Honour-related murder",
    status: "convicted",
    desc: "A young business executive was murdered after attending a wedding. The case became a landmark example of an honour-related killing involving powerful families.",
    sections: {
      what: "Nitish Katara was abducted after attending a wedding in Ghaziabad in February 2002. His body was later found in Uttar Pradesh.",
      who: "Nitish Katara was a young business executive whose relationship with a woman from a politically influential family became central to the prosecution's case.",
      investigation: "The investigation identified several accused and focused on the circumstances surrounding the abduction and killing.",
      police: "The case raised questions about influence and the ability of powerful families to affect criminal proceedings.",
      court: "The accused were convicted after a lengthy trial and appeals. The courts treated the murder as connected to the relationship between Katara and the daughter of a politically influential family.",
      public: "The case received extensive national attention because of its association with honour-based violence and political influence.",
      government: "The prolonged proceedings placed attention on whether ordinary victims could receive justice when the accused had powerful connections.",
      changed: "The case became a major reference point in discussions of honour killings and the criminalisation of relationships by families.",
      notchanged: "The long duration of proceedings demonstrated the distance between a crime being committed and a final judicial resolution.",
      current: "The principal accused were convicted and sentenced to lengthy imprisonment."
    }
  },

  {
    id: "nirbhaya-2012",
    title: "Nirbhaya Case",
    year: 2012,
    era: "2010-2014",
    location: "New Delhi",
    type: "Sexual violence and murder",
    status: "convicted",
    desc: "A brutal gang rape and assault on a moving bus became a national trauma. Millions took to the streets asking a question that went beyond one case: how safe are women in India?",
    sections: {
      what: "In December 2012, a 23-year-old physiotherapy student was subjected to a brutal sexual assault and severe physical violence aboard a moving private bus in Delhi. She later died from her injuries.",
      who: "A young student whose death became a symbol of India's wider struggle with violence against women.",
      investigation: "The investigation proceeded under enormous public scrutiny, with arrests and a chargesheet following rapidly.",
      police: "Delhi Police faced intense pressure over the investigation and over broader concerns about women's safety in the capital.",
      court: "Four adult accused were convicted and sentenced to death. Their convictions and sentences were upheld through the higher courts.",
      public: "Massive demonstrations spread across Delhi and other parts of India. Protesters demanded justice, safer public transport, better policing and accountability.",
      government: "The government established the Justice J.S. Verma Committee, which examined legal and institutional responses to sexual violence.",
      changed: "The Criminal Law (Amendment) Act, 2013 significantly changed India's legal framework around sexual offences.",
      notchanged: "The case changed laws, but the question that remained was much larger: can changing the law alone make a woman feel safe walking home, entering a bus or travelling at night?",
      current: "Four adult convicts were executed in 2020. One accused died in custody in 2013, while the juvenile offender was released after serving the maximum period permitted under the law at that time."
    }
  },

  {
    id: "unao-2017",
    title: "Unnao Rape Case",
    year: 2017,
    era: "2015-2019",
    location: "Unnao, Uttar Pradesh",
    type: "Sexual violence and political influence",
    status: "convicted",
    desc: "A teenager accused a sitting MLA of rape. The case later involved allegations of intimidation, an attack on the survivor's family and a fatal road crash.",
    sections: {
      what: "In 2017, a teenage girl from Unnao accused then-MLA Kuldeep Singh Sengar of rape. The case later became one of India's most closely watched examples of alleged political influence in a sexual-violence investigation.",
      who: "The survivor was a minor at the time of the alleged offence. Her identity is protected.",
      investigation: "The investigation became increasingly controversial after the survivor's family alleged pressure and intimidation.",
      police: "The initial response drew criticism over the handling of the survivor's allegations and the delay before decisive action against the accused.",
      court: "The Central Bureau of Investigation investigated the case. In 2019, a Delhi court convicted Kuldeep Singh Sengar of rape and sentenced him to life imprisonment.",
      public: "The case received nationwide attention, particularly after the survivor and her family continued to face danger while seeking justice.",
      government: "The Supreme Court transferred the trials from Uttar Pradesh to Delhi and ordered measures concerning the survivor's protection.",
      changed: "The case intensified public discussion about political influence, survivor protection and the independence of criminal investigations.",
      notchanged: "The case raised a painful question: what happens when the person accused of a serious crime is also a powerful public representative?",
      current: "Kuldeep Singh Sengar remains convicted in the rape case and has also faced conviction in connection with the death of the survivor's father."
    }
  },

  {
    id: "kathua-2018",
    title: "Kathua Case",
    year: 2018,
    era: "2015-2019",
    location: "Kathua, Jammu and Kashmir",
    type: "Child sexual violence and murder",
    status: "convicted",
    desc: "The rape and murder of an eight-year-old girl became a national controversy involving sexual violence, communal tensions, political mobilisation and demands for justice.",
    sections: {
      what: "In January 2018, an eight-year-old girl from a nomadic Muslim community disappeared in Kathua district. She was later found dead. The investigation alleged that she had been sexually assaulted and murdered.",
      who: "The victim was an eight-year-old child. Her identity is protected.",
      investigation: "The investigation was conducted by Jammu and Kashmir Police and resulted in charges against several accused.",
      police: "The case generated controversy over allegations of interference and the conduct of people associated with the accused.",
      court: "The trial was transferred from Jammu to Pathankot, Punjab. In 2019, the court convicted several accused, including three who received life sentences, while one accused was acquitted.",
      public: "The case triggered protests across India and became entangled with communal and political tensions.",
      government: "The Supreme Court transferred the trial outside Jammu and Kashmir after concerns about conducting a fair trial in the local environment.",
      changed: "The case intensified national discussion about crimes against children, communalisation of sexual violence and the protection of vulnerable communities.",
      notchanged: "The case demonstrated how quickly the identity of a victim can become secondary to political and communal conflict surrounding the crime.",
      current: "Several accused were convicted, while others were acquitted. Appeals and related proceedings have continued."
    }
  },

    {
    id: "priyanka-reddy-2019",
    title: "Priyanka Reddy Case",
    year: 2019,
    era: "2015-2019",
    location: "Shamshabad, Telangana",
    type: "Sexual violence and murder",
    status: "historical",
    desc: "The murder of a young veterinary doctor triggered enormous public anger over women's safety, policing and the fear of travelling alone at night.",
    sections: {
      what: "In November 2019, a 26-year-old veterinary doctor was killed near Hyderabad after being attacked by a group of men.",
      who: "She was a young veterinary doctor whose death generated an extraordinary public response across India.",
      investigation: "Police arrested four suspects shortly after the incident.",
      police: "The case received intense scrutiny over questions surrounding the response to the initial missing-person report and the events leading up to the discovery of her body.",
      court: "The four accused were killed in a police encounter in December 2019. The circumstances of the encounter subsequently became the subject of a separate judicial inquiry.",
      public: "Large crowds gathered to protest the killing and demand greater safety for women.",
      government: "The Telangana government faced pressure over women's safety and the policing of crimes against women.",
      changed: "The case intensified national discussion around emergency response, public transport, policing and women's safety after dark.",
      notchanged: "The encounter also created a second question: can justice be considered complete when suspects die before a criminal trial establishes their guilt?",
      current: "The police encounter itself was examined through a judicial commission, making the case a complex example of both sexual violence and the limits of extrajudicial responses."
    }
  },

  {
    id: "hathras-2020",
    title: "Hathras Case",
    year: 2020,
    era: "2020-2024",
    location: "Hathras, Uttar Pradesh",
    type: "Sexual violence",
    status: "convicted",
    desc: "A young Dalit woman died after an alleged assault. The handling of her body and the investigation became almost as controversial as the crime itself.",
    sections: {
      what: "A 19-year-old Dalit woman from Hathras was severely injured in September 2020 and later died at a Delhi hospital.",
      who: "The victim was a young Dalit woman from a rural family. Her identity is not reproduced here.",
      investigation: "The Uttar Pradesh government established a Special Investigation Team, and the Central Bureau of Investigation subsequently investigated the case.",
      police: "The police cremated the victim's body during the night. The family said they were not allowed to perform the final rites in the manner they wanted. The incident generated nationwide outrage.",
      court: "In 2023, a special court convicted one accused of culpable homicide not amounting to murder and offences under the Scheduled Castes and Scheduled Tribes law, while acquitting three others of the principal charges.",
      public: "The case triggered protests over caste, gender, police conduct and the treatment of the victim's family.",
      government: "The Uttar Pradesh government's handling of the case attracted intense scrutiny, including over restrictions around access to the village.",
      changed: "The case brought renewed attention to the intersection of caste and gender in sexual-violence cases.",
      notchanged: "The case left questions about how much control a grieving family has over what happens to their loved one's remains and how institutions respond when public pressure becomes overwhelming.",
      current: "The special court's 2023 judgment resulted in one conviction and three acquittals on the principal charges."
    }
  },

  {
    id: "manipur-2023",
    title: "Manipur Women Assault Case",
    year: 2023,
    era: "2020-Present",
    location: "Manipur",
    type: "Sexual violence during communal conflict",
    status: "investigation",
    desc: "A video showing two women being paraded naked during ethnic violence shocked India and drew attention to sexual violence during communal conflict.",
    sections: {
      what: "During the ethnic violence in Manipur in 2023, two women were publicly paraded naked and sexually assaulted by a mob. A video of the incident later circulated widely online.",
      who: "The survivors were women from the Kuki-Zo community. Their identities are protected.",
      investigation: "The incident came under investigation after the video brought international attention to the allegations.",
      police: "The delayed registration and handling of complaints became major subjects of criticism and public discussion.",
      court: "The Supreme Court took note of the incident and expressed serious concern about violence against women during the conflict.",
      public: "The video triggered widespread outrage across India and renewed attention to the treatment of women during communal and ethnic violence.",
      government: "The Union government and Manipur authorities faced intense scrutiny over the wider handling of the ethnic conflict and the protection of civilians.",
      changed: "The case highlighted how sexual violence can be used as a form of humiliation and intimidation during communal conflict.",
      notchanged: "The incident raised one of the darkest questions in the archive: what happens to justice when society itself is divided by violence?",
      current: "The criminal investigation and court proceedings have continued."
    }
  },

  {
    id: "rgkar-2024",
    title: "R.G. Kar Medical College Case",
    year: 2024,
    era: "2020-Present",
    location: "Kolkata, West Bengal",
    type: "Sexual violence and murder",
    status: "convicted",
    desc: "A postgraduate trainee doctor was found dead inside her hospital after an overnight shift. The case triggered nationwide protests by doctors demanding safety and accountability.",
    sections: {
      what: "In August 2024, a postgraduate trainee doctor was found dead inside R.G. Kar Medical College and Hospital in Kolkata after an overnight duty shift. The investigation treated the death as involving sexual violence.",
      who: "The victim was a young postgraduate medical trainee. Her identity is not reproduced here.",
      investigation: "Kolkata Police initially investigated the case before the Central Bureau of Investigation took over following court intervention and intense public pressure.",
      police: "The handling of the crime scene and the initial response by hospital authorities and police became subjects of intense public scrutiny.",
      court: "A trial court convicted one accused in January 2025 and sentenced him to life imprisonment.",
      public: "Resident doctors and medical professionals across India held protests and strikes demanding safer working conditions and stronger institutional accountability.",
      government: "The West Bengal government faced sustained criticism during the protests, while the Supreme Court became involved in broader questions surrounding medical-worker safety.",
      changed: "The case renewed national attention on security inside hospitals, especially for women working overnight shifts.",
      notchanged: "The conviction answered the question of one accused person's criminal responsibility, but broader questions about institutional failures and whether everything surrounding the incident was fully investigated continued.",
      current: "One accused has been convicted and sentenced to life imprisonment. Broader issues raised by the case have remained subjects of legal and public discussion."
    }
  },


  {
  id: "delhi-sleeper-bus-2026",

  title: "Delhi-NCR Sleeper Bus Case",

  year: 2026,

  era: "2025-Present",

  location: "Greater Noida → Delhi",

  type: "Sexual violence",

  status: "trial",

  desc: "The alleged sexual assault of a teenage girl on a sleeper bus travelling towards Delhi raised questions about passenger safety, surveillance and the protection of women travelling alone.",

  sections: {

    what: "In August 2026, a teenage girl travelling on a sleeper bus from Greater Noida towards Delhi was allegedly sexually assaulted inside the moving vehicle.",

    who: "The survivor was a teenage girl travelling by bus. Police identified and arrested two men in connection with the alleged assault.",

    investigation: "Police investigated the journey of the bus, questioned those connected with the vehicle and collected evidence as part of the case.",

    police: "The police response came under scrutiny over how the incident occurred inside a commercial passenger vehicle and whether adequate safeguards existed for passengers.",

    court: "The accused were arrested and a chargesheet was subsequently filed. The criminal case remains subject to judicial proceedings, and the allegations have not resulted in a final conviction.",

    public: "The case drew attention to the safety of women and minors using overnight and sleeper-bus services.",

    government: "The incident renewed questions about passenger safety measures, monitoring of sleeper buses and the enforcement of safeguards for women travelling by road.",

    changed: "The case added to wider discussion around CCTV coverage, driver and conductor accountability, emergency reporting mechanisms and safety inside long-distance buses.",

    notchanged: "The incident also raised a basic question about how much responsibility passenger transport operators should bear for preventing and responding to crimes occurring inside their vehicles.",

    current: "The case is before the courts. The accused remain subject to the criminal justice process, and the final outcome will depend on the proceedings and evidence presented before the court."

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
  investigation: "Investigation",
  trial: "Trial",
  convicted: "Convicted",
  acquitted: "Acquitted",
  appeal: "Appeal",
  ongoing: "Ongoing",
  landmark: "Legal Landmark",
  historical: "Historical"
};

const NAV_LINKS = [
  { href: "#hero", label: "The Silence", index: "01" },
  { href: "#archive", label: "The Cases", index: "02" },
  { href: "#timeline", label: "The Years", index: "03" },
  { href: "#reforms", label: "What Changed", index: "04" },
  { href: "#accountability", label: "Who Answered", index: "05" },
  { href: "#sources", label: "The Record", index: "06" },
];

const NAV_META = {
  left: "AFTER THE SILENCE",
  center: "AN OPEN ARCHIVE",
  right: "1972 — PRESENT",
};

<div className="nav-meta">
  <span className="nav-meta-left">
    {NAV_META.left}
  </span>

  <span className="nav-meta-center">
    <span className="nav-status-dot" />
    {NAV_META.center}
  </span>

  <span className="nav-meta-right">
    {NAV_META.right}
  </span>
</div>

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

/* ───────── NAV META ───────── */

.nav-meta {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  padding: 7px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  line-height: 1;
  text-transform: uppercase;
}

.nav-meta-left {
  justify-self: start;
  opacity: 0.55;
}

.nav-meta-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  opacity: 0.8;
}

.nav-meta-right {
  justify-self: end;
  opacity: 0.55;
}

.nav-status-dot {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
  animation: nav-pulse 2s ease-in-out infinite;
}

@keyframes nav-pulse {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}

/* ───────── MOBILE ───────── */

@media (max-width: 700px) {
  .nav-meta {
    grid-template-columns: 1fr auto;
    gap: 12px;
    padding: 6px 0;
  }

  .nav-meta-left {
    display: none;
  }

  .nav-meta-center {
    justify-self: start;
  }

  .nav-meta-right {
    justify-self: end;
  }
}
/* =========================================================
   AFTER THE SILENCE — GLOBAL ATMOSPHERE
   ========================================================= */

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* ───────── FILM GRAIN ───────── */

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.035;

  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");

  background-repeat: repeat;
  background-size: 180px 180px;
}

/* ───────── SCREEN VIGNETTE ───────── */

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9997;
  pointer-events: none;

  background:
    radial-gradient(
      ellipse at center,
      transparent 55%,
      rgba(0, 0, 0, 0.12) 100%
    );
}

/* ───────── TEXT SELECTION ───────── */

::selection {
  background: rgba(255, 255, 255, 0.16);
  color: inherit;
}

/* ───────── SCROLLBAR ───────── */

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

/* ───────── IMAGES ───────── */

img {
  display: block;
  max-width: 100%;

  transition:
    filter 500ms ease,
    transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

a:hover img,
button:hover img {
  filter: brightness(0.88) contrast(1.05);
}

/* ───────── LINKS ───────── */

a {
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

/* ───────── ACCESSIBILITY ───────── */

:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}

/* ───────── SECTION RULES ───────── */

.on-rule {
  position: relative;
}

.on-rule::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 0;
  height: 1px;

  background: currentColor;
  opacity: 0.18;

  transition:
    width 900ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.on-rule:hover::before {
  width: 100%;
}

/* ───────── REDUCED MOTION ───────── */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
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