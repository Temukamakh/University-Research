import type { Milestone } from '../../data/general'
import type { CvSection, Recommender } from '../../data/profile'
import type { ProfileConfig } from '../types'
import { nataliPrograms } from './programs'
import { nataliCurricula } from './curricula'

const milestones: Milestone[] = [
  { id: 'n-shortlist', date: '2026-10-05', kind: 'prep', title: 'Finalise your shortlist', detail: 'Pick 8–10 programs: 2–3 reaches (RWTH, KIT, Stuttgart INFOTECH), 4 targets and 2–3 safeties (Chemnitz, UDE, Deggendorf). Star them on the Programs page.' },
  { id: 'n-curriculum', date: '2026-10-08', kind: 'docs', title: 'Send your curriculum to the tracker', detail: 'Your course list with ECTS lets the app check RWTH, Paderborn, TU Dresden, TUHH and TU Wien\'s subject requirements. Watch in particular for electromagnetic field theory and systems theory.' },
  { id: 'n-rank', date: '2026-10-15', kind: 'docs', title: 'Get a class-rank certificate (top 5%)', detail: 'Your GPA looks average on paper, but top 5% of your class is excellent. An official letter from the faculty stating your rank puts the GPA in context everywhere you apply.' },
  { id: 'n-ielts-prep', date: '2026-10-10', kind: 'test', title: 'Start IELTS Academic prep', detail: 'Target 7.0 overall. TU Ilmenau and TU Graz require C1, which is about 7.0; most others need 6.0–6.5.' },
  { id: 'n-gre-prep', date: '2026-10-10', kind: 'test', title: 'Start GRE prep (8–10 weeks)', detail: 'Needed for RWTH (Quant in the top 15% of test takers, roughly 165+) and Paderborn (Q157+ and AW 4.0 desirable). A strong Quant score also offsets your GPA.' },
  { id: 'n-docs', date: '2026-10-20', kind: 'docs', title: 'Request documents from your university', detail: 'English transcript with ECTS and grading scale, English module descriptions, and an expected-graduation letter.' },
  { id: 'n-tugraz', date: '2026-12-01', kind: 'docs', title: 'Check TU Graz\'s admission procedure (by 15 December)', detail: 'Some TU Graz English master\'s programs require registration a year ahead, between 15 October and 15 December. Check whether Electrical and Electronics Engineering is one of them; if it is, register before 15 December 2026.' },
  { id: 'n-lor', date: '2026-11-01', kind: 'docs', title: 'Brief your recommenders', detail: 'Dr Zaza Metreveli and Akaki Paghava: send your CV, the program list with deadlines, and 3–4 points to mention (class rank, the ADCS CubeSat and noise-cancellation projects, the robotics lectures you gave). Ask for signed PDFs by mid-December.' },
  { id: 'n-ielts', date: '2026-11-21', kind: 'test', title: 'Take IELTS', detail: 'Results in 3–5 days (computer-delivered), leaving time for a retake before the January deadlines.' },
  { id: 'n-gre', date: '2026-12-12', kind: 'test', title: 'Take the GRE General Test', detail: 'Scores reach universities about 8–10 days later, in time for RWTH (1 March) and Paderborn (30 May).' },
  { id: 'n-sop', date: '2026-12-20', kind: 'docs', title: 'Write your CV and motivation letters', detail: 'Story: you design real electronics end to end, from an analogue clock and an ATmega Gameboy to autonomous sumo robots and a CubeSat attitude-control system, and you teach others. Tailor each letter to the program\'s specialisation.' },
  { id: 'n-cubesat', date: '2027-01-31', kind: 'prep', title: 'Document the CubeSat ADCS senior project', detail: 'Photos, block diagrams, test results. A one-page project summary makes a strong attachment, and it is great material for interviews.' },
  { id: 'n-anc', date: '2027-05-31', kind: 'prep', title: 'Active noise cancellation project', detail: 'Next semester\'s project, and a perfect talking point for signal-processing programs (FAU, TU Ilmenau).' },
  { id: 'n-graduate', date: '2027-06-30', kind: 'docs', title: 'Graduate and get your final documents', detail: 'Final transcript, diploma and diploma supplement, with certified copies and translations.' },
  { id: 'n-funds', date: '2027-07-01', kind: 'visa', title: 'Prepare proof of funds', detail: 'Germany: blocked account (€11,904 for 12 months is the 2026 rate; a DAAD award letter can replace it). Austria (TU Wien, TU Graz) has no blocked account: you show sufficient funds for the residence permit instead.' },
  { id: 'n-visa', date: '2027-07-05', kind: 'visa', title: 'Book the visa / residence permit appointment', detail: 'As soon as the first admission letter arrives. German Embassy Tbilisi for Germany; for Austria, the student residence permit (apply early, it can take months).' },
  { id: 'n-housing', date: '2027-07-15', kind: 'life', title: 'Apply for student housing', detail: 'Studierendenwerk dorms right after admission; waiting lists are long in Munich, Stuttgart, Hamburg and Vienna.' },
  { id: 'n-insurance', date: '2027-08-15', kind: 'visa', title: 'Get health insurance and book flights', detail: 'Public student insurance in Germany (≈ €146/month in 2026); Austrian students use the ÖGK student insurance.' },
  { id: 'n-arrive', date: '2027-09-25', kind: 'life', title: 'Arrive', detail: 'Register your address within the first days, enrol, and get your residence permit.' },
  { id: 'n-start', date: '2027-10-04', kind: 'life', title: 'Winter semester 2027/28 begins', detail: 'Austrian universities start in early October; German ones in mid-October.' },
]

