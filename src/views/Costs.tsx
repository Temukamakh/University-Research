import { motion } from 'framer-motion'
import { useState } from 'react'
import { Landmark, PiggyBank, ShieldCheck, Wallet } from 'lucide-react'
import { programs } from '../data/programs'
import { BLOCKED_ACCOUNT_YEAR, HEALTH_INSURANCE_MONTH } from '../data/general'
import { BUDGET_PER_SEMESTER, degreeCost, eur } from '../lib/util'
import { AnimatedNumber, Section } from '../components/ui'

export default function Costs() {
  const [id, setId] = useState(programs[0].id)
  const p = programs.find((x) => x.id === id)!
  const [living, setLiving] = useState(p.costs.living)
  const cost = degreeCost(p, living)

  const firstYear = p.costs.tuition * 2 + p.costs.semesterFee * 2 + living * 12
  const upfront = BLOCKED_ACCOUNT_YEAR + p.costs.tuition + p.costs.semesterFee + 700 /* visa, flights, deposit */

  const sorted = [...programs].sort((a, b) => degreeCost(a).total - degreeCost(b).total)
  const max = Math.max(...sorted.map((x) => degreeCost(x).total))

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Costs</h1>
          <p className="muted">
            Public universities in Germany are free or cheap. Baden-Württemberg (KIT, Stuttgart, Esslingen) charges non-EU students €1,500 per semester, and
            TUM charges €6,000. Living costs are my estimates per city (rent, food, insurance, phone).
          </p>
        </div>
      </header>

      <div className="grid-2">
        <Section title="Calculator" icon={<Wallet size={18} />}>
          <label className="field">
            Program
            <select
              value={id}
              onChange={(e) => {
                const next = programs.find((x) => x.id === e.target.value)!
                setId(next.id)
                setLiving(next.costs.living)
              }}
            >
              {programs.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.short}: {x.program}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Living costs per month: <b>{eur(living)}</b>
            <input type="range" min={700} max={1800} step={25} value={living} onChange={(e) => setLiving(Number(e.target.value))} />
            <small className="muted">
              Estimate for {p.city.split(' ')[0]}: {eur(p.costs.living)} (includes ≈ {eur(HEALTH_INSURANCE_MONTH)} student health insurance)
            </small>
          </label>
          <div className="calc-grid">
            <div className="calc-tile">
              <small>Whole degree ({cost.months} months)</small>
              <strong>
                <AnimatedNumber value={cost.total} format={eur} />
              </strong>
            </div>
            <div className="calc-tile">
              <small>First year</small>
              <strong>
                <AnimatedNumber value={firstYear} format={eur} />
              </strong>
            </div>
            <div className="calc-tile">
              <small>Tuition total</small>
              <strong className={p.costs.tuition > BUDGET_PER_SEMESTER ? 'bad' : ''}>
                <AnimatedNumber value={cost.tuition} format={eur} />
              </strong>
            </div>
            <div className="calc-tile accent">
              <small>Cash needed before you fly*</small>
              <strong>
                <AnimatedNumber value={upfront} format={eur} />
              </strong>
            </div>
          </div>
          <p className="muted small">
            * Blocked account ({eur(BLOCKED_ACCOUNT_YEAR)}) + first-semester tuition and fee + about €700 for the visa fee, flights and a rent deposit. Your
            blocked account is paid back to you at {eur(BLOCKED_ACCOUNT_YEAR / 12)}/month, so it is not an extra cost, but you need the money up front.
          </p>
        </Section>

        <Section title="Good to know" icon={<Landmark size={18} />}>
          <ul className="know">
            <li>
              <PiggyBank size={18} />
              <div>
                <strong>Blocked account (Sperrkonto)</strong>
                <span>{eur(BLOCKED_ACCOUNT_YEAR)} for the first year was the 2025–2026 amount. It usually rises each year, so check before you pay it in.</span>
              </div>
            </li>
            <li>
              <ShieldCheck size={18} />
              <div>
                <strong>Health insurance</strong>
                <span>Public student insurance costs about {eur(HEALTH_INSURANCE_MONTH)}/month and is required for enrolment.</span>
              </div>
            </li>
            <li>
              <Wallet size={18} />
              <div>
                <strong>Working while studying</strong>
                <span>Non-EU students may work 140 full days or 280 half days a year. Student research-assistant jobs (HiWi) at institutes are ideal.</span>
              </div>
            </li>
            <li>
              <Landmark size={18} />
              <div>
                <strong>Scholarships</strong>
                <span>Look at the DAAD scholarship database, Deutschlandstipendium (€300/month, merit-based, apply after enrolment) and each university's own awards.</span>
              </div>
            </li>
          </ul>
        </Section>
      </div>

      <Section title="Whole-degree cost by program" icon={<Wallet size={18} />}>
        <div className="bars">
          {sorted.map((x, i) => {
            const c = degreeCost(x)
            return (
              <button key={x.id} className={`bar-row ${x.id === id ? 'sel' : ''}`} onClick={() => { setId(x.id); setLiving(x.costs.living) }}>
                <span className="bar-label">
                  <b>{x.short}</b> <small className="muted">{x.city.split(' ')[0]}</small>
                </span>
                <span className="bar-track">
                  <motion.span
                    className="bar-fill living"
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.living / max) * 100}%` }}
                    transition={{ duration: 0.9, delay: i * 0.04 }}
                  />
                  <motion.span
                    className="bar-fill tuition"
                    initial={{ width: 0 }}
                    animate={{ width: `${((c.tuition + c.fees) / max) * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.04 }}
                  />
                </span>
                <span className="bar-value">{eur(c.total)}</span>
              </button>
            )
          })}
        </div>
        <p className="legend-row small">
          <span className="legend-item">
            <i style={{ background: '#6366f1' }} /> Living
          </span>
          <span className="legend-item">
            <i style={{ background: '#f43f5e' }} /> Tuition + semester fees
          </span>
        </p>
      </Section>
    </div>
  )
}
