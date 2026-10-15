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
  return (
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
          {(activePage !== 'home' || boothMode) && (
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

export default SiteHeader
