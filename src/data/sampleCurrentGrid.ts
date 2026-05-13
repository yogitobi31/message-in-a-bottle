import type { CurrentVector } from '../lib/oceanCurrentAdapter'

// NOTE: Sample/mock vectors for simulation only (not real ocean observations).
// u: east-west flow component, v: north-south flow component.
export const sampleCurrentGrid: CurrentVector[] = [
  { lat: 37.55, lng: 126.35, u: 0.01, v: -0.01, source: 'sample' }, // 인천 앞바다
  { lat: 36.9, lng: 125.9, u: 0.02, v: -0.01, source: 'sample' },
  { lat: 35.1, lng: 129.15, u: 0.03, v: 0.01, source: 'sample' }, // 부산
  { lat: 34.6, lng: 128.8, u: 0.03, v: 0.01, source: 'sample' }, // 남해
  { lat: 34.2, lng: 127.4, u: 0.03, v: 0.0, source: 'sample' },
  { lat: 33.5, lng: 126.5, u: 0.08, v: -0.03, source: 'sample' }, // 제주 남쪽
  { lat: 32.8, lng: 126.9, u: 0.09, v: -0.03, source: 'sample' },
  { lat: 37.8, lng: 129.5, u: 0.02, v: 0.02, source: 'sample' }, // 동해
  { lat: 38.5, lng: 130.1, u: 0.03, v: 0.02, source: 'sample' },
  { lat: 31.8, lng: 124.8, u: 0.04, v: -0.01, source: 'sample' }, // 동중국해 일부
  { lat: 32.6, lng: 125.6, u: 0.05, v: -0.01, source: 'sample' },
  { lat: 32.1, lng: 128.2, u: 0.07, v: 0.0, source: 'sample' }, // 규슈 서쪽
  { lat: 31.6, lng: 129.7, u: 0.1, v: 0.01, source: 'sample' }, // 쿠로시오 방향
]