const cv: CvSection[] = [
  {
    title: 'Projects',
    emoji: '🛠️',
    items: [
      { title: 'ADCS for a CubeSat (senior project, this semester)', detail: 'Attitude determination and control system.' },
      { title: 'Active noise cancellation (planned, next semester)', detail: 'Real-time signal processing.' },
      { title: 'Handheld Gameboy (junior project)', detail: 'Runs Snake on an ATmega168 microcontroller.' },
      { title: 'Fully analogue, hand-built timer and clock (junior project)' },
      { title: 'Metal detector (sophomore project)' },
      { title: 'Autonomous sumo robot' },
    ],
  },
  {
    title: 'Competitions',
    emoji: '🏆',
    items: [
      { title: '1st place: university sumo robot championship' },
      { title: '3rd place: national sumo robot championship' },
      { title: '4th place: national BattleBots championship (15 kg class)' },
    ],
  },
  {
    title: 'Leadership & teaching',
    emoji: '🏁',
    items: [
      { title: 'Organised an autonomous RC car race at the university', detail: 'Including bringing in sponsors.' },
      { title: 'Lectures on the foundations of robotics', detail: 'For first-year engineering students.' },
    ],
  },
  {
    title: 'Certifications',
    emoji: '📜',
    items: [
      { title: 'MATLAB certification' },
      { title: 'PCB circuit design' },
      { title: 'SOLIDWORKS CSWA' },
      { title: 'Several Coursera certificates' },
    ],
  },
  {
    title: 'Skills',
    emoji: '⚙️',
    items: [
      { title: 'Circuit design & simulation', detail: 'KiCad, Proteus, Multisim' },
      { title: 'Embedded', detail: 'Microcontrollers (AVR / Microchip Studio), FPGA' },
      { title: 'Programming', detail: 'C/C++, Python, MATLAB' },
      { title: 'CAD', detail: 'AutoCAD, SOLIDWORKS (CSWA)' },
      { title: 'Languages', detail: 'Georgian (native), English (IELTS planned), German (B1)' },
      { title: 'Research', detail: 'Research experience (details to add)' },
    ],
  },
]

const recommenders: Recommender[] = [
  {
    id: 'metreveli',
    name: 'Dr Zaza Metreveli',
    role: 'Dean of Engineering, Agricultural University of Georgia',
    why: 'The senior academic voice. He can confirm your top-5% class rank, which puts your GPA in context, and your competition results.',
    timing: 'Ask by November 2026 so the letter is ready for Stuttgart INFOTECH (early January) and every later deadline.',
    defaultStatus: 'planned',
  },
  {
    id: 'paghava',
    name: 'Akaki Paghava',
    role: 'Dean of Electrical Engineering, Agricultural University of Georgia',
    why: 'Your subject reference. He can speak about your electronics and signal-processing work and your projects (CubeSat ADCS, Gameboy, analogue clock).',
    timing: 'Ask by November 2026. Give him the list of programs and their specialisations so he can tailor the letter.',
    defaultStatus: 'planned',
  },
]

