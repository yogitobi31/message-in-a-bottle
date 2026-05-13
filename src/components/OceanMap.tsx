import { Fragment, useMemo, type RefObject } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'
import 'leaflet/dist/leaflet.css'

const trimRoute = (route: Bottle['route']) => route.slice(-10).map((p) => [p.lat, p.lng] as [number, number])

const bottleIcon = (isNew: boolean) =>
  L.divIcon({
    className: `bottle-marker${isNew ? ' is-new' : ''}`,
    html: '<span class="bottle-marker-core" aria-hidden="true"></span>',
    iconSize: [20, 28],
    iconAnchor: [10, 24],
    popupAnchor: [0, -20],
  })

export function OceanMap({ bottles, onOpen, sectionRef, highlightBottleId }: { bottles: Bottle[]; onOpen: (id: string) => void; sectionRef: RefObject<HTMLElement>; highlightBottleId: string }) {
  const markerIcons = useMemo(() => new Map(bottles.map((b) => [b.id, bottleIcon(highlightBottleId === b.id)])), [bottles, highlightBottleId])

  return (
    <section ref={sectionRef} className="panel section map-panel">
      <div className="row between">
        <h2>표류 지도</h2>
        <p className="count">현재 표류 중인 병: {bottles.length}개</p>
      </div>
      <p className="map-note">병들은 실제 해류 데이터를 연결하기 전까지, 가상의 표류 엔진을 따라 천천히 움직입니다.</p>
      <p className="map-hint">지도 위의 병을 눌러 현재 상태와 마지막 흔적을 확인할 수 있습니다.</p>
      <MapContainer center={[36, 128]} zoom={6} style={{ height: 420, width: '100%' }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {bottles.map((b) => (
          <Fragment key={b.id}>
            <Polyline
              key={`${b.id}_line`}
              positions={trimRoute(b.route)}
              pathOptions={{ color: '#6b8698', weight: 1, opacity: 0.28, dashArray: '5 8', lineCap: 'round' }}
            />
            <Marker position={[b.currentLat, b.currentLng]} key={b.id} icon={markerIcons.get(b.id)}>
              <Popup className="bottle-popup">
                <div className="popup-content">
                  <strong>{b.title}</strong>
                  <p>상태: 아직 바다가 가지고 있음</p>
                  <p>감정: {b.emotionalTags.join(' · ')}</p>
                  <p>마지막 흔적: {getLocationText(b.currentLat, b.currentLng)}의 느린 해류 근처</p>
                  <button onClick={() => onOpen(b.id)}>편지 열기</button>
                </div>
              </Popup>
            </Marker>
          </Fragment>
        ))}
      </MapContainer>
    </section>
  )
}
