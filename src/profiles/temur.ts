import { programs, RESEARCHED_ON } from '../data/programs'
import { baseDocuments, generalLinks, milestones, tests } from '../data/general'
import { cv, goal, recommenders, storyTips } from '../data/profile'
import { areaColors, creditChecks, curriculum } from '../data/curriculum'
import { temurCurricula } from '../data/curricula'
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
  programs: programs.map((p) => ({ ...p, curriculum: temurCurricula[p.id] })),
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
  scholarships: [
    {
      id: 'daad-master',
      fit: 'stretch',
      note: "You are eligible: final year now, graduating summer 2027. The weak spot is the GPA (2.5 now), because DAAD ranks mainly on grades. So the recommendation letter has to carry the application: ask Prof. Natour, since Jülich and RWTH carry weight with DAAD. Back it up with 6 months at Nasolutions, the CSWP and your competition results. Your IELTS is planned for 21 November, after the deadline, so book an earlier date or ask DAAD Tbilisi whether the certificate can follow.",
    },
    {
      id: 'deutschlandstipendium',
      fit: 'later',
      note: 'RWTH, KIT and Stuttgart all award it. Your sumo and BattleBots results, the autonomous RC race you organised and joining Formula Student count as engagement.',
    },
    { id: 'stibet', fit: 'later', note: 'Useful in your thesis semester. Ask the International Office once you are enrolled.' },
    {
      id: 'daad-stem',
      fit: 'no',
      note: 'Your bachelor\'s had to be finished by today\'s deadline. If you ever take a gap year, the next round (September 2027) is worth a look.',
    },
    { id: 'daad-epos', fit: 'no', note: 'Needs 2 years of full-time work after the bachelor\'s. The Nasolutions internship does not count yet.' },
    { id: 'boell', fit: 'no', note: 'Needs German B2 by 1 March 2027. From A2 that is not realistic.' },
    { id: 'kas', fit: 'no', note: 'Needs German B2. Worth revisiting if your German improves during the master\'s.' },
    { id: 'fes', fit: 'no', note: 'Needs German C1 and enrolment in Germany.' },
  ],
  curriculum: {
    courses: curriculum,
    areaColors,
    creditChecks,
    degreeTitle: 'Mechanical Engineering',
  },
}
