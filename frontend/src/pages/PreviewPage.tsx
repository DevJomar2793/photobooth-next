import { useEffect, useRef, useState } from "react";
import { toBlob } from "html-to-image";
import PageFooter from "../components/PageFooter";
import PhotoTemplate from "../components/PhotoTemplate";
import {
  BackIcon,
  DownloadIcon,
  GalleryIcon,
  OutlineCameraIcon,
  PrintIcon,
  RefreshIcon,
} from "../components/icons";
import type { CapturedPhoto, PhotoTemplateId } from "../types/PhotoBoothTypes";
import { photoTemplateOptions } from "../data/PhotoTemplateOptions";
import { API_URL } from "../config";
import "./PreviewPage.css";

interface PreviewPageProps {
  photos: CapturedPhoto[];
  selectedTemplateId: PhotoTemplateId;
  onBack: () => void;
  onOpenGallery: () => void;
  onRetake: () => void;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface Notification {
  variant: "success" | "info";
  title: string;
  message: string;
}

function PreviewPage({
  photos,
  selectedTemplateId,
  onBack,
  onOpenGallery,
  onRetake,
}: PreviewPageProps) {
  const photoTemplateRef = useRef<HTMLDivElement>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isNotificationClosing, setIsNotificationClosing] = useState(false);

  useEffect(() => {
    if (notification === null) {
      return;
    }

    const timerId = window.setTimeout(
      () => setIsNotificationClosing(true),
      3_000,
    );

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNotificationClosing(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [notification]);

  useEffect(() => {
    if (!isNotificationClosing) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setNotification(null);
      setIsNotificationClosing(false);
    }, 180);

    return () => window.clearTimeout(timerId);
  }, [isNotificationClosing]);

  const selectedTemplate =
    photoTemplateOptions.find(
      (template) => template.id === selectedTemplateId,
    ) ?? photoTemplateOptions[0];

  async function handleSaveToGallery() {
    if (
      photoTemplateRef.current === null ||
      saveStatus === "saving" ||
      saveStatus === "saved"
    ) {
      return;
    }

    setSaveStatus("saving");

    try {
      await document.fonts.ready;

      const imageBlob = await toBlob(photoTemplateRef.current, {
        canvasWidth: 543,
        canvasHeight: 724,
        pixelRatio: 1,
      });

      if (imageBlob === null) {
        throw new Error("Unable to create the image.");
      }

      const timestamp = new Date().toISOString().replaceAll(":", "-");
      const fileName = `${selectedTemplate.id}-${timestamp}.png`;
      const imageFile = new File([imageBlob], fileName, { type: "image/png" });
      const formData = new FormData();

      formData.append("file", imageFile);

      const response = await fetch(`${API_URL}/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to upload the image.");
      }

      setSaveStatus("saved");
      showNotification({
        variant: "success",
        title: "Image Saved",
        message: "Your image was saved successfully to the gallery.",
      });
    } catch {
      setSaveStatus("error");
    }
  }

  function handlePrintPhoto() {
    showNotification({
      variant: "info",
      title: "Print Photo",
      message: "This feature will be implemented in a future update.",
    });
  }

  function showNotification(nextNotification: Notification) {
    setIsNotificationClosing(false);
    setNotification(nextNotification);
  }

  function closeNotification() {
    setIsNotificationClosing(true);
  }

  const saveMessage = {
    idle: "",
    saving: "Saving your photo...",
    saved: "Your photo was saved to the gallery.",
    error: "Unable to save your photo. Please try again.",
  }[saveStatus];

  return (
    <>
      <main className="final-preview-main">
        <div className="final-preview-layout">
          <section
            className="final-preview-workspace"
            aria-labelledby="final-preview-title"
          >
            <div className="final-preview-heading-row">
              <button
                className="final-preview-back-button"
                type="button"
                onClick={onBack}
              >
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
                elementRef={photoTemplateRef}
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
                className={`final-preview-button final-preview-save-button ${
                  saveStatus === "saved" ? "is-saved" : ""
                }`}
                type="button"
                onClick={
                  saveStatus === "saved" ? onOpenGallery : handleSaveToGallery
                }
                disabled={saveStatus === "saving"}
              >
                <GalleryIcon />
                {saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "saved"
                    ? "Go to Gallery"
                    : "Save to Gallery"}
              </button>
              <p
                className={`final-preview-save-status ${
                  saveStatus === "error" ? "is-error" : ""
                }`}
                aria-live="polite"
              >
                {saveMessage}
              </p>
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
                className="final-preview-button final-preview-print-button"
                type="button"
                onClick={handlePrintPhoto}
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

      {notification !== null && (
        <div
          className={`notification-modal-backdrop modal-animated-backdrop ${
            isNotificationClosing ? "is-closing" : ""
          }`}
          role="presentation"
          onMouseDown={closeNotification}
        >
          <section
            className={`notification-modal notification-modal-${notification.variant} modal-animated-content`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-modal-title"
            aria-describedby="notification-modal-message"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="notification-modal-close"
              type="button"
              onClick={closeNotification}
              aria-label="Close notification"
            >
              ×
            </button>

            <div className="notification-modal-icon" aria-hidden="true">
              {notification.variant === "success" ? (
                <GalleryIcon />
              ) : (
                <PrintIcon />
              )}
            </div>

            <h2 id="notification-modal-title">{notification.title}</h2>
            <p id="notification-modal-message">{notification.message}</p>

            <button
              className="notification-modal-button"
              type="button"
              onClick={closeNotification}
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

export default PreviewPage;
