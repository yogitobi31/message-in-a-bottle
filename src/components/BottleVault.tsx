import type { Bottle } from '../types/bottle'
import { getLocationText } from '../lib/geoText'

export function BottleVault({ bottles, onOpen, onDelete }: { bottles: Bottle[]; onOpen: (id: string)=>void; onDelete:(id:string)=>void }) {
  return <section className="panel"><h2>내 병 보관함</h2><div className="vault-grid">{bottles.map((b)=><article key={b.id} className="vault-item"><h3>{b.title}</h3><p>{b.type}</p><p>{b.emotionalTags.join(' · ')}</p><p>{b.status}</p><p>{getLocationText(b.currentLat,b.currentLng)}</p><small>{new Date(b.createdAt).toLocaleDateString('ko-KR')}</small><div className="row"><button onClick={()=>onOpen(b.id)}>편지 열기</button><button onClick={()=>onDelete(b.id)} className="ghost">병 삭제</button></div></article>)}</div></section>
}
