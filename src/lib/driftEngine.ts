import type { RoutePoint, StartSea } from '../types/bottle'

const SEA_START: Record<StartSea, { lat: number; lng: number }> = {
  '인천 앞바다': { lat: 37.45, lng: 126.6 },
  '부산 앞바다': { lat: 35.12, lng: 129.12 },
  '제주 남쪽 바다': { lat: 32.85, lng: 126.8 },
  동해: { lat: 37.7, lng: 129.4 },
  남해: { lat: 34.25, lng: 127.9 },
}

const statuses = [
  '아직 바다가 가지고 있음',
  '느린 물결을 따라 남쪽으로 흘러가는 중',
  '쿠로시오의 가장자리에 닿은 듯함',
  '먼 해안의 빛을 지나치는 중',
  '아직 아무도 발견하지 못함',
]

const seeded = (seed: string) => {
  let h = 2166136261
  for (let i = 0; i < seed.length; i += 1) h = (h ^ seed.charCodeAt(i)) * 16777619
  return () => {
    h += h << 13
    h ^= h >>> 7
    h += h << 3
    h ^= h >>> 17
    h += h << 5
    return Math.abs(h) / 4294967295
  }
}

export function generateRoute(id: string, sea: StartSea): RoutePoint[] {
  const rand = seeded(id)
  const start = SEA_START[sea]
  const count = 8
  const route: RoutePoint[] = [{ ...start, label: `${sea}에 띄워짐` }]
  for (let i = 1; i < count; i += 1) {
    const prev = route[i - 1]
    route.push({
      lat: prev.lat + (rand() - 0.4) * 0.25,
      lng: prev.lng + (rand() - 0.45) * 0.28,
      label: i === 1 ? '첫 물결을 탐' : statuses[i % statuses.length],
    })
  }
  return route
}

export function getDriftState(route: RoutePoint[], createdAt: string) {
  const elapsedHours = Math.max(0, (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60))
  const paceHours = 8
  const index = Math.min(route.length - 1, Math.floor(elapsedHours / paceHours))
  const point = route[index]
  return { ...point, status: statuses[index % statuses.length] }
}
