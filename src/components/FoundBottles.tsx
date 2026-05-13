import { useState } from 'react'
import { mockFoundBottles } from '../data/mockFoundBottles'

export function FoundBottles() {
  const [opened, setOpened] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [msg, setMsg] = useState('')
  const item = mockFoundBottles.find((v) => v.id === opened)
  return <section className="panel"><h2>오늘 해변에 떠밀려온 병</h2><div className="vault-grid">{mockFoundBottles.map((b)=><article key={b.id} className="vault-item"><h3>{b.title}</h3><p>{b.emotionalTags.join(', ')}</p><p>{b.beach}</p><p>{b.preview}</p><button onClick={()=>setOpened(b.id)}>열어보기</button></article>)}</div>{item && <div className="modal"><h3>{item.title}</h3><p>{item.body}</p><textarea value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="답장 쓰기" /><button onClick={()=>{localStorage.setItem(`found_reply_${item.id}`, reply); setMsg('답장이 병 옆 모래에 남겨졌습니다.')}}>답장 남기기</button><p>{msg}</p></div>}</section>
}
