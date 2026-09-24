import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarClock,
  CheckCircle2,
  Circle,
  Flag,
  ClipboardList,
  ExternalLink,
  FileText,
  Gauge,
  Languages,
  Lightbulb,
  MapPin,
  PenLine,
  Scale,
  Trophy,
  Wallet,
} from 'lucide-react'
import { useProfile } from '../lib/profile'
import type { ReqStatus } from '../data/types'
import { useStore } from '../lib/store'
import { fromKonstanz, degreeCost, docsFor, eur, fmtDate, tierMeta, useNow } from '../lib/util'
import { AnimatedNumber, DeadlineChip, DifficultyMeter, Gallery, MotorsportMeter, ProgressRing, riseIn, Section, stagger, StarButton, StatusSelect, TierBadge } from '../components/ui'
import { navigate } from '../App'

const reqIcon: Record<ReqStatus, React.ReactNode> = {
  ok: <CheckCircle2 size={18} className="ok" />,
  todo: <Circle size={18} className="todo" />,
  warn: <AlertTriangle size={18} className="warn" />,
}

export default function ProgramDetail({ id }: { id: string }) {
  const { profile } = useProfile()
  const p = profile.programs.find((x) => x.id === id)
  const BUDGET_PER_SEMESTER = profile.budgetPerSemester
  const { state, toggleDoc, setNote, toggleCompare } = useStore()
  const now = useNow()

  if (!p) {
    return (
      <div className="page">
        <p>Program not found.</p>
        <a href="#/programs" className="btn">Back to programs</a>
      </div>
    )
  }

  const cost = degreeCost(p)
  const docs = docsFor(p, profile.baseDocuments)
  const done = docs.filter((d) => state.docs[p.id]?.[d]).length
  const inCompare = state.compare.includes(p.id)

  return (
    <motion.div className="page" variants={stagger} initial="hidden" animate="show" style={{ '--brand': p.color } as React.CSSProperties}>
      <motion.div variants={riseIn}>
        <button className="btn ghost back" onClick={() => (history.length > 1 ? history.back() : navigate('programs'))}>
          <ArrowLeft size={16} /> Back
        </button>
      </motion.div>

      <motion.section variants={riseIn} className="detail-hero">
        <Gallery program={p} />
        <div className="detail-head card">
          <div className="detail-badges">
            <TierBadge tier={p.tier} />
            <span className="muted small">{tierMeta[p.tier].blurb}</span>
          </div>
          <p className="eyebrow">{p.university}</p>
          <h1>
            {p.program} <span className="muted">{p.degree}</span>
          </h1>
          <p className="muted">
            <MapPin size={14} /> {p.city}, {p.state}
            {p.country ? `, ${p.country}` : ''} · {p.kind}
          </p>
          <div className="detail-actions">
            <StarButton id={p.id} />
            <StatusSelect id={p.id} />
            <button className={`btn small ${inCompare ? 'primary' : 'ghost'}`} onClick={() => toggleCompare(p.id)}>
              <Scale size={14} /> {inCompare ? 'In compare' : 'Compare'}
            </button>
            <a className="btn small ghost" href={p.application.portalUrl} target="_blank" rel="noreferrer">
              Apply: {p.application.portal} <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.section>

      <motion.div variants={riseIn} className="facts">
        <Fact icon={<Languages size={16} />} label="Language" value={p.language} />
        <Fact icon={<CalendarClock size={16} />} label="Duration / intake" value={`${p.semesters} semesters · ${p.intake}`} />
        <Fact icon={<Trophy size={16} />} label={`World rank (${p.ranking.qsYear})`} value={p.ranking.qsWorld} sub={p.ranking.qsSubject ?? p.ranking.note} />
        <Fact
          icon={<Wallet size={16} />}
          label="Tuition (non-EU)"
          value={p.costs.tuition ? `${eur(p.costs.tuition)} / semester` : 'Free 🎉'}
          sub={p.costs.tuition > BUDGET_PER_SEMESTER ? `⚠️ Above your ${eur(BUDGET_PER_SEMESTER)} budget` : `+ ≈ ${eur(p.costs.semesterFee)} semester fee`}
        />
        <Fact
          icon={<CalendarClock size={16} />}
          label="Deadline (WS 2027/28)"
          value={fmtDate(p.application.deadline, { day: 'numeric', month: 'long', year: 'numeric' })}
          sub={<DeadlineChip iso={p.application.deadline} now={now} />}
        />
        <Fact
          icon={<MapPin size={16} />}
          label="Distance to Konstanz"
          value={`${fromKonstanz(p.coords).straight} km straight line`}
          sub={`≈ ${fromKonstanz(p.coords).road} km / ${fromKonstanz(p.coords).drive} by car (estimate)`}
        />
        <Fact icon={<Building2 size={16} />} label="Apply via" value={p.application.portal} sub={p.application.viaUniAssist ? 'uni-assist pre-check needed' : 'Direct application'} />
      </motion.div>

      <div className="grid-2">
        <motion.div variants={riseIn}>
          <Section title="Requirements vs. you" icon={<ClipboardList size={18} />}>
            <ul className="req-list">
              {p.requirements.map((r) => (
                <li key={r.label} className={`req ${r.status}`}>
                  {reqIcon[r.status]}
                  <div>
                    <strong>{r.label}</strong>
                    <span>{r.value}</span>
                    {r.note && <em>{r.note}</em>}
                  </div>
                </li>
              ))}
            </ul>
            <p className="legend muted small">
              <CheckCircle2 size={13} className="ok" /> you already meet it · <Circle size={13} className="todo" /> still to do ·{' '}
              <AlertTriangle size={13} className="warn" /> check carefully
            </p>
          </Section>
        </motion.div>

        <motion.div variants={riseIn}>
          <Section title="How hard is it to get in?" icon={<Gauge size={18} />}>
            <div className="fit-row">
              <ProgressRing value={p.fit / 100} size={110} stroke={10} color={p.color}>
                <strong className="ring-value">
                  <AnimatedNumber value={p.fit} />%
                </strong>
                <small>fit</small>
              </ProgressRing>
              <div>
                <DifficultyMeter level={p.difficulty} />
                <p className="small">{p.difficultyNote}</p>
              </div>
            </div>
            <h4 className="sub">Why it fits you</h4>
            <ul className="bullets good">
              {p.fitNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            {p.gaps.length > 0 && (
              <>
                <h4 className="sub">Watch out for</h4>
                <ul className="bullets warn">
                  {p.gaps.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="muted small">German universities rarely publish acceptance rates, so the fit and difficulty scores are my estimates based on the published rules.</p>
          </Section>
        </motion.div>
      </div>

      <motion.div variants={riseIn}>
        <Section title={profile.path.title} icon={<Flag size={18} />} action={<MotorsportMeter score={p.path.score} />}>
          <div className="motorsport">
            <div className="ms-team">
              <span className="ms-flag" aria-hidden>{profile.path.emoji}</span>
              <div>
                <small className="muted">{profile.path.teamLabel}</small>
                <strong>{p.path.team}</strong>
              </div>
            </div>
            <ul className="bullets">
              {p.path.points.map((pt) => (
                <li key={pt}>
                  <Flag size={13} /> {pt}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </motion.div>

      <div className="grid-2">
        <motion.div variants={riseIn}>
          <Section title="What it costs" icon={<Wallet size={18} />}>
            <div className="cost-total">
              <small>Whole degree ({cost.months} months)</small>
              <strong>
                <AnimatedNumber value={cost.total} format={eur} />
              </strong>
            </div>
            <CostBar label="Living costs" value={cost.living} total={cost.total} color="#6366f1" sub={`≈ ${eur(p.costs.living)}/month in ${p.city.split(' ')[0]}`} />
            <CostBar label="Tuition" value={cost.tuition} total={cost.total} color="#f43f5e" sub={p.costs.tuition ? `${eur(p.costs.tuition)} × ${p.semesters}` : 'No tuition'} />
            <CostBar label="Semester fees" value={cost.fees} total={cost.total} color="#10b981" sub={`≈ ${eur(p.costs.semesterFee)} × ${p.semesters} (often includes a public-transport ticket)`} />
            <p className="muted small">Application fee: {p.costs.appFee}. {p.country === 'Austria' ? 'For the Austrian residence permit you show proof of sufficient funds (there is no blocked account).' : 'For the visa you must also show a blocked account of €11,904 per year, which is paid out to you monthly for living costs.'}</p>
          </Section>
        </motion.div>

        <motion.div variants={riseIn}>
          <Section title="Application steps" icon={<PenLine size={18} />}>
            <ol className="steps">
              {p.application.viaUniAssist && <li>Send your documents to <a href="https://www.uni-assist.de/en/" target="_blank" rel="noreferrer">uni-assist</a> for a pre-check (allow 4–6 weeks).</li>}
              <li>
                Create an account on{' '}
                <a href={p.application.portalUrl} target="_blank" rel="noreferrer">
                  {p.application.portal}
                </a>{' '}
                (portal opens: <b>{p.application.opens}</b>).
              </li>
              <li>Upload your transcript, CV, motivation letter and language certificate{p.requirements.some((r) => r.label.startsWith('GRE') && !/not/i.test(r.value)) ? ', plus your GRE scores' : ''}.</li>
              <li>
                Submit before <b>{fmtDate(p.application.deadline, { day: 'numeric', month: 'long', year: 'numeric' })}</b>.
                {p.application.deadlineNote && <span className="muted"> {p.application.deadlineNote}</span>}
              </li>
              <li>Watch your email and portal inbox for missing-document requests or an interview invitation.</li>
            </ol>
            <h4 className="sub">Highlights</h4>
            <ul className="bullets">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Lightbulb size={13} /> {h}
                </li>
              ))}
            </ul>
          </Section>
        </motion.div>
      </div>

      <div className="grid-2">
        <motion.div variants={riseIn}>
          <Section
            title="Document checklist"
            icon={<FileText size={18} />}
            action={
              <span className="muted small">
                {done}/{docs.length}
              </span>
            }
          >
            <div className="doc-progress">
              <motion.span animate={{ width: `${(done / docs.length) * 100}%` }} />
            </div>
            <ul className="checklist">
              {docs.map((d) => {
                const on = !!state.docs[p.id]?.[d]
                return (
                  <li key={d}>
                    <label className={on ? 'on' : ''}>
                      <input type="checkbox" checked={on} onChange={() => toggleDoc(p.id, d)} />
                      <motion.span className="box" animate={{ scale: on ? [1, 1.25, 1] : 1 }}>
                        {on && <CheckCircle2 size={16} />}
                      </motion.span>
                      {d}
                    </label>
                  </li>
                )
              })}
            </ul>
          </Section>
        </motion.div>

        <motion.div variants={riseIn}>
          <Section title="My notes" icon={<PenLine size={18} />}>
            <textarea
              className="notes"
              rows={8}
              placeholder="Contacts, questions for the admissions office, what to write in the motivation letter…"
              value={state.notes[p.id] ?? ''}
              onChange={(e) => setNote(p.id, e.target.value)}
            />
            <h4 className="sub">Official links</h4>
            <ul className="links">
              {p.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.label} <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Fact({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: React.ReactNode }) {
  return (
    <motion.div className="fact card" whileHover={{ y: -3 }}>
      <span className="fact-label">
        {icon}
        {label}
      </span>
      <strong>{value}</strong>
      {sub && <span className="fact-sub">{sub}</span>}
    </motion.div>
  )
}

function CostBar({ label, value, total, color, sub }: { label: string; value: number; total: number; color: string; sub: string }) {
  return (
    <div className="costbar">
      <div className="costbar-head">
        <span>{label}</span>
        <b>{eur(value)}</b>
      </div>
      <div className="costbar-track">
        <motion.span initial={{ width: 0 }} animate={{ width: `${total ? (value / total) * 100 : 0}%` }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ background: color }} />
      </div>
      <small className="muted">{sub}</small>
    </div>
  )
}
