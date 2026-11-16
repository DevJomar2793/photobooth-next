import { fetch } from "expo/fetch";
import { File } from "expo-file-system";

import { getApiBaseUrl } from "@/api/config";

export interface ImageUploadResponse {
  id: number;
  filename: string;
  content_type: string;
  created_at: string;
}

export interface ImageListItemResponse extends ImageUploadResponse {
  image_url: string;
}

interface ApiErrorResponse {
  detail?: string;
}

async function getApiError(response: Response, fallbackMessage: string) {
  try {
    const errorResponse = (await response.json()) as ApiErrorResponse;
    return errorResponse.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function uploadImage(imageUri: string) {
  const formData = new FormData();
  const imageFile = new File(imageUri);

  formData.append("file", imageFile, `school-booth-${Date.now()}.jpg`);

  const response = await fetch(`${getApiBaseUrl()}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, "Unable to save your photo. Please try again."),
    );
  }

  return (await response.json()) as ImageUploadResponse;
}

export async function getImages(signal?: AbortSignal) {
  const response = await fetch(`${getApiBaseUrl()}/list-of-image`, { signal });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, "Unable to load your saved photos."),
    );
  }

  return (await response.json()) as ImageListItemResponse[];
}

export function getImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const normalizedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
