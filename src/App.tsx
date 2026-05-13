import { useMemo, useRef, useState, type RefObject } from 'react'
import { Landing } from './components/Landing'
import { BottleComposer } from './components/BottleComposer'
import { OceanMap } from './components/OceanMap'
import { BottleVault } from './components/BottleVault'
import { FoundBottles } from './components/FoundBottles'
import { BottleDetail } from './components/BottleDetail'
import { Shell } from './components/Shell'
import { generateRoute, getDriftState } from './lib/driftEngine'
import { inferEmotionalTags } from './lib/emotionMock'
import { loadBottles, saveBottles } from './lib/bottleStorage'
import type { Bottle } from './types/bottle'

function App() {
  const [started, setStarted] = useState(false)
  const [bottles, setBottles] = useState<Bottle[]>(() => loadBottles())
  const [selectedId, setSelectedId] = useState<string>('')
  const [highlightBottleId, setHighlightBottleId] = useState<string>('')

  const composeRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLElement>(null)
  const vaultRef = useRef<HTMLElement>(null)
  const foundRef = useRef<HTMLElement>(null)

  const hydrated = useMemo(
    () =>
      bottles.map((b) => {
        const drift = getDriftState(b.route, b.createdAt)
        return { ...b, currentLat: drift.lat, currentLng: drift.lng, status: drift.status }
      }),
    [bottles],
  )

  const scrollTo = (ref: RefObject<HTMLElement>) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const onCreate = (form: { title: string; body: string; type: Bottle['type']; startSea: Bottle['startSea']; visibility: Bottle['visibility'] }) => {
    const id = `b_${Date.now()}`
    const route = generateRoute(id, form.startSea)
    const bottle: Bottle = { id, ...form, createdAt: new Date().toISOString(), currentLat: route[0].lat, currentLng: route[0].lng, route, emotionalTags: inferEmotionalTags(`${form.title} ${form.body}`), status: '아직 바다가 가지고 있음', discovered: false, replies: [] }
    const next = [bottle, ...bottles]
    setBottles(next)
    saveBottles(next)
    setSelectedId(id)
    setHighlightBottleId(id)
    setStarted(true)
    setTimeout(() => {
      scrollTo(mapRef)
      setTimeout(() => setHighlightBottleId(''), 3000)
    }, 100)
  }

  const onDelete = (id: string) => {
    const next = bottles.filter((b) => b.id !== id)
    setBottles(next)
    saveBottles(next)
  }

  const selected = hydrated.find((b) => b.id === selectedId)

  return (
    <Shell>
      <nav className="top-nav" aria-label="섹션 탐색">
        <button onClick={() => scrollTo(composeRef)}>편지 쓰기</button>
        <button onClick={() => scrollTo(mapRef)}>표류 지도</button>
        <button onClick={() => scrollTo(vaultRef)}>내 병</button>
        <button onClick={() => scrollTo(foundRef)}>떠밀려온 병</button>
      </nav>
      {!started && <Landing onStart={() => { setStarted(true); scrollTo(composeRef) }} />}
      <BottleComposer sectionRef={composeRef} onSubmit={onCreate} />
      <OceanMap sectionRef={mapRef} bottles={hydrated} onOpen={setSelectedId} highlightBottleId={highlightBottleId} />
      <BottleVault sectionRef={vaultRef} bottles={hydrated} onOpen={setSelectedId} onDelete={onDelete} onGoWrite={() => scrollTo(composeRef)} />
      <FoundBottles sectionRef={foundRef} />
      <BottleDetail bottle={selected} onClose={() => setSelectedId('')} />
    </Shell>
  )
}

export default App
