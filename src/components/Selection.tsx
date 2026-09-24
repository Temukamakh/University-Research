import { motion } from 'framer-motion'
import { CheckCircle2, ExternalLink, Filter, Info, TriangleAlert, XCircle } from 'lucide-react'
import type { Program, Selection } from '../data/types'
import { toGermanGrade } from '../data/curriculum'
import { useStore } from '../lib/store'
import { fmtGpa } from '../lib/util'
import { Section } from './ui'

export const METHOD_META: Record<Selection['method'], { label: string; color: string }> = {
  open: { label: 'Requirements check', color: '#10b981' },
  ranked: { label: 'Ranked by grade', color: '#ef4444' },
  points: { label: 'Points / aptitude test', color: '#f59e0b' },
  holistic: { label: 'Committee review', color: '#6366f1' },
}

const GPA_ROLE: Record<Selection['gpaRole'], { label: string; level: number }> = {
  low: { label: 'Low: not ranked by grade', level: 1 },
  medium: { label: 'Medium: one factor among several', level: 2 },
  high: { label: 'High: the grade decides a lot', level: 3 },
}

/**
 * German grade range for a GPA on a 4.0 scale. Universities use the modified Bavarian formula;
 * whether they take 1.0 or 1.55 (your lowest passing E) as the minimum pass gives the range.
 */
export function germanRange(gpa: number): [number, number] {
  return [toGermanGrade(gpa, 4, 1), toGermanGrade(gpa, 4, 1.55)]
}

type Verdict = 'meets' | 'borderline' | 'misses'
function verdict([best, worst]: [number, number], min: number): Verdict {
  if (worst <= min) return 'meets'
  if (best <= min) return 'borderline'
  return 'misses'
}

const VERDICT = {
  meets: { label: 'Meets it', color: '#10b981', icon: CheckCircle2 },
  borderline: { label: 'Borderline: depends on the formula', color: '#f59e0b', icon: TriangleAlert },
  misses: { label: 'Misses it', color: '#ef4444', icon: XCircle },
} as const

export function SelectionSection({ p }: { p: Program }) {
  const s = p.selection
  const { state } = useStore()
  if (!s) return null
  const meta = METHOD_META[s.method]
  const role = GPA_ROLE[s.gpaRole]
  const rows: { label: string; gpa: number }[] = [
    { label: 'Now', gpa: state.profile.gpaNow },
    { label: 'At graduation (expected)', gpa: state.profile.gpaExpected },
  ]
  return (
    <Section
      title="How they select"
      icon={<Filter size={18} />}
      action={
        <span className="sel-badge" style={{ '--sel': meta.color } as React.CSSProperties}>
          {meta.label}
        </span>
      }
    >
      <p className="sel-summary">{s.summary}</p>

      <div className="sel-role">
        <span className="muted small">How much your GPA counts</span>
        <span className="sel-meter" aria-label={role.label}>
          {[1, 2, 3].map((i) => (
            <motion.i
              key={i}
              className={i <= role.level ? 'on' : ''}
              style={{ '--lvl': ['#10b981', '#f59e0b', '#ef4444'][role.level - 1] } as React.CSSProperties}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}
        </span>
        <strong className="small">{role.label}</strong>
      </div>

      {s.minGrade !== undefined && (
        <div className="sel-min">
          <div className="sel-min-head">
            <strong>Minimum grade: {s.minGrade.toFixed(1)}</strong>
            <span className="muted small">German scale, 1.0 best · 4.0 lowest pass</span>
          </div>
          {rows.map((r) => {
            const range = germanRange(r.gpa)
            const v = VERDICT[verdict(range, s.minGrade!)]
            const Icon = v.icon
            return (
              <div key={r.label} className="sel-min-row">
                <span>
                  {r.label}: GPA {fmtGpa(r.gpa)} → <b>{range[0].toFixed(1)}–{range[1].toFixed(1)}</b>
                </span>
                <span className="pill" style={{ '--pill': v.color } as React.CSSProperties}>
                  <Icon size={13} /> {v.label}
                </span>
              </div>
            )
          })}
          <p className="muted small">
            Your GPA as set on the Me page. The range comes from the modified Bavarian formula, taking 1.0 or 1.55 (an E) as the lowest pass. Most deadlines fall before
            you graduate, so the "now" row is closer to what they will see.
          </p>
        </div>
      )}

      <h4 className="sub">What they look at</h4>
      <ul className="sch-list">
        {s.steps.map((st) => (
          <li key={st}>{st}</li>
        ))}
      </ul>

      <p className="muted small cur-note">
        <Info size={13} />{' '}
        {s.confirmed ? 'Taken from the program\'s own pages or regulations.' : 'Partly from secondary sources. Check the official admission regulations or email the program.'}{' '}
        {s.sources.map((src) => (
          <a key={src.url} href={src.url} target="_blank" rel="noreferrer" className="sel-src">
            {src.label} <ExternalLink size={11} />
          </a>
        ))}
      </p>
    </Section>
  )
}
