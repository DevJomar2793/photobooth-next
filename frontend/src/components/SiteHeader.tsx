import { useEffect, useRef, useState } from 'react'
import { CameraIcon, ExitIcon } from './icons'

export type PageName = 'home' | 'gallery' | 'about'

interface SiteHeaderProps {
  activePage: PageName
  boothMode?: boolean
  showNavigation?: boolean
  onNavigate: (page: PageName) => void
}

const navigationItems: { label: string; page: PageName }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'About', page: 'about' },
]

function SiteHeader({
  activePage,
  boothMode = false,
  showNavigation = true,
  onNavigate,
}: SiteHeaderProps) {
  const shouldExitAfterCloseRef = useRef(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isExitModalClosing, setIsExitModalClosing] = useState(false)

  useEffect(() => {
    if (!isExitModalOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        shouldExitAfterCloseRef.current = false
        setIsExitModalClosing(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExitModalOpen])

  useEffect(() => {
    if (!isExitModalClosing) {
      return
    }

    const timerId = window.setTimeout(() => {
      const shouldExit = shouldExitAfterCloseRef.current

      setIsExitModalOpen(false)
      setIsExitModalClosing(false)
      shouldExitAfterCloseRef.current = false

      if (shouldExit) {
        onNavigate('home')
      }
    }, 180)

    return () => window.clearTimeout(timerId)
  }, [isExitModalClosing, onNavigate])

  function openExitModal() {
    shouldExitAfterCloseRef.current = false
    setIsExitModalClosing(false)
    setIsExitModalOpen(true)
  }

  function closeExitModal(shouldExit = false) {
    if (isExitModalClosing) {
      return
    }

    shouldExitAfterCloseRef.current = shouldExit
    setIsExitModalClosing(true)
  }

  return (
    <>
      <header className="site-header">
        <div className={`header-inner ${showNavigation ? '' : 'header-inner-without-nav'}`}>
          <button
            className="brand"
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="School Booth home"
          >
            <span className="brand-mark">
              <CameraIcon className="brand-camera" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">School Booth</span>
              {(activePage !== 'home' || boothMode) && (
                <span className="brand-tagline">Snap • Smile • Create Memories</span>
              )}
            </span>
          </button>

          {showNavigation && (
            <nav className="main-nav" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <button
                  className={`nav-item ${activePage === item.page ? 'nav-item-active' : ''}`}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  aria-current={activePage === item.page ? 'page' : undefined}
                  key={item.page}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          <div className="header-action-slot">
            {boothMode && (
              <button
                className="exit-booth-button"
                type="button"
                onClick={openExitModal}
              >
                <ExitIcon className="exit-icon" />
                <span>Exit Booth</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {isExitModalOpen && (
        <div
          className={`notification-modal-backdrop modal-animated-backdrop ${
            isExitModalClosing ? 'is-closing' : ''
          }`}
          role="presentation"
          onMouseDown={() => closeExitModal()}
        >
          <section
            className="notification-modal notification-modal-warning modal-animated-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            aria-describedby="exit-modal-message"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="notification-modal-close"
              type="button"
              onClick={() => closeExitModal()}
              aria-label="Close exit confirmation"
            >
              ×
            </button>

            <div className="notification-modal-icon" aria-hidden="true">
              <ExitIcon />
            </div>

            <h2 id="exit-modal-title">Exit Booth?</h2>
            <p id="exit-modal-message">
              All your progress will be removed once you exit.
            </p>

            <div className="notification-modal-actions">
              <button
                className="notification-modal-button notification-modal-button-secondary"
                type="button"
                onClick={() => closeExitModal()}
                autoFocus
              >
                No, Stay
              </button>
              <button
                className="notification-modal-button notification-modal-button-danger"
                type="button"
                onClick={() => closeExitModal(true)}
              >
                Yes, Exit
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default SiteHeader
