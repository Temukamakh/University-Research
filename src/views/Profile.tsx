import { motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { BookOpenCheck, Database, Download, Flag, GraduationCap, Lightbulb, Link2, RotateCcw, Upload } from 'lucide-react'
import { areaColors, creditChecks, curriculum, toGermanGrade, totalEcts, type Area } from '../data/curriculum'
import { generalLinks } from '../data/general'
import { cv, goal, storyTips } from '../data/profile'
import { useStore, type Theme } from '../lib/store'
import { Section } from '../components/ui'

export default function Profile() {
  const { state, update, importState, reset } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')
  const [openArea, setOpenArea] = useState<Area | null>(null)

  const byArea = useMemo(() => {
    const m = new Map<Area, number>()
    for (const c of curriculum) m.set(c.area, (m.get(c.area) ?? 0) + c.ects)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `masters-tracker-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const german = toGermanGrade(state.profile.gpa)

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Me</h1>
          <p className="muted">Your profile and your bachelor's curriculum, checked against the credit rules of the programs you're targeting.</p>
        </div>
      </header>

      <div className="grid-2">
        <Section title="Profile" icon={<GraduationCap size={18} />}>
          <label className="field">
            Name
            <input value={state.profile.name} placeholder="Your first name" onChange={(e) => update((s) => ({ ...s, profile: { ...s.profile, name: e.target.value } }))} />
          </label>
          <label className="field">
            GPA (Georgian 0–100 scale): <b>{state.profile.gpa}</b>
            <input
              type="range"
              min={51}
              max={100}
              value={state.profile.gpa}
              onChange={(e) => update((s) => ({ ...s, profile: { ...s.profile, gpa: Number(e.target.value) } }))}
            />
          </label>
          <div className="grade-convert">
            <div>
              <small>Your grade</small>
              <strong>{state.profile.gpa}/100</strong>
            </div>
            <motion.span className="arrow" animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              →
            </motion.span>
            <div>
              <small>German equivalent</small>
              <motion.strong key={german} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grad-text">
                {german.toFixed(1)}
              </motion.strong>
            </div>
          </div>
          <p className="muted small">
            Uses the modified Bavarian formula: 1 + 3 × (100 − grade) / (100 − 51). German universities use it to convert foreign grades (1.0 = best, 4.0 = pass).
            uni-assist or the university makes the official conversion.
          </p>
          <label className="field">
            German level
            <select value={state.profile.german} onChange={(e) => update((s) => ({ ...s, profile: { ...s.profile, german: e.target.value } }))}>
              {['None', 'A1', 'A2', 'B1', 'B2', 'C1'].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Theme
            <select value={state.theme} onChange={(e) => update((s) => ({ ...s, theme: e.target.value as Theme }))}>
              <option value="system">Match my device</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </Section>

        <Section title="Credit requirement checks" icon={<BookOpenCheck size={18} />}>
          {creditChecks.map((chk) => (
            <div key={chk.program} className="credit-check">
              <h4>{chk.program}</h4>
              {chk.items.map((it) => {
                const ok = it.have >= it.required
                return (
                  <div key={it.label} className="cc-row">
                    <div className="cc-head">
                      <span>{it.label}</span>
                      <b className={ok ? 'ok' : 'warn'}>
                        {it.have} / {it.required} ECTS {ok ? '✓' : '!'}
                      </b>
                    </div>
                    <div className="cc-track">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (it.have / it.required) * 100)}%` }}
                        transition={{ duration: 1 }}
                        className={ok ? 'ok' : 'warn'}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
          <p className="muted small">
            Counted from your curriculum sheet. Universities decide which courses count, so include course descriptions (module handbook) with every application.
          </p>
        </Section>
      </div>

      <Section title="Your edge" icon={<Flag size={18} />} action={<span className="goal-pill">🎯 {goal}</span>}>
        <div className="cv">
          {cv.map((sec, i) => (
            <motion.div key={sec.title} className="cv-sec card-inner" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <h4>
                <span aria-hidden>{sec.emoji}</span> {sec.title}
              </h4>
              <ul>
                {sec.items.map((it) => (
                  <li key={it.title}>
                    <strong>{it.title}</strong>
                    {it.detail && <span className="muted small">{it.detail}</span>}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Turning it into applications" icon={<Lightbulb size={18} />}>
        <div className="tips">
          {storyTips.map((t, i) => (
            <motion.div key={t.title} className="tip" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
              <span className="tip-num">{i + 1}</span>
              <div>
                <strong>{t.title}</strong>
                <p className="muted small">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title={`Your bachelor's: Mechanical Engineering, ${totalEcts} ECTS`} icon={<GraduationCap size={18} />}>
        <div className="stack-bar" role="img" aria-label="ECTS by subject area">
          {byArea.map(([area, ects], i) => (
            <motion.button
              key={area}
              title={`${area}: ${ects} ECTS`}
              initial={{ width: 0 }}
              animate={{ width: `${(ects / totalEcts) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              style={{ background: areaColors[area] }}
              onClick={() => setOpenArea(openArea === area ? null : area)}
            />
          ))}
        </div>
        <div className="areas">
          {byArea.map(([area, ects]) => (
            <motion.div key={area} layout className={`area card-inner ${openArea === area ? 'open' : ''}`} onClick={() => setOpenArea(openArea === area ? null : area)}>
              <div className="area-head">
                <i style={{ background: areaColors[area] }} />
                <strong>{area}</strong>
                <b>{ects} ECTS</b>
              </div>
              {openArea === area && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="area-list">
                  {curriculum
                    .filter((c) => c.area === area)
                    .map((c) => (
                      <li key={c.name}>
                        <span>{c.name}</span>
                        <b>{c.ects}</b>
                      </li>
                    ))}
                </motion.ul>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="grid-2">
        <Section title="Your data" icon={<Database size={18} />}>
          <p className="muted small">
            Your progress (shortlist, statuses, checklists, notes) is saved in this browser only. Export a backup now and then, or to move to another device.
          </p>
          <div className="row-btns">
            <button className="btn" onClick={exportData}>
              <Download size={15} /> Export backup
            </button>
            <button className="btn ghost" onClick={() => fileRef.current?.click()}>
              <Upload size={15} /> Import
            </button>
            <button
              className="btn ghost danger"
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) {
                  reset()
                  setMsg('Progress reset.')
                }
              }}
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (!f) return
              setMsg(importState(await f.text()) ? 'Backup imported ✓' : 'That file is not a valid backup.')
              e.target.value = ''
            }}
          />
          {msg && <p className="small">{msg}</p>}
        </Section>

        <Section title="Useful links" icon={<Link2 size={18} />}>
          <ul className="links">
            {generalLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}
