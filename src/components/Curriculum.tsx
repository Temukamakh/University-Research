import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Info } from 'lucide-react'
import type { Program } from '../data/types'
import { Section } from './ui'

/** Semester-by-semester plan of a program, shown as an animated timeline. */
export function CurriculumSection({ p }: { p: Program }) {
  const c = p.curriculum
  if (!c) return null
  const official = c.detail === 'semester'
  return (
    <Section
      title="Curriculum & semester plan"
      icon={<BookOpen size={18} />}
      action={
        <span className={`cur-badge ${official ? 'official' : ''}`} title={official ? 'The university publishes this semester split' : 'Only the building blocks are published. The split shown is the usual one'}>
          {official ? 'Semester plan' : 'Program structure'}
        </span>
      }
    >
      <p className="cur-summary">{c.summary}</p>
      <ol className="cur-plan" style={{ '--brand': p.color } as React.CSSProperties}>
        {c.plan.map((step, i) => {
          const thesis = step.items.some((it) => /thesis/i.test(it)) && step.items.length <= 2
          return (
            <motion.li
              key={step.term}
              className={`cur-step ${thesis ? 'thesis' : ''}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 240, damping: 24 }}
            >
              <div className="cur-head">
                <span className="cur-dot">{i + 1}</span>
                <strong>{step.term}</strong>
                {step.ects && <span className="cur-ects">{step.ects} ECTS</span>}
              </div>
              <ul>
                {step.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.li>
          )
        })}
      </ol>
      {c.tracks && c.tracks.length > 0 && (
        <>
          <h4 className="sub">Specialisations &amp; focus areas</h4>
          <div className="cur-tracks">
            {c.tracks.map((t, i) => (
              <motion.span key={t} className="cur-track" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.04 }}>
                {t}
              </motion.span>
            ))}
          </div>
        </>
      )}
      <p className="muted small cur-note">
        <Info size={13} />{' '}
        {official
          ? 'Based on the university\'s published plan. Modules change from year to year, so check the handbook.'
          : 'The university publishes the building blocks rather than a fixed schedule. The split shown is the usual one.'}{' '}
        <a href={c.source.url} target="_blank" rel="noreferrer">
          {c.source.label} <ExternalLink size={11} />
        </a>
      </p>
    </Section>
  )
}
