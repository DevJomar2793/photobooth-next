import heroIllustration from './assets/school-booth-hero.png'
import './App.css'

interface IconProps {
  className?: string
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
      <circle cx="24" cy="24" r="6" fill="currentColor" />
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

function App() {
  return (
    <div className="site-shell" id="home">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="School Booth home">
            <span className="brand-mark">
              <CameraIcon className="brand-camera" />
            </span>
            <span className="brand-name">School Booth</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a className="nav-item nav-item-active" href="#home" aria-current="page">
              Home
            </a>
            <span className="nav-item nav-item-disabled" aria-disabled="true">
              Gallery
            </span>
            <span className="nav-item nav-item-disabled" aria-disabled="true">
              About
            </span>
          </nav>

          <button className="header-cta" type="button" disabled>
            <CameraIcon className="button-camera" />
            <span>Start Photo</span>
          </button>
        </div>
      </header>

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
    </div>
  )
}

export default App
