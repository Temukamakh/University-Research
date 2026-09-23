import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { programs } from '../data/programs'
import type { Program } from '../data/types'
import { useStore } from '../lib/store'
import { BUDGET_PER_SEMESTER, degreeCost, eur, fmtDate } from '../lib/util'
import { DifficultyMeter, PhotoImg, TierBadge } from '../components/ui'

const reqValue = (p: Program, label: string) => p.requirements.find((r) => r.label.startsWith(label))?.value ?? '–'

const ROWS: { label: string; render: (p: Program) => React.ReactNode; best?: (ps: Program[]) => string | undefined }[] = [
  { label: 'Tier', render: (p) => <TierBadge tier={p.tier} /> },
  { label: 'City', render: (p) => `${p.city}, ${p.state}` },
  { label: 'Type', render: (p) => p.kind },
  { label: 'Language', render: (p) => p.language },
  { label: 'Duration', render: (p) => `${p.semesters} semesters (${p.degree})` },
  { label: 'Fit for you', render: (p) => `${p.fit}%`, best: (ps) => ps.reduce((a, b) => (b.fit > a.fit ? b : a)).id },
  { label: 'Difficulty', render: (p) => <DifficultyMeter level={p.difficulty} /> },
  { label: 'QS world rank', render: (p) => `${p.ranking.qsWorld} (${p.ranking.qsYear})` },
  { label: 'Subject rank', render: (p) => p.ranking.qsSubject ?? '–' },
  {
    label: 'Tuition / semester',
    render: (p) => (p.costs.tuition ? eur(p.costs.tuition) : 'Free') + (p.costs.tuition > BUDGET_PER_SEMESTER ? ' ⚠️' : ''),
    best: (ps) => ps.reduce((a, b) => (b.costs.tuition < a.costs.tuition ? b : a)).id,
  },
  { label: 'Living / month', render: (p) => eur(p.costs.living), best: (ps) => ps.reduce((a, b) => (b.costs.living < a.costs.living ? b : a)).id },
  {
    label: 'Whole degree',
    render: (p) => eur(degreeCost(p).total),
    best: (ps) => ps.reduce((a, b) => (degreeCost(b).total < degreeCost(a).total ? b : a)).id,
  },
  { label: 'Deadline', render: (p) => fmtDate(p.application.deadline) },
  { label: 'English', render: (p) => reqValue(p, 'English') },
  { label: 'GRE', render: (p) => reqValue(p, 'GRE') },
  { label: 'Apply via', render: (p) => `${p.application.portal}${p.application.viaUniAssist ? ' (uni-assist)' : ''}` },
]

export default function Compare() {
  const { state, toggleCompare } = useStore()
  const chosen = state.compare.map((id) => programs.find((p) => p.id === id)!).filter(Boolean)

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Compare</h1>
          <p className="muted">Pick up to 3 programs. A green highlight marks the best value in each row.</p>
        </div>
      </header>

      <div className="chips wrap card toolbar">
        {programs.map((p) => {
          const on = state.compare.includes(p.id)
          return (
            <button key={p.id} className={`chip ${on ? 'on' : ''}`} style={{ '--chip': p.color } as React.CSSProperties} onClick={() => toggleCompare(p.id)}>
              {p.short} · {p.program.split('(')[0].trim()}
            </button>
          )
        })}
      </div>

      {chosen.length === 0 ? (
        <p className="empty muted">Select programs above to compare them.</p>
      ) : (
        <div className="compare-scroll">
          <table className="compare" style={{ '--cols': chosen.length } as React.CSSProperties}>
            <thead>
              <tr>
                <th />
                <AnimatePresence initial={false}>
                  {chosen.map((p) => (
                    <motion.th key={p.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <div className="cmp-head" style={{ '--brand': p.color } as React.CSSProperties}>
                        <PhotoImg photo={p.photos[0]} program={p} width={500} compact />
                        <button className="icon-btn cmp-x" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.short}`}>
                          <X size={14} />
                        </button>
                        <a href={`#/program/${p.id}`}>
                          <strong>{p.short}</strong>
                          <span>{p.program}</span>
                        </a>
                      </div>
                    </motion.th>
                  ))}
                </AnimatePresence>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const best = chosen.length > 1 ? row.best?.(chosen) : undefined
                return (
                  <motion.tr key={row.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                    <th scope="row">{row.label}</th>
                    {chosen.map((p) => (
                      <td key={p.id} className={best === p.id ? 'best' : ''}>
                        {row.render(p)}
                      </td>
                    ))}
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
