import type { RefObject } from 'react'
import { mockFoundBottles } from '../data/mockFoundBottles'
import type { Bottle } from '../types/bottle'
import { getBottleArrivalState } from '../lib/shoreArrival'

export function FoundBottles({ sectionRef, onOpen, myArrivedBottles, onOpenMyBottle }: { sectionRef: RefObject<HTMLElement>; onOpen: (id: string) => void; myArrivedBottles: Bottle[]; onOpenMyBottle: (id: string) => void }) {
  return (
    <section ref={sectionRef} className="panel section">
      <h2>오늘 해변에 떠밀려온 병</h2>
      <p className="map-note">하루에 몇 개의 병만 해변에 닿습니다. 모든 말을 다 읽을 필요는 없습니다.</p>
      {myArrivedBottles.length > 0 && (
        <>
          <h3>내 병이 닿은 해변</h3>
          <div className="vault-grid found-grid">
            {myArrivedBottles.map((b) => {
              const arrival = getBottleArrivalState(b)
              return (
                <article key={b.id} className="vault-item">
                  <h3>{b.title}</h3>
                  <p>{arrival.nearestZone.name}</p>
                  <p>{arrival.arrivalDescription}</p>
                  <button onClick={() => onOpenMyBottle(b.id)}>편지 열기</button>
                </article>
              )
            })}
          </div>
        </>
      )}
      <div className="vault-grid found-grid">
        {mockFoundBottles.map((b) => (
          <article key={b.id} className="vault-item">
            <h3>{b.beach}</h3>
            <p>{b.emotionalTags.join(' · ')}</p>
            <p>{b.preview}</p>
            <button onClick={() => onOpen(b.id)}>열어보기</button>
          </article>
        ))}
      </div>
    </section>
  )
}
