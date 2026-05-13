import { useState, type RefObject } from 'react'
import type { BottleType, StartSea, VisibilityType } from '../types/bottle'

const types: BottleType[] = ['누군가에게 못 보낸 말', '미래의 나에게', '이름 모를 누군가에게', '사라진 사람에게', '그냥 바다에 두고 싶은 말']
const seas: StartSea[] = ['인천 앞바다', '부산 앞바다', '제주 남쪽 바다', '동해', '남해']
const visibilities: VisibilityType[] = ['혼자 간직하기', '나중에 누군가 발견 가능']

export function BottleComposer({ onSubmit, sectionRef }: { onSubmit: (form: { title: string; body: string; type: BottleType; startSea: StartSea; visibility: VisibilityType }) => void; sectionRef: RefObject<HTMLElement> }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState<BottleType>(types[0])
  const [startSea, setStartSea] = useState<StartSea>(seas[0])
  const [visibility, setVisibility] = useState<VisibilityType>(visibilities[0])
  const [phase, setPhase] = useState<'idle' | 'sealing' | 'launching'>('idle')
  const [msg, setMsg] = useState('')

  const submit = () => {
    if (!title || !body || phase !== 'idle') return
    setMsg('')
    setPhase('sealing')
    setTimeout(() => setPhase('launching'), 700)
    setTimeout(() => {
      onSubmit({ title, body, type, startSea, visibility })
      setTitle('')
      setBody('')
      setMsg('병에 담겼습니다. 바다가 이 말을 가져갔습니다.')
      setPhase('idle')
    }, 1400)
  }

  const buttonText = phase === 'sealing' ? '병을 밀봉하는 중...' : phase === 'launching' ? '바다에 띄우는 중...' : '병에 담아 바다에 띄우기'

  return <section ref={sectionRef} className="panel section"><h2>병에 담을 말</h2><div className="form-grid"><input placeholder="이 편지에 이름을 붙인다면" value={title} onChange={(e)=>setTitle(e.target.value)} /><textarea placeholder="끝내 하지 못한 말, 언젠가 누군가에게 닿았으면 하는 말을 적어주세요." value={body} onChange={(e)=>setBody(e.target.value)} rows={6}/><select value={type} onChange={(e)=>setType(e.target.value as BottleType)}>{types.map((v)=><option key={v}>{v}</option>)}</select><select value={startSea} onChange={(e)=>setStartSea(e.target.value as StartSea)}>{seas.map((v)=><option key={v}>{v}</option>)}</select><select value={visibility} onChange={(e)=>setVisibility(e.target.value as VisibilityType)}>{visibilities.map((v)=><option key={v}>{v}</option>)}</select><button onClick={submit} disabled={phase !== 'idle'}>{buttonText}</button>{msg && <p className="inline-msg">{msg}</p>}</div></section>
}
