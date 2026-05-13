import { useState } from 'react'

export function ReplyBox({ onSubmit }: { onSubmit: (body: string) => void }) {
  const [body, setBody] = useState('')

  const handleSubmit = () => {
    const trimmed = body.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setBody('')
  }

  return (
    <section className="detail-section">
      <h4>답장 쓰기</h4>
      <textarea
        className="reply-input"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="조언보다, 조용히 닿을 말을 적어주세요."
      />
      <button onClick={handleSubmit}>답장 남기기</button>
    </section>
  )
}
