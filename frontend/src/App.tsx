import { useState } from 'react'
import AboutPage from './AboutPage'
import GalleryPage from './GalleryPage'
import heroIllustration from './assets/school-booth-hero.png'
import './App.css'

interface IconProps {
  className?: string
}

type PageName = 'home' | 'gallery' | 'about'

interface SiteHeaderProps {
  activePage: PageName
  onNavigate: (page: PageName) => void
}

function CameraIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 10.5h8l3-5h16l3 5h8a3 3 0 0 1 3 3V34a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13.5a3 3 0 0 1 3-3Z"
        fill="currentColor"
      />
      <circle cx="24" cy="24" r="10" fill="white" />
      <circle className="camera-lens" cx="24" cy="24" r="6" fill="currentColor" />
      <circle cx="39" cy="15" r="2" fill="white" />
    </svg>
  )
}

function WandIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 34 20-20 6 6-20 20H7v-6Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m24 17 6 6M10 6v7M6.5 9.5h7M32 4v8M28 8h8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 5v22m0 0-8-8m8 8 8-8M7 29v7h28v-7"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExitIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4H5v20h7M16 8l6 6-6 6m6-6H9"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SiteHeader({ activePage, onNavigate }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
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
            {activePage !== 'home' && (
              <span className="brand-tagline">Snap • Smile • Create Memories</span>
            )}
          </span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <button
            className={`nav-item ${activePage === 'home' ? 'nav-item-active' : ''}`}
            type="button"
            onClick={() => onNavigate('home')}
            aria-current={activePage === 'home' ? 'page' : undefined}
          >
            Home
          </button>
          <button
            className={`nav-item ${activePage === 'gallery' ? 'nav-item-active' : ''}`}
            type="button"
            onClick={() => onNavigate('gallery')}
            aria-current={activePage === 'gallery' ? 'page' : undefined}
          >
            Gallery
          </button>
          <button
            className={`nav-item ${activePage === 'about' ? 'nav-item-active' : ''}`}
            type="button"
            onClick={() => onNavigate('about')}
            aria-current={activePage === 'about' ? 'page' : undefined}
          >
            About
          </button>
        </nav>

        <div className="header-action-slot">
          {activePage !== 'home' && (
            <button
              className="exit-booth-button"
              type="button"
              onClick={() => onNavigate('home')}
            >
              <ExitIcon className="exit-icon" />
              <span>Exit Booth</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <main className="hero-section">
        <div className="hero-inner">
          <section className="hero-copy" aria-labelledby="hero-title">
            <p className="eyebrow">Snap&nbsp; • &nbsp;Smile&nbsp; • &nbsp;Create Memories</p>
            <h1 id="hero-title">
              Capture
              <br />
              Good Vibes
              <br />
              Together!
            </h1>
            <p className="hero-description">
              Take photos, create memories,
              <br />
              and make every moment special!
            </p>
            <button className="primary-cta" type="button" disabled>
              <CameraIcon className="primary-camera" />
              <span>Start Photo Booth</span>
              <ArrowIcon className="primary-arrow" />
            </button>
          </section>

          <div className="hero-art">
            <img
              src={heroIllustration}
              alt="A playful blue camera surrounded by instant photos, stars, hearts, and colorful doodles"
            />
          </div>
        </div>
      </main>

      <footer className="feature-footer">
        <svg
          className="footer-wave"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 30C180 112 317 28 507 65c204 39 278-35 476 1 180 33 300-3 457-38v62H0V30Z" />
        </svg>
        <div className="features-inner">
          <article className="feature-card">
            <span className="feature-icon">
              <CameraIcon />
            </span>
            <div>
              <h2>Take Photos</h2>
              <p>
                Choose your favorite layout
                <br />
                and strike a pose!
              </p>
            </div>
          </article>

          <article className="feature-card">
            <span className="feature-icon">
              <WandIcon />
            </span>
            <div>
              <h2>Make It Unique</h2>
              <p>Add fun frames and filters.</p>
            </div>
          </article>

          <article className="feature-card">
            <span className="feature-icon">
              <DownloadIcon />
            </span>
            <div>
              <h2>Get Your Photos</h2>
              <p>
                Download instantly
                <br />
                and keep your memories!
              </p>
            </div>
          </article>

          <div className="developer-credit">
            <span>Developed by</span>
            <strong>DevJomar</strong>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </>
  )
}

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
