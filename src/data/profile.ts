/** Temur's background: used on the "Me" page and as raw material for CVs and motivation letters. */
export const goal = 'Mechanical engineering master\'s → a career in motorsport'

export interface CvSection {
  title: string
  emoji: string
  items: { title: string; detail?: string }[]
}

export const cv: CvSection[] = [
  {
    title: 'Research experience',
    emoji: '🔬',
    items: [
      {
        title: 'Upcoming internship: Forschungszentrum Jülich (Helmholtz Association)',
        detail:
          'Institute of Technology and Engineering (ITE), headed by Prof. Ghaleb Natour. Interviewed and accepted; team assignment pending. Target team: Simulation and Calculation (FEA, thermal and flow analysis of components under extreme loads). Secondary interest: CFD.',
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
      { title: 'CAD', detail: 'SolidWorks (CSWA, CSWP)' },
      { title: 'Embedded', detail: 'ESP32, IMU sensors, serial communication, PWM control' },
      { title: 'Simulation & programming', detail: 'Python (6-DOF dynamics simulation)' },
      { title: 'Languages', detail: 'Georgian (native), English, German (A2)' },
      { title: 'Interests', detail: 'CFD, FEA, robotics, mechatronics, vehicle dynamics' },
    ],
  },
]

/** How to turn the profile into a strong application story. */
export const storyTips = [
  {
    title: 'One clear story',
    text: 'Motorsport needs engineers who can design (CSWP), simulate (Jülich FEA/CFD, 6-DOF Python) and build and control real hardware (ESP32, robot competitions). Every motivation letter should show you already do all three.',
  },
  {
    title: 'Lead with Jülich',
    text: 'A Helmholtz research internship on components under extreme loads is your strongest point. Name the institute, the team and the methods. Ask your Jülich supervisor for a recommendation letter if the timing allows.',
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
