import { useState } from 'react'
import type { BottleType, StartSea, VisibilityType } from '../types/bottle'

const types: BottleType[] = ['누군가에게 못 보낸 말', '미래의 나에게', '이름 모를 누군가에게', '사라진 사람에게', '그냥 바다에 두고 싶은 말']
const seas: StartSea[] = ['인천 앞바다', '부산 앞바다', '제주 남쪽 바다', '동해', '남해']
const visibilities: VisibilityType[] = ['혼자 간직하기', '나중에 누군가 발견 가능']

export function BottleComposer({ onSubmit }: { onSubmit: (form: { title: string; body: string; type: BottleType; startSea: StartSea; visibility: VisibilityType }) => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState<BottleType>(types[0])
  const [startSea, setStartSea] = useState<StartSea>(seas[0])
  const [visibility, setVisibility] = useState<VisibilityType>(visibilities[0])
  return <section className="panel"><h2>편지 쓰기</h2><div className="form-grid"><input placeholder="편지 제목" value={title} onChange={(e)=>setTitle(e.target.value)} /><textarea placeholder="편지 본문" value={body} onChange={(e)=>setBody(e.target.value)} rows={5}/><select value={type} onChange={(e)=>setType(e.target.value as BottleType)}>{types.map((v)=><option key={v}>{v}</option>)}</select><select value={startSea} onChange={(e)=>setStartSea(e.target.value as StartSea)}>{seas.map((v)=><option key={v}>{v}</option>)}</select><select value={visibility} onChange={(e)=>setVisibility(e.target.value as VisibilityType)}>{visibilities.map((v)=><option key={v}>{v}</option>)}</select><button onClick={()=>title&&body&&onSubmit({title, body, type, startSea, visibility})}>병에 담아 바다에 띄우기</button></div></section>
}
