import type { Curriculum } from '../../data/types'

/** Natali's programs: curriculum and semester plan (researched September 2026). Handbooks (linked) are the authority. */
export const nataliCurricula: Record<string, Curriculum> = {
  'rwth-epe': {
    summary: 'The English specialisation of RWTH\'s electrical engineering master: three semesters of lectures, tutorials and labs, an industrial internship of at least 18 weeks, and the master thesis in semester 4.',
    detail: 'semester',
    plan: [
      { term: 'Semesters 1–3', items: ['Power electronics, electrical machines & drives', 'Power systems and grids', 'Tutorials and lab courses', 'Industrial internship (≥ 18 weeks)'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'RWTH Faculty 6: admission & program', url: 'https://www.elektrotechnik.rwth-aachen.de/go/id/qndx/lidx/1' },
  },
  'kit-etit': {
    summary: '120 ECTS: a field of specialisation (60 ECTS: fundamentals 24–30, a focus area of at least 24, and a lab), 24 ECTS of electives, and the 30-ECTS master thesis.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–2', items: ['Specialisation fundamentals (24–30 ECTS)', 'Electives'] },
      { term: 'Semester 3', items: ['Focus-area modules (≥ 24 ECTS)', 'Self-selected lab course', 'Electives'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    tracks: [
      'Electrical Power Systems and Electromobility',
      'Information and Communication Technology',
      'Automation, Robotics, and Systems Engineering',
      'Microelectronics, Photonics, and Quantum Technologies',
    ],
    source: { label: 'KIT ETIT master', url: 'https://etit.kit.edu/english/master_etit.php' },
  },
  'stuttgart-infotech': {
    summary: '30 ECTS per semester. Semesters 1–3 cover core and supplementary modules, a research project, a lab course and a non-technical module. Semester 4 is a 6-month master thesis. You pick one of three majors.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', ects: 30, items: ['Core modules of your major', 'Supplementary modules'] },
      { term: 'Semester 2', ects: 30, items: ['Core & supplementary modules', 'Lab course'] },
      { term: 'Semester 3', ects: 30, items: ['Research project', 'Non-technical module', 'Remaining modules'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    tracks: ['Embedded Systems Engineering', 'Communication Engineering', 'Computer Hardware/Software Engineering'],
    source: { label: 'INFOTECH majors & curriculum', url: 'https://www.infotech.uni-stuttgart.de/program/majors/' },
  },
  'fau-cme': {
    summary: '120 ECTS: six compulsory core modules (e.g. Digital Signal Processing, Information Theory, Mobile Communications), technical electives, a seminar, lab courses, a 10-ECTS research internship, 15 ECTS of non-technical electives including German, and a 6-month thesis.',
    detail: 'structure',
    plan: [
      { term: 'Semester 1', items: ['Core: Digital Signal Processing', 'Core: Information Theory', 'Technical electives', 'German / soft skills'] },
      { term: 'Semester 2', items: ['Core: Mobile Communications', 'Further core modules', 'Lab courses', 'Technical electives'] },
      { term: 'Semester 3', items: ['Seminar', 'Research internship (10 ECTS, report + talk)', 'Remaining electives'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    source: { label: 'CME study plan', url: 'https://www.cme.studium.fau.de/students/study-plan/' },
  },
  'tud-nano': {
    summary: '4 semesters with 30 ECTS each. It is research-oriented and built around mandatory electives in nanoelectronic materials, design methods, devices and applications. German language & culture is included. The thesis and its defence are in semester 4.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–3', items: [
        'Materials & technologies: memory, nanotechnology, optoelectronics, molecular electronics',
        'Design methods: high- and low-level synthesis',
        'Characterisation & modelling of electron devices',
        'Advanced integrated circuit & system design, computer arithmetic',
        'Embedded nanoelectronic systems & software',
        'Modelling & simulation; operational/economic issues',
        'German language & culture',
      ] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis + defence (at the university, a company or a research institute)'] },
    ],
    source: { label: 'TU Dresden NES: modules & study guide', url: 'https://tu-dresden.de/ing/elektrotechnik/studium/im_studium/studiengaenge/masters-programme-nanoelectronic-systems/studierende/modules' },
  },
  'tuhh-mms': {
    summary: 'Two years combining microelectronics and microsystems: lectures, exercises and labs in year 1, a project plus a seminar or process-design course in semester 3, and a 6-month thesis in semester 4.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', items: ['Lectures, exercises and labs', 'Main-subject modules (18 ECTS across semesters 1–3)'] },
      { term: 'Semester 2', items: ['Lectures, exercises and labs', 'Main-subject modules'] },
      { term: 'Semester 3', items: ['Project', 'Subject-specific seminar or process-design course'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    source: { label: 'TUHH module manual (MMS)', url: 'https://studienplaene.tuhh.de/po/E/mhb_IMPMM_kh_w22_von_20230420_v_0_en_dual.pdf' },
  },
  'rptu-esy': {
    summary: '120 ECTS: a core program in embedded-systems fundamentals (35–55 ECTS), a personal elective program agreed with your program adviser (35–55 ECTS), and a 30-ECTS master thesis.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–2', items: ['Architecture of Digital Systems I', 'Microelectronic Circuit and System Design I', 'Synthesis and Optimization of Microelectronic Systems II', 'Verification of Digital Systems (+ lab)', 'Electives'] },
      { term: 'Semester 3', items: ['Elective program (individual study plan)', 'Choose your thesis topic'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'RPTU ESY curriculum', url: 'https://eit.rptu.de/en/esy/program-1/curriculum' },
  },
  'ude-ese': {
    summary: 'Like all UDE ISE master\'s programs: core subjects, advanced theory, profile subjects, electives and the thesis. Warning: lectures are about 50% German and 50% English, and German B2 is asked for at enrolment.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–3', items: ['Mandatory core subjects', 'Advanced theory', 'Profile (specialisation) subjects', 'Electives'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'UDE: M.Sc. Embedded Systems Engineering', url: 'https://www.uni-due.de/iw/en/study/m-ese.php' },
  },
  'chemnitz-es': {
    summary: '120 ECTS: hardware/software fundamentals first, 44 ECTS of electives from a catalogue, a research project (or research internship) in semester 3, and the thesis in semester 4.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', items: ['Hardware/Software Codesign 1', 'Digital Components and Architectures for Data Processing', 'Communication and Leadership (4 ECTS)', 'Electives (e.g. Advanced Embedded Systems)'] },
      { term: 'Semester 2', items: ['Compulsory modules (continued)', 'Electives'] },
      { term: 'Semester 3', items: ['Research project at the university, or a research internship', 'Electives (e.g. Optimisation for Non-Mathematicians)'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis'] },
    ],
    source: { label: 'TU Chemnitz: Embedded Systems', url: 'https://www.tu-chemnitz.de/etit/studium/stugang/index.php.en?page=m_es' },
  },
  'ilmenau-csp': {
    summary: '120 ECTS over 4 semesters. Basic lectures first bring everyone to the same level, then in-depth lectures from digital signal processing to deep learning, with labs in small groups. The thesis includes a defence.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', items: ['Basic lectures to align knowledge (signals & systems, communications fundamentals)'] },
      { term: 'Semester 2', items: ['In-depth communications & signal-processing lectures', 'Labs in small groups'] },
      { term: 'Semester 3', items: ['In-depth lectures (up to deep learning)', 'Labs / project work'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis + defence'] },
    ],
    source: { label: 'TU Ilmenau interactive curriculum (CSP)', url: 'https://www.tu-ilmenau.de/modultafeln/CommunicationsandSignalProcessing/Master/2013/?L=english' },
  },
  'paderborn-ese': {
    summary: 'Two years: three course semesters in one of two specialisations, then a 6-month master thesis.',
    detail: 'semester',
    plan: [
      { term: 'Semesters 1–3', items: ['Specialisation courses', 'Electives', 'Labs / project work'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (6 months)'] },
    ],
    tracks: ['Signal & Information Processing', 'Electronics & Devices'],
    source: { label: 'Paderborn: Electrical Systems Engineering', url: 'https://ei.uni-paderborn.de/en/studies/degree-program/electrical-systems-engineering' },
  },
  'deggendorf-eeit': {
    summary: '90 ECTS over 3 semesters, practical and lab-heavy. You focus on either electronic & telecommunication systems or automation technology, covering hardware and software design.',
    detail: 'structure',
    plan: [
      { term: 'Semesters 1–2', items: ['Major modules: electronic & telecommunication systems or automation technology', 'Labs and project-based courses'] },
      { term: 'Semester 3', ects: 30, items: ['Master thesis'] },
    ],
    tracks: ['Electronic & telecommunication systems', 'Automation technology'],
    source: { label: 'DIT: Electrical Engineering & IT (Master)', url: 'https://www.th-deg.de/et-m-en' },
  },
  'tuwien-ecs': {
    summary: '120 ECTS. Semester 1 lays the basics (with an optional adjustment module), then you pick two areas (at least one core area), take electives in semesters 2–3, and write the thesis in a TU Wien research lab.',
    detail: 'semester',
    plan: [
      { term: 'Semester 1', ects: 30, items: ['Discrete Mathematics', 'Advanced Computer Architecture', 'Responsible Research Practice', 'Optional adjustment module (fills bachelor gaps)'] },
      { term: 'Semesters 2–3', ects: 60, items: ['Mandatory + optional courses in your two areas (theory, engineering, labs)', 'Electives to deepen and broaden'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis in a research lab'] },
    ],
    tracks: [
      'Core: Circuit Design (analog & digital hardware)',
      'Core: Verification and Validation',
      'Core: Computing, Networking and Systems',
      'Core: Cyber-Physical Systems',
      'Extension: Devices and Integrated Circuits',
      'Extension: Automation and Robotics',
      'Extension: Digital Signal Processing',
    ],
    source: { label: 'TU Wien: Embedded Computing Systems', url: 'https://www.tuwien.at/en/studies/studies/master-programmes/embedded-computing-systems' },
  },
  'tugraz-ee': {
    summary: '120 ECTS entirely in English. Three course semesters (at most 60 ECTS a year) in one of five majors, plus an optional individual minor of 21 ECTS. The thesis in semester 4 is usually applied.',
    detail: 'semester',
    plan: [
      { term: 'Semesters 1–2', ects: 60, items: ['Major modules', 'Electives', 'Optional individual minor (21 ECTS)'] },
      { term: 'Semester 3', ects: 30, items: ['Major modules', 'Labs / project'] },
      { term: 'Semester 4', ects: 30, items: ['Master thesis (usually applied, in your major)'] },
    ],
    tracks: [
      'Automation Systems Engineering',
      'Electronic Systems and IC Design',
      'Power Engineering',
      'Sensing, Control and Artificial Intelligence',
      'Wireless Networks and Communication Systems',
    ],
    source: { label: 'TU Graz curriculum (PDF)', url: 'https://www.tugraz.at/fileadmin/user_upload/tugrazInternal/Studium/Studienangebot/Masterstudien/Curricula/Curriculum-Master-Electrical-and-Electronics-Engineering-EN.pdf' },
  },
}
