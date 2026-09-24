import type { Program } from '../data/types'
import type { Milestone } from '../data/general'
import type { CvSection, Recommender } from '../data/profile'
import type { ScholarshipPick } from '../data/scholarships'

export interface Course {
  name: string
  ects: number
  area: string
}

export interface CreditCheck {
  program: string
  items: { label: string; required: number; have: number }[]
}

export interface TestInfo {
  id: string
  name: string
  target: string
  why: string
  cost: string
  validity: string
  url: string
}

/** Everything that differs between applicants. Each profile lives in src/profiles/. */
export interface ProfileConfig {
  id: string
  name: string
  /** Short field label, e.g. "Mechanical Engineering". */
  field: string
  /** Shown under the name in the profile switcher. */
  tagline: string
  /** Avatar colour. */
  color: string
  goal: string
  hero: { cityOrGoal: string; afterShortlist: string }
  researchedOn: string
  /** Sentence under the Programs heading. */
  programsIntro: string
  programs: Program[]
  focusMeta: Record<string, { label: string; emoji: string }>
  /** Labels for Program.path. */
  path: { title: string; short: string; emoji: string; teamLabel: string; filterLabel: string; sortLabel: string }
  budgetPerSemester: number
  defaults: { gpaNow: number; gpaExpected: number; german: string; shortlist: string[]; compare: string[] }
  /** localStorage key for this profile's progress. */
  storageKey: string
  edgeChips: string[]
  dreamPicks: string[]
  dashboardNote: string
  milestones: Milestone[]
  tests: TestInfo[]
  baseDocuments: string[]
  links: { label: string; url: string }[]
  cv: CvSection[]
  storyTips: { title: string; text: string }[]
  recommenders: Recommender[]
  curriculum?: { courses: Course[]; areaColors: Record<string, string>; creditChecks: CreditCheck[]; degreeTitle: string }
  /** Scholarships that matter for this applicant, most important first. */
  scholarships: ScholarshipPick[]
  /** Extra line for the Costs page (e.g. Austria has no blocked account). */
  costsNote?: string
}
