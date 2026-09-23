import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, CalendarClock, CheckCircle2, FileText, Info, Sparkles, Star, Target } from 'lucide-react'
import { programs } from '../data/programs'
import { milestones, tests } from '../data/general'
import { toGermanGrade } from '../data/curriculum'
import { statusOf, useStore } from '../lib/store'
import { daysUntil, docsFor, fmtDate, useNow } from '../lib/util'
import { AnimatedNumber, DeadlineChip, ProgressRing, riseIn, Section, stagger, TierBadge } from '../components/ui'
import { navigate } from '../App'

const SEMESTER_START = '2027-10-11'

export default function Dashboard() {
  const { state, setTest } = useStore()
  const now = useNow(1000)

  const tracked = programs.filter((p) => state.shortlist.includes(p.id))
  const pool = tracked.length ? tracked : programs
  const upcoming = pool
    .filter((p) => daysUntil(p.application.deadline, now) >= 0 && !['submitted', 'admitted', 'rejected', 'declined', 'interview'].includes(statusOf(state, p.id)))
    .sort((a, b) => a.application.deadline.localeCompare(b.application.deadline))
  const next = upcoming[0]

  const submitted = tracked.filter((p) => ['submitted', 'interview', 'admitted'].includes(statusOf(state, p.id))).length
  const admitted = tracked.filter((p) => statusOf(state, p.id) === 'admitted').length

  const docTotals = tracked.reduce(
    (acc, p) => {
      const list = docsFor(p)
      acc.total += list.length
      acc.done += list.filter((d) => state.docs[p.id]?.[d]).length
      return acc
    },
    { done: 0, total: 0 },
  )
  const msDone = milestones.filter((m) => state.milestonesDone[m.id]).length
  const testsDone = tests.filter((t) => state.tests[t.id]?.done).length
  const readiness =
    (msDone + testsDone + submitted + docTotals.done) / Math.max(1, milestones.length + tests.length + tracked.length + docTotals.total)

  const ms = next ? new Date(next.application.deadline + 'T23:59:59').getTime() - now.getTime() : 0
  const cd = {
    d: Math.max(0, Math.floor(ms / 86_400_000)),
    h: Math.max(0, Math.floor((ms / 3_600_000) % 24)),
    m: Math.max(0, Math.floor((ms / 60_000) % 60)),
    s: Math.max(0, Math.floor((ms / 1000) % 60)),
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="page">
      <motion.section variants={riseIn} className="hero">
        <div className="hero-glow" aria-hidden />
        <div className="hero-text">
          <p className="eyebrow">
            <Sparkles size={14} /> Master's in Germany · Winter Semester 2027/28
          </p>
          <h1>
            Hi{state.profile.name ? `, ${state.profile.name}` : ''}! Let's get you to <span className="grad-text">Aachen</span>.
          </h1>
          <p className="lead">
            Lectures start in <strong>{daysUntil(SEMESTER_START, now)} days</strong>. You have{' '}
            <strong>{tracked.length}</strong> programs on your shortlist. Next stop after that: motorsport 🏁
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#/programs">
              Explore programs <ArrowRight size={16} />
            </a>
            <a className="btn ghost" href="#/timeline">
              See the timeline
            </a>
          </div>
        </div>
        {next && (
          <motion.button className="countdown card glass" onClick={() => navigate('program', next.id)} whileHover={{ y: -4 }}>
            <span className="countdown-label">
              <CalendarClock size={14} /> Next deadline
            </span>
            <strong className="countdown-title">
              {next.short}: {next.program}
            </strong>
            <div className="countdown-grid">
              {(['d', 'h', 'm', 's'] as const).map((k) => (
                <div key={k}>
                  <motion.span key={cd[k]} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="countdown-num">
                    {String(cd[k]).padStart(2, '0')}
                  </motion.span>
                  <small>{{ d: 'days', h: 'hours', m: 'min', s: 'sec' }[k]}</small>
                </div>
              ))}
            </div>
            <span className="countdown-date">{fmtDate(next.application.deadline, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </motion.button>
        )}
      </motion.section>

      <motion.div variants={riseIn} className="stats">
        <Stat icon={<Star size={18} />} label="Shortlisted" value={tracked.length} of={programs.length} />
        <Stat icon={<CheckCircle2 size={18} />} label="Applications sent" value={submitted} of={tracked.length || 1} />
        <Stat icon={<FileText size={18} />} label="Documents ready" value={docTotals.done} of={docTotals.total || 1} />
        <Stat icon={<Target size={18} />} label="Admissions" value={admitted} of={tracked.length || 1} />
      </motion.div>

      <div className="grid-2">
        <motion.div variants={riseIn}>
          <Section title="Upcoming deadlines" icon={<CalendarClock size={18} />} action={<a href="#/timeline" className="link">All →</a>}>
            <ul className="deadline-list">
              {upcoming.slice(0, 6).map((p, i) => {
                const d = daysUntil(p.application.deadline, now)
                return (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    onClick={() => navigate('program', p.id)}
                  >
                    <span className="dl-dot" style={{ background: p.color }} />
                    <div className="dl-body">
                      <strong>{p.short}</strong> <span className="muted">· {p.program}</span>
                      <div className="dl-bar">
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(4, 100 - (d / 300) * 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                          style={{ background: p.color }}
                        />
                      </div>
                    </div>
                    <div className="dl-right">
                      <DeadlineChip iso={p.application.deadline} now={now} />
                      <small className="muted">{fmtDate(p.application.deadline)}</small>
                    </div>
                  </motion.li>
                )
              })}
              {!upcoming.length && <li className="muted">No upcoming deadlines. Everything is submitted! 🎉</li>}
            </ul>
          </Section>
        </motion.div>

        <motion.div variants={riseIn}>
          <Section title="Overall readiness" icon={<Target size={18} />}>
            <div className="readiness">
              <ProgressRing value={readiness} size={150} stroke={12}>
                <strong className="ring-value">
                  <AnimatedNumber value={Math.round(readiness * 100)} />%
                </strong>
                <small>ready</small>
              </ProgressRing>
              <ul className="readiness-list">
                <li>
                  <span>Milestones</span>
                  <b>
                    {msDone}/{milestones.length}
                  </b>
                </li>
                <li>
                  <span>Tests</span>
                  <b>
                    {testsDone}/{tests.length}
                  </b>
                </li>
                <li>
                  <span>Documents</span>
                  <b>
                    {docTotals.done}/{docTotals.total}
                  </b>
                </li>
                <li>
                  <span>Applications</span>
                  <b>
                    {submitted}/{tracked.length}
                  </b>
                </li>
              </ul>
            </div>
          </Section>
        </motion.div>
      </div>

      <motion.div variants={riseIn}>
        <Section title="Language & aptitude tests" icon={<BookOpen size={18} />}>
          <div className="tests">
            {tests.map((t) => {
              const entry = state.tests[t.id] ?? {}
              return (
                <div key={t.id} className={`test card-inner ${entry.done ? 'done' : ''}`}>
                  <div className="test-head">
                    <h4>{t.name}</h4>
                    <label className="check">
                      <input type="checkbox" checked={!!entry.done} onChange={() => setTest(t.id, { done: !entry.done })} />
                      <span>Done</span>
                    </label>
                  </div>
                  <p className="test-target">🎯 {t.target}</p>
                  <p className="muted small">{t.why}</p>
                  <div className="test-fields">
                    <label>
                      Test date
                      <input type="date" value={entry.date ?? ''} onChange={(e) => setTest(t.id, { date: e.target.value })} />
                    </label>
                    <label>
                      My score
                      <input placeholder={t.id === 'gre' ? 'e.g. V152 Q166 AW4' : 'e.g. 7.5'} value={entry.score ?? ''} onChange={(e) => setTest(t.id, { score: e.target.value })} />
                    </label>
                  </div>
                  <p className="muted small">
                    {t.cost} · valid {t.validity} ·{' '}
                    <a href={t.url} target="_blank" rel="noreferrer">
                      official site
                    </a>
                  </p>
                </div>
              )
            })}
          </div>
        </Section>
      </motion.div>

      <div className="grid-2">
        <motion.div variants={riseIn}>
          <Section title="Your profile" icon={<Info size={18} />} action={<a href="#/me" className="link">Edit →</a>}>
            <div className="profile-facts">
              <div>
                <small>GPA (Georgian scale)</small>
                <strong>{state.profile.gpa}/100</strong>
              </div>
              <div>
                <small>≈ German grade</small>
                <strong className="grad-text">{toGermanGrade(state.profile.gpa).toFixed(1)}</strong>
              </div>
              <div>
                <small>Bachelor credits</small>
                <strong>240 ECTS</strong>
              </div>
              <div>
                <small>German</small>
                <strong>{state.profile.german}</strong>
              </div>
            </div>
            <div className="edge-chips">
              {['🔬 Jülich (Helmholtz) internship', '📜 SOLIDWORKS CSWP', '🏆 1st: university sumo robots', '🛰️ ESP32 hardware-in-the-loop 6-DOF sim', '🏁 Autonomous RC race organiser'].map((c) => (
                <span key={c} className="edge-chip">
                  {c}
                </span>
              ))}
            </div>
            <p className="muted small">
              In Germany 1.0 is the best grade and 4.0 is the lowest pass. Below 1.5 is excellent, which puts you in a strong position at
              every university on this list.
            </p>
          </Section>
        </motion.div>
        <motion.div variants={riseIn}>
          <Section title="Your dream picks" icon={<Star size={18} />}>
            <div className="dream">
              {['rwth-automotive', 'kit-mechanical'].map((id) => {
                const p = programs.find((x) => x.id === id)!
                return (
                  <motion.button key={id} className="dream-card" whileHover={{ y: -3 }} onClick={() => navigate('program', id)} style={{ '--brand': p.color } as React.CSSProperties}>
                    <span className="dream-rank">#{id.startsWith('rwth') ? 1 : 2}</span>
                    <strong>{p.short}</strong>
                    <span>{p.program}</span>
                    <TierBadge tier={p.tier} />
                  </motion.button>
                )
              })}
            </div>
            <p className="muted small">
              Georgian applicants don't need an APS certificate. It is only required for China, India and Vietnam.
            </p>
          </Section>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Stat({ icon, label, value, of }: { icon: React.ReactNode; label: string; value: number; of: number }) {
  return (
    <motion.div className="stat card" whileHover={{ y: -3 }}>
      <span className="stat-icon">{icon}</span>
      <div>
        <strong className="stat-value">
          <AnimatedNumber value={value} />
          <small>/{of}</small>
        </strong>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-bar">
        <motion.span initial={{ width: 0 }} animate={{ width: `${Math.min(100, (value / of) * 100)}%` }} transition={{ duration: 1 }} />
      </div>
    </motion.div>
  )
}
