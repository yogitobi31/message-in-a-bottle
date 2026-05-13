import { getLocationText, getSeaTraceText } from '../lib/geoText'
import { getCurrentVectorAtPoint } from '../lib/driftEngine'
import type { ReplyItem } from '../types/bottle'
import { JourneyTimeline } from './JourneyTimeline'
import { ReplyBox } from './ReplyBox'

interface DetailBottle {
  id: string
  title: string
  type: string
  emotionalTags: string[]
  body: string
  status: string
  startSea: string
  currentLat: number
  currentLng: number
  replies: ReplyItem[]
  beach?: string
}

export function BottleDetailModal({
  bottle,
  onClose,
  onReply,
  successMessage,
}: {
  bottle?: DetailBottle
  onClose: () => void
  onReply: (id: string, body: string) => void
  successMessage: string
}) {
  if (!bottle) return null

  const placeText = getLocationText(bottle.currentLat, bottle.currentLng)
  const lastTrace = bottle.beach ?? getSeaTraceText(getCurrentVectorAtPoint(bottle.currentLat, bottle.currentLng), placeText)

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <section className="panel detail-panel">
        <div className="detail-header">
          <div>
            <p className="detail-label">병 안의 편지</p>
            <h3>{bottle.title}</h3>
            <p className="vault-type">편지 유형: {bottle.type}</p>
          </div>
          <button className="ghost" onClick={onClose}>닫기</button>
        </div>

        <p className="detail-tags">{bottle.emotionalTags.join(' · ')}</p>

        <section className="letter-body">
          <p className="letter-kicker">병 안에 남아 있던 말</p>
          <p>{bottle.body}</p>
        </section>

        <section className="detail-section">
          <p>현재 상태: {bottle.status}</p>
          <p>마지막 흔적: {lastTrace}</p>
          {!bottle.beach && <p>바다의 흔적: {lastTrace}</p>}
          {bottle.beach && <p>도착한 해변: {bottle.beach}</p>}
        </section>

        <JourneyTimeline startSea={bottle.startSea} status={bottle.status} lastTrace={lastTrace} />

        <section className="detail-section">
          <h4>돌아온 말</h4>
          {bottle.replies.length === 0 ? (
            <p>아직 이 병에 돌아온 말은 없습니다.</p>
          ) : (
            <div className="reply-list">
              {bottle.replies.map((reply) => (
                <article key={reply.id} className="reply-piece">
                  <p>{reply.body}</p>
                  <small>{new Date(reply.createdAt).toLocaleString('ko-KR')}</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <ReplyBox onSubmit={(body) => onReply(bottle.id, body)} />
        {successMessage && <p className="inline-msg">{successMessage}</p>}
      </section>
    </div>
  )
}
