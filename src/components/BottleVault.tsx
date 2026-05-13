import type { RefObject } from 'react'
import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'

export function BottleVault({ bottles, onOpen, onDelete, onGoWrite, sectionRef }: { bottles: Bottle[]; onOpen: (id: string)=>void; onDelete:(id:string)=>void; onGoWrite: () => void; sectionRef: RefObject<HTMLElement | null> }) {
  return <section ref={sectionRef} className="panel"><h2>내 병 보관함</h2>{bottles.length === 0 ? <div className="empty"><h3>아직 바다에 띄운 병이 없습니다.</h3><p>첫 번째 편지를 병에 담아 보내보세요. 도착하지 않아도 괜찮은 말들이 있습니다.</p><button onClick={onGoWrite}>첫 편지 쓰기</button></div> : <div className="vault-grid">{bottles.map((b)=><article key={b.id} className="vault-item"><h3>{b.title}</h3><p>{b.emotionalTags.join(' · ')}</p><p>현재 상태: {b.status}</p><p>마지막 흔적: {getLocationText(b.currentLat,b.currentLng)}</p><small>{new Date(b.createdAt).toLocaleDateString('ko-KR')}</small><div className="row"><button onClick={()=>onOpen(b.id)}>편지 열기</button><button onClick={()=>onDelete(b.id)} className="ghost">병 삭제</button></div></article>)}</div>}</section>
}
