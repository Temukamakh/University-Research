export type Tier = 'reach' | 'target' | 'safety'
/** Subject tags; each profile defines its own labels (see ProfileConfig.focusMeta). */
export type Focus = string
export type ReqStatus = 'ok' | 'todo' | 'warn'

export interface Photo {
  /** Exact Wikimedia Commons file name (without the "File:" prefix). */
  file: string
  caption: string
}

export interface Requirement {
  label: string
  value: string
  /** How this requirement looks for *you*: already met, still to do, or a possible issue. */
  status: ReqStatus
  note?: string
}

export interface Program {
  id: string
  university: string
  short: string
  program: string
  degree: 'M.Sc.' | 'M.Eng.'
  city: string
  state: string
  /** Defaults to Germany. */
  country?: string
  coords: [number, number]
  kind: 'TU9' | 'Technical University' | 'University' | 'University of Applied Sciences'
  /** Accent colour used for gradients / fallbacks. */
  color: string
  focus: Focus[]
  tier: Tier
  language: string
  semesters: number
  intake: string
  /** 1 (easy) – 5 (very hard). My estimate: German universities rarely publish acceptance rates. */
  difficulty: 1 | 2 | 3 | 4 | 5
  difficultyNote: string
  /** 0–100: how well your bachelor's + goals match the program (my assessment). */
  fit: number
  fitNotes: string[]
  gaps: string[]
  /**
   * How well the university serves the applicant's long-term goal (motorsport for Temur,
   * labs and industry for Natali). Labels come from ProfileConfig.path. My assessment.
   */
  path: {
    score: 1 | 2 | 3 | 4 | 5
    /** The student team or lab to highlight. */
    team: string
    points: string[]
  }
  ranking: {
    qsWorld: string
    qsYear: string
    qsSubject?: string
    note?: string
  }
  costs: {
    /** Tuition per semester for non-EU students, EUR */
    tuition: number
    /** Semester contribution (student union, often incl. transit ticket), EUR, approx. */
    semesterFee: number
    /** Estimated monthly living costs in that city, EUR */
    living: number
    appFee: string
  }
  application: {
    portal: string
    portalUrl: string
    opens: string
    /** Projected deadline for Winter Semester 2027/28 (ISO date). */
    deadline: string
    deadlineNote?: string
    viaUniAssist: boolean
  }
  requirements: Requirement[]
  extraDocs: string[]
  highlights: string[]
  photos: Photo[]
  links: { label: string; url: string }[]
  curriculum?: Curriculum
}

/** What you study, semester by semester. */
export interface Curriculum {
  summary: string
  /**
   * 'semester': the university publishes which modules fall in which semester.
   * 'structure': only the building blocks are published; the semester split shown is the usual one.
   */
  detail: 'semester' | 'structure'
  plan: { term: string; ects?: number; items: string[] }[]
  /** Specialisations / majors / focus areas you choose from. */
  tracks?: string[]
  source: { label: string; url: string }
}
