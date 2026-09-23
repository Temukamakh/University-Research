import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Check, Flag, GraduationCap, Plane, BookOpen, FileText, Sparkles } from 'lucide-react'
import { milestones, type Milestone } from '../data/general'
import { programs } from '../data/programs'
import { statusOf, useStore } from '../lib/store'
import { daysUntil, fmtDate, useNow } from '../lib/util'
import { navigate } from '../App'

interface Item {
  id: string
  date: string
  title: string
  detail: string
  kind: Milestone['kind'] | 'deadline'
  color?: string
  programId?: string
}

const KIND: Record<Item['kind'], { label: string; color: string; icon: typeof Flag }> = {
  prep: { label: 'Plan', color: '#6366f1', icon: Sparkles },
  test: { label: 'Test', color: '#f59e0b', icon: BookOpen },
  docs: { label: 'Documents', color: '#06b6d4', icon: FileText },
  visa: { label: 'Visa', color: '#8b5cf6', icon: Plane },
  life: { label: 'Life', color: '#10b981', icon: GraduationCap },
  deadline: { label: 'Deadline', color: '#ef4444', icon: Flag },
}

export default function Timeline() {
  const { state, toggleMilestone } = useStore()
  const now = useNow()
  const [scope, setScope] = useState<'shortlist' | 'all'>('shortlist')

  const items = useMemo<Item[]>(() => {
    const progs = programs.filter((p) => scope === 'all' || state.shortlist.includes(p.id))
    const dl: Item[] = progs.map((p) => ({
      id: `dl-${p.id}`,
      date: p.application.deadline,
      title: `${p.short}: ${p.program}`,
      detail: p.application.deadlineNote ?? `Apply via ${p.application.portal}`,
      kind: 'deadline',
      color: p.color,
      programId: p.id,
    }))
    return [...milestones, ...dl].sort((a, b) => a.date.localeCompare(b.date))
  }, [scope, state.shortlist])

  const groups = useMemo(() => {
    const g = new Map<string, Item[]>()
    for (const it of items) {
      const key = it.date.slice(0, 7)
      g.set(key, [...(g.get(key) ?? []), it])
    }
    return [...g.entries()]
  }, [items])

  const isDone = (it: Item) =>
    it.kind === 'deadline' ? ['submitted', 'interview', 'admitted', 'rejected'].includes(statusOf(state, it.programId!)) : !!state.milestonesDone[it.id]

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Timeline</h1>
          <p className="muted">From now until your first lecture. Tick milestones as you finish them. Deadlines are marked done once you set that application's status to "Submitted".</p>
        </div>
        <div className="seg">
          {(['shortlist', 'all'] as const).map((s) => (
            <button key={s} className={scope === s ? 'on' : ''} onClick={() => setScope(s)}>
              {scope === s && <motion.span layoutId="seg" className="seg-pill" />}
              <span>{s === 'shortlist' ? 'My shortlist' : 'All programs'}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="legend-row">
        {Object.entries(KIND).map(([k, v]) => (
          <span key={k} className="legend-item">
            <i style={{ background: v.color }} /> {v.label}
          </span>
        ))}
      </div>

      <div className="timeline">
        <motion.div className="tl-line" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
        {groups.map(([month, list], gi) => (
          <section key={month} className="tl-month">
            <motion.h3 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.02 }}>
              {new Date(month + '-15').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </motion.h3>
            {list.map((it) => {
              const meta = KIND[it.kind]
              const Icon = meta.icon
              const done = isDone(it)
              const d = daysUntil(it.date, now)
              const color = it.color ?? meta.color
              return (
                <motion.div
                  key={it.id}
                  className={`tl-item ${done ? 'done' : ''} ${d < 0 && !done ? 'overdue' : ''}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                >
                  <button
                    className="tl-dot"
                    style={{ '--dot': color } as React.CSSProperties}
                    onClick={() => (it.kind === 'deadline' ? navigate('program', it.programId) : toggleMilestone(it.id))}
                    aria-label={it.kind === 'deadline' ? 'Open program' : done ? 'Mark as not done' : 'Mark as done'}
                  >
                    {done ? <Check size={14} /> : <Icon size={14} />}
                  </button>
                  <div className="tl-card card" onClick={() => it.kind === 'deadline' && navigate('program', it.programId)}>
                    <div className="tl-top">
                      <span className="tl-kind" style={{ color }}>
                        {meta.label}
                      </span>
                      <span className="muted small">
                        {fmtDate(it.date, { weekday: 'short', day: 'numeric', month: 'short' })} · {d >= 0 ? `in ${d} days` : `${-d} days ago`}
                      </span>
                    </div>
                    <strong>{it.title}</strong>
                    <p className="muted small">{it.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}
