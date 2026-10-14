import type { CapturedPhoto, PhotoTemplateId } from '../PhotoBoothTypes'
import './PhotoTemplate.css'

interface PhotoTemplateProps {
  photos: CapturedPhoto[]
  templateId: PhotoTemplateId
  title: string
}

const templateDecorations: Record<PhotoTemplateId, string[]> = {
  classic: ['☺', '★', '♥'],
  'best-friends': ['♥', '♕', '♥'],
  'school-life': ['★', '✦', '★'],
  'film-strip': ['✦', '★', '✦'],
  'cute-doodles': ['✧', '♥', '📷'],
  colorful: ['♥', '✦', '🌈'],
  notebook: ['☻', '✦', '◆'],
  premium: ['♕', '★', '✦'],
}

function PhotoTemplate({ photos, templateId, title }: PhotoTemplateProps) {
  const photoSlots = Array.from({ length: 4 })
  const decorations = templateDecorations[templateId]

  return (
    <div className={`photo-template photo-template-${templateId}`}>
      <div className="template-photo-grid">
        {photoSlots.map((_, index) => {
          const photo = photos[index]

          return (
            <div className="template-photo-slot" key={photo?.id ?? index}>
              {photo ? (
                <img src={photo.dataUrl} alt={`Captured pose ${index + 1}`} />
              ) : (
                <span aria-hidden="true">{index + 1}</span>
              )}
            </div>
          )
        })}
      </div>

      {decorations.map((decoration, index) => (
        <span
          className={`template-decoration template-decoration-${index + 1}`}
          aria-hidden="true"
          key={`${decoration}-${index}`}
        >
          {decoration}
        </span>
      ))}

      <strong className="template-title">{title}</strong>
    </div>
  )
}

export default PhotoTemplate
