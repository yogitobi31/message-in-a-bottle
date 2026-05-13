import type { RefObject } from 'react'
import { mockFoundBottles } from '../data/mockFoundBottles'

export function FoundBottles({ sectionRef, onOpen }: { sectionRef: RefObject<HTMLElement>; onOpen: (id: string) => void }) {
  return (
    <section ref={sectionRef} className="panel section">
      <h2>오늘 해변에 떠밀려온 병</h2>
      <p className="map-note">하루에 몇 개의 병만 해변에 닿습니다. 모든 말을 다 읽을 필요는 없습니다.</p>
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
