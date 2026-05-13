import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'
import 'leaflet/dist/leaflet.css'

export function OceanMap({ bottles, onOpen }: { bottles: Bottle[]; onOpen: (id: string) => void }) {
  return <section className="panel map-panel"><h2>표류 지도</h2><MapContainer center={[36, 128]} zoom={6} style={{ height: 360, width: '100%' }}><TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {bottles.map((b)=><Marker position={[b.currentLat,b.currentLng]} key={b.id}><Popup><strong>{b.title}</strong><p>{b.status}</p><p>{getLocationText(b.currentLat,b.currentLng)}</p><p>{b.emotionalTags.join(', ')}</p><button onClick={()=>onOpen(b.id)}>편지 보기</button></Popup></Marker>)}
  </MapContainer></section>
}
