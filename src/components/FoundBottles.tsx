import { useState, type RefObject } from 'react'
import { mockFoundBottles } from '../data/mockFoundBottles'

export function FoundBottles({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const [opened, setOpened] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [msg, setMsg] = useState('')
  const item = mockFoundBottles.find((v) => v.id === opened)
  return <section ref={sectionRef} className="panel"><h2>오늘 해변에 떠밀려온 병</h2><p className="map-note">하루에 몇 개의 병만 해변에 닿습니다. 모든 말을 다 읽을 필요는 없습니다.</p><div className="vault-grid found-grid">{mockFoundBottles.map((b)=><article key={b.id} className="vault-item"><h3>{b.beach}</h3><p>{b.emotionalTags.join(' · ')}</p><p>{b.preview}</p><button onClick={()=>setOpened(b.id)}>열어보기</button></article>)}</div>{item && <div className="modal"><h3>{item.title}</h3><p>{item.body}</p><textarea value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="답장 쓰기" /><button onClick={()=>{localStorage.setItem(`found_reply_${item.id}`, reply); setMsg('답장이 병 옆 모래에 남겨졌습니다.')}}>답장 남기기</button><button className="ghost" onClick={() => setOpened(null)}>닫기</button><p>{msg}</p></div>}</section>
}
