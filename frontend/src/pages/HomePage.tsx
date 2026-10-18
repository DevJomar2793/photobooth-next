import heroIllustration from '../assets/school-booth-hero.png'
import { ArrowIcon, CameraIcon, DownloadIcon, WandIcon } from '../components/icons'

interface HomePageProps {
  onStart: () => void
}

function HomePage({ onStart }: HomePageProps) {
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
            <button className="primary-cta" type="button" onClick={onStart}>
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
        <svg className="footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30C180 112 317 28 507 65c204 39 278-35 476 1 180 33 300-3 457-38v62H0V30Z" />
        </svg>
        <div className="features-inner">
          <article className="feature-card">
            <span className="feature-icon"><CameraIcon /></span>
            <div>
              <h2>Take Photos</h2>
              <p>Choose your favorite layout<br />and strike a pose!</p>
            </div>
          </article>

          <article className="feature-card">
            <span className="feature-icon"><WandIcon /></span>
            <div>
              <h2>Make It Unique</h2>
              <p>Add fun frames and filters.</p>
            </div>
          </article>

          <article className="feature-card">
            <span className="feature-icon"><DownloadIcon /></span>
            <div>
              <h2>Get Your Photos</h2>
              <p>Download instantly<br />and keep your memories!</p>
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

export default HomePage
