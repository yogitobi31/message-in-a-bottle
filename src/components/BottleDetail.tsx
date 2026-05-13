import type { Bottle } from '../types/bottle'

export function BottleDetail({ bottle, onClose }: { bottle: Bottle | undefined; onClose: () => void }) {
  if (!bottle) return null
  return <div className="overlay" role="dialog" aria-modal="true"><section className="panel detail-panel"><h2>편지 상세</h2><h3>{bottle.title}</h3><p>{bottle.body}</p><p>감정 태그: {bottle.emotionalTags.join(', ')}</p><p>현재 상태: {bottle.status}</p><h4>여정 타임라인</h4><ol>{['병에 담김', `${bottle.startSea}에 띄워짐`, '첫 물결을 탐', bottle.status].map((t)=><li key={t}>{t}</li>)}</ol><h4>답장 목록</h4>{bottle.replies.length === 0 ? <p>아직 답장이 없습니다.</p> : bottle.replies.map((r)=><p key={r.id}>{r.body}</p>)}<button onClick={onClose}>닫기</button></section></div>
}
