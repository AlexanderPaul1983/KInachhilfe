
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'
import { StarterPage } from './starterSeite.jsx'
import Lesson from './Lesson.jsx'

function App() {
  
  const navigate = useNavigate()

  const handleStartNachhilfe = () => {
    navigate('/starter')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <button className='app-button' onClick={handleStartNachhilfe}>
            Nachhilfe Starten
          </button>
        } />
        <Route path="/starter" element={<StarterPage/>} />
        <Route path='/lesson' element={<Lesson/>}/>
      </Routes>
    </>
  )
}

export default App
