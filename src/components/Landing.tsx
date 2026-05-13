export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="landing">
      <p className="eyebrow">Message in a Bottle</p>
      <h1>도착하지 않아도 되는 편지</h1>
      <p className="hero-copy">당신의 말은 알고리즘이 아니라, 바다를 타고 누군가에게 도착합니다.</p>
      <p className="hero-sub">익명의 편지를 병에 담아 바다에 띄우세요. 병은 지도 위를 천천히 표류하고, 언젠가 어떤 해변에 닿을지도 모릅니다.</p>
      <button onClick={onStart}>병에 담아 보내기 시작</button>
    </section>
  )
}
