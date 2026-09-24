import { programs, RESEARCHED_ON } from '../data/programs'
import { baseDocuments, generalLinks, milestones, tests } from '../data/general'
import { cv, goal, recommenders, storyTips } from '../data/profile'
import { areaColors, creditChecks, curriculum } from '../data/curriculum'
import type { ProfileConfig } from './types'

export const temur: ProfileConfig = {
  id: 'temur',
  name: 'Temur',
  field: 'Mechanical Engineering',
  tagline: 'Mechanical · motorsport',
  color: '#ef4444',
  goal,
  hero: { cityOrGoal: 'Aachen', afterShortlist: 'Next stop after that: motorsport 🏁' },
  researchedOn: RESEARCHED_ON,
  programsIntro: "English-taught master's programs in Germany that match your mechanical engineering degree.",
  programs,
  focusMeta: {
    automotive: { label: 'Automotive', emoji: '🚗' },
    mechanical: { label: 'Mechanical', emoji: '⚙️' },
    mechatronics: { label: 'Mechatronics', emoji: '🤖' },
    production: { label: 'Production', emoji: '🏭' },
  },
  path: {
    title: 'Road to motorsport',
    short: 'Motorsport',
    emoji: '🏁',
    teamLabel: 'Formula Student team',
    filterLabel: 'Strong motorsport links',
    sortLabel: 'motorsport links',
  },
  budgetPerSemester: 3000,
  defaults: {
    gpaNow: 2.5,
    gpaExpected: 2.9,
    german: 'A2',
    shortlist: ['rwth-automotive', 'kit-mechanical', 'stuttgart-fame', 'stuttgart-commas', 'rptu-cvt', 'thi-iae', 'ude-mechanical', 'siegen-mechanical', 'chemnitz-am'],
    compare: ['rwth-automotive', 'kit-mechanical', 'stuttgart-fame'],
  },
  // Temur's progress predates profiles, so it keeps the original key.
  storageKey: 'masters-tracker:v1',
  edgeChips: [
    '🔬 Jülich internship: chosen by Prof. Natour (1 of ~100)',
    '🏭 6 months in industry: CNC, reverse engineering, robot arm',
    '✉️ 3 recommendation letters',
    '📜 SOLIDWORKS CSWP',
    '🏆 1st: university sumo robots',
    '🛰️ ESP32 hardware-in-the-loop 6-DOF sim',
    '🏁 Autonomous RC race organiser',
  ],
  dreamPicks: ['rwth-automotive', 'kit-mechanical'],
  dashboardNote:
    'In Germany 1.0 is the best grade and 4.0 is the lowest pass. Around 2.1–2.5 you are an average applicant, so the top universities are reaches. Your Jülich internship, CSWP and projects have to do the heavy lifting, and so does raising your grades this year.',
  milestones,
  tests: [...tests],
  baseDocuments: [...baseDocuments],
  links: generalLinks,
  cv,
  storyTips,
  recommenders,
  curriculum: {
    courses: curriculum,
    areaColors,
    creditChecks,
    degreeTitle: 'Mechanical Engineering',
  },
}
