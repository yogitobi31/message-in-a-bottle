import { shoreZones, type ShoreZone } from '../data/shoreZones'
import type { Bottle } from '../types/bottle'

const KM_PER_DEG = 111.32
const NEAR_SHORE_MULTIPLIER = 1.85
export const MIN_HOURS_BEFORE_ARRIVAL = 12

const toRad = (v: number) => (v * Math.PI) / 180

const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function getNearestShoreZone(lat: number, lng: number): { zone: ShoreZone; distanceKm: number } {
  return shoreZones.reduce(
    (nearest, zone) => {
      const dist = distanceKm(lat, lng, zone.lat, zone.lng)
      return dist < nearest.distanceKm ? { zone, distanceKm: dist } : nearest
    },
    { zone: shoreZones[0], distanceKm: Infinity },
  )
}

export function getBottleArrivalState(bottle: Bottle) {
  const nearest = getNearestShoreZone(bottle.currentLat, bottle.currentLng)
  const hours = Math.max(0, (Date.now() - new Date(bottle.createdAt).getTime()) / (1000 * 60 * 60))
  const isArrivalWindowOpen = hours >= MIN_HOURS_BEFORE_ARRIVAL
  const isArrived = isArrivalWindowOpen && nearest.distanceKm <= nearest.zone.radiusKm
  const isNearShore = !isArrived && nearest.distanceKm <= nearest.zone.radiusKm * NEAR_SHORE_MULTIPLIER

  if (isArrived) {
    return {
      arrived: true,
      arrivalStatus: 'arrived' as const,
      nearestZone: nearest.zone,
      distanceKm: nearest.distanceKm,
      arrivalLabel: '해변에 조용히 떠밀려왔습니다',
      arrivalDescription: `이 병은 ${nearest.zone.name} 근처에 조용히 닿았습니다.`,
    }
  }

  if (isNearShore) {
    return {
      arrived: false,
      arrivalStatus: 'near-shore' as const,
      nearestZone: nearest.zone,
      distanceKm: nearest.distanceKm,
      arrivalLabel: '먼 해안의 빛이 가까워지는 중',
      arrivalDescription: `병은 ${nearest.zone.name}의 느린 물결 가까이에 있습니다.`,
    }
  }

  return {
    arrived: false,
    arrivalStatus: 'drifting' as const,
    nearestZone: nearest.zone,
    distanceKm: nearest.distanceKm,
    arrivalLabel: '아직 바다가 가지고 있음',
    arrivalDescription: '아직 가장 가까운 해변까지는 시간이 필요합니다.',
  }
}

export const subtleArrivalHintRangeKm = KM_PER_DEG * 0.08
