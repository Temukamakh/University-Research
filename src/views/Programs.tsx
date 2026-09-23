import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { programs, RESEARCHED_ON } from '../data/programs'
import type { Focus, Program, Tier } from '../data/types'
import { useStore } from '../lib/store'
import { BUDGET_PER_SEMESTER, eur, fmtDate, focusMeta, tierMeta, useNow } from '../lib/util'
import { DeadlineChip, DifficultyMeter, MotorsportMeter, PhotoImg, Pill, StarButton, StatusSelect, TierBadge } from '../components/ui'
import { navigate } from '../App'

type Sort = 'deadline' | 'fit' | 'ranking' | 'cost' | 'difficulty' | 'motorsport'

const rankValue = (p: Program) => {
  const m = p.ranking.qsWorld.match(/\d+/)
  return m ? Number(m[0]) : 5000
}

export default function Programs() {
  const { state } = useStore()
  const now = useNow()
  const [q, setQ] = useState('')
  const [tiers, setTiers] = useState<Tier[]>([])
  const [focus, setFocus] = useState<Focus[]>([])
  const [onlyShortlist, setOnlyShortlist] = useState(false)
  const [withinBudget, setWithinBudget] = useState(false)
  const [noGre, setNoGre] = useState(false)
  const [motorsportOnly, setMotorsportOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('deadline')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = programs.filter((p) => {
      if (needle && !`${p.university} ${p.short} ${p.program} ${p.city}`.toLowerCase().includes(needle)) return false
      if (tiers.length && !tiers.includes(p.tier)) return false
      if (focus.length && !p.focus.some((f) => focus.includes(f))) return false
      if (onlyShortlist && !state.shortlist.includes(p.id)) return false
      if (withinBudget && p.costs.tuition > BUDGET_PER_SEMESTER) return false
      if (motorsportOnly && p.motorsport.score < 4) return false
      if (noGre && p.requirements.some((r) => r.label.startsWith('GRE') && !/not required/i.test(r.value))) return false
      return true
    })
    const by: Record<Sort, (a: Program, b: Program) => number> = {
      deadline: (a, b) => a.application.deadline.localeCompare(b.application.deadline),
      fit: (a, b) => b.fit - a.fit,
      ranking: (a, b) => rankValue(a) - rankValue(b),
      cost: (a, b) => a.costs.tuition + a.costs.living * 6 - (b.costs.tuition + b.costs.living * 6),
      difficulty: (a, b) => b.difficulty - a.difficulty,
      motorsport: (a, b) => b.motorsport.score - a.motorsport.score || b.fit - a.fit,
    }
    return filtered.sort(by[sort])
  }, [q, tiers, focus, onlyShortlist, withinBudget, noGre, motorsportOnly, sort, state.shortlist])

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Programs</h1>
          <p className="muted">
            {programs.length} English-taught master's programs in Germany that match your mechanical engineering degree. Researched {RESEARCHED_ON}.
            Deadlines are projected for WS 2027/28, so always confirm on the official page.
          </p>
        </div>
      </header>

      <div className="toolbar card">
        <label className="search">
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search university, program, city…" />
        </label>
        <div className="chips">
          {(Object.keys(tierMeta) as Tier[]).map((t) => (
            <button key={t} className={`chip ${tiers.includes(t) ? 'on' : ''}`} style={{ '--chip': tierMeta[t].color } as React.CSSProperties} onClick={() => toggle(tiers, t, setTiers)}>
              {tierMeta[t].label}
            </button>
          ))}
          <span className="chip-sep" />
          {(Object.keys(focusMeta) as Focus[]).map((f) => (
            <button key={f} className={`chip ${focus.includes(f) ? 'on' : ''}`} onClick={() => toggle(focus, f, setFocus)}>
              {focusMeta[f].emoji} {focusMeta[f].label}
            </button>
          ))}
        </div>
        <div className="chips">
          <button className={`chip ${onlyShortlist ? 'on' : ''}`} onClick={() => setOnlyShortlist(!onlyShortlist)}>
            ⭐ Shortlist only
          </button>
          <button className={`chip ${withinBudget ? 'on' : ''}`} onClick={() => setWithinBudget(!withinBudget)}>
            💶 Tuition ≤ {eur(BUDGET_PER_SEMESTER)}/sem
          </button>
          <button className={`chip ${noGre ? 'on' : ''}`} onClick={() => setNoGre(!noGre)}>
            📝 No GRE
          </button>
          <button className={`chip ${motorsportOnly ? 'on' : ''}`} onClick={() => setMotorsportOnly(!motorsportOnly)}>
            🏁 Strong motorsport links
          </button>
          <label className="sort">
            <SlidersHorizontal size={14} />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort programs">
              <option value="deadline">Sort: deadline</option>
              <option value="fit">Sort: best fit</option>
              <option value="ranking">Sort: QS ranking</option>
              <option value="cost">Sort: cheapest</option>
              <option value="difficulty">Sort: hardest first</option>
              <option value="motorsport">Sort: motorsport links</option>
            </select>
          </label>
        </div>
      </div>

      <motion.div layout className="program-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article
              layout
              key={p.id}
              className="program-card card"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.03, type: 'spring', stiffness: 260, damping: 26 } }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
              whileHover={{ y: -6 }}
              onClick={() => navigate('program', p.id)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('program', p.id)}
              style={{ '--brand': p.color } as React.CSSProperties}
            >
              <div className="pc-media">
                <PhotoImg photo={p.photos[0]} program={p} width={700} compact />
                <div className="pc-overlay" />
                <div className="pc-top">
                  <TierBadge tier={p.tier} />
                  <StarButton id={p.id} />
                </div>
                <div className="pc-title">
                  <span className="pc-uni">{p.short}</span>
                  <h3>{p.program}</h3>
                </div>
              </div>
              <div className="pc-body">
                <p className="pc-loc">
                  <MapPin size={14} /> {p.city} · {p.kind}
                </p>
                <div className="pc-pills">
                  <Pill>{p.degree} · {p.semesters} sem</Pill>
                  <Pill tone={p.costs.tuition === 0 ? '#10b981' : p.costs.tuition > BUDGET_PER_SEMESTER ? '#ef4444' : '#f59e0b'}>
                    {p.costs.tuition === 0 ? 'Tuition-free' : `${eur(p.costs.tuition)}/sem`}
                  </Pill>
                  <Pill>🏆 {p.ranking.qsWorld}</Pill>
                </div>
                <div className="pc-fit">
                  <span>Fit</span>
                  <div className="fit-bar">
                    <motion.span initial={{ width: 0 }} animate={{ width: `${p.fit}%` }} transition={{ duration: 0.9, delay: 0.1 }} />
                  </div>
                  <b>{p.fit}%</b>
                </div>
                <div className="pc-meters">
                  <DifficultyMeter level={p.difficulty} />
                  <span className="pc-ms" title={p.motorsport.team}>
                    🏁 <MotorsportMeter score={p.motorsport.score} compact />
                  </span>
                </div>
                <div className="pc-foot">
                  <div>
                    <small className="muted">Deadline</small>
                    <strong>{fmtDate(p.application.deadline)}</strong>
                  </div>
                  <DeadlineChip iso={p.application.deadline} now={now} />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <StatusSelect id={p.id} />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {!list.length && <p className="empty muted">No programs match these filters.</p>}
    </div>
  )
}
