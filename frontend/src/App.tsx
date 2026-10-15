import { useState } from 'react'
import AboutPage from './AboutPage'
import CapturePage from './CapturePage'
import GalleryPage from './GalleryPage'
import HomePage from './HomePage'
import PreviewPage from './PreviewPage'
import TemplatePage from './TemplatePage'
import type { CapturedPhoto, PhotoTemplateId } from './PhotoBoothTypes'
import SiteHeader, { type PageName } from './components/SiteHeader'
import './App.css'

type AppPage = PageName | 'capture' | 'templates' | 'preview'

function App() {
  const [activePage, setActivePage] = useState<AppPage>('home')
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([])
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<PhotoTemplateId>('classic')

  const boothMode =
    activePage === 'capture' ||
    activePage === 'templates' ||
    activePage === 'preview'
  const activeNavigationPage: PageName = boothMode ? 'home' : activePage

  function clearPhotoBoothSession() {
    setCapturedPhotos([])
    setSelectedTemplateId('classic')
  }

  function handleNavigate(page: PageName) {
    clearPhotoBoothSession()
    setActivePage(page)
  }

  function handleStartPhotoBooth() {
    clearPhotoBoothSession()
    setActivePage('capture')
  }

  function handleCapture(photo: CapturedPhoto) {
    setCapturedPhotos((currentPhotos) => {
      if (currentPhotos.length >= 4) {
        return currentPhotos
      }

      return [...currentPhotos, photo]
    })
  }

  function handleDeletePhoto(photoId: number) {
    setCapturedPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo.id !== photoId),
    )
  }

  function handleBackToHome() {
    clearPhotoBoothSession()
    setActivePage('home')
  }

  function handleOpenTemplates() {
    if (capturedPhotos.length === 4) {
      setActivePage('templates')
    }
  }

  function handleOpenPreview() {
    if (capturedPhotos.length === 4) {
      setActivePage('preview')
    }
  }

  function handleRetakePhotos() {
    clearPhotoBoothSession()
    setActivePage('capture')
  }

  function renderPage() {
    if (activePage === 'gallery') {
      return <GalleryPage />
    }

    if (activePage === 'about') {
      return <AboutPage />
    }

    if (activePage === 'capture') {
      return (
        <CapturePage
          photos={capturedPhotos}
          onCapture={handleCapture}
          onDeletePhoto={handleDeletePhoto}
          onClearPhotos={() => setCapturedPhotos([])}
          onBack={handleBackToHome}
          onNext={handleOpenTemplates}
        />
      )
    }

    if (activePage === 'templates') {
      return (
        <TemplatePage
          photos={capturedPhotos}
          selectedTemplateId={selectedTemplateId}
          onSelectTemplate={setSelectedTemplateId}
          onBack={() => setActivePage('capture')}
          onUseTemplate={handleOpenPreview}
        />
      )
    }

    if (activePage === 'preview') {
      return (
        <PreviewPage
          photos={capturedPhotos}
          selectedTemplateId={selectedTemplateId}
          onBack={() => setActivePage('templates')}
          onRetake={handleRetakePhotos}
        />
      )
    }

    return <HomePage onStart={handleStartPhotoBooth} />
  }

  const pageClassName = [
    'site-shell',
    activePage === 'gallery' ? 'gallery-site' : '',
    activePage === 'about' ? 'about-site' : '',
    boothMode ? 'booth-site' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={pageClassName} id={activePage}>
      <SiteHeader
        activePage={activeNavigationPage}
        boothMode={boothMode}
        showNavigation={!boothMode}
        onNavigate={handleNavigate}
      />
      {renderPage()}
    </div>
  )
}

export default App
