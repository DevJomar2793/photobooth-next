import { fetch } from "expo/fetch";
import { File } from "expo-file-system";

import { getApiBaseUrl } from "@/api/config";

export interface ImageUploadResponse {
  id: number;
  filename: string;
  content_type: string;
  template_id: string | null;
  created_at: string;
}

export interface ImageListItemResponse extends ImageUploadResponse {
  image_url: string;
}

interface ApiErrorResponse {
  detail?: string;
}

async function apiRequest(path: string, options: RequestInit = {}) {
  const apiUrl = getApiBaseUrl();
  const requestUrl = `${apiUrl}${path}`;
  const method = options.method ?? "GET";

  if (__DEV__) {
    console.info(`[API] ${method} ${requestUrl}`);
  }

  try {
    const response = await fetch(requestUrl, options);

    if (__DEV__) {
      console.info(`[API] ${method} ${requestUrl} -> ${response.status}`);
    }

    return response;
  } catch (error) {
    if (options.signal?.aborted) {
      throw error;
    }

    if (__DEV__) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown network error";
      console.error(`[API] ${method} ${requestUrl} failed: ${errorMessage}`);
    }

    throw new Error(
      __DEV__
        ? `Could not connect to the server at ${apiUrl}. Make sure FastAPI is running and your device is on the same Wi-Fi network.`
        : "Could not connect to the image service. Check your internet connection and try again.",
    );
  }
}

async function readJson<T>(response: Response, errorMessage: string) {
  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(errorMessage);
  }
}

async function getApiError(response: Response, fallbackMessage: string) {
  try {
    const errorResponse = (await response.json()) as ApiErrorResponse;
    return errorResponse.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

export async function uploadImage(imageUri: string, templateId: string) {
  const formData = new FormData();
  const imageFile = new File(imageUri);

  formData.append("file", imageFile, `school-booth-${Date.now()}.jpg`);
  formData.append("template_id", templateId);

  const response = await apiRequest("/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, "Unable to save your photo. Please try again."),
    );
  }

  return readJson<ImageUploadResponse>(
    response,
    "The server returned an invalid upload response.",
  );
}

export async function getImages(signal?: AbortSignal) {
  const response = await apiRequest("/list-of-image", { signal });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, "Unable to load your saved photos."),
    );
  }

  return readJson<ImageListItemResponse[]>(
    response,
    "The server returned an invalid image list response.",
  );
}

export async function deleteImage(imageId: number) {
  const response = await apiRequest(`/image/${imageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await getApiError(response, "Unable to delete the image. Please try again."),
    );
  }
}

export function getImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const normalizedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
