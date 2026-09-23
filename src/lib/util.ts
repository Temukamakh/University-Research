import { useEffect, useState } from 'react'
import type { Program } from '../data/types'
import { baseDocuments } from '../data/general'

export const eur = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', opts)

const DAY = 86_400_000

export function daysUntil(iso: string, now = new Date()): number {
  const target = new Date(iso + 'T23:59:59')
  return Math.floor((target.getTime() - now.getTime()) / DAY)
}

/** Re-renders every `ms` so countdowns stay live. */
export function useNow(ms = 60_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

/** Wikimedia Commons redirect that serves a resized image for an exact file name. */
export const commonsUrl = (file: string, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`

export const commonsPage = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

export function docsFor(p: Program): string[] {
  return [...baseDocuments, ...p.extraDocs]
}

/** Total cost of the whole degree: tuition + semester fees + living costs. */
export function degreeCost(p: Program, livingOverride?: number) {
  const months = p.semesters * 6
  const living = (livingOverride ?? p.costs.living) * months
  const tuition = p.costs.tuition * p.semesters
  const fees = p.costs.semesterFee * p.semesters
  return { months, living, tuition, fees, total: living + tuition + fees }
}

export const tierMeta = {
  reach: { label: 'Reach', color: '#f43f5e', blurb: 'Hard to get in, but worth the shot' },
  target: { label: 'Target', color: '#f59e0b', blurb: 'A realistic match for your profile' },
  safety: { label: 'Safety', color: '#10b981', blurb: 'High chance of admission' },
} as const

export const focusMeta = {
  automotive: { label: 'Automotive', emoji: '🚗' },
  mechanical: { label: 'Mechanical', emoji: '⚙️' },
  mechatronics: { label: 'Mechatronics', emoji: '🤖' },
  production: { label: 'Production', emoji: '🏭' },
} as const

export const BUDGET_PER_SEMESTER = 3000
