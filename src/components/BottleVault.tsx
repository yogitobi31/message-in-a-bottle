import type { RefObject } from 'react'
import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'
import { buildDriftJournal } from '../lib/driftJournal'
import { getBottleArrivalState } from '../lib/shoreArrival'

export function BottleVault({ bottles, onOpen, onDelete, onGoWrite, sectionRef }: { bottles: Bottle[]; onOpen: (id: string) => void; onDelete: (id: string) => void; onGoWrite: () => void; sectionRef: RefObject<HTMLElement> }) {
  return (
    <section ref={sectionRef} className="panel section">
      <h2>내 병 보관함</h2>
      {bottles.length === 0 ? (
        <div className="empty">
          <h3>아직 바다에 띄운 병이 없습니다.</h3>
          <p>첫 번째 편지를 병에 담아 보내보세요. 도착하지 않아도 괜찮은 말들이 있습니다.</p>
          <button onClick={onGoWrite}>첫 편지 쓰기</button>
        </div>
      ) : (
        <div className="vault-grid">
          {bottles.map((b) => {
            const journal = buildDriftJournal(b)
            const lastJournal = journal[journal.length - 1]
            const arrival = getBottleArrivalState(b)
            return (
            <article key={b.id} className="vault-item">
              <header className="vault-head">
                <h3>{b.title}</h3>
                <span className="tag-pill">{b.emotionalTags[0] ?? '잔잔함'}</span>
                {arrival.arrivalStatus === 'arrived' && <span className="arrival-badge">해변 도착</span>}
              </header>
              <p className="vault-type">편지 유형: {b.type}</p>
              <p>{arrival.arrivalLabel}</p>
              <p>{arrival.arrivalDescription}</p>
              <p>마지막 흔적은 {getLocationText(b.currentLat, b.currentLng)}의 느린 해류 근처입니다.</p>
              <small>생성일: {new Date(b.createdAt).toLocaleDateString('ko-KR')}</small>
              {lastJournal && <small className="vault-journal">{lastJournal.description}</small>}
              <div className="row">
                <button onClick={() => onOpen(b.id)}>편지 열기</button>
                <button onClick={() => onDelete(b.id)} className="ghost">
                  병 삭제
                </button>
              </div>
            </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
