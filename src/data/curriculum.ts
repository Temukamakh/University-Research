/**
 * B.Sc. Mechanical Engineering, Agricultural University of Georgia (240 ECTS),
 * translated from the official curriculum sheet.
 */
export type Area =
  | 'Mathematics'
  | 'Natural sciences'
  | 'Engineering mechanics'
  | 'Thermo & fluids'
  | 'Design & drawing'
  | 'Materials & manufacturing'
  | 'Electrical, control & mechatronics'
  | 'Automotive & computational'
  | 'Projects & practice'
  | 'General education'
  | 'Electives'

export interface Course {
  name: string
  ects: number
  area: Area
}

export const curriculum: Course[] = [
  // University general education (41)
  { name: 'English', ects: 5, area: 'General education' },
  { name: 'Mathematical Thinking', ects: 5, area: 'Mathematics' },
  { name: 'World History and Georgia', ects: 3, area: 'General education' },
  { name: 'Georgian Language and Culture', ects: 5, area: 'General education' },
  { name: 'Fundamentals of Economics', ects: 4, area: 'General education' },
  { name: 'Logic', ects: 4, area: 'General education' },
  { name: 'Philosophy', ects: 4, area: 'General education' },
  { name: 'Political Ideologies', ects: 4, area: 'General education' },
  { name: 'Literature and Reading', ects: 4, area: 'General education' },
  { name: 'Academic Writing', ects: 1, area: 'General education' },
  { name: 'Summer Practice', ects: 2, area: 'Projects & practice' },
  // Engineering foundation (49)
  { name: 'Calculus I, II', ects: 12, area: 'Mathematics' },
  { name: 'Differential Equations', ects: 6, area: 'Mathematics' },
  { name: 'Algebra and Statistics', ects: 6, area: 'Mathematics' },
  { name: 'Physics (theory) I, II, III', ects: 12, area: 'Natural sciences' },
  { name: 'Physics (lab) I, II, III', ects: 3, area: 'Natural sciences' },
  { name: 'General Chemistry (theory)', ects: 4, area: 'Natural sciences' },
  { name: 'General Chemistry (lab)', ects: 3, area: 'Natural sciences' },
  { name: 'Fundamentals of Engineering', ects: 3, area: 'Design & drawing' },
  // Electives (20)
  { name: 'Free electives (other programs)', ects: 20, area: 'Electives' },
  // Mechanical engineering core (130)
  { name: 'Engineering Graphics I', ects: 4, area: 'Design & drawing' },
  { name: 'Engineering Graphics II', ects: 4, area: 'Design & drawing' },
  { name: 'Technical Modelling', ects: 4, area: 'Design & drawing' },
  { name: 'Theoretical Mechanics I, II', ects: 8, area: 'Engineering mechanics' },
  { name: 'Strength of Materials (theory) I, II', ects: 8, area: 'Engineering mechanics' },
  { name: 'Strength of Materials (lab) I, II', ects: 2, area: 'Engineering mechanics' },
  { name: 'Hydraulics', ects: 4, area: 'Thermo & fluids' },
  { name: 'Measurements and Interchangeability', ects: 5, area: 'Design & drawing' },
  { name: 'Materials Science', ects: 5, area: 'Materials & manufacturing' },
  { name: 'Automatic Control Systems', ects: 4, area: 'Electrical, control & mechatronics' },
  { name: 'Hydraulic Machines', ects: 5, area: 'Thermo & fluids' },
  { name: 'Mechatronics', ects: 4, area: 'Electrical, control & mechatronics' },
  { name: 'Thermodynamics', ects: 5, area: 'Thermo & fluids' },
  { name: 'Fundamentals of Heat Transfer', ects: 5, area: 'Thermo & fluids' },
  { name: 'Computer-Aided Design Methods', ects: 5, area: 'Design & drawing' },
  { name: 'Finite Element Method', ects: 4, area: 'Automotive & computational' },
  { name: 'Digital Control', ects: 4, area: 'Electrical, control & mechatronics' },
  { name: 'Machine Elements', ects: 5, area: 'Design & drawing' },
  { name: 'Theory of Mechanisms and Machines I, II', ects: 9, area: 'Engineering mechanics' },
  { name: 'Manufacturing Processes', ects: 5, area: 'Materials & manufacturing' },
  { name: 'Automotive Theory', ects: 5, area: 'Automotive & computational' },
  { name: 'Electromechanics', ects: 4, area: 'Electrical, control & mechatronics' },
  { name: 'Electric Circuits', ects: 4, area: 'Electrical, control & mechatronics' },
  { name: 'Course Project (Sophomore Project)', ects: 3, area: 'Projects & practice' },
  { name: 'Course Project (Junior Project)', ects: 5, area: 'Projects & practice' },
  { name: 'Course Project (Senior Project)', ects: 5, area: 'Projects & practice' },
  { name: 'Internship in an Organisation', ects: 5, area: 'Projects & practice' },
]

