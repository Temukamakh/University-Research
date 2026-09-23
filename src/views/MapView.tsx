import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { programs } from '../data/programs'
import type { Program } from '../data/types'
import { eur } from '../lib/util'
import { TierBadge } from '../components/ui'
import { useStore } from '../lib/store'

const icon = (p: Program, starred: boolean) =>
  L.divIcon({
    className: 'map-pin-wrap',
    html: `<div class="map-pin" style="--brand:${p.color}"><span>${p.short}${starred ? ' ★' : ''}</span></div>`,
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
  const [target, setTarget] = useState<[number, number] | null>(null)

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1>Map</h1>
          <p className="muted">Where each program is. Click a university in the list to fly to it. ★ marks your shortlist.</p>
        </div>
      </header>
      <div className="map-layout">
        <motion.div className="map card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <MapContainer center={[50.9, 9.6]} zoom={6} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
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
                  <a href={`#/program/${p.id}`}>Open details →</a>
                </Popup>
              </Marker>
            ))}
            <FlyTo target={target} />
          </MapContainer>
        </motion.div>
        <ul className="map-list">
          {programs.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setTarget([...p.coords])}
              className="card"
              style={{ '--brand': p.color } as React.CSSProperties}
            >
              <span className="map-list-dot" />
              <div>
                <strong>
                  {p.short} {state.shortlist.includes(p.id) && '★'}
                </strong>
                <small className="muted">
                  {p.city} · {p.state}
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
