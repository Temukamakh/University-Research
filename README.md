# Master's Tracker 🎓

A personal web app for planning an English-taught **mechanical / automotive engineering master's in Germany**, starting Winter Semester 2027/28. The applicant has a B.Sc. in Mechanical Engineering from the Agricultural University of Georgia (240 ECTS).

## What's inside

| Page | What it does |
| --- | --- |
| **Dashboard** | Live countdown to your next deadline, readiness score, IELTS/GRE tracker, your profile at a glance |
| **Programs** | 11 researched programs with photos, filters (reach/target/safety, focus, budget, GRE), sorting, shortlist ⭐ and status |
| **Program page** | Requirements checked against your degree, fit and difficulty, full cost breakdown, application steps, document checklist, notes, official links |
| **Timeline** | Month-by-month plan from October 2026 to your first lecture, with program deadlines merged in |
| **Map** | Interactive OpenStreetMap map of every university |
| **Compare** | Up to 3 programs side by side, with the best value in each row highlighted |
| **Costs** | Cost calculator, cost of the whole degree for each program, blocked account and scholarship info |
| **Me** | GPA → German grade converter, your curriculum by subject area, KIT/RWTH credit checks, backup export/import |

Your progress is saved in your browser (`localStorage`). Use **Me → Export backup** to keep a copy or move it to another device.

## Programs researched (September 2026)

| University | Program | Tuition/sem (non-EU) | WS 2027/28 deadline* |
| --- | --- | --- | --- |
| RWTH Aachen | Automotive Engineering M.Sc. | Free | 1 Mar 2027 (GRE required) |
| KIT Karlsruhe | Mechanical Engineering M.Sc. (English track) | €1,500 | 15 Jul 2027 |
| TU Munich | Mechanical Engineering M.Sc. | €6,000 ⚠️ over budget | 31 May 2027 |
| Univ. of Stuttgart | FAME M.Sc. | €1,500 | 15 Jan 2027 |
| TU Hamburg | Mechatronics M.Sc. | Free | 1 Feb 2027 |
| RPTU Kaiserslautern | Commercial Vehicle Technology M.Sc. | Free | 7 Feb 2027 (round 1) |
| Univ. Duisburg-Essen | Mechanical Engineering (ISE) M.Sc. | Free | 5 Feb 2027 |
| TH Ingolstadt | International Automotive Engineering M.Eng. | Free | 15 Jun 2027 (uni-assist) |
| HS Esslingen | Automotive Systems M.Eng. | €1,500 | ≈ Mar 2027 |
| Univ. of Siegen | Mechanical Engineering M.Sc. | Free | 30 Apr 2027 |
| TU Chemnitz | Advanced Manufacturing M.Sc. | Free | 15 Jul 2027 |

\* Projected from the 2026/27 cycle. Always confirm on the official page (the app links to each one).

All the research data is in [`src/data/`](src/data/) (`programs.ts`, `curriculum.ts`, `general.ts`). Edit those files to add programs or correct details.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main` (or the working branch). To turn it on, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. The site is then published at `https://<your-username>.github.io/University-Research/`.

## Tech

React 19 + TypeScript + Vite, Framer Motion for animations, Leaflet/react-leaflet for the map, and lucide-react icons. Photos are loaded from Wikimedia Commons (with a branded fallback if a photo can't load).
