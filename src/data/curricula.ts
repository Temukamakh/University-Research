import type { Curriculum } from './types'

/**
 * Temur's programs: curriculum and semester plan (researched September 2026).
 * Module names come from the universities' program pages and module handbooks; the
 * handbooks (linked) are the authority and change from year to year.
 */
export const temurCurricula: Record<string, Curriculum> = {
  'rwth-automotive': {
    summary: '90 ECTS over 3 semesters: 44 ECTS of compulsory modules and 16 ECTS of electives in the first two semesters, then a 22-week master thesis (30 ECTS).',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', ects: 30, items: ['Driver Assistance Systems', 'Battery Storage Systems', 'Lightweight Design: Processes & Principles', 'Electives'] },
      { term: 'Semester 2', ects: 30, items: ['Alternative Vehicle Propulsion Systems', 'Internal Combustion Engines: Design & Mechanics', 'Machine Design of Rigid Systems', 'Structural Design of Vehicles', 'Electives'] },
      { term: 'Semester 3', ects: 30, items: ['Master thesis (22 weeks), usually at an ika / RWTH institute or in industry'] },
    ],
    tracks: ['Vehicle dynamics', 'Energy efficiency', 'Acoustics', 'Mechatronics', 'Structural fatigue & durability'],
    source: { label: 'ika: Automotive Engineering M.Sc.', url: 'https://www.ika.rwth-aachen.de/en/studies/study-programs/automotive-engineering-msc.html' },
  },
  'kit-mechanical': {
    summary: '120 ECTS over 4 semesters, with no fixed schedule. You build your own plan from a specialisation, mechanical engineering electives and interdisciplinary electives, then write a 6-month master thesis (30 ECTS, can start after 74 ECTS).',
    detail: 'structure',
    plan: [
      { term: 'Semester 1', items: ['Master orientation phase', 'Modules of your chosen specialisation', 'Mechanical engineering electives'] },
      { term: 'Semesters 2–3', items: ['Specialisation modules (e.g. Automotive Engineering)', 'Mechanical engineering electives', 'Interdisciplinary electives', 'Optional: exchange semester (Eucor, ERASMUS+, double degrees)'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    tracks: [
      'Automotive Engineering',
      'Energy and Environmental Engineering',
      'Mechatronics and Microsystems Technology',
      'Product Development and Design',
      'Production Engineering',
      'Materials and Structures for High-performance Systems',
    ],
    source: { label: 'KIT module handbook (M.Sc. Mechanical Engineering)', url: 'https://s.kit.edu/mhb-mach-msc25-en' },
  },
  'tum-mechanical': {
    summary: '120 ECTS over 4 semesters. Very flexible: you combine modules from four areas and can also take subjects from other TUM departments (electrical engineering, informatics, economics).',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–3', items: ['Fundamentals of engineering sciences', 'Core subjects of mechanical engineering', 'Related areas (e.g. electrical engineering, informatics, economics)', 'Engineering-science flexibilisation'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'TUM: Mechanical Engineering M.Sc.', url: 'https://www.mw.tum.de/en/studies/prospective-students/master-mechanical-engineering/' },
  },
  'stuttgart-fame': {
    summary: '120 ECTS over 4 semesters, entirely in English. It starts with Engineering Fundamentals (to fill any gaps from your bachelor\'s), continues with application blocks of your choice, and includes a Language & Culture block for living and working in Germany.',
    detail: 'structure',
    plan: [
      { term: 'Semester 1', items: ['Engineering Fundamentals (3 courses)', 'Application/specialisation modules (lectures, seminars, labs)', 'Language & Culture: German + a work-culture subject'] },
      { term: 'Semesters 2–3', items: ['Application/specialisation modules', 'Labs and seminars', 'Language & Culture'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'University of Stuttgart: FAME program structure', url: 'https://www.student.uni-stuttgart.de/en/study-programs/Fundamentals-and-Applications-of-Mechanical-Engineering-FAME-M.Sc./?page=structure' },
  },
  'stuttgart-commas': {
    summary: '120 ECTS over 4 semesters. A compulsory first semester in the fundamentals of computational mechanics, then two semesters of electives with a seminar talk and a one-week summer school, then the thesis.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', ects: 30, items: ['Continuum Mechanics', 'Material Theory', 'Numerical Methods', 'Scientific Programming', 'Engineering Materials'] },
      { term: 'Semester 2', ects: 30, items: ['Electives (e.g. FEM, material modelling, structural mechanics)', 'Seminar lecture linked to one of your modules', 'Summer school with invited international researchers'] },
      { term: 'Semester 3', ects: 30, items: ['Electives', 'Deepening in your chosen field'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'COMMAS curriculum', url: 'https://www.commas.uni-stuttgart.de/program/structure/' },
  },
  'tuhh-mechatronics': {
    summary: '120 ECTS over 4 semesters with a high share of electives from the mechanical and electrical engineering schools. You choose a specialisation (30 ECTS from 6-ECTS modules), do one scientific project, and write a 6-month thesis.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–2', items: ['Core mechatronics modules', 'Specialisation modules (6 ECTS each)', 'Technical electives (mechanical + electrical engineering)'] },
      { term: 'Semester 3', items: ['Specialisation modules', 'Scientific project work'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    tracks: ['System Design', 'Intelligent Systems and Robotics'],
    source: { label: 'TUHH module manual (M.Sc. Mechatronics)', url: 'https://studienplaene.tuhh.de/po/MB/mhb_IMPMEC_kh_w21_von_20210531_v_0_en.pdf' },
  },
  'rptu-cvt': {
    summary: '120 ECTS over 4 semesters across mechanical engineering, electrical & computer engineering and computer science. Mandatory basics in the first year, commercial-vehicle electives, an industry project internship, then the thesis.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', items: ['Mandatory basics: mechanical engineering', 'Mandatory basics: electrical & computer engineering', 'Mandatory basics: computer science', 'Social sciences / business & economics'] },
      { term: 'Semester 2', items: ['Mandatory basics (continued)', 'Commercial-vehicle electives (partly in German)'] },
      { term: 'Semester 3', items: ['Commercial-vehicle electives', 'Project internship in the commercial-vehicle industry + scientific paper'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis at an RPTU institute'] },
    ],
    source: { label: 'CVT module book', url: 'https://rptu.de/en/cvt/master-program-cvt/module-handbook-timetable/module-book' },
  },
  'ude-mechanical': {
    summary: 'Like all UDE master\'s programs: core subjects, advanced theory, a specialisation (profile), electives and the master thesis. Warning: the ISE master\'s programs are taught roughly half in German.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–3', items: ['Mandatory core subjects', 'Advanced theory', 'Specialisation (profile) subjects', 'Electives'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    tracks: [
      'Autonomous Systems',
      'Sustainable Energy & Process Engineering',
      'Product Design and Engineering',
      'Mechatronics',
      'Sustainable & Autonomous Maritime Systems',
      'Sustainable Metal Cycles',
      'Logistics Technologies',
      'Mobility',
    ],
    source: { label: 'UDE: M.Sc. Mechanical Engineering', url: 'https://www.uni-due.de/iw/en/study/m-me.php' },
  },
  'thi-iae': {
    summary: '4 semesters, taught in English. It covers the development of automotive mechatronic and electronic systems, with a focus on electrified drives, sensors and actuators, driver assistance and vehicle safety. The thesis is in semester 4.',
    detail: 'structure',
    plan: [
      { term: 'Semester 1', items: ['Principles of Mathematical Modelling and Control Engineering (7 ECTS)', 'Automotive Electrical and Electronic Technology (5 ECTS)', 'Vehicle Dynamics'] },
      { term: 'Semesters 2–3', items: ['Electrified drives: functions and structures', 'Vehicle sensors and actuators', 'Driver assistance and vehicle safety systems: function development and validation', 'The automotive system development process', 'Project work'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (often with industry, e.g. Audi or the CARISSMA centre)'] },
    ],
    source: { label: 'THI module handbook (IAE)', url: 'https://www.thi.de/fileadmin/daten/fakultaetE/Studiengangseiten/IAE/MHBuch_IAE-M_04072025.pdf' },
  },
  'esslingen-automotive': {
    summary: '3 semesters. You choose the Vehicle Systems or Automotive IT track. The second semester adds team and management modules, and the third semester is a 6-month thesis that you can do at the university or in a company.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', items: ['Track modules: Vehicle Systems or Automotive IT', 'Cross-cultural student projects'] },
      { term: 'Semester 2', items: ['Autonomous Systems', 'Team Project', 'Global Engineering', 'Project Management', 'International Negotiations'] },
      { term: 'Semester 3', ects: 30, items: ['Master thesis (6 months, individual or team, at the university or in a company) + soft-skills training'] },
    ],
    tracks: ['Vehicle Systems', 'Automotive IT'],
    source: { label: 'Esslingen: Automotive Systems modules', url: 'https://www.hs-esslingen.de/en/graduate-school/applicants/courses/automotive-systems-m-eng/modules-vehicle-dynamics/' },
  },
  'siegen-mechanical': {
    summary: 'It starts with a foundation module that brings everyone to the same level in maths and engineering, followed by focus areas of your choice. International students choose one of three English-taught specialisations.',
    detail: 'structure',
    plan: [
      { term: 'Semester 1', items: ['Foundation module: mathematics and engineering principles', 'Specialisation modules'] },
      { term: 'Semesters 2–3', items: ['Focus-area modules', 'Electives'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    tracks: ['Product development', 'Materials engineering', 'Production engineering', 'Energy & process engineering', 'Vehicle construction', 'Digital technologies'],
    source: { label: 'Siegen: student information (Master ME)', url: 'https://www.uni-siegen.de/en/studentsstudyprogram/student-information-master-mechanical-engineering' },
  },
  'chemnitz-am': {
    summary: '120 ECTS over 4 semesters: basic modules in year 1, a profile line (specialisation) in semesters 2–3, a research project in year 2, and the thesis in the final semester.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', ects: 30, items: ['Mathematics for Engineering Science', 'Digital Tools for Smart Manufacturing', 'Humans and Mechatronics in Manufacturing', 'Applied Materials and Composite Structures', 'Modelling and Idealisation in Manufacturing Simulation', 'Research Methods & Soft Skills'] },
      { term: 'Semester 2', ects: 30, items: ['Basic modules (continued)', 'Specialisation modules of your profile line'] },
      { term: 'Semester 3', ects: 30, items: ['Specialisation modules', 'Research project (academic or industrial)'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    tracks: ['Lightweight Technologies', 'Materials Engineering', 'Mechatronics and Automation', '…and further profile lines'],
    source: { label: 'TU Chemnitz: Advanced Manufacturing study pilot', url: 'https://www.tu-chemnitz.de/mb/am/studiengang/structure/structure.php' },
  },
}
