import { getNearestCurrentVector } from './oceanCurrentAdapter'
import type { CurrentVector } from './oceanCurrentAdapter'
import type { RoutePoint, StartSea } from '../types/bottle'

export type DriftEngineMode = 'virtual' | 'sample-current' | 'live-current' | 'virtual+sample-current'

export const DRIFT_ENGINE_MODE: DriftEngineMode = 'virtual+sample-current'

const SEA_START: Record<StartSea, { lat: number; lng: number }> = {
  '인천 앞바다': { lat: 37.45, lng: 126.6 },
  '부산 앞바다': { lat: 35.12, lng: 129.12 },
  '제주 남쪽 바다': { lat: 32.85, lng: 126.8 },
  동해: { lat: 37.7, lng: 129.4 },
  남해: { lat: 34.25, lng: 127.9 },
}

const statuses = ['아직 바다가 가지고 있음', '느린 물결을 따라 이동 중', '먼 물결을 타고 조금씩 흘러감', '아직 아무도 발견하지 못함']

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

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const computeNextPoint = (lat: number, lng: number, rand: () => number) => {
  const current = getNearestCurrentVector(lat, lng).vector
  const baseU = 0.015
  const baseV = -0.004
  const noiseU = (rand() - 0.5) * 0.006
  const noiseV = (rand() - 0.5) * 0.006

  const totalU = baseU + current.u * 0.4 + noiseU
  const totalV = baseV + current.v * 0.4 + noiseV

  return {
    lat: clamp(lat + totalV * 0.45, 29.5, 39.5),
    lng: clamp(lng + totalU * 0.55, 122.5, 132.5),
  }
}

export function generateRoute(id: string, sea: StartSea): RoutePoint[] {
  const rand = seeded(id)
  const start = SEA_START[sea]
  const count = 10
  const route: RoutePoint[] = [{ ...start, label: `${sea}에 띄워짐` }]

  for (let i = 1; i < count; i += 1) {
    const prev = route[i - 1]
    const next = computeNextPoint(prev.lat, prev.lng, rand)
    route.push({
      ...next,
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
  const currentSample = getNearestCurrentVector(point.lat, point.lng)
  return { ...point, status: statuses[index % statuses.length], currentSample }
}

export function getCurrentVectorAtPoint(lat: number, lng: number): CurrentVector {
  return getNearestCurrentVector(lat, lng).vector
}
