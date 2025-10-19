import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

export default function Lesson() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lessonId, firstAnswer } = location.state || {}

  const [messages, setMessages] = useState(
    firstAnswer ? [{ role: 'assistant', content: firstAnswer }] : []
  )
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!lessonId) {
      // Falls direkte Navigation auf /lesson ohne State
      navigate('/starter')
    }
  }, [lessonId, navigate])

  const sendMessage = async () => {
    if (!input.trim() || !lessonId) return
    setBusy(true)
    try {
      const res = await fetch('/api/lesson/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, userMessage: input })
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'user', content: input }, { role: 'assistant', content: data.answer }])
      setInput('')
    } catch (e) {
      alert('Fehler beim Senden: ' + e.message)
    } finally {
      setBusy(false)
    }
  }

  const renderContent = (content) => {
    if (!content) return null
    const withoutThink = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
    if (!withoutThink) return null
    const lines = withoutThink.split('\n')
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <span key={`line-${lineIdx}`}>
          {parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
              return <strong key={`bold-${lineIdx}-${idx}`}>{part.slice(2, -2)}</strong>
            }
            return <span key={`text-${lineIdx}-${idx}`}>{part}</span>
          })}
          {lineIdx < lines.length - 1 ? <br /> : null}
        </span>
      )
    })
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate('/')}>Zurück</button>
      </div>
      <div>
        <h1>Nachhilfeunterricht</h1>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '240px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
            <b>{m.role}:</b> {renderContent(m.content)}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Antwort schreiben..."
          style={{ flex: 1 }}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
        />
        <button onClick={sendMessage} disabled={busy}>Senden</button>
      </div>
    </div>
  )
}
