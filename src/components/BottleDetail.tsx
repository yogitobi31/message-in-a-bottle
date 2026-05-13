import type { Bottle } from '../types/bottle'

export function BottleDetail({ bottle }: { bottle: Bottle | undefined }) {
  if (!bottle) return null
  return <section className="panel"><h2>편지 상세</h2><h3>{bottle.title}</h3><p>{bottle.body}</p><p>{bottle.emotionalTags.join(', ')}</p><ol>{['병에 담김', `${bottle.startSea}에 띄워짐`, '첫 물결을 탐', bottle.status].map((t)=><li key={t}>{t}</li>)}</ol><h4>답장 목록</h4>{bottle.replies.length === 0 ? <p>아직 답장이 없습니다.</p> : bottle.replies.map((r)=><p key={r.id}>{r.body}</p>)}</section>
}
