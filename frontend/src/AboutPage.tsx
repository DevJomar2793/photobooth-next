import aboutHeroImage from './assets/about/about-hero.png'
import './AboutPage.css'

interface IconProps {
  className?: string
}

function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 40" fill="none" aria-hidden="true">
      <path d="M5 10.5h8l3-5h16l3 5h8a3 3 0 0 1 3 3V34a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13.5a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.8" />
      <circle cx="39" cy="15" r="1.8" fill="currentColor" />
    </svg>
  )
}

function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="25" y="4" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="4" y="25" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="25" y="25" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="36" height="30" rx="3" stroke="currentColor" strokeWidth="3" />
      <circle cx="15" cy="17" r="3" fill="currentColor" />
      <path d="m7 33 10-10 7 7 5-5 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 4v25m0 0-9-9m9 9 9-9M6 31v8h32v-8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StudentsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="9" cy="18" r="4" stroke="currentColor" strokeWidth="3" />
      <circle cx="35" cy="18" r="4" stroke="currentColor" strokeWidth="3" />
      <path d="M11 37v-4c0-6 5-10 11-10s11 4 11 10v4M2 36v-3c0-4 3-7 7-7M42 36v-3c0-4-3-7-7-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 3 38 9v11c0 10-6 17-16 21C12 37 6 30 6 20V9l16-6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m14 22 5 5 11-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 40" fill="none" aria-hidden="true">
      <path d="M22 36 6 21C-2 13 3 3 12 4c5 0 8 4 10 8 2-4 5-8 10-8 9-1 14 9 6 17L22 36Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const features = [
  {
    title: 'Take Photos',
    description: 'Snap with timer options (0s, 3s, 5s).',
    color: 'blue',
    icon: <CameraIcon />,
  },
  {
    title: 'Fun Templates',
    description: 'Choose from different designs.',
    color: 'pink',
    icon: <GridIcon />,
  },
  {
    title: 'Preview & Edit',
    description: 'Preview your captured photos before saving.',
    color: 'yellow',
    icon: <ImageIcon />,
  },
  {
    title: 'Download',
    description: 'Save your photos to your device.',
    color: 'green',
    icon: <DownloadIcon />,
  },
]

const values = [
  {
    title: 'Made for Students',
    description: 'Create fun memories with your classmates and friends.',
    icon: <StudentsIcon />,
  },
  {
    title: 'Simple & Easy',
    description: 'User-friendly interface for everyone.',
    icon: <ShieldIcon />,
  },
  {
    title: 'Spread Good Vibes',
    description: 'Every photo is a memory to keep and cherish.',
    icon: <HeartIcon />,
  },
]

function AboutPage() {
  return (
    <>
      <main className="about-main">
        <div className="about-container">
          <div className="about-hero-layout">
            <section className="about-copy" aria-labelledby="about-title">
              <p className="about-label">About School Booth</p>
              <h1 id="about-title">
                Capture Good Vibes,
                <span className="about-title-row">
                  <span>One Photo at a Time</span>
                  <HeartIcon className="about-title-heart" />
                </span>
              </h1>
              <p className="about-description">
                School Booth is a fun and easy-to-use photo booth designed for students.
                Take photos, choose your favorite template, and create memorable moments
                with your friends!
              </p>

              <div className="about-features" aria-label="School Booth features">
                {features.map((feature) => (
                  <article className="about-feature" key={feature.title}>
                    <span className={`about-feature-icon about-feature-icon-${feature.color}`}>
                      {feature.icon}
                    </span>
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="about-art">
              <img
                src={aboutHeroImage}
                alt="A Good Vibes photo strip with smiling students, playful doodles, and a blue camera"
              />
            </div>
          </div>

          <section className="about-values" aria-label="Why School Booth">
            {values.map((value) => (
              <article className="about-value" key={value.title}>
                <span className="about-value-icon">{value.icon}</span>
                <div>
                  <h2>{value.title}</h2>
                  <p>{value.description}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <footer className="about-footer">
        <svg className="about-footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30C180 112 317 28 507 65c204 39 278-35 476 1 180 33 300-3 457-38v62H0V30Z" />
        </svg>
        <div className="about-footer-inner">
          <p>© 2026 DevJomar. All rights reserved.</p>
          <p>Capture Good Vibes! <span aria-hidden="true">♥</span></p>
        </div>
      </footer>
    </>
  )
}

export default AboutPage
