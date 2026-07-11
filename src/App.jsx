import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Preloader from './components/Preloader'
import HomePage from './pages/HomePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <HashRouter>
      <Preloader />
      <Header activeSection={activeSection} />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage onSectionChange={setActiveSection} />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTop />
    </HashRouter>
  )
}
