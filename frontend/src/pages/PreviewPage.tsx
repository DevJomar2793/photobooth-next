import PageFooter from '../components/PageFooter'
import PhotoTemplate from '../components/PhotoTemplate'
import {
  BackIcon,
  DownloadIcon,
  GalleryIcon,
  OutlineCameraIcon,
  PrintIcon,
  RefreshIcon,
} from '../components/icons'
import type { CapturedPhoto, PhotoTemplateId } from '../types/PhotoBoothTypes'
import { photoTemplateOptions } from '../data/PhotoTemplateOptions'
import './PreviewPage.css'

interface PreviewPageProps {
  photos: CapturedPhoto[]
  selectedTemplateId: PhotoTemplateId
  onBack: () => void
  onRetake: () => void
}

function PreviewPage({
  photos,
  selectedTemplateId,
  onBack,
  onRetake,
}: PreviewPageProps) {
  const selectedTemplate =
    photoTemplateOptions.find((template) => template.id === selectedTemplateId) ??
    photoTemplateOptions[0]

  return (
    <>
      <main className="final-preview-main">
        <div className="final-preview-layout">
          <section className="final-preview-workspace" aria-labelledby="final-preview-title">
            <div className="final-preview-heading-row">
              <button className="final-preview-back-button" type="button" onClick={onBack}>
                <BackIcon />
                Back
              </button>

              <div>
                <h1 id="final-preview-title">Preview Your Photo</h1>
                <p>Here&apos;s your photo. You can save or download it.</p>
              </div>
            </div>

            <div className="final-preview-photo">
              <PhotoTemplate
                photos={photos}
                templateId={selectedTemplate.id}
                title={selectedTemplate.title}
              />
            </div>
          </section>

          <aside className="final-preview-actions" aria-label="Photo actions">
            <section className="final-preview-action-section">
              <div className="final-preview-action-heading">
                <DownloadIcon />
                <div>
                  <h2>Save Your Photo</h2>
                  <p>Choose an option to save your photo.</p>
                </div>
              </div>

              <button
                className="final-preview-button final-preview-button-primary"
                type="button"
                disabled
                title="Downloading will be added in a later step"
              >
                <DownloadIcon />
                Download Image
              </button>
              <button
                className="final-preview-button"
                type="button"
                disabled
                title="Saving to the gallery will be added in a later step"
              >
                <GalleryIcon />
                Save to Gallery
              </button>
            </section>

            <section className="final-preview-action-section">
              <div className="final-preview-action-heading">
                <PrintIcon />
                <div>
                  <h2>Print (Optional)</h2>
                  <p>You can also print your photo at the booth.</p>
                </div>
              </div>

              <button
                className="final-preview-button"
                type="button"
                disabled
                title="Printing will be added in a later step"
              >
                <PrintIcon />
                Print Photo
              </button>
            </section>

            <section className="final-preview-action-section final-preview-retake-section">
              <div className="final-preview-action-heading">
                <RefreshIcon />
                <div>
                  <h2>Take Another Photo</h2>
                  <p>Want to try again? Go back to the camera.</p>
                </div>
              </div>

              <button
                className="final-preview-button final-preview-retake-button"
                type="button"
                onClick={onRetake}
              >
                <OutlineCameraIcon />
                Retake Photo
              </button>
            </section>
          </aside>
        </div>
      </main>

      <PageFooter variant="booth" />
    </>
  )
}

export default PreviewPage
