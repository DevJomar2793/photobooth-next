import aboutHeroImage from './assets/about/about-hero.png'
import PageFooter from './components/PageFooter'
import {
  DownloadIcon,
  GridIcon,
  HeartIcon,
  ImageIcon,
  OutlineCameraIcon,
  ShieldIcon,
  StudentsIcon,
} from './components/icons'
import './AboutPage.css'

const features = [
  {
    title: 'Take Photos',
    description: 'Snap with timer options (0s, 3s, 5s).',
    color: 'blue',
    icon: <OutlineCameraIcon />,
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

      <PageFooter variant="about" />
    </>
  )
}

export default AboutPage
