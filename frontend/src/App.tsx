import { useState } from 'react'
import AboutPage from './AboutPage'
import GalleryPage from './GalleryPage'
import HomePage from './HomePage'
import SiteHeader, { type PageName } from './components/SiteHeader'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState<PageName>('home')

  function renderPage() {
    if (activePage === 'gallery') {
      return <GalleryPage />
    }

    if (activePage === 'about') {
      return <AboutPage />
    }

    return <HomePage />
  }

  return (
    <div
      className={`site-shell ${activePage === 'gallery' ? 'gallery-site' : ''} ${activePage === 'about' ? 'about-site' : ''}`}
      id={activePage}
    >
      <SiteHeader activePage={activePage} onNavigate={setActivePage} />
      {renderPage()}
    </div>
  )
}

export default App
