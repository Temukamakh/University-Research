/**
 * Scholarships for a master's starting in winter semester 2027/28 (researched September 2026).
 * Official pages were not reachable from the research environment, so dates marked
 * `confirmed: false` come from secondary sources: check them on the linked official page.
 */
export type ScholarshipKind = 'daad' | 'foundation' | 'university' | 'austria'

export interface Scholarship {
  id: string
  name: string
  provider: string
  kind: ScholarshipKind
  /** What you get, in one line. */
  amount: string
  /** Monthly stipend in euros, for the headline number. */
  monthly?: number
  duration: string
  covers: string[]
  deadline?: { date: string; confirmed: boolean; note: string }
  /** When the application portal opens, in words. */
  opens?: string
  fundingStarts?: string
  eligibility: string[]
  documents: string[]
  /** How it usually goes after you apply. */
  process?: { when: string; what: string }[]
  links: { label: string; url: string }[]
}

export const SCHOLARSHIPS_RESEARCHED_ON = 'September 2026'

export const scholarships: Record<string, Scholarship> = {
  'daad-master': {
    id: 'daad-master',
    name: "Study Scholarships: Master Studies for All Academic Disciplines",
    provider: 'DAAD',
    kind: 'daad',
    amount: '€992 per month + insurance + travel + study allowance',
    monthly: 992,
    duration: '10–24 months (the standard length of your program)',
    covers: [
      '€992 monthly stipend',
      'Health, accident and personal liability insurance',
      'Travel allowance (unless your home country covers it)',
      'Annual study and research allowance',
      'Optional German course before the degree starts (funding then begins earlier)',
    ],
    deadline: {
      date: '2026-10-15',
      confirmed: false,
      note: 'Deadlines fall between October and November 2026 depending on your country. 15 October is the most common date and the safest to plan for. Select Georgia as your country in the DAAD scholarship database to see the exact date.',
    },
    opens: 'The DAAD portal is already open for this round (it opened in June 2026)',
    fundingStarts: '1 October 2027',
    eligibility: [
      'Final-year bachelor\'s students can apply. The degree must be finished before the scholarship starts (October 2027).',
      'Your last degree may be no more than 6 years old at the deadline.',
      'You may not have lived in Germany for more than 15 months at the deadline.',
      'Proof of language skills for the program\'s language (English → IELTS) is part of the application.',
      'Selection is mainly on academic record, with the motivation letter and the recommendation letter also weighed. Strong candidates are usually in the top third of their class.',
    ],
    documents: [
      'DAAD portal application form',
      'CV in table form (max. 3 pages)',
      'Motivation letter (why these programs, why Germany, your plans afterwards)',
      'Up to 3 chosen master\'s programs, in order of preference, with reasons',
      'Recommendation letter from a university teacher (uploaded by the referee through the portal)',
      'Transcript of records with the grading scale explained',
      'Language certificate (IELTS Academic)',
      'Bachelor\'s certificate, or current transcript if still studying',
    ],
    process: [
      { when: 'Oct–Nov 2026', what: 'Submit the application in the DAAD portal before midnight (CET) on the deadline' },
      { when: 'Winter 2026/27', what: 'Shortlisted applicants may be invited to an interview (often via the DAAD office in Tbilisi)' },
      { when: 'Spring 2027', what: 'Selection decision' },
      { when: 'Spring–summer 2027', what: 'Apply to the universities yourself. The scholarship needs an admission letter to one of your programs' },
      { when: '1 Oct 2027', what: 'Funding starts' },
    ],
    links: [
      { label: 'DAAD scholarship database (select Georgia)', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200' },
      { label: 'DAAD Georgia (Tbilisi office)', url: 'https://www.daad-georgia.org/en/find-funding/scholarship-database/' },
      { label: 'DAAD portal', url: 'https://portal.daad.de/' },
    ],
  },
  'daad-stem': {
    id: 'daad-stem',
    name: 'Study Scholarships for STEM Disciplines',
    provider: 'DAAD',
    kind: 'daad',
    amount: '€992 per month + insurance + travel',
    monthly: 992,
    duration: '10–24 months',
    covers: ['€992 monthly stipend', 'Health, accident and liability insurance', 'Travel allowance', 'Optional German course'],
    deadline: {
      date: '2026-09-24',
      confirmed: true,
      note: 'Round for WS 2027/28. The deadline is today, and the bachelor\'s degree had to be finished by the deadline, so this round is closed to you.',
    },
    fundingStarts: 'October 2027',
    eligibility: [
      'For graduates from developing and emerging countries in STEM subjects.',
      'The bachelor\'s degree must be completed by the application deadline (not just by the start of funding).',
      'You may not already hold a master\'s degree.',
    ],
    documents: ['DAAD portal application form', 'CV', 'Motivation letter', 'Recommendation letter', 'Bachelor\'s certificate and transcript', 'Language certificate'],
    links: [{ label: 'DAAD scholarship database', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=57742130' }],
  },
  'daad-epos': {
    id: 'daad-epos',
    name: 'Development-Related Postgraduate Courses (EPOS)',
    provider: 'DAAD',
    kind: 'daad',
    amount: '€992 per month + insurance + travel',
    monthly: 992,
    duration: '12–42 months',
    covers: ['€992 monthly stipend', 'Insurance', 'Travel allowance', 'German course'],
    eligibility: [
      'Georgia is an eligible country.',
      'You need at least 2 years of professional experience after your bachelor\'s at the deadline.',
      'Only for the specific master\'s programs on the EPOS list (some are in renewable energy and water engineering).',
      'Each program sets its own deadline, usually between August and October the year before.',
    ],
    documents: ['DAAD application form', 'CV', 'Motivation letter', 'Employer reference', 'Recommendation letter', 'Transcripts', 'Language certificate'],
    links: [{ label: 'DAAD: EPOS', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777' }],
  },
  deutschlandstipendium: {
    id: 'deutschlandstipendium',
    name: 'Deutschlandstipendium',
    provider: 'Your German university',
    kind: 'university',
    amount: '€300 per month',
    monthly: 300,
    duration: '1 year at a time (can be renewed)',
    covers: ['€300 per month, half from a company or private sponsor, half from the government', 'Often mentoring and networking with the sponsor company'],
    eligibility: [
      'Open to all nationalities, including new master\'s students.',
      'You apply to the university you are admitted to or enrolled at, not to a central office.',
      'Each university sets its own application window, often in the summer before or at the start of the winter semester.',
      'Based on grades plus engagement (projects, teaching, volunteering, competitions).',
    ],
    documents: ['University online form', 'CV', 'Transcripts', 'Short motivation statement', 'Evidence of engagement (competitions, teaching, clubs)'],
    links: [{ label: 'Deutschlandstipendium (official)', url: 'https://www.deutschlandstipendium.de/deutschlandstipendium/en/home/home_node.html' }],
  },
  'boell': {
    id: 'boell',
    name: 'Heinrich Böll Foundation scholarship',
    provider: 'Heinrich-Böll-Stiftung',
    kind: 'foundation',
    amount: '€934 per month + allowances',
    monthly: 934,
    duration: 'Standard length of the master\'s program',
    covers: ['€934 monthly stipend for international master\'s students', 'Seminars, workshops and a large alumni network'],
    deadline: {
      date: '2027-03-01',
      confirmed: true,
      note: 'The two rounds a year close on 1 March and 1 September. The portal opens about 6 weeks before (mid-January for 1 March). The 1 March 2027 round fits a WS 2027/28 start.',
    },
    opens: 'About mid-January 2027',
    fundingStarts: 'Winter semester 2027/28',
    eligibility: [
      'International graduates can apply before starting a master\'s in Germany.',
      'German at B2 level or better (or DSH 1) is required, even for English-taught programs.',
      'Strong grades plus social or political engagement in line with the foundation\'s green values (ecology, democracy, human rights).',
    ],
    documents: ['Online application', 'CV', 'Motivation essay', 'Two recommendation letters', 'Transcripts', 'German B2 certificate', 'Evidence of engagement'],
    links: [
      { label: 'Böll Foundation: scholarships', url: 'https://www.boell.de/en/scholarships' },
      { label: 'How to apply', url: 'https://www.boell.de/en/applying-scholarship' },
    ],
  },
  'kas': {
    id: 'kas',
    name: 'Konrad Adenauer Foundation: international students',
    provider: 'Konrad-Adenauer-Stiftung',
    kind: 'foundation',
    amount: 'Monthly stipend + seminar programme',
    duration: 'Standard length of the program (master\'s: 4 semesters)',
    covers: ['Monthly stipend (paid by the German Federal Foreign Office)', 'Seminars, mentoring and a network'],
    deadline: {
      date: '2027-07-15',
      confirmed: true,
      note: '15 July, 12:00 noon CET every year for applicants already living in Germany. From abroad you apply through your local KAS office, which sets its own dates.',
    },
    eligibility: [
      'Only for four-semester master\'s programs at a German university.',
      'German at B2 level or better. B1 is not enough.',
      'Strong academic record plus social or political engagement.',
    ],
    documents: ['Online application', 'CV', 'Motivation letter', 'Recommendation letters', 'Transcripts', 'German B2 certificate'],
    links: [{ label: 'KAS: international talent development', url: 'https://www.kas.de/en/web/begabtenfoerderung-und-kultur/international-talent-development' }],
  },
  'fes': {
    id: 'fes',
    name: 'Friedrich Ebert Foundation: international students',
    provider: 'Friedrich-Ebert-Stiftung',
    kind: 'foundation',
    amount: 'Monthly stipend + seminar programme',
    duration: 'Standard length of the program',
    covers: ['Monthly stipend', 'Seminars and a political-education programme'],
    deadline: {
      date: '2027-05-31',
      confirmed: true,
      note: 'Deadlines are 30 November and 31 May every year, one for each semester. You must already be studying at a German university.',
    },
    eligibility: [
      'Only for students already enrolled at a German university.',
      'German at C1 level (DSH 2, TestDaF 4, Goethe C1), even for English-taught programs.',
      'Social-democratic values and proven engagement.',
    ],
    documents: ['Online application', 'CV', 'Motivation letter', 'Recommendation letters', 'Transcripts', 'German C1 certificate'],
    links: [{ label: 'FES in the DAAD database', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=10000153' }],
  },
  'stibet': {
    id: 'stibet',
    name: 'DAAD STIBET completion grants',
    provider: 'DAAD, through your university',
    kind: 'university',
    amount: 'Short grant for the final phase',
    duration: 'Usually a few months, while you write your thesis',
    covers: ['Monthly support in the thesis phase, so you can finish without working a side job'],
    eligibility: [
      'For international students already enrolled in Germany and close to finishing.',
      'You apply through your university\'s International Office. Each university has its own rules and dates.',
    ],
    documents: ['University form', 'Transcript', 'Supervisor confirmation of the thesis timeline'],
    links: [{ label: 'DAAD scholarships overview', url: 'https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/' }],
  },
  'austria-grants': {
    id: 'austria-grants',
    name: 'Austrian scholarships (OeAD grants database)',
    provider: 'OeAD / TU Wien / TU Graz',
    kind: 'austria',
    amount: 'Varies',
    duration: 'Varies',
    covers: ['Search engine for all Austrian scholarships for international students', 'TU Wien and TU Graz also pay merit scholarships after your first year of good grades'],
    eligibility: [
      'Only relevant if you choose TU Wien or TU Graz.',
      'Most Austrian grants are for students already enrolled. Few cover a full master\'s from day one.',
    ],
    documents: ['Depends on the grant'],
    links: [
      { label: 'grants.at (OeAD database)', url: 'https://grants.at/en/' },
      { label: 'Study in Austria', url: 'https://studyinaustria.at/en/' },
    ],
  },
}

export type ScholarshipFit = 'apply' | 'stretch' | 'later' | 'no'

/** How one scholarship fits one applicant. Profiles list these in priority order. */
export interface ScholarshipPick {
  id: string
  fit: ScholarshipFit
  note: string
}

export const FIT_META: Record<ScholarshipFit, { label: string; color: string; blurb: string }> = {
  apply: { label: 'Apply now', color: '#10b981', blurb: 'You are eligible for the WS 2027/28 round' },
  stretch: { label: 'Worth a shot', color: '#f59e0b', blurb: 'Eligible if you close a gap in time' },
  later: { label: 'Once you\'re in Germany', color: '#6366f1', blurb: 'Apply after admission or enrolment' },
  no: { label: 'Not this round', color: '#64748b', blurb: 'The rules exclude you for now' },
}

export const SCHOLARSHIP_STATUSES = [
  { id: 'idea', label: 'Considering', color: '#94a3b8' },
  { id: 'preparing', label: 'Preparing', color: '#f59e0b' },
  { id: 'submitted', label: 'Submitted', color: '#3b82f6' },
  { id: 'interview', label: 'Interview', color: '#8b5cf6' },
  { id: 'awarded', label: 'Awarded 🎉', color: '#10b981' },
  { id: 'rejected', label: 'Not awarded', color: '#ef4444' },
  { id: 'skip', label: 'Not applying', color: '#64748b' },
] as const

export type ScholarshipStatusId = (typeof SCHOLARSHIP_STATUSES)[number]['id']
