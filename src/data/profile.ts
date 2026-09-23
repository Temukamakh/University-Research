/** Temur's background: used on the "Me" page and as raw material for CVs and motivation letters. */
export const goal = 'Mechanical engineering master\'s → a career in motorsport'

export interface CvSection {
  title: string
  emoji: string
  items: { title: string; detail?: string }[]
}

export const cv: CvSection[] = [
  {
    title: 'Industry experience',
    emoji: '🏭',
    items: [
      {
        title: '6-month internship: Nasolutions (manufacturing firm, Georgia)',
        detail:
          '3-axis CNC milling, CNC routers, laser cutters, 3D printers and 3D scanners. SolidWorks every day. Reverse engineering of mechanical and automotive parts. Co-designing a 6-axis robot arm for welding and industrial use. Machined aluminium, stainless steel, carbon steel and titanium.',
      },
    ],
  },
  {
    title: 'Research experience',
    emoji: '🔬',
    items: [
      {
        title: 'Internship, February 2027: Forschungszentrum Jülich (Helmholtz Association)',
        detail:
          'Institute of Technology and Engineering (ITE), headed by Prof. Ghaleb Natour, who personally selected you from about 100 students at your university. Team assignment pending. Target team: Simulation and Calculation (FEA, thermal and flow analysis of components under extreme loads). Secondary interest: CFD.',
      },
    ],
  },
  {
    title: 'Competitions',
    emoji: '🏆',
    items: [
      { title: '1st place: university sumo robot championship' },
      { title: '3rd place: national sumo robot championship' },
      { title: '4th place: national BattleBots championship' },
    ],
  },
  {
    title: 'Certifications',
    emoji: '📜',
    items: [
      { title: 'SOLIDWORKS CSWA', detail: 'Certified SOLIDWORKS Associate' },
      { title: 'SOLIDWORKS CSWP', detail: 'Certified SOLIDWORKS Professional' },
    ],
  },
  {
    title: 'Projects',
    emoji: '🛠️',
    items: [
      {
        title: 'LEO inspection vehicle (concept study)',
        detail: 'Miniaturised autonomous inspection vehicle for low Earth orbit. Thermal inkjet printheads as propulsion injectors, FEMTA-style propulsion, staged replication development approach.',
      },
      {
        title: 'ADCS demo: hardware-in-the-loop',
        detail: 'Attitude determination and control on an ESP32 + IMU, a serial hardware-to-host bridge, and a Python 6-DOF rigid-body simulation.',
      },
      {
        title: 'Spacecraft simulation demo',
        detail: 'Handheld ESP32 + gyroscope as command input for a laptop spacecraft simulation, with live delta-V readouts and LED thrust visualisation proportional to PWM.',
      },
      {
        title: 'Embedded electronics',
        detail: 'ESP32 GPIO selection, resistor sizing, per-pin current limits, PWM dimming with the ESP32 LEDC peripheral.',
      },
    ],
  },
  {
    title: 'Leadership',
    emoji: '🏁',
    items: [
      {
        title: 'Designing a university engineering championship',
        detail:
          'Autonomous RC car race on a NASCAR-style oval for first-year students, covering mechanical, electrical and software work. Defined the technical scope, rules and difficulty level.',
      },
    ],
  },
  {
    title: 'Skills',
    emoji: '⚙️',
    items: [
      { title: 'CAD', detail: 'SolidWorks (CSWA, CSWP), daily use in industry, reverse engineering from 3D scans' },
      { title: 'Manufacturing', detail: '3-axis CNC milling, CNC routing, laser cutting, 3D printing, 3D scanning. Aluminium, stainless and carbon steel, titanium' },
      { title: 'Embedded', detail: 'ESP32, IMU sensors, serial communication, PWM control' },
      { title: 'Simulation & programming', detail: 'Python (6-DOF dynamics simulation)' },
      { title: 'Languages', detail: 'Georgian (native; language of your bachelor\'s), English (IELTS planned), German (A2)' },
      { title: 'Interests', detail: 'CFD, FEA, robotics, mechatronics, vehicle dynamics' },
    ],
  },
]

