import { useMemo, useState } from 'react'
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

  const hydrated = useMemo(
    () =>
      bottles.map((b) => {
        const drift = getDriftState(b.route, b.createdAt)
        return { ...b, currentLat: drift.lat, currentLng: drift.lng, status: drift.status }
      }),
    [bottles],
  )

  const onCreate = (form: { title: string; body: string; type: Bottle['type']; startSea: Bottle['startSea']; visibility: Bottle['visibility'] }) => {
    const id = `b_${Date.now()}`
    const route = generateRoute(id, form.startSea)
    const bottle: Bottle = { id, ...form, createdAt: new Date().toISOString(), currentLat: route[0].lat, currentLng: route[0].lng, route, emotionalTags: inferEmotionalTags(`${form.title} ${form.body}`), status: '아직 바다가 가지고 있음', discovered: false, replies: [] }
    const next = [bottle, ...bottles]
    setBottles(next)
    saveBottles(next)
    setSelectedId(id)
    setStarted(true)
  }

  const onDelete = (id: string) => {
    const next = bottles.filter((b) => b.id !== id)
    setBottles(next)
    saveBottles(next)
  }

  const selected = hydrated.find((b) => b.id === selectedId)

  return <Shell>{!started && <Landing onStart={() => setStarted(true)} />}<BottleComposer onSubmit={onCreate} /><OceanMap bottles={hydrated} onOpen={setSelectedId} /><BottleVault bottles={hydrated} onOpen={setSelectedId} onDelete={onDelete} /><FoundBottles /><BottleDetail bottle={selected} /></Shell>
}

export default App
