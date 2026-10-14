interface PageFooterProps {
  variant: 'about' | 'gallery'
}

function PageFooter({ variant }: PageFooterProps) {
  const isGallery = variant === 'gallery'
  const footerClassName = isGallery ? 'gallery-footer' : 'about-footer'
  const waveClassName = isGallery ? 'gallery-footer-wave' : 'about-footer-wave'
  const contentClassName = isGallery
    ? 'gallery-footer-content'
    : 'about-footer-inner'
  const viewBox = isGallery ? '0 0 1440 72' : '0 0 1440 90'
  const wavePath = isGallery
    ? 'M0 24c168 66 312 5 494 37 182 31 284-24 469 1 170 24 306 4 477-38v48H0V24Z'
    : 'M0 30C180 112 317 28 507 65c204 39 278-35 476 1 180 33 300-3 457-38v62H0V30Z'

  return (
    <footer className={footerClassName}>
      <svg
        className={waveClassName}
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={wavePath} />
      </svg>
      <div className={contentClassName}>
        {isGallery ? (
          <>
            <span>© 2026 DevJomar. All rights reserved.</span>
            <span>Capture Good Vibes! <span aria-hidden="true">♥</span></span>
          </>
        ) : (
          <>
            <p>© 2026 DevJomar. All rights reserved.</p>
            <p>Capture Good Vibes! <span aria-hidden="true">♥</span></p>
          </>
        )}
      </div>
    </footer>
  )
}

export default PageFooter
