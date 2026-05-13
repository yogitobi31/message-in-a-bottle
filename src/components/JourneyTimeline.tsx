interface JourneyTimelineProps {
  startSea: string
  status: string
  lastTrace: string
}

export function JourneyTimeline({ startSea, status, lastTrace }: JourneyTimelineProps) {
  const items = ['병에 담김', `${startSea}에 띄워짐`, '첫 물결을 탐', status, `마지막 흔적 · ${lastTrace}`]

  return (
    <section className="detail-section">
      <h4>병의 여정</h4>
      <ol className="journey-line">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  )
}
