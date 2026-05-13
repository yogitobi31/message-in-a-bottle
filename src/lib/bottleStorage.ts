import type { Bottle, ReplyItem } from '../types/bottle'

const KEY = 'message_in_a_bottle_v1'
const FOUND_REPLY_KEY = 'message_in_a_bottle_found_replies_v1'

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

export function loadFoundReplies(): Record<string, ReplyItem[]> {
  try {
    const raw = localStorage.getItem(FOUND_REPLY_KEY)
    return raw ? (JSON.parse(raw) as Record<string, ReplyItem[]>) : {}
  } catch {
    return {}
  }
}

export function saveFoundReplies(items: Record<string, ReplyItem[]>) {
  localStorage.setItem(FOUND_REPLY_KEY, JSON.stringify(items))
}
