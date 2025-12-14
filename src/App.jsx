import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Faculty from './pages/Faculty'
import Students from './pages/Students'
import PYQ from './pages/PYQ'
import Notes from './pages/Notes'
import Projects from './pages/Projects'
import Calendar from './pages/Calendar'
import Achievements from './pages/Achievements'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/students" element={<Students />} />
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

