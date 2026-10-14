import { useState } from 'react'
import bestFriendsImage from './assets/gallery/best-friends.png'
import captureGoodVibesImage from './assets/gallery/capture-good-vibes.png'
import friendsForeverImage from './assets/gallery/friends-forever.png'
import goodMemoriesImage from './assets/gallery/good-memories.png'
import goodVibesImage from './assets/gallery/good-vibes.png'
import makeItSpecialImage from './assets/gallery/make-it-special.png'
import schoolLifeImage from './assets/gallery/school-life.png'
import schoolMemoriesImage from './assets/gallery/school-memories.png'
import './GalleryPage.css'

interface GalleryPhoto {
  id: number
  title: string
  template: string
  date: string
  image: string
  fileName: string
  width: number
  height: number
  format: string
}

interface IconProps {
  className?: string
}

const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    title: 'Good Vibes',
    template: 'Classic',
    date: 'Sep 23, 2026 10:15 AM',
    image: goodVibesImage,
    fileName: 'good-vibes.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 2,
    title: 'Best Friends',
    template: 'Best Friends',
    date: 'Sep 23, 2026 09:42 AM',
    image: bestFriendsImage,
    fileName: 'best-friends.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 3,
    title: 'School Life',
    template: 'School Life',
    date: 'Sep 22, 2026 04:18 PM',
    image: schoolLifeImage,
    fileName: 'school-life.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 4,
    title: 'Good Memories',
    template: 'Film Strip',
    date: 'Sep 22, 2026 11:03 AM',
    image: goodMemoriesImage,
    fileName: 'good-memories.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 5,
    title: 'Capture Good Vibes!',
    template: 'Cute Doodles',
    date: 'Sep 21, 2026 05:26 PM',
    image: captureGoodVibesImage,
    fileName: 'capture-good-vibes.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 6,
    title: 'Friends Forever',
    template: 'Colorful',
    date: 'Sep 21, 2026 03:11 PM',
    image: friendsForeverImage,
    fileName: 'friends-forever.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 7,
    title: 'School Memories',
    template: 'Notebook',
    date: 'Sep 20, 2026 02:47 PM',
    image: schoolMemoriesImage,
    fileName: 'school-memories.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
  {
    id: 8,
    title: 'Make It Special',
    template: 'Premium',
    date: 'Sep 20, 2026 12:01 PM',
    image: makeItSpecialImage,
    fileName: 'make-it-special.png',
    width: 543,
    height: 724,
    format: 'PNG',
  },
]

const templateOptions = [
  'All Photos',
  'Classic',
  'Best Friends',
  'School Life',
  'Film Strip',
  'Cute Doodles',
  'Colorful',
  'Notebook',
  'Premium',
]

function GalleryIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="34" height="30" rx="3" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="16" r="3" fill="currentColor" />
      <path d="m7 32 9-9 6 6 5-5 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M2 11s4-8 12-8 12 8 12 8-4 8-12 8S2 11 2 11Z" fill="currentColor" />
      <circle cx="14" cy="11" r="4" fill="white" />
      <circle cx="14" cy="11" r="2" fill="currentColor" />
    </svg>
  )
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 3v4m10-4v4M3 10h18M8 14h2m4 0h2m-8 4h2m4 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="9" r="2" fill="currentColor" />
      <path d="m5 18 5-5 3 3 2-2 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InfoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v6m0-10h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v4h16v-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrashIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GalleryPage() {
  const [photos, setPhotos] = useState(initialGalleryPhotos)
  const [activePhotoId, setActivePhotoId] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [templateFilter, setTemplateFilter] = useState('All Photos')
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<number>>(new Set())

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredPhotos = photos.filter((photo) => {
    const matchesTemplate =
      templateFilter === 'All Photos' || photo.template === templateFilter
    const matchesSearch =
      normalizedQuery.length === 0 ||
      photo.title.toLowerCase().includes(normalizedQuery) ||
      photo.template.toLowerCase().includes(normalizedQuery) ||
      photo.date.toLowerCase().includes(normalizedQuery)

    return matchesTemplate && matchesSearch
  })

  const activePhoto =
    filteredPhotos.find((photo) => photo.id === activePhotoId) ??
    filteredPhotos[0] ??
    null

  function togglePhotoSelection(photoId: number) {
    setSelectedPhotoIds((currentIds) => {
      const nextIds = new Set(currentIds)

      if (nextIds.has(photoId)) {
        nextIds.delete(photoId)
      } else {
        nextIds.add(photoId)
      }

      return nextIds
    })
  }

  function handlePhotoClick(photoId: number) {
    setActivePhotoId(photoId)

    if (selectionMode) {
      togglePhotoSelection(photoId)
    }
  }

  function handleSelectionMode() {
    setSelectionMode((currentMode) => {
      if (currentMode) {
        setSelectedPhotoIds(new Set())
      }

      return !currentMode
    })
  }

  function handleDeletePhoto() {
    if (activePhoto === null) {
      return
    }

    const shouldDelete = window.confirm(`Delete "${activePhoto.title}"?`)

    if (!shouldDelete) {
      return
    }

    const activeIndex = photos.findIndex((photo) => photo.id === activePhoto.id)
    const remainingPhotos = photos.filter((photo) => photo.id !== activePhoto.id)
    const nextPhoto = remainingPhotos[Math.min(activeIndex, remainingPhotos.length - 1)]

    setPhotos(remainingPhotos)
    setActivePhotoId(nextPhoto?.id ?? 0)
    setSelectedPhotoIds((currentIds) => {
      const nextIds = new Set(currentIds)
      nextIds.delete(activePhoto.id)
      return nextIds
    })
  }

  return (
    <>
      <main className="gallery-main">
        <div className="gallery-layout">
          <section className="gallery-browser" aria-labelledby="gallery-title">
            <div className="gallery-topbar">
              <div className="gallery-heading">
                <GalleryIcon className="gallery-title-icon" />
                <div>
                  <h1 id="gallery-title">Gallery</h1>
                  <p>View, download, or delete your photos.</p>
                </div>
              </div>

              <div className="gallery-toolbar">
                <label className="search-field">
                  <span className="sr-only">Search photos</span>
                  <SearchIcon className="search-icon" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search photos..."
                  />
                </label>

                <label className="filter-field">
                  <span className="sr-only">Filter by template</span>
                  <select
                    value={templateFilter}
                    onChange={(event) => setTemplateFilter(event.target.value)}
                  >
                    {templateOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className={`select-mode-button ${selectionMode ? 'is-active' : ''}`}
                  type="button"
                  onClick={handleSelectionMode}
                  aria-pressed={selectionMode}
                >
                  <span className="select-mode-icon">
                    <CheckIcon />
                  </span>
                  <span>
                    {selectionMode ? `Done (${selectedPhotoIds.size})` : 'Select'}
                  </span>
                </button>
              </div>
            </div>

            <div className="gallery-grid-scroll">
              {filteredPhotos.length > 0 ? (
                <div className="photo-grid">
                  {filteredPhotos.map((photo) => {
                    const isActive = activePhoto?.id === photo.id
                    const isMarked = selectionMode
                      ? selectedPhotoIds.has(photo.id)
                      : isActive

                    return (
                      <article
                        className={`photo-card ${isActive ? 'is-active' : ''}`}
                        key={photo.id}
                      >
                        <button
                          className="photo-card-button"
                          type="button"
                          onClick={() => handlePhotoClick(photo.id)}
                          aria-label={`${selectionMode ? 'Select' : 'Preview'} ${photo.title}`}
                          aria-pressed={selectionMode ? isMarked : undefined}
                        >
                          <span className={`card-check ${isMarked ? 'is-checked' : ''}`}>
                            {isMarked && <CheckIcon />}
                          </span>
                          <img src={photo.image} alt={`${photo.title} photo strip`} />
                        </button>
                        <div className="photo-card-meta">
                          <time>{photo.date}</time>
                          <span className="card-menu" aria-hidden="true">⋮</span>
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="gallery-empty-state">
                  <GalleryIcon />
                  <h2>{photos.length === 0 ? 'No photos left' : 'No photos found'}</h2>
                  <p>
                    {photos.length === 0
                      ? 'Refresh the page to restore the demo gallery.'
                      : 'Try a different search or template filter.'}
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="preview-panel" aria-labelledby="preview-title">
            <div className="preview-heading">
              <EyeIcon className="preview-eye" />
              <div>
                <h2 id="preview-title">Preview</h2>
                <p>Here&apos;s a closer look at your photo.</p>
              </div>
            </div>

            {activePhoto !== null ? (
              <>
                <div className="preview-image-wrap">
                  <img src={activePhoto.image} alt={`${activePhoto.title} enlarged preview`} />
                </div>

                <dl className="preview-details">
                  <div>
                    <dt><CalendarIcon /> Date Taken</dt>
                    <dd>{activePhoto.date}</dd>
                  </div>
                  <div>
                    <dt><ImageIcon /> Template</dt>
                    <dd>{activePhoto.template}</dd>
                  </div>
                  <div>
                    <dt><InfoIcon /> Size</dt>
                    <dd>{activePhoto.width} × {activePhoto.height} ({activePhoto.format})</dd>
                  </div>
                </dl>

                <div className="preview-actions">
                  <a
                    className="download-button"
                    href={activePhoto.image}
                    download={activePhoto.fileName}
                  >
                    <DownloadIcon />
                    Download Image
                  </a>
                  <button className="delete-button" type="button" onClick={handleDeletePhoto}>
                    <TrashIcon />
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="preview-empty-state">
                <GalleryIcon />
                <p>Select a visible photo to preview it.</p>
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer className="gallery-footer">
        <svg className="gallery-footer-wave" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 24c168 66 312 5 494 37 182 31 284-24 469 1 170 24 306 4 477-38v48H0V24Z" />
        </svg>
        <div className="gallery-footer-content">
          <span>© 2026 DevJomar. All rights reserved.</span>
          <span>Capture Good Vibes! <span aria-hidden="true">♥</span></span>
        </div>
      </footer>
    </>
  )
}

export default GalleryPage
