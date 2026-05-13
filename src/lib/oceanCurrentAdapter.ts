import { sampleCurrentGrid } from '../data/sampleCurrentGrid'

/**
 * Current adapter currently uses a sample current grid.
 * In the future, NASA OSCAR / Copernicus Marine / NOAA drifter datasets can be
 * transformed server-side (e.g. once per day) into a lightweight JSON and wired here.
 * Frontend should not process heavy NetCDF/GRIB directly.
 * Even after live data integration, keep this getNearestCurrentVector interface stable.
 */
export type CurrentVector = {
  lat: number
  lng: number
  u: number
  v: number
  source?: string
}

export type CurrentSampleResult = {
  vector: CurrentVector
  distanceKm: number
  source: 'sample-current-grid'
  confidence: 'mock' | 'estimated' | 'observed'
}

const toRad = (deg: number) => (deg * Math.PI) / 180

const distanceKm = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const r = 6371
  const dLat = toRad(bLat - aLat)
  const dLng = toRad(bLng - aLng)
  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  return 2 * r * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s))
}

export function getNearestCurrentVector(lat: number, lng: number): CurrentSampleResult {
  const nearest = sampleCurrentGrid.reduce(
    (best, candidate) => {
      const d = distanceKm(lat, lng, candidate.lat, candidate.lng)
      return d < best.distanceKm ? { vector: candidate, distanceKm: d } : best
    },
    { vector: sampleCurrentGrid[0], distanceKm: Number.POSITIVE_INFINITY },
  )

  return {
    ...nearest,
    source: 'sample-current-grid',
    confidence: 'mock',
  }
}