export const areaColors: Record<Area, string> = {
  Mathematics: '#6366f1',
  'Natural sciences': '#06b6d4',
  'Engineering mechanics': '#f59e0b',
  'Thermo & fluids': '#ef4444',
  'Design & drawing': '#10b981',
  'Materials & manufacturing': '#8b5cf6',
  'Electrical, control & mechatronics': '#3b82f6',
  'Automotive & computational': '#ec4899',
  'Projects & practice': '#84cc16',
  'General education': '#94a3b8',
  Electives: '#cbd5e1',
}

const sum = (pred: (c: Course) => boolean) => curriculum.filter(pred).reduce((a, c) => a + c.ects, 0)
const byName = (...names: string[]) => (c: Course) => names.includes(c.name)

/** Requirement checks against the programs with published, credit-based rules. */
export const creditChecks = [
  {
    program: 'KIT Mechanical Engineering',
    items: [
      {
        label: 'Higher maths, engineering mechanics, thermodynamics',
        required: 37,
        have: sum(
          byName(
            'Calculus I, II',
            'Differential Equations',
            'Algebra and Statistics',
            'Theoretical Mechanics I, II',
            'Strength of Materials (theory) I, II',
            'Strength of Materials (lab) I, II',
            'Thermodynamics',
            'Fundamentals of Heat Transfer',
          ),
        ),
      },
      {
        label: 'Machine design, materials science, fluid mechanics',
        required: 26,
        have: sum(
          byName(
            'Machine Elements',
            'Theory of Mechanisms and Machines I, II',
            'Engineering Graphics I',
            'Engineering Graphics II',
            'Computer-Aided Design Methods',
            'Materials Science',
            'Hydraulics',
          ),
        ),
      },
    ],
  },
  {
    program: 'RWTH Automotive Engineering',
    items: [
      {
        label: 'Engineering, maths & natural sciences (excl. internships)',
        required: 120,
        have: sum((c) => !['General education', 'Electives', 'Projects & practice'].includes(c.area)) +
          sum(byName('Course Project (Sophomore Project)', 'Course Project (Junior Project)', 'Course Project (Senior Project)')),
      },
    ],
  },
]

export const totalEcts = curriculum.reduce((a, c) => a + c.ects, 0)

/**
 * Converts a foreign grade to the German 1.0–4.0 scale with the
 * "modified Bavarian formula" that most German universities use:
 * N = 1 + 3 × (Nmax − Nd) / (Nmax − Nmin).
 * Defaults are the Georgian 4.0 GPA scale with 1.0 as the lowest pass. Converting from
 * the 0–100 marks instead (max 100, pass 51) usually comes out a few tenths worse.
 */
export function toGermanGrade(score: number, max = 4, minPass = 1): number {
  const n = 1 + (3 * (max - score)) / (max - minPass)
  return Math.min(4, Math.max(1, Math.round(n * 10) / 10))
}
