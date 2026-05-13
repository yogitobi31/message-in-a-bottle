import type { Bottle, StartSea } from '../types/bottle'
import type { CurrentVector } from './oceanCurrentAdapter'
import { getCurrentVectorAtPoint } from './driftEngine'

export type DriftJournalEntry = {
  id: string
  label: string
  description: string
  dateLabel: string
}

type DriftJournalInput = {
  id: string
  createdAt?: string
  startSea?: StartSea | string
  currentLat?: number
  currentLng?: number
  currentVector?: CurrentVector
}

const dayMs = 1000 * 60 * 60 * 24

const getDirectionTone = (v: CurrentVector) => {
  const eastWest = v.u >= 0.01 ? '동쪽' : v.u <= -0.01 ? '서쪽' : ''
  const northSouth = v.v >= 0.01 ? '북쪽' : v.v <= -0.01 ? '남쪽' : ''
  if (eastWest && northSouth) return `${northSouth}${eastWest}`
  if (eastWest) return eastWest
  if (northSouth) return northSouth
  return '잔잔한 해역'
}

const getLaunchText = (startSea?: string) => (startSea ? `${startSea}에 조용히 띄워졌습니다.` : '어느 이름 없는 바다 위에 조용히 띄워졌습니다.')

const toDateLabel = (date: Date) =>
  new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)

export function buildDriftJournal(input: DriftJournalInput | Bottle): DriftJournalEntry[] {
  const createdAt = input.createdAt ? new Date(input.createdAt) : new Date()
  const elapsedDays = Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / dayMs))

  const overrideVector = 'currentVector' in input ? input.currentVector : undefined
  const currentVector =
    overrideVector ??
    (typeof input.currentLat === 'number' && typeof input.currentLng === 'number'
      ? getCurrentVectorAtPoint(input.currentLat, input.currentLng)
      : { lat: 0, lng: 0, u: 0, v: 0 })

  const directionTone = getDirectionTone(currentVector)
  const entries: DriftJournalEntry[] = [
    { id: `${input.id}-packed`, label: '병에 담긴 날', description: '병에 담겼습니다.', dateLabel: toDateLabel(createdAt) },
    { id: `${input.id}-launch`, label: '출발', description: getLaunchText(input.startSea), dateLabel: toDateLabel(createdAt) },
  ]

  const pushDayEntry = (offset: number, label: string, description: string) => entries.push({
    id: `${input.id}-${offset}`,
    label,
    description,
    dateLabel: toDateLabel(new Date(createdAt.getTime() + offset * dayMs)),
  })

  if (elapsedDays >= 1) pushDayEntry(1, '1일 후', `첫 물결을 탔습니다. ${directionTone} 흐름이 병을 살짝 밀어줬습니다.`)
  if (elapsedDays >= 2) pushDayEntry(2, '2~3일 후', `느린 흐름을 따라 조금 멀어졌습니다. ${directionTone} 쪽 물살을 타고 있습니다.`)
  if (elapsedDays >= 4) pushDayEntry(4, '4~6일 후', '바다가 아직 이 말을 가지고 있습니다.')
  if (elapsedDays >= 7) pushDayEntry(7, '7일 이상', '아직 아무도 발견하지 못했지만, 병은 계속 떠 있습니다.')

  return entries
}
