export interface Milestone {
  id: string
  date: string // ISO
  title: string
  detail: string
  kind: 'prep' | 'test' | 'docs' | 'visa' | 'life'
}

/** Personal plan for a Winter Semester 2027/28 start. Program deadlines are merged in automatically. */
export const milestones: Milestone[] = [
  { id: 'm-shortlist', date: '2026-10-05', kind: 'prep', title: 'Finalise your shortlist', detail: 'Apply widely: 8–10 programs. Programs that check requirements rather than rank grades (RWTH, KIT, THI, Chemnitz) suit you best. Watch the hard minimum grades: Siegen 3.0 and UDE 2.5 on the German scale. Star them on the Programs page.' },
  { id: 'm-grades', date: '2026-10-06', kind: 'prep', title: 'Push your grades up this year', detail: 'Most programs judge you on your average when you apply (Jan–Jul 2027), not the final one. Each strong exam now moves you up from 2.17. That matters most at the programs with minimum grades (Siegen 3.0, UDE 2.5) and those that rank or score grades (TUM, TUHH, Esslingen, Stuttgart). RWTH and KIT check requirements instead, but you must pass Hydraulics and Electronics. Ask for a transcript that shows the upward trend.' },
  { id: 'm-gre-prep', date: '2026-10-10', kind: 'test', title: 'Start GRE prep (8–10 weeks)', detail: 'Only RWTH requires it, but it is your 1st choice and its minimums (V145 / Q160 / AW3.0) are a pass/fail gate. Target: Quant 165+, Verbal 150+, Writing 3.5+, so one bad day doesn\'t put you under a minimum. Where a portal lets you upload extra documents, add the score report elsewhere too.' },
  { id: 'm-ielts-prep', date: '2026-10-10', kind: 'test', title: 'Start IELTS Academic prep', detail: 'Target an overall 7.0. That covers Stuttgart\'s C1 requirement and every other program on this list (most need 6.0–6.5).' },
  { id: 'm-docs-request', date: '2026-10-20', kind: 'docs', title: 'Request documents from your university', detail: 'English transcript with ECTS and the grading scale, an English module handbook (course descriptions), and an "expected graduation" letter. For Esslingen, also a class-rank certificate.' },
  { id: 'm-lor', date: '2026-11-01', kind: 'docs', title: 'Give your recommenders everything they need', detail: 'Zaza Metreveli and Harald Glückler: send your CV, a list of programs and deadlines, and 3–4 things you would like them to mention. Ask for signed PDFs on letterhead by early January 2027. Prof. Natour writes his letter during or after the February internship (see "Me" → Recommendation letters).' },
  { id: 'm-juelich', date: '2027-02-01', kind: 'prep', title: '🔬 Internship at Forschungszentrum Jülich (ITE)', detail: 'Keep notes on what you simulate (FEA, thermal, flow), which tools you use and what results you get. You will need these for your CV, motivation letters and interviews. Early in the month, ask Prof. Natour whether he can write your letter before 1 March for RWTH, and tell him your later deadlines (TUM, THI, KIT). Aachen is only about 30 km away, so visit RWTH and ika while you are there.' },
  { id: 'm-internship-check', date: '2026-11-10', kind: 'docs', title: 'Confirm your internships count at RWTH (ika) and KIT', detail: 'Both require an industrial internship (KIT: 12 weeks). Your 6-month Nasolutions internship should cover it. Email them the dates, hours and tasks to be sure, and mention the Jülich internship as extra research experience.' },
  { id: 'm-nasolutions-cert', date: '2026-12-15', kind: 'docs', title: 'Get an internship certificate from Nasolutions', detail: 'Signed, on company letterhead, in English: start and end dates, hours per week, and your tasks (CNC milling on aluminium, steel and titanium; reverse engineering; the 6-axis welding robot arm). If the internship is still running, ask for an interim certificate so you can use it for the January and February deadlines. Also photograph or render parts you made, if the company allows it.' },
  { id: 'm-ielts', date: '2026-11-21', kind: 'test', title: 'Take IELTS', detail: 'Book early, because test dates in Tbilisi fill up. Computer-delivered results arrive in about 3–5 days, which leaves time to retake before January.' },
  { id: 'm-gre', date: '2026-12-12', kind: 'test', title: 'Take the GRE General Test', detail: 'Official scores reach universities about 8–10 days after the test. Taking it by mid-December leaves room for a retake before RWTH\'s 1 March deadline.' },
  { id: 'm-sop', date: '2026-12-20', kind: 'docs', title: 'Write your CV and motivation letters', detail: 'Story: design (CSWP) + simulation (Jülich FEA/CFD, 6-DOF Python) + hardware and control (ESP32, sumo robots, BattleBots) → motorsport. Tailor each letter: name the institute, the Formula Student team and 2–3 modules. See "Me" for tips.' },
  { id: 'm-german', date: '2027-01-10', kind: 'test', title: 'Get an official German certificate (A2 → B1)', detail: 'TU Chemnitz and RPTU (CVT) want a German A1+ certificate with the application, and it must come from Goethe, telc or ÖSD. Esslingen needs A2 by the 2nd semester, and UDE\'s ISE programs need B2. Take the Goethe A2 or B1 exam in Tbilisi early in 2027; it also helps with jobs and daily life.' },
  { id: 'm-graduate', date: '2027-06-30', kind: 'docs', title: 'Graduate and get your final documents', detail: 'Final transcript, diploma and diploma supplement, with certified copies and translations.' },
  { id: 'm-blocked', date: '2027-07-01', kind: 'visa', title: 'Open a blocked account (Sperrkonto)', detail: '€11,904 for 12 months (€992/month) is the 2026 rate. Check the 2027 amount before paying it in. A DAAD scholarship award letter can replace it.' },
  { id: 'm-visa', date: '2027-07-05', kind: 'visa', title: 'Book the national (D) study visa appointment', detail: 'German Embassy Tbilisi. Book as soon as your first admission letter arrives, because waiting times can be long. You need: admission letter, blocked account, health insurance, CV, certificates.' },
  { id: 'm-housing', date: '2027-07-15', kind: 'life', title: 'Apply for student housing', detail: 'Apply to the Studierendenwerk dorms right after admission, since waiting lists are long in Munich, Stuttgart, Hamburg and Aachen. Look at WG-Gesucht as well.' },
  { id: 'm-insurance', date: '2027-08-15', kind: 'visa', title: 'Get health insurance and book flights', detail: 'Public statutory health insurance (e.g. TK, AOK) is mandatory for students under 30: about €146 per month in 2026 (TK, including long-term care insurance). You need proof of insurance to enrol.' },
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
  'Internship certificates (Nasolutions; Jülich once finished)',
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
export const HEALTH_INSURANCE_MONTH = 146
