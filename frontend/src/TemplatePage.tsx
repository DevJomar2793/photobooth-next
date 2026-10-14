import PageFooter from './components/PageFooter'
import PhotoTemplate from './components/PhotoTemplate'
import { ArrowIcon, BackIcon, CheckIcon, EyeIcon } from './components/icons'
import type { CapturedPhoto, PhotoTemplateId } from './PhotoBoothTypes'
import './TemplatePage.css'

interface TemplatePageProps {
  photos: CapturedPhoto[]
  selectedTemplateId: PhotoTemplateId
  onSelectTemplate: (templateId: PhotoTemplateId) => void
  onBack: () => void
}

interface TemplateOption {
  id: PhotoTemplateId
  name: string
  title: string
}

const templateOptions: TemplateOption[] = [
  { id: 'classic', name: 'Classic', title: 'Good Vibes' },
  { id: 'best-friends', name: 'Best Friends', title: 'Best Friends' },
  { id: 'school-life', name: 'School Life', title: 'School Life' },
  { id: 'film-strip', name: 'Film Strip', title: 'Good Memories' },
  { id: 'cute-doodles', name: 'Cute Doodles', title: 'Capture Good Vibes!' },
  { id: 'colorful', name: 'Colorful', title: 'Friends Forever' },
  { id: 'notebook', name: 'Notebook', title: 'School Memories' },
  { id: 'premium', name: 'Premium', title: 'Make It Special' },
]

function TemplatePage({
  photos,
  selectedTemplateId,
  onSelectTemplate,
  onBack,
}: TemplatePageProps) {
  const selectedTemplate =
    templateOptions.find((template) => template.id === selectedTemplateId) ??
    templateOptions[0]

  return (
    <>
      <main className="template-main">
        <div className="template-layout">
          <section className="template-browser" aria-labelledby="template-page-title">
            <div className="template-heading-row">
              <button className="template-back-button" type="button" onClick={onBack}>
                <BackIcon />
                Back
              </button>
              <div>
                <h1 id="template-page-title">Select a Template</h1>
                <p>Choose your favorite design to make your photos more fun!</p>
              </div>
            </div>

            <div className="template-options-grid">
              {templateOptions.map((template) => {
                const isSelected = selectedTemplateId === template.id

                return (
                  <button
                    className={`template-option ${isSelected ? 'is-selected' : ''}`}
                    type="button"
                    onClick={() => onSelectTemplate(template.id)}
                    aria-pressed={isSelected}
                    key={template.id}
                  >
                    <span className="template-card-visual">
                      <PhotoTemplate
                        photos={photos}
                        templateId={template.id}
                        title={template.title}
                      />
                      {isSelected && (
                        <span className="template-selected-check" aria-hidden="true">
                          <CheckIcon />
                        </span>
                      )}
                    </span>
                    <strong>{template.name}</strong>
                  </button>
                )
              })}
            </div>
          </section>

          <aside className="template-preview-panel" aria-labelledby="template-preview-title">
            <div className="template-preview-heading">
              <EyeIcon />
              <div>
                <h2 id="template-preview-title">Template Preview</h2>
                <p>This is how your photos will look using the selected template.</p>
              </div>
            </div>

            <div className="template-large-preview">
              <PhotoTemplate
                photos={photos}
                templateId={selectedTemplate.id}
                title={selectedTemplate.title}
              />
            </div>

            <button
              className="use-template-button"
              type="button"
              disabled
              title="Final photo preview will be added in a later step"
            >
              <span><CheckIcon /></span>
              Use This Template
              <ArrowIcon />
            </button>
          </aside>
        </div>
      </main>

      <PageFooter variant="booth" />
    </>
  )
}

export default TemplatePage
