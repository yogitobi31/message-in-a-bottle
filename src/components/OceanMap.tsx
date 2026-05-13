import { Fragment, type RefObject } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'
import 'leaflet/dist/leaflet.css'

export function OceanMap({ bottles, onOpen, sectionRef, highlightBottleId }: { bottles: Bottle[]; onOpen: (id: string) => void; sectionRef: RefObject<HTMLElement>; highlightBottleId: string }) {
  return <section ref={sectionRef} className="panel map-panel"><div className="row between"><h2>표류 지도</h2><p className="count">현재 표류 중인 병 {bottles.length}개</p></div><p className="map-note">병들은 실제 해류 데이터를 연결하기 전까지, 가상의 표류 엔진을 따라 천천히 움직입니다.</p><MapContainer center={[36, 128]} zoom={6} style={{ height: 420, width: '100%' }}><TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {bottles.map((b)=><Fragment key={b.id}>
      <Polyline key={`${b.id}_line`} positions={b.route.map((p) => [p.lat, p.lng])} pathOptions={{ color: '#6f8798', weight: 1, opacity: 0.35 }} />
      <Marker position={[b.currentLat,b.currentLng]} key={b.id}><Popup><strong>{b.title}</strong><p>상태: 아직 바다가 가지고 있음</p><p>감정: {b.emotionalTags.join(' · ')}</p><p>마지막 흔적: {getLocationText(b.currentLat,b.currentLng)}에서 천천히 흐르는 중</p><button className={highlightBottleId === b.id ? 'pulse' : ''} onClick={()=>onOpen(b.id)}>편지 열기</button></Popup></Marker>
    </Fragment>)}
  </MapContainer></section>
}
