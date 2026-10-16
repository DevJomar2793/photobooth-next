import { useEffect, useRef, useState } from 'react'
import heroIllustration from '../assets/school-booth-hero.png'
import PageFooter from '../components/PageFooter'
import {
  ArrowIcon,
  BackIcon,
  CameraIcon,
  ClockIcon,
  EyeIcon,
  GalleryIcon,
  LightbulbIcon,
  RefreshIcon,
  TrashIcon,
} from '../components/icons'
import type { CapturedPhoto } from '../types/PhotoBoothTypes'
import './CapturePage.css'

type CameraStatus = 'requesting' | 'ready' | 'denied' | 'unavailable' | 'error'
type PreviewSelection = number | 'all' | null

interface CapturePageProps {
  photos: CapturedPhoto[]
  onCapture: (photo: CapturedPhoto) => void
  onDeletePhoto: (photoId: number) => void
  onClearPhotos: () => void
  onBack: () => void
  onNext: () => void
}

const timerOptions = [0, 3, 5]

function CapturePage({
  photos,
  onCapture,
  onDeletePhoto,
  onClearPhotos,
  onBack,
  onNext,
}: CapturePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const modalCloseTimerRef = useRef<number | null>(null)
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('requesting')
  const [retryKey, setRetryKey] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isTakingPhoto, setIsTakingPhoto] = useState(false)
  const [previewSelection, setPreviewSelection] = useState<PreviewSelection>(null)
  const [isPreviewClosing, setIsPreviewClosing] = useState(false)

  useEffect(() => {
    return () => {
      if (modalCloseTimerRef.current !== null) {
        window.clearTimeout(modalCloseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    let isActive = true

    async function openCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus('unavailable')
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: 'user' },
        })

        if (!isActive) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        if (!isActive) {
          return
        }

        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setCameraStatus('denied')
        } else {
          setCameraStatus('error')
        }
      }
    }

    openCamera()

    return () => {
      isActive = false
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [retryKey])

  const statusText = {
    requesting: 'Requesting Camera',
    ready: 'Camera Ready',
    denied: 'Camera Permission Needed',
    unavailable: 'Camera Unavailable',
    error: 'Unable to Start Camera',
  }[cameraStatus]

  const canTakePhoto =
    cameraStatus === 'ready' && !isTakingPhoto && photos.length < 4

  function wait(milliseconds: number) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
  }

  async function handleTakePhoto() {
    if (!canTakePhoto || !videoRef.current || !canvasRef.current) {
      return
    }

    setIsTakingPhoto(true)

    try {
      for (let seconds = timerSeconds; seconds > 0; seconds -= 1) {
        setCountdown(seconds)
        await wait(1000)
      }

      setCountdown(null)

      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas) {
        return
      }

      const width = video.videoWidth
      const height = video.videoHeight

      if (width === 0 || height === 0) {
        setCameraStatus('error')
        return
      }

      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')

      if (!context) {
        setCameraStatus('error')
        return
      }

      context.save()
      context.translate(width, 0)
      context.scale(-1, 1)
      context.drawImage(video, 0, 0, width, height)
      context.restore()

      onCapture({
        id: Date.now(),
        dataUrl: canvas.toDataURL('image/jpeg', 0.9),
      })
    } finally {
      setCountdown(null)
      setIsTakingPhoto(false)
    }
  }

  function handleRetryCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCameraStatus('requesting')
    setRetryKey((currentKey) => currentKey + 1)
  }

  function handleDelete(photoId: number) {
    if (previewSelection === photoId) {
      closePreview(() => onDeletePhoto(photoId))
      return
    }

    onDeletePhoto(photoId)
  }

  function handleClearPhotos() {
    if (previewSelection !== null) {
      closePreview(onClearPhotos)
      return
    }

    onClearPhotos()
  }

  function openPreview(selection: Exclude<PreviewSelection, null>) {
    setIsPreviewClosing(false)
    setPreviewSelection(selection)
  }

  function closePreview(afterClose?: () => void) {
    if (previewSelection === null || isPreviewClosing) {
      return
    }

    setIsPreviewClosing(true)
    modalCloseTimerRef.current = window.setTimeout(() => {
      setPreviewSelection(null)
      setIsPreviewClosing(false)
      modalCloseTimerRef.current = null
      afterClose?.()
    }, 180)
  }

  const previewPhotos =
    previewSelection === 'all'
      ? photos
      : photos.filter((photo) => photo.id === previewSelection)

  return (
    <>
      <main className="capture-main">
        <div className="capture-content">
          <div className="capture-workspace">
            <section className="capture-stage-panel" aria-label="Camera controls">
              <div className="camera-frame">
                <video
                  className="camera-video"
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  onCanPlay={() => setCameraStatus('ready')}
                />

                {cameraStatus !== 'ready' && (
                  <div className="camera-placeholder">
                    <img src={heroIllustration} alt="Blue School Booth camera illustration" />
                    {cameraStatus !== 'requesting' && (
                      <div className="camera-message">
                        <strong>{statusText}</strong>
                        <p>
                          {cameraStatus === 'denied'
                            ? 'Allow camera access in your browser, then try again.'
                            : 'Connect a camera or check your browser settings.'}
                        </p>
                        <button type="button" onClick={handleRetryCamera}>
                          <RefreshIcon />
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className={`camera-status camera-status-${cameraStatus}`}>
                  <span aria-hidden="true" />
                  {statusText}
                </div>

                <span className="camera-corner camera-corner-top-left" aria-hidden="true" />
                <span className="camera-corner camera-corner-top-right" aria-hidden="true" />
                <span className="camera-corner camera-corner-bottom-left" aria-hidden="true" />
                <span className="camera-corner camera-corner-bottom-right" aria-hidden="true" />

                {countdown !== null && (
                  <div className="camera-countdown" aria-live="assertive">
                    {countdown}
                  </div>
                )}
              </div>

              <div className="capture-controls">
                <div className="timer-control">
                  <h2><ClockIcon /> Timer</h2>
                  <div className="timer-options">
                    {timerOptions.map((seconds) => (
                      <button
                        className={timerSeconds === seconds ? 'is-active' : ''}
                        type="button"
                        onClick={() => setTimerSeconds(seconds)}
                        disabled={isTakingPhoto}
                        aria-pressed={timerSeconds === seconds}
                        key={seconds}
                      >
                        {seconds}s
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shutter-control">
                  <button
                    className="shutter-button"
                    type="button"
                    onClick={handleTakePhoto}
                    disabled={!canTakePhoto}
                    aria-label="Take photo"
                  >
                    <CameraIcon className="capture-shutter-icon" />
                  </button>
                  <strong>{photos.length === 4 ? 'Photos Complete' : 'Take Photo'}</strong>
                </div>

                <button
                  className="preview-all-button"
                  type="button"
                  onClick={() => openPreview('all')}
                  disabled={photos.length === 0}
                >
                  <EyeIcon />
                  Preview
                </button>
              </div>

              <canvas className="capture-canvas" ref={canvasRef} aria-hidden="true" />
            </section>

            <aside className="captured-panel" aria-labelledby="captured-title">
              <div className="captured-panel-header">
                <h2 id="captured-title">
                  <GalleryIcon />
                  Captured Photos ({photos.length})
                </h2>
                <button
                  type="button"
                  onClick={handleClearPhotos}
                  disabled={photos.length === 0}
                >
                  <TrashIcon />
                  Clear All
                </button>
              </div>

              <div className="captured-grid">
                {Array.from({ length: 4 }).map((_, index) => {
                  const photo = photos[index]

                  return (
                    <article className={`captured-card ${photo ? '' : 'is-empty'}`} key={photo?.id ?? index}>
                      {photo ? (
                        <>
                          <div className="captured-thumbnail">
                            <img src={photo.dataUrl} alt={`Captured photo ${index + 1}`} />
                            <span>{index + 1}</span>
                          </div>
                          <div className="captured-card-actions">
                            <button type="button" onClick={() => openPreview(photo.id)}>
                              <EyeIcon />
                              Preview
                            </button>
                            <button type="button" onClick={() => handleDelete(photo.id)}>
                              <TrashIcon />
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="empty-photo-slot">
                          <CameraIcon />
                          <span>Photo {index + 1}</span>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </aside>
          </div>

          <div className="capture-navigation">
            <button className="booth-back-button" type="button" onClick={onBack}>
              <BackIcon />
              Back
            </button>
            <p><LightbulbIcon /> Tip: Choose a timer, smile, and click the shutter!</p>
            <button
              className="booth-next-button"
              type="button"
              onClick={onNext}
              disabled={photos.length !== 4}
            >
              Next
              <ArrowIcon />
            </button>
          </div>
        </div>
      </main>

      <PageFooter variant="booth" />

      {previewSelection !== null && (
        <div
          className={`photo-preview-backdrop modal-animated-backdrop ${
            isPreviewClosing ? 'is-closing' : ''
          }`}
          role="presentation"
          onMouseDown={() => closePreview()}
        >
          <section
            className="photo-preview-dialog modal-animated-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-preview-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="photo-preview-header">
              <div>
                <h2 id="photo-preview-title"><EyeIcon /> Preview Photos ({previewPhotos.length})</h2>
                <p>Review your captured photos before proceeding.</p>
              </div>
              <button type="button" onClick={() => closePreview()} aria-label="Close preview">×</button>
            </div>

            <div className={`photo-preview-grid ${previewPhotos.length === 1 ? 'is-single' : ''}`}>
              {previewPhotos.map((photo) => {
                const photoNumber = photos.findIndex((item) => item.id === photo.id) + 1

                return (
                  <article key={photo.id}>
                    <img src={photo.dataUrl} alt={`Captured photo ${photoNumber} preview`} />
                    <span>{photoNumber}</span>
                    <button type="button" onClick={() => handleDelete(photo.id)} aria-label={`Delete photo ${photoNumber}`}>
                      <TrashIcon />
                    </button>
                  </article>
                )
              })}
            </div>

            <div className="photo-preview-footer">
              <button type="button" onClick={handleClearPhotos}>
                <RefreshIcon />
                Retake All
              </button>
              <button type="button" onClick={() => closePreview()}>
                Done
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default CapturePage
