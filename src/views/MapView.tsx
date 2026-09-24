import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { useProfile } from '../lib/profile'
import type { Program } from '../data/types'
import { eur, fromKonstanz, KONSTANZ } from '../lib/util'
import { TierBadge } from '../components/ui'
import { useStore } from '../lib/store'

const icon = (p: Program, starred: boolean) =>
  L.divIcon({
    className: 'map-pin-wrap',
    html: `<div class="map-pin" style="--brand:${p.color}"><span>${p.short}${starred ? ' ★' : ''}</span></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })

const konstanzIcon = L.divIcon({
  className: 'map-pin-wrap',
  html: '<div class="map-pin home"><span>📍 Konstanz</span></div>',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
})

function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (target) map.flyTo(target, 10, { duration: 1.2 })
  }, [target, map])
  return null
}

export default function MapView() {
  const { state } = useStore()
  const { programs } = useProfile().profile
  const [target, setTarget] = useState<[number, number] | null>(null)
  const [hover, setHover] = useState<Program | null>(null)
  const byDistance = [...programs].sort((a, b) => fromKonstanz(a.coords).straight - fromKonstanz(b.coords).straight)

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Map</h1>
          <p className="muted">Where each program is, and how far it is from Konstanz. Hover over a university in the list to draw the line, or click it to fly there. ★ marks your shortlist. Road distances and drive times are estimates.</p>
        </div>
      </header>
      <div className="map-layout">
        <motion.div className="map card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <MapContainer center={programs.some((p) => p.country === 'Austria') ? [49.8, 11.5] : [50.9, 9.6]} zoom={6} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {programs.map((p) => (
              <Marker key={p.id} position={p.coords} icon={icon(p, state.shortlist.includes(p.id))}>
                <Popup>
                  <strong>{p.university}</strong>
                  <br />
                  {p.program} ({p.degree})
                  <br />
                  {p.city} · {p.costs.tuition ? `${eur(p.costs.tuition)}/sem` : 'Tuition-free'}
                  <br />
                  📍 {fromKonstanz(p.coords).straight} km from Konstanz (≈ {fromKonstanz(p.coords).drive} by car)
                  <br />
                  <a href={`#/program/${p.id}`}>Open details →</a>
                </Popup>
              </Marker>
            ))}
            <Marker position={KONSTANZ} icon={konstanzIcon} zIndexOffset={1000}>
              <Popup>
                <strong>Konstanz</strong>
              </Popup>
            </Marker>
            {hover && <Polyline positions={[KONSTANZ, hover.coords]} pathOptions={{ color: hover.color, weight: 3, dashArray: '6 8' }} />}
            <FlyTo target={target} />
          </MapContainer>
        </motion.div>
        <ul className="map-list">
          {byDistance.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setTarget([...p.coords])}
              onMouseEnter={() => setHover(p)}
              onMouseLeave={() => setHover(null)}
              className="card"
              style={{ '--brand': p.color } as React.CSSProperties}
            >
              <span className="map-list-dot" />
              <div>
                <strong>
                  {p.short} {state.shortlist.includes(p.id) && '★'}
                </strong>
                <small className="muted">
                  {p.city} · 📍 {fromKonstanz(p.coords).straight} km (≈ {fromKonstanz(p.coords).drive})
                </small>
              </div>
              <TierBadge tier={p.tier} />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
