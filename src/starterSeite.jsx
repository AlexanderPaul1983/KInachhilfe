import './App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function StarterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    language: '',
    subject: '',
    topic: '',
    age: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Dank Vite-Proxy geht /api/... direkt
      const res = await fetch('/api/lesson/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      navigate('/lesson', { state: { lessonId: data.lessonId, firstAnswer: data.firstAnswer } })
    } catch (err) {
      alert('Fehler beim Starten der Lesson: ' + err.message)
    }
  }

  return (
    <div className="starter-wrapper">
      <button className="back-button" onClick={() => navigate('/')}>Zurück</button>

      <form onSubmit={handleSubmit} className="label">
        <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Wie ist dein Name?" required />
        <input name="language" value={form.language} onChange={handleChange} type="text" placeholder="Welche Sprache sollen wir nutzen? (z. B. de, en, ru)" required />
        <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Welches Fach möchtest du heute angehen?" required />
        <input name="topic" value={form.topic} onChange={handleChange} type="text" placeholder="Welches Thema interessiert dich?" required />
        <input name="age" value={form.age} onChange={handleChange} type="number" placeholder="Wie alt bist du?" required />
        <button type="submit">Starten</button>
      </form>
    </div>
  )
}
