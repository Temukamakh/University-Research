import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { Photo, Program, Tier } from '../data/types'
import { STATUSES, statusOf, useStore, type StatusId } from '../lib/store'
import { commonsPage, commonsUrl, daysUntil, tierMeta } from '../lib/util'

export function AnimatedNumber({ value, format = (n: number) => Math.round(n).toString() }: { value: number; format?: (n: number) => string }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => format(v))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [value, mv])
  return <motion.span>{text}</motion.span>
}

export function ProgressRing({ value, size = 120, stroke = 10, color = 'var(--accent)', children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - Math.min(1, Math.max(0, value))) }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  )
}

export function TierBadge({ tier }: { tier: Tier }) {
  const t = tierMeta[tier]
  return (
    <span className="badge" style={{ '--badge': t.color } as React.CSSProperties} title={t.blurb}>
      {t.label}
    </span>
  )
}

export function Pill({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <span className="pill" style={tone ? ({ '--pill': tone } as React.CSSProperties) : undefined}>
      {children}
    </span>
  )
}

export function DifficultyMeter({ level }: { level: number }) {
  const labels = ['', 'Easy', 'Moderate', 'Competitive', 'Very competitive', 'Extremely competitive']
  return (
    <div className="meter" title={labels[level]} aria-label={`Difficulty: ${labels[level]}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="meter-bar"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            height: 6 + i * 3,
            background: i <= level ? `hsl(${140 - level * 28} 75% 50%)` : 'var(--track)',
          }}
        />
      ))}
      <span className="meter-label">{labels[level]}</span>
    </div>
  )
}

export function DeadlineChip({ iso, now }: { iso: string; now: Date }) {
  const d = daysUntil(iso, now)
  const tone = d < 0 ? '#64748b' : d <= 30 ? '#ef4444' : d <= 90 ? '#f59e0b' : '#10b981'
  const text = d < 0 ? 'Passed' : d === 0 ? 'Today!' : `${d} days`
  return <Pill tone={tone}>⏳ {text}</Pill>
}

export function StarButton({ id }: { id: string }) {
  const { state, toggleShortlist } = useStore()
  const on = state.shortlist.includes(id)
  return (
    <motion.button
      className={`icon-btn star ${on ? 'on' : ''}`}
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.stopPropagation()
        toggleShortlist(id)
      }}
      aria-pressed={on}
      aria-label={on ? 'Remove from shortlist' : 'Add to shortlist'}
      title={on ? 'On your shortlist' : 'Add to shortlist'}
    >
      <motion.span key={String(on)} initial={{ scale: 0.4, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
        <Star size={18} fill={on ? 'currentColor' : 'none'} />
      </motion.span>
    </motion.button>
  )
}

export function StatusSelect({ id }: { id: string }) {
  const { state, setStatus } = useStore()
  const cur = statusOf(state, id)
  const meta = STATUSES.find((s) => s.id === cur)!
  return (
    <select
      className="status-select"
      style={{ '--status': meta.color } as React.CSSProperties}
      value={cur}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setStatus(id, e.target.value as StatusId)}
      aria-label="Application status"
    >
      {STATUSES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  )
}

/** Image that falls back to a branded gradient when the remote photo can't load. */
export function PhotoImg({ photo, program, width = 900, compact = false }: { photo?: Photo; program: Program; width?: number; compact?: boolean }) {
  const [failed, setFailed] = useState(!photo)
  return (
    <div className={`photo ${compact ? 'compact' : ''}`} style={{ '--brand': program.color } as React.CSSProperties}>
      {!failed && photo ? (
        <img src={commonsUrl(photo.file, width)} alt={photo.caption} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="photo-fallback" aria-label={`${program.university} (photo unavailable)`}>
          <span>{program.short}</span>
          <small>{program.city}</small>
        </div>
      )}
    </div>
  )
}

export function Gallery({ program }: { program: Program }) {
  const [i, setI] = useState(0)
  const photos = program.photos
  const cur = photos[i]
  const go = (d: number) => setI((x) => (x + d + photos.length) % photos.length)
  return (
    <div className="gallery">
      <motion.div key={i} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="gallery-frame">
        <PhotoImg photo={cur} program={program} width={1600} />
      </motion.div>
      {photos.length > 1 && (
        <>
          <button className="gallery-nav left" onClick={() => go(-1)} aria-label="Previous photo">
            <ChevronLeft />
          </button>
          <button className="gallery-nav right" onClick={() => go(1)} aria-label="Next photo">
            <ChevronRight />
          </button>
          <div className="gallery-dots">
            {photos.map((_, k) => (
              <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />
            ))}
          </div>
        </>
      )}
      {cur && (
        <a className="gallery-caption" href={commonsPage(cur.file)} target="_blank" rel="noreferrer">
          {cur.caption} · Wikimedia Commons
        </a>
      )}
    </div>
  )
}

export function Section({ title, icon, children, action }: { title: string; icon?: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="card section">
      <header className="section-head">
        <h3>
          {icon}
          {title}
        </h3>
        {action}
      </header>
      {children}
    </section>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

export const riseIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 26 } },
}
