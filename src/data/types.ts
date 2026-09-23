export type Tier = 'reach' | 'target' | 'safety'
export type Focus = 'automotive' | 'mechanical' | 'mechatronics' | 'production'
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
  /** How well the university sets you up for a motorsport career (my assessment). */
  motorsport: {
    score: 1 | 2 | 3 | 4 | 5
    /** Formula Student team at this university. */
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
}
