import { createContext, type ReactNode, useContext, useState } from "react";

export const MAX_SESSION_PHOTOS = 4;

export interface CapturedPhoto {
  id: string;
  uri: string;
}

interface BoothSessionContextValue {
  capturedPhotos: CapturedPhoto[];
  selectedTemplateId: string;
  addCapturedPhoto: (uri: string) => void;
  removeCapturedPhoto: (photoId: string) => void;
  selectTemplate: (templateId: string) => void;
  resetSession: () => void;
}

const BoothSessionContext = createContext<BoothSessionContextValue | null>(null);

interface BoothSessionProviderProps {
  children: ReactNode;
}

export function BoothSessionProvider({ children }: BoothSessionProviderProps) {
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic");

  const addCapturedPhoto = (uri: string) => {
    setCapturedPhotos((currentPhotos) => {
      if (currentPhotos.length >= MAX_SESSION_PHOTOS) {
        return currentPhotos;
      }

      return [...currentPhotos, { id: uri, uri }];
    });
  };

  const removeCapturedPhoto = (photoId: string) => {
    setCapturedPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo.id !== photoId),
    );
  };

  const selectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const resetSession = () => {
    setCapturedPhotos([]);
    setSelectedTemplateId("classic");
  };

  return (
    <BoothSessionContext.Provider
      value={{
        capturedPhotos,
        selectedTemplateId,
        addCapturedPhoto,
        removeCapturedPhoto,
        selectTemplate,
        resetSession,
      }}
    >
      {children}
    </BoothSessionContext.Provider>
  );
}

export function useBoothSession() {
  const context = useContext(BoothSessionContext);

  if (!context) {
    throw new Error("useBoothSession must be used inside BoothSessionProvider.");
  }

  return context;
}
