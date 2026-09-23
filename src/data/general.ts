export interface Milestone {
  id: string
  date: string // ISO
  title: string
  detail: string
  kind: 'prep' | 'test' | 'docs' | 'visa' | 'life'
}

/** Personal plan for a Winter Semester 2027/28 start. Program deadlines are merged in automatically. */
export const milestones: Milestone[] = [
  { id: 'm-shortlist', date: '2026-10-05', kind: 'prep', title: 'Finalise your shortlist', detail: 'With a GPA around 2.9, apply widely: 8–10 programs, with no more than 3 reaches, 4 targets and at least 2–3 safeties (Siegen, Chemnitz, Duisburg-Essen). Star them on the Programs page.' },
  { id: 'm-grades', date: '2026-10-06', kind: 'prep', title: 'Push your grades up this year', detail: 'Most programs judge you on your average when you apply (Jan–Jul 2027), not the final one. Each strong exam now moves you from 2.5 toward 2.9+ and directly improves your chances at KIT, Stuttgart and RWTH. Ask for a transcript that shows the upward trend.' },
  { id: 'm-gre-prep', date: '2026-10-10', kind: 'test', title: 'Start GRE prep (8–10 weeks)', detail: 'Only RWTH requires it, but it is your 1st choice, and with average grades a high Quant score is your best way to stand out. Target: Quant 165+, Verbal 150+, Writing 3.5+. RWTH\'s minimums are V145 / Q160 / AW3.0. Where a portal lets you upload extra documents, add the score report elsewhere too.' },
  { id: 'm-ielts-prep', date: '2026-10-10', kind: 'test', title: 'Start IELTS Academic prep', detail: 'Target an overall 7.0. That covers Stuttgart\'s C1 requirement and every other program on this list (most need 6.0–6.5).' },
  { id: 'm-docs-request', date: '2026-10-20', kind: 'docs', title: 'Request documents from your university', detail: 'English transcript with ECTS and the grading scale, an English module handbook (course descriptions), and an "expected graduation" letter. For Esslingen, also a certificate showing your class rank (top 35%).' },
  { id: 'm-lor', date: '2026-11-01', kind: 'docs', title: 'Ask for 2–3 recommendation letters', detail: 'Give each person your CV, target programs and deadlines. Ask a professor (Automotive Theory, Machine Elements or FEM) and your senior-project supervisor. Your Jülich internship is in February 2027: its reference arrives too late for Stuttgart, TUHH, UDE and RPTU, but in time for RWTH (1 Mar, tight), Siegen, TUM, THI and KIT. A Helmholtz reference carries a lot of weight.' },
  { id: 'm-juelich', date: '2027-02-01', kind: 'prep', title: '🔬 Internship at Forschungszentrum Jülich (ITE)', detail: 'Keep notes on what you simulate (FEA, thermal, flow), which tools you use and what results you get. You will need these for your CV, motivation letters and interviews. Ask your supervisor for a recommendation letter before you leave. Aachen is only about 30 km away, so visit RWTH and ika while you are there.' },
  { id: 'm-internship-check', date: '2026-11-10', kind: 'docs', title: 'Ask RWTH (ika) and KIT whether the Jülich internship counts', detail: 'Both require an industrial internship (KIT: 12 weeks). Email them the dates, the institute (ITE) and your tasks, and ask whether a research-institute internship is accepted.' },
  { id: 'm-ielts', date: '2026-11-21', kind: 'test', title: 'Take IELTS', detail: 'Book early, because test dates in Tbilisi fill up. Computer-delivered results arrive in about 3–5 days, which leaves time to retake before January.' },
  { id: 'm-gre', date: '2026-12-12', kind: 'test', title: 'Take the GRE General Test', detail: 'Official scores reach universities about 8–10 days after the test. Taking it by mid-December leaves room for a retake before RWTH\'s 1 March deadline.' },
  { id: 'm-sop', date: '2026-12-20', kind: 'docs', title: 'Write your CV and motivation letters', detail: 'Story: design (CSWP) + simulation (Jülich FEA/CFD, 6-DOF Python) + hardware and control (ESP32, sumo robots, BattleBots) → motorsport. Tailor each letter: name the institute, the Formula Student team and 2–3 modules. See "Me" for tips.' },
  { id: 'm-german', date: '2027-01-10', kind: 'life', title: 'Keep studying German (A2 → B1)', detail: 'You don\'t need it for admission to these programs, but it helps at RPTU, with part-time jobs, internships and daily life.' },
  { id: 'm-graduate', date: '2027-06-30', kind: 'docs', title: 'Graduate and get your final documents', detail: 'Final transcript, diploma and diploma supplement, with certified copies and translations.' },
  { id: 'm-blocked', date: '2027-07-01', kind: 'visa', title: 'Open a blocked account (Sperrkonto)', detail: '€11,904 for 12 months (€992/month) was the 2025–2026 rate. Check the 2027 amount before paying it in.' },
  { id: 'm-visa', date: '2027-07-05', kind: 'visa', title: 'Book the national (D) study visa appointment', detail: 'German Embassy Tbilisi. Book as soon as your first admission letter arrives, because waiting times can be long. You need: admission letter, blocked account, health insurance, CV, certificates.' },
  { id: 'm-housing', date: '2027-07-15', kind: 'life', title: 'Apply for student housing', detail: 'Apply to the Studierendenwerk dorms right after admission, since waiting lists are long in Munich, Stuttgart, Hamburg and Aachen. Look at WG-Gesucht as well.' },
  { id: 'm-insurance', date: '2027-08-15', kind: 'visa', title: 'Get health insurance and book flights', detail: 'Public statutory health insurance (e.g. TK, AOK) is mandatory for students under 30. You need proof of insurance to enrol.' },
  { id: 'm-arrive', date: '2027-09-25', kind: 'life', title: 'Arrive in Germany', detail: 'Register your address (Anmeldung) within 14 days, enrol at the university, and get your residence permit.' },
  { id: 'm-start', date: '2027-10-11', kind: 'life', title: 'Winter semester 2027/28 lectures begin', detail: 'Most universities start lectures in mid-October. Some have orientation weeks earlier.' },
  { id: 'm-fs', date: '2027-10-25', kind: 'life', title: 'Join the Formula Student team 🏁', detail: 'Teams recruit at the start of the winter semester. Offer your strengths: FEA/CFD of components (from Jülich), SolidWorks CSWP design, or driverless/embedded (ESP32 control). Then look for a student job (HiWi) at a vehicle institute.' },
]

