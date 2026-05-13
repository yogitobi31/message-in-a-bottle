import { useMemo, useRef, useState, type RefObject } from 'react'
import { Landing } from './components/Landing'
import { BottleComposer } from './components/BottleComposer'
import { OceanMap } from './components/OceanMap'
import { BottleVault } from './components/BottleVault'
import { FoundBottles } from './components/FoundBottles'
import { Shell } from './components/Shell'
import { generateRoute, getDriftState } from './lib/driftEngine'
import { inferEmotionalTags } from './lib/emotionMock'
import { loadBottles, loadFoundReplies, saveBottles, saveFoundReplies } from './lib/bottleStorage'
import type { Bottle, ReplyItem } from './types/bottle'
import { BottleDetailModal } from './components/BottleDetailModal'
import { mockFoundBottles } from './data/mockFoundBottles'
import { getBottleArrivalState } from './lib/shoreArrival'

function App() {
  const [started, setStarted] = useState(false)
  const [bottles, setBottles] = useState<Bottle[]>(() => loadBottles())
  const [foundReplies, setFoundReplies] = useState<Record<string, ReplyItem[]>>(() => loadFoundReplies())
  const [selectedBottleId, setSelectedBottleId] = useState<string>('')
  const [selectedFoundId, setSelectedFoundId] = useState<string>('')
  const [highlightBottleId, setHighlightBottleId] = useState<string>('')
  const [replyMessage, setReplyMessage] = useState('')

  const composeRef = useRef<HTMLElement>(null)
  const mapRef = useRef<HTMLElement>(null)
  const vaultRef = useRef<HTMLElement>(null)
  const foundRef = useRef<HTMLElement>(null)

  const hydrated = useMemo(
    () =>
      bottles.map((b) => {
        const drift = getDriftState(b.route, b.createdAt)
        const updated = { ...b, currentLat: drift.lat, currentLng: drift.lng, status: drift.status }
        const arrival = getBottleArrivalState(updated)
        return {
          ...updated,
          status: arrival.arrivalLabel,
          arrivalStatus: arrival.arrivalStatus,
          arrivalZoneId: arrival.nearestZone.id,
          arrivedAt: arrival.arrived ? (b.arrivedAt ?? new Date().toISOString()) : b.arrivedAt,
        }
      }),
    [bottles],
  )

  const scrollTo = (ref: RefObject<HTMLElement>) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const onCreate = (form: { title: string; body: string; type: Bottle['type']; startSea: Bottle['startSea']; visibility: Bottle['visibility'] }) => {
    const id = `b_${Date.now()}`
    const route = generateRoute(id, form.startSea)
    const bottle: Bottle = {
      id,
      ...form,
      createdAt: new Date().toISOString(),
      currentLat: route[0].lat,
      currentLng: route[0].lng,
      route,
      emotionalTags: inferEmotionalTags(`${form.title} ${form.body}`),
      status: '아직 바다가 가지고 있음',
      discovered: false,
      replies: [],
    }
    const next = [bottle, ...bottles]
    setBottles(next)
    saveBottles(next)
    setSelectedBottleId(id)
    setHighlightBottleId(id)
    setStarted(true)
    setTimeout(() => {
      scrollTo(mapRef)
      setTimeout(() => setHighlightBottleId(''), 1800)
    }, 150)
  }

  const onDelete = (id: string) => {
    const next = bottles.filter((b) => b.id !== id)
    setBottles(next)
    saveBottles(next)
  }

  const openBottle = (id: string) => {
    setReplyMessage('')
    setSelectedFoundId('')
    setSelectedBottleId(id)
  }

  const openFoundBottle = (id: string) => {
    setReplyMessage('')
    setSelectedBottleId('')
    setSelectedFoundId(id)
  }

  const handleBottleReply = (id: string, body: string) => {
    const reply = { id: `r_${Date.now()}`, body, createdAt: new Date().toISOString() }
    const next = bottles.map((b) => (b.id === id ? { ...b, replies: [reply, ...b.replies] } : b))
    setBottles(next)
    saveBottles(next)
    setReplyMessage('답장이 병 안에 조용히 남았습니다.')
  }

  const handleFoundReply = (id: string, body: string) => {
    const reply = { id: `fr_${Date.now()}`, body, createdAt: new Date().toISOString() }
    const next = { ...foundReplies, [id]: [reply, ...(foundReplies[id] ?? [])] }
    setFoundReplies(next)
    saveFoundReplies(next)
    setReplyMessage('답장이 병 안에 조용히 남았습니다.')
  }

  const selectedBottle = hydrated.find((b) => b.id === selectedBottleId)
  const selectedFound = mockFoundBottles.find((b) => b.id === selectedFoundId)

  const modalBottle = selectedBottle
    ? selectedBottle
    : selectedFound
      ? {
          id: selectedFound.id,
          title: selectedFound.title,
          type: '이름 모를 누군가에게',
          emotionalTags: selectedFound.emotionalTags,
          body: selectedFound.body,
          status: '해변에 도착함',
          startSea: '알 수 없는 바다',
          currentLat: 0,
          currentLng: 0,
          replies: foundReplies[selectedFound.id] ?? [],
          beach: selectedFound.beach,
          createdAt: new Date().toISOString(),
        }
      : undefined

  return (
    <Shell>
      <nav className="top-nav" aria-label="섹션 탐색">
        <button onClick={() => scrollTo(composeRef)}>편지 쓰기</button>
        <button onClick={() => scrollTo(mapRef)}>표류 지도</button>
        <button onClick={() => scrollTo(vaultRef)}>내 병</button>
        <button onClick={() => scrollTo(foundRef)}>떠밀려온 병</button>
      </nav>
      {!started &&
        <Landing
          onStart={() => {
            setStarted(true)
            scrollTo(composeRef)
          }}
        />}
      <BottleComposer sectionRef={composeRef} onSubmit={onCreate} />
      <OceanMap sectionRef={mapRef} bottles={hydrated} onOpen={openBottle} highlightBottleId={highlightBottleId} />
      <BottleVault sectionRef={vaultRef} bottles={hydrated} onOpen={openBottle} onDelete={onDelete} onGoWrite={() => scrollTo(composeRef)} />
      <FoundBottles sectionRef={foundRef} onOpen={openFoundBottle} myArrivedBottles={hydrated.filter((b) => b.arrivalStatus === 'arrived')} onOpenMyBottle={openBottle} />
      <BottleDetailModal
        bottle={modalBottle}
        onClose={() => {
          setSelectedBottleId('')
          setSelectedFoundId('')
          setReplyMessage('')
        }}
        onReply={(id, body) => (selectedBottle ? handleBottleReply(id, body) : handleFoundReply(id, body))}
        successMessage={replyMessage}
      />
    </Shell>
  )
}

export default App