export const natali: ProfileConfig = {
  id: 'natali',
  name: 'Natali',
  field: 'Electrical & Electronics Engineering',
  tagline: 'Electronics · embedded',
  color: '#8b5cf6',
  goal: 'Electrical / electronics master\'s in Germany or Austria',
  hero: { cityOrGoal: 'your master\'s', afterShortlist: 'Circuits, signals and embedded systems ⚡' },
  researchedOn: 'September 2026',
  programsIntro:
    "English-taught electrical and electronics master's programs in Germany and Austria that match your interests, all within your €1,500-per-semester tuition budget.",
  programs: nataliPrograms.map((p) => ({ ...p, curriculum: nataliCurricula[p.id] })),
  focusMeta: {
    power: { label: 'Power & EV', emoji: '🔋' },
    electronics: { label: 'Electronics', emoji: '🔌' },
    embedded: { label: 'Embedded', emoji: '💾' },
    control: { label: 'Control & robotics', emoji: '🤖' },
    comms: { label: 'Signals & comms', emoji: '📡' },
  },
  path: {
    title: 'Labs, industry & student teams',
    short: 'Industry',
    emoji: '⚡',
    teamLabel: 'Student team to join',
    filterLabel: 'Strong industry & lab links',
    sortLabel: 'industry & lab links',
  },
  budgetPerSemester: 1500,
  defaults: {
    gpaNow: 2.88,
    gpaExpected: 3.0,
    german: 'B1',
    shortlist: ['kit-etit', 'stuttgart-infotech', 'fau-cme', 'tud-nano', 'rptu-esy', 'ilmenau-csp', 'tuwien-ecs', 'chemnitz-es', 'ude-ese'],
    compare: ['fau-cme', 'stuttgart-infotech', 'tuwien-ecs'],
  },
  storageKey: 'masters-tracker:v1:natali',
  edgeChips: [
    '🎓 Top 5% of your class',
    '🏆 1st: university sumo robots',
    '🥉 3rd: national sumo · 4th: BattleBots',
    '🛰️ CubeSat ADCS senior project',
    '🎮 ATmega168 Gameboy',
    '👩‍🏫 Taught robotics to first-years',
    '🇩🇪 German B1',
  ],
  dreamPicks: ['stuttgart-infotech', 'fau-cme'],
  dashboardNote:
    'In Germany 1.0 is the best grade and 4.0 is the lowest pass. At about 2.0–2.1 you are a solid applicant, and being in the top 5% of your class is a strong extra argument: get it in writing.',
  milestones,
  tests: [
    {
      id: 'ielts',
      name: 'IELTS Academic',
      target: 'Overall 7.0 (no band below 6.5)',
      why: 'Your bachelor\'s is taught in Georgian, so every program needs an English test. 7.0 covers the C1 programs (TU Ilmenau, TU Graz); most others need 6.0–6.5.',
      cost: 'Check the current price with IDP / British Council Georgia',
      validity: '2 years',
      url: 'https://ielts.org/',
    },
    {
      id: 'gre',
      name: 'GRE General Test',
      target: 'Quant 165+ · Verbal 150+ · Writing 4.0',
      why: 'Required for RWTH (Quant in the top 15%, roughly 165+; Verbal above the 15th percentile) and Paderborn (Q157+ and AW 4.0 desirable). A strong score also helps offset the GPA.',
      cost: '≈ US$220',
      validity: '5 years',
      url: 'https://www.ets.org/gre.html',
    },
  ],
  baseDocuments: [
    'Passport (valid through your studies)',
    'Georgian school-leaving certificate (Atestati) + translation',
    'Bachelor transcript of records (current, with ECTS & grading scale)',
    'Class-rank certificate (top 5%)',
    'Expected-graduation letter (until you receive your diploma)',
    'Module handbook / course descriptions in English',
    'CV (tabular / Europass)',
    'Motivation letter (tailored per program)',
    'Recommendation letters (Metreveli, Paghava)',
    'IELTS Academic certificate',
    'German B1 certificate from Goethe, telc or ÖSD (TU Chemnitz requires one)',
    'Project portfolio (CubeSat ADCS, Gameboy, analogue clock)',
    'Certified copies & certified translations',
  ],
  links: [
    { label: 'uni-assist (document pre-check for many German universities)', url: 'https://www.uni-assist.de/en/' },
    { label: 'DAAD: international programmes database', url: 'https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/' },
    { label: 'DAAD scholarships', url: 'https://www.daad.de/en/studying-in-germany/scholarships/' },
    { label: 'German Embassy Tbilisi: study visa', url: 'https://tiflis.diplo.de/' },
    { label: 'Study in Austria (OeAD)', url: 'https://studyinaustria.at/' },
    { label: 'TU Wien tuition fee info', url: 'https://www.tuwien.at/en/studies/admission/students-union-fee-and-tuition-fee/tuition-fee' },
  ],
  cv,
  storyTips: [
    {
      title: 'Lead with the class rank',
      text: 'A 2.88/4.0 GPA reads as average, but top 5% of your class says the grading is strict and you are among the best. Put it in your CV header, your motivation letter and ask both deans to mention it.',
    },
    {
      title: 'Show the full stack',
      text: 'Analogue (hand-built clock), digital and embedded (ATmega Gameboy, FPGA), control (sumo robots, CubeSat ADCS) and signal processing (noise cancellation). Few applicants can show all four.',
    },
    {
      title: 'Tailor it to each specialisation',
      text: 'FAU and TU Ilmenau: signal processing + noise cancellation. INFOTECH, RPTU, TU Wien, Chemnitz: embedded + Gameboy + FPGA. TU Dresden and TUHH: circuits + PCB design. RWTH, TU Graz: EV / power electronics.',
    },
    {
      title: 'Use numbers and photos',
      text: '"1st of N teams", "15 kg BattleBots class", "ADCS pointing accuracy of X°". Link a small online portfolio with photos of your builds.',
    },
    {
      title: 'Mention teaching and organising',
      text: 'Teaching robotics to first-years and running a sponsored autonomous RC race show leadership, which committees look for beyond grades.',
    },
  ],
  recommenders,
  scholarships: [
    {
      id: 'daad-master',
      fit: 'apply',
      note: "This is the one to go for. Top 5% of your class is exactly what DAAD looks for, and your CubeSat ADCS, noise-cancellation and robotics-teaching story fits the motivation letter well. Ask Dr Metreveli for the recommendation letter now, because the referee uploads it through the DAAD portal. Your IELTS is planned for 21 November, after the deadline, so book an earlier date or ask DAAD Tbilisi whether the certificate can follow.",
    },
    {
      id: 'boell',
      fit: 'stretch',
      note: 'Needs German B2 by 1 March 2027. You are at B1, so a B2 exam in January or February makes you eligible. Your robotics lectures and the RC race you organised are the kind of engagement they look for.',
    },
    {
      id: 'kas',
      fit: 'stretch',
      note: 'Also needs German B2. Apply either through the KAS office for the South Caucasus in Tbilisi, or after you arrive (15 July deadline). Only covers four-semester programs, which is most of your list.',
    },
    { id: 'deutschlandstipendium', fit: 'later', note: 'RWTH, KIT, FAU and TUHH all award it. Apply as soon as you are admitted, since your class rank is a strong argument.' },
    { id: 'austria-grants', fit: 'later', note: 'Only if you choose TU Wien or TU Graz. Both reward good first-year grades with merit scholarships.' },
    { id: 'fes', fit: 'later', note: 'Needs German C1 and enrolment in Germany, so it is a goal for your second year at the earliest.' },
    { id: 'stibet', fit: 'later', note: 'Useful in your thesis semester. Ask the International Office once you are enrolled.' },
    {
      id: 'daad-stem',
      fit: 'no',
      note: 'Your bachelor\'s had to be finished by today\'s deadline. If you ever take a gap year, the next round (September 2027) is worth a look.',
    },
    { id: 'daad-epos', fit: 'no', note: 'Needs 2 years of full-time work after the bachelor\'s.' },
  ],
  costsNote:
    'TU Wien and TU Graz charge non-EU students €726.72 per semester, and Austria has no blocked account: you show proof of funds for the residence permit instead.',
}
