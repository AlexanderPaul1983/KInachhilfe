
import { Routes, Route } from 'react-router-dom'

import './App.css'
import { Home } from './Home.jsx'
import { StarterPage } from './starterSeite.jsx'
import Lesson from './Lesson.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starter" element={<StarterPage/>} />
        <Route path='/lesson' element={<Lesson/>}/>
      </Routes>
    </>
  )
}

export default App