export const baseDocuments = [
  'Passport (valid through your studies)',
  'Georgian school-leaving certificate (Atestati) + translation',
  'Bachelor transcript of records (current, with ECTS & grading scale)',
  'Expected-graduation letter (until you receive your diploma)',
  'Module handbook / course descriptions in English',
  'Curriculum overview (the program structure sheet)',
  'CV (tabular / Europass)',
  'Motivation letter (tailored per program)',
  'Recommendation letter(s)',
  'IELTS Academic certificate',
  'Certified copies & certified translations',
] as const

export const tests = [
  {
    id: 'ielts',
    name: 'IELTS Academic',
    target: 'Overall 7.0 (no band below 6.5)',
    why: 'Your bachelor\'s is taught in Georgian, so every program needs an English test. 7.0 covers them all: Stuttgart FAME asks for C1 (≈7.0), TUHH 6.5, and most others 6.0–6.5.',
    cost: 'Check the current price with IDP / British Council Georgia',
    validity: '2 years',
    url: 'https://ielts.org/',
  },
  {
    id: 'gre',
    name: 'GRE General Test',
    target: 'Quant 165+ · Verbal 150+ · Writing 3.5+',
    why: 'Mandatory for RWTH Automotive Engineering (non-EU degree): minimums are V145 / Q160 / AW3.0. None of the other programs on your list requires it.',
    cost: '≈ US$220',
    validity: '5 years',
    url: 'https://www.ets.org/gre.html',
  },
] as const

export const generalLinks = [
  { label: 'uni-assist (document pre-check for many universities)', url: 'https://www.uni-assist.de/en/' },
  { label: 'DAAD: international programmes database', url: 'https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/' },
  { label: 'German Embassy Tbilisi: study visa', url: 'https://tiflis.diplo.de/' },
  { label: 'Federal Foreign Office: visa & blocked account info', url: 'https://www.auswaertiges-amt.de/en/visa-service' },
  { label: 'DAAD scholarships', url: 'https://www.daad.de/en/studying-in-germany/scholarships/' },
  { label: 'WG-Gesucht (shared flats)', url: 'https://www.wg-gesucht.de/en/' },
]

export const BLOCKED_ACCOUNT_YEAR = 11904
export const HEALTH_INSURANCE_MONTH = 140
