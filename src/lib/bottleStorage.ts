import type { Bottle } from '../types/bottle'

const KEY = 'message_in_a_bottle_v1'

export function loadBottles(): Bottle[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Bottle[]) : []
  } catch {
    return []
  }
}

export function saveBottles(items: Bottle[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}
