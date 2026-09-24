import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AlertTriangle, Award, CalendarClock, CheckCircle2, ChevronDown, ExternalLink, Info, Lightbulb } from 'lucide-react'
import { FIT_META, SCHOLARSHIP_STATUSES, SCHOLARSHIPS_RESEARCHED_ON, scholarships, type Scholarship, type ScholarshipFit, type ScholarshipPick, type ScholarshipStatusId } from '../data/scholarships'
import { useProfile } from '../lib/profile'
import { scholarshipHandled, scholarshipStatusOf, useStore } from '../lib/store'
import { daysUntil, eur, fmtDate, useNow } from '../lib/util'
import { AnimatedNumber, DeadlineChip, Pill, riseIn, Section, stagger } from '../components/ui'

const GROUPS: ScholarshipFit[] = ['apply', 'stretch', 'later', 'no']

export default function Scholarships() {
  const { profile } = useProfile()
  const { state } = useStore()
  const now = useNow()

  const picks = profile.scholarships.filter((p) => scholarships[p.id])
  const featured = picks.find((p) => (p.fit === 'apply' || p.fit === 'stretch') && scholarships[p.id].kind === 'daad')
  const rest = picks.filter((p) => p !== featured)

  const dated = picks
    .filter((p) => p.fit !== 'no' && scholarships[p.id].deadline)
    .sort((a, b) => scholarships[a.id].deadline!.date.localeCompare(scholarships[b.id].deadline!.date))

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="page">
      <motion.header variants={riseIn} className="page-head">
        <div>
          <h1>Scholarships</h1>
          <p className="muted">
            DAAD and other funding for a master's starting in winter semester 2027/28, sorted by what {profile.name} can apply for. Researched {SCHOLARSHIPS_RESEARCHED_ON}. Always check
            the official page before you apply, because dates can move.
          </p>
        </div>
      </motion.header>

      {featured && <Featured pick={featured} now={now} />}

      {dated.length > 0 && (
        <motion.div variants={riseIn}>
          <Section title="Scholarship deadlines" icon={<CalendarClock size={18} />}>
            <ol className="sch-dates">
              {dated.map((p, i) => {
                const s = scholarships[p.id]
                const dl = s.deadline!
                const handled = scholarshipHandled(state, p.id)
                return (
                  <motion.li
                    key={p.id}
                    className={handled ? 'done' : ''}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    onClick={() => document.getElementById(`sch-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  >
                    <span className="sch-date" style={{ '--fit': FIT_META[p.fit].color } as React.CSSProperties}>
                      <b>{fmtDate(dl.date, { day: 'numeric' })}</b>
                      <small>{fmtDate(dl.date, { month: 'short', year: '2-digit' })}</small>
                    </span>
                    <span className="sch-date-body">
                      <strong>
                        {s.provider === 'DAAD' ? 'DAAD: ' : ''}
                        {s.name}
                      </strong>
                      <small className="muted">
                        {dl.confirmed ? 'Confirmed date' : 'Approximate: confirm for Georgia'} · {FIT_META[p.fit].label}
                      </small>
                    </span>
                    {handled ? <Pill tone="#10b981">✓ Done</Pill> : <DeadlineChip iso={dl.date} now={now} />}
                  </motion.li>
                )
              })}
            </ol>
          </Section>
        </motion.div>
      )}

      {GROUPS.map((fit) => {
        const list = rest.filter((p) => p.fit === fit)
        if (!list.length) return null
        const meta = FIT_META[fit]
        return (
          <motion.section key={fit} variants={riseIn} className="sch-group">
            <h2 className="sch-group-head">
              <i style={{ background: meta.color }} />
              {meta.label}
              <small className="muted">{meta.blurb}</small>
            </h2>
            <div className="sch-grid">
              {list.map((p, i) => (
                <ScholarshipCard key={p.id} pick={p} now={now} index={i} />
              ))}
            </div>
          </motion.section>
        )
      })}

      <motion.p variants={riseIn} className="muted small sch-foot">
        <Info size={13} /> Scholarship dates come from the providers' pages and the DAAD database as of {SCHOLARSHIPS_RESEARCHED_ON}. The official DAAD sites could not be opened
        directly while this was researched, so dates marked "approximate" come from secondary sources.
      </motion.p>
    </motion.div>
  )
}

/** The main scholarship for this applicant: big countdown, steps and checklist. */
function Featured({ pick, now }: { pick: ScholarshipPick; now: Date }) {
  const s = scholarships[pick.id]
  const dl = s.deadline
  const days = dl ? daysUntil(dl.date, now) : undefined
  const fit = FIT_META[pick.fit]
  return (
    <motion.section variants={riseIn} id={`sch-${s.id}`} className="sch-hero card">
      <div className="sch-hero-glow" aria-hidden />
      <div className="sch-hero-top">
        <div className="sch-hero-text">
          <p className="eyebrow">
            <Award size={14} /> {s.provider} · top pick for you
          </p>
          <h2>{s.name}</h2>
          <div className="sch-money">
            <span className="sch-money-big">
              <AnimatedNumber value={s.monthly ?? 0} format={(n) => eur(n)} />
            </span>
            <span className="muted">per month for up to 24 months</span>
          </div>
          <p className="muted small">
            That is up to <strong>{eur((s.monthly ?? 0) * 24)}</strong>, plus insurance, travel and a study allowance. An award letter can also replace the blocked account for
            your visa.
          </p>
          <div className="chips">
            <Pill tone={fit.color}>{fit.label}</Pill>
            {s.fundingStarts && <Pill tone="#6366f1">Funding from {s.fundingStarts}</Pill>}
          </div>
        </div>
        {dl && days !== undefined && (
          <div className="sch-count glass">
            <span className="countdown-label">
              <CalendarClock size={14} /> Application deadline
            </span>
            <span className="sch-count-num">
              {days >= 0 ? <AnimatedNumber value={days} /> : '—'}
              <small>{days >= 0 ? 'days left' : 'passed'}</small>
            </span>
            <span className="countdown-date">
              {dl.confirmed ? '' : '≈ '}
              {fmtDate(dl.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {!dl.confirmed && (
              <span className="sch-warn">
                <AlertTriangle size={13} /> Approximate date. Check the exact date for Georgia this week.
              </span>
            )}
          </div>
        )}
      </div>

      <div className="sch-note">
        <Lightbulb size={16} />
        <p>{pick.note}</p>
      </div>
      {dl && <p className="muted small">{dl.note}</p>}

      {s.process && (
        <ol className="sch-steps">
          {s.process.map((step, i) => (
            <motion.li key={step.what} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
              <span className="sch-step-dot">{i + 1}</span>
              <small>{step.when}</small>
              <span>{step.what}</span>
            </motion.li>
          ))}
        </ol>
      )}

      <div className="sch-hero-cols">
        <div>
          <h4 className="sub">What you need</h4>
          <DocChecklist s={s} />
        </div>
        <div>
          <h4 className="sub">Who can apply</h4>
          <ul className="sch-list">
            {s.eligibility.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <h4 className="sub">What it covers</h4>
          <ul className="sch-list">
            {s.covers.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sch-actions">
        <StatusPicker id={s.id} />
        <Links s={s} />
      </div>
    </motion.section>
  )
}

function ScholarshipCard({ pick, now, index }: { pick: ScholarshipPick; now: Date; index: number }) {
  const s = scholarships[pick.id]
  const [open, setOpen] = useState(pick.fit === 'apply' || pick.fit === 'stretch')
  const fit = FIT_META[pick.fit]
  const active = pick.fit !== 'no'
  return (
    <motion.article
      id={`sch-${s.id}`}
      className={`card sch-card ${active ? '' : 'muted-card'}`}
      style={{ '--fit': fit.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, type: 'spring', stiffness: 260, damping: 26 }}
      layout
    >
      <div className="sch-card-head">
        <span className="sch-provider">{s.provider}</span>
        {s.deadline && active && <DeadlineChip iso={s.deadline.date} now={now} />}
      </div>
      <h3>{s.name}</h3>
      <div className="sch-card-facts">
        <span>
          <b>{s.amount}</b>
        </span>
        {s.deadline && (
          <span className="muted small">
            Deadline {s.deadline.confirmed ? '' : '≈ '}
            {fmtDate(s.deadline.date)}
          </span>
        )}
      </div>
      <p className="sch-card-note">{pick.note}</p>

      <button className="sch-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide details' : 'Details, rules & documents'}
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ display: 'inline-flex' }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="sch-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {s.deadline && <p className="muted small">{s.deadline.note}</p>}
            <h4 className="sub">Who can apply</h4>
            <ul className="sch-list">
              {s.eligibility.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <h4 className="sub">What it covers</h4>
            <ul className="sch-list">
              {s.covers.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="muted small">Duration: {s.duration}</p>
            {active && (
              <>
                <h4 className="sub">Documents</h4>
                <DocChecklist s={s} />
              </>
            )}
            <div className="sch-actions">
              {active && <StatusPicker id={s.id} />}
              <Links s={s} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function DocChecklist({ s }: { s: Scholarship }) {
  const { state, toggleScholarshipDoc } = useStore()
  const done = s.documents.filter((d) => state.scholarshipDocs[s.id]?.[d]).length
  return (
    <div className="sch-docs">
      <div className="doc-progress">
        <motion.span animate={{ width: `${(done / s.documents.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
      <ul className="checklist">
        {s.documents.map((d) => {
          const on = !!state.scholarshipDocs[s.id]?.[d]
          return (
            <li key={d}>
              <label className={on ? 'on' : ''}>
                <input type="checkbox" checked={on} onChange={() => toggleScholarshipDoc(s.id, d)} />
                <motion.span className="box" animate={{ scale: on ? [1, 1.25, 1] : 1 }}>
                  {on && <CheckCircle2 size={16} />}
                </motion.span>
                {d}
              </label>
            </li>
          )
        })}
      </ul>
      <small className="muted">
        {done} of {s.documents.length} ready
      </small>
    </div>
  )
}

function StatusPicker({ id }: { id: string }) {
  const { state, setScholarshipStatus } = useStore()
  const cur = scholarshipStatusOf(state, id)
  const meta = SCHOLARSHIP_STATUSES.find((s) => s.id === cur)!
  return (
    <select
      className="status-select sch-status"
      style={{ '--status': meta.color } as React.CSSProperties}
      value={cur}
      onChange={(e) => setScholarshipStatus(id, e.target.value as ScholarshipStatusId)}
      aria-label="Scholarship status"
    >
      {SCHOLARSHIP_STATUSES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  )
}

function Links({ s }: { s: Scholarship }) {
  return (
    <div className="sch-links">
      {s.links.map((l) => (
        <a key={l.url} className="btn small" href={l.url} target="_blank" rel="noreferrer">
          {l.label} <ExternalLink size={12} />
        </a>
      ))}
    </div>
  )
}
