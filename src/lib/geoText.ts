import type { CurrentVector } from './oceanCurrentAdapter'

export function getLocationText(lat: number, lng: number): string {
  if (lat > 36.5 && lng < 127.5) return '서해 북쪽 물결 위'
  if (lat < 33.5) return '남쪽 먼 바다 위'
  if (lng > 129) return '동해의 느린 해류 근처'
  return '한반도 남쪽 해역 어딘가'
}

const speedText = (u: number, v: number) => {
  const mag = Math.sqrt(u * u + v * v)
  if (mag < 0.02) return '아주 천천히'
  if (mag < 0.05) return '느리게'
  if (mag < 0.09) return '조금씩'
  return '완만하게'
}

const directionText = (u: number, v: number) => {
  if (u >= 0 && v >= 0) return '북동쪽'
  if (u >= 0 && v < 0) return '남동쪽'
  if (u < 0 && v >= 0) return '북서쪽'
  return '남서쪽'
}

export function getSeaTraceText(vector: CurrentVector, placeText?: string): string {
  const place = placeText ? `${placeText}에서 ` : ''
  return `${place}샘플 해류 격자 기준, ${directionText(vector.u, vector.v)}으로 ${speedText(vector.u, vector.v)} 흐르는 중`
}
