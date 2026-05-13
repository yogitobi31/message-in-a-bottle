export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="landing panel">
      <p className="eyebrow">Message in a Bottle</p>
      <h1>도착하지 않아도 되는 편지</h1>
      <p className="hero-copy">당신의 말은 알고리즘이 아니라, 바다를 타고 누군가에게 도착합니다.</p>
      <button onClick={onStart}>병에 담아 보내기 시작</button>
    </section>
  )
}