/** How to turn the profile into a strong application story. */
export const storyTips = [
  {
    title: 'Own your grades, show the trend',
    text: 'Don\'t hide the GPA. Show the upward trend (2.5 → 2.9), and put your strongest subject grades (FEM, Machine Elements, Automotive Theory) next to proof that you can do the work in practice: Jülich, CSWP, competition results. One honest sentence works better than an excuse.',
  },
  {
    title: 'One clear story',
    text: 'Motorsport needs engineers who can design (CSWP, SolidWorks every day), manufacture (6 months of CNC work on aluminium, steel and titanium at Nasolutions), simulate (Jülich FEA/CFD, 6-DOF Python) and control hardware (ESP32, robots, a 6-axis welding arm). You have done all four; every motivation letter should show it.',
  },
  {
    title: 'Lead with Jülich',
    text: 'A Helmholtz research internship on components under extreme loads, for which the institute director personally chose you out of about 100 students, is your strongest point. Name the institute, the team and the methods. Prof. Natour\'s letter is the most valuable one you can get, especially for RWTH.',
  },
  {
    title: 'Use numbers',
    text: '"1st of N teams", "6-DOF model validated against IMU data at X Hz", "track and rules for N first-year teams". Specific numbers are more convincing than adjectives.',
  },
  {
    title: 'Tailor it to each university',
    text: 'RWTH: ika, Ecurie Aix, Jülich next door. Stuttgart: FKFS wind tunnels, Rennteam, Porsche Motorsport. KIT: KA-RaceIng, vehicle-technology specialisation. THI: Audi F1 power unit in Neuburg.',
  },
  {
    title: 'Plan Formula Student from day one',
    text: 'In Germany, the usual route into motorsport is a Formula Student team, then a student job at a vehicle institute, then a master thesis at a motorsport company. Say in your letter which team you want to join and what you would work on.',
  },
]

export type LetterStatus = 'planned' | 'asked' | 'agreed' | 'received'

export interface Recommender {
  id: string
  name: string
  role: string
  why: string
  /** When the letter can realistically be ready, and which applications it can reach. */
  timing: string
  defaultStatus: LetterStatus
}

export const recommenders: Recommender[] = [
  {
    id: 'natour',
    name: 'Prof. Dr. Ghaleb Natour',
    role: 'Director, Institute of Technology and Engineering (ITE), Forschungszentrum Jülich · Professor, Faculty of Mechanical Engineering, RWTH Aachen',
    why: 'Your strongest letter. He chose you personally out of about 100 students, and he is a professor in RWTH\'s own mechanical engineering faculty (ITE is listed as one of its institutes). His letter carries weight everywhere and especially at RWTH.',
    timing: 'After or near the end of your February 2027 internship. Ask early in February so it is ready for RWTH (1 March). It is also in time for Siegen, TUM, THI and KIT, but too late for Stuttgart FAME, TUHH, UDE, RPTU (round 1) and probably COMMAS.',
    defaultStatus: 'planned',
  },
  {
    id: 'glueckler',
    name: 'Harald Glückler',
    role: 'Role and institution not added yet',
    why: 'A second, independent voice. The letter is strongest if he can describe specific work you did with him.',
    timing: 'Ask by November 2026 so it is ready for the January and February deadlines.',
    defaultStatus: 'agreed',
  },
  {
    id: 'metreveli',
    name: 'Zaza Metreveli',
    role: 'Head of Engineering, Agricultural University of Georgia',
    why: 'Your academic reference. He can confirm your coursework, your projects, the sumo-robot and BattleBots results, and the autonomous RC race you are designing, and put your grades in context.',
    timing: 'Ask by November 2026 so it is ready for Stuttgart (15 January) and every later deadline.',
    defaultStatus: 'agreed',
  },
]
