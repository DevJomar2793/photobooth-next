import { useEffect, useState } from "react";
import PageFooter from "../components/PageFooter";
import {
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  EyeIcon,
  GalleryIcon,
  ImageIcon,
  InfoIcon,
  SearchIcon,
  TrashIcon,
} from "../components/icons";
import { photoTemplateOptions } from "../data/PhotoTemplateOptions";
import { API_URL } from "../config";
import "./GalleryPage.css";

interface ImageListItemResponse {
  id: number;
  filename: string;
  content_type: string;
  created_at: string;
  image_url: string;
}

interface GalleryPhoto {
  id: number;
  title: string;
  template: string;
  date: string;
  image: string;
  fileName: string;
  width: number;
  height: number;
  format: string;
}

const templateOptions = [
  "All Photos",
  "Classic",
  "Best Friends",
  "School Life",
  "Film Strip",
  "Cute Doodles",
  "Colorful",
  "Notebook",
  "Premium",
];

function formatPhotoDate(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function createGalleryPhoto(image: ImageListItemResponse): GalleryPhoto {
  const template = photoTemplateOptions.find((option) =>
    image.filename.startsWith(`${option.id}-`),
  );
  const fallbackTitle = image.filename
    .replace(/\.[^.]+$/, "")
    .replaceAll("-", " ");
  const format = image.content_type.split("/")[1]?.toUpperCase() ?? "IMAGE";

  return {
    id: image.id,
    title: template?.title ?? fallbackTitle,
    template: template?.name ?? "Unknown",
    date: formatPhotoDate(image.created_at),
    image: `${API_URL}${image.image_url}`,
    fileName: image.filename,
    width: 543,
    height: 724,
    format,
  };
}

function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activePhotoId, setActivePhotoId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [templateFilter, setTemplateFilter] = useState("All Photos");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<number>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const [isDeleteNoticeOpen, setIsDeleteNoticeOpen] = useState(false);
  const [isDeleteNoticeClosing, setIsDeleteNoticeClosing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await fetch(`${API_URL}/list-of-image`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load images.");
        }

        const images: ImageListItemResponse[] = await response.json();
        const galleryPhotos = images.map(createGalleryPhoto);

        setPhotos(galleryPhotos);
        setActivePhotoId(galleryPhotos[0]?.id ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setPhotos([]);
        setActivePhotoId(null);
        setLoadError("Unable to load your photos. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPhotos();

    return () => controller.abort();
  }, [reloadCount]);

  useEffect(() => {
    if (!isDeleteNoticeOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDeleteNoticeClosing(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDeleteNoticeOpen]);

  useEffect(() => {
    if (!isDeleteNoticeClosing) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setIsDeleteNoticeOpen(false);
      setIsDeleteNoticeClosing(false);
    }, 180);

    return () => window.clearTimeout(timerId);
  }, [isDeleteNoticeClosing]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPhotos = photos.filter((photo) => {
    const matchesTemplate =
      templateFilter === "All Photos" || photo.template === templateFilter;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      photo.title.toLowerCase().includes(normalizedQuery) ||
      photo.template.toLowerCase().includes(normalizedQuery) ||
      photo.date.toLowerCase().includes(normalizedQuery);

    return matchesTemplate && matchesSearch;
  });

  const activePhoto =
    filteredPhotos.find((photo) => photo.id === activePhotoId) ??
    filteredPhotos[0] ??
    null;

  function togglePhotoSelection(photoId: number) {
    setSelectedPhotoIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(photoId)) {
        nextIds.delete(photoId);
      } else {
        nextIds.add(photoId);
      }

      return nextIds;
    });
  }

  function handlePhotoClick(photoId: number) {
    setActivePhotoId(photoId);

    if (selectionMode) {
      togglePhotoSelection(photoId);
    }
  }

  function handleSelectionMode() {
    setSelectionMode((currentMode) => {
      if (currentMode) {
        setSelectedPhotoIds(new Set());
      }

      return !currentMode;
    });
  }

  function handleDeletePhoto() {
    setIsDeleteNoticeClosing(false);
    setIsDeleteNoticeOpen(true);
  }

  function closeDeleteNotice() {
    setIsDeleteNoticeClosing(true);
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
                  className={`select-mode-button ${selectionMode ? "is-active" : ""}`}
                  type="button"
                  onClick={handleSelectionMode}
                  aria-pressed={selectionMode}
                >
                  <span className="select-mode-icon">
                    <CheckIcon />
                  </span>
                  <span>
                    {selectionMode
                      ? `Done (${selectedPhotoIds.size})`
                      : "Select"}
                  </span>
                </button>
              </div>
            </div>

            <div className="gallery-grid-scroll">
              {isLoading ? (
                <div className="gallery-status-state" role="status">
                  <GalleryIcon />
                  <h2>Loading photos...</h2>
                  <p>Please wait while your gallery is loaded.</p>
                </div>
              ) : loadError ? (
                <div className="gallery-status-state" role="alert">
                  <GalleryIcon />
                  <h2>Unable to load photos</h2>
                  <p>{loadError}</p>
                  <button
                    type="button"
                    onClick={() => setReloadCount((count) => count + 1)}
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredPhotos.length > 0 ? (
                <div className="photo-grid">
                  {filteredPhotos.map((photo) => {
                    const isActive = activePhoto?.id === photo.id;
                    const isMarked = selectionMode
                      ? selectedPhotoIds.has(photo.id)
                      : isActive;

                    return (
                      <article
                        className={`photo-card ${isActive ? "is-active" : ""}`}
                        key={photo.id}
                      >
                        <button
                          className="photo-card-button"
                          type="button"
                          onClick={() => handlePhotoClick(photo.id)}
                          aria-label={`${selectionMode ? "Select" : "Preview"} ${photo.title}`}
                          aria-pressed={selectionMode ? isMarked : undefined}
                        >
                          <span
                            className={`card-check ${isMarked ? "is-checked" : ""}`}
                          >
                            {isMarked && <CheckIcon />}
                          </span>
                          <img
                            src={photo.image}
                            alt={`${photo.title} photo strip`}
                          />
                        </button>
                        <div className="photo-card-meta">
                          <time>{photo.date}</time>
                          <span className="card-menu" aria-hidden="true">
                            ⋮
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="gallery-empty-state">
                  <GalleryIcon />
                  <h2>
                    {photos.length === 0
                      ? "No saved photos yet"
                      : "No photos found"}
                  </h2>
                  <p>
                    {photos.length === 0
                      ? "Save a photo from the photo booth to see it here."
                      : "Try a different search or template filter."}
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
                  <img
                    src={activePhoto.image}
                    alt={`${activePhoto.title} enlarged preview`}
                  />
                </div>

                <dl className="preview-details">
                  <div>
                    <dt>
                      <CalendarIcon /> Date Taken
                    </dt>
                    <dd>{activePhoto.date}</dd>
                  </div>
                  <div>
                    <dt>
                      <ImageIcon /> Template
                    </dt>
                    <dd>{activePhoto.template}</dd>
                  </div>
                  <div>
                    <dt>
                      <InfoIcon /> Size
                    </dt>
                    <dd>
                      {activePhoto.width} × {activePhoto.height} (
                      {activePhoto.format})
                    </dd>
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
                  <button
                    className="delete-button"
                    type="button"
                    onClick={handleDeletePhoto}
                  >
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

      <PageFooter variant="gallery" />

      {isDeleteNoticeOpen && (
        <div
          className={`notification-modal-backdrop modal-animated-backdrop ${
            isDeleteNoticeClosing ? "is-closing" : ""
          }`}
          role="presentation"
          onMouseDown={closeDeleteNotice}
        >
          <section
            className="notification-modal notification-modal-info modal-animated-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-notice-title"
            aria-describedby="delete-notice-message"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="notification-modal-close"
              type="button"
              onClick={closeDeleteNotice}
              aria-label="Close notification"
            >
              ×
            </button>

            <div className="notification-modal-icon" aria-hidden="true">
              <TrashIcon />
            </div>

            <h2 id="delete-notice-title">Delete Photo</h2>
            <p id="delete-notice-message">
              This feature will be implemented in a future update.
            </p>

            <button
              className="notification-modal-button"
              type="button"
              onClick={closeDeleteNotice}
              autoFocus
            >
              Okay
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default GalleryPage;
