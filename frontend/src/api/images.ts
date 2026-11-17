import { API_URL } from "./config";

export interface ImageListItemResponse {
  id: number;
  filename: string;
  content_type: string;
  template_id: string | null;
  created_at: string;
  image_url: string;
}

export async function getImages(
  signal?: AbortSignal,
): Promise<ImageListItemResponse[]> {
  const response = await fetch(`${API_URL}/list-of-image`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load images.");
  }

  return (await response.json()) as ImageListItemResponse[];
}

export async function uploadImage(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Unable to upload the image.");
  }
}

export async function downloadImage(imageId: number): Promise<Blob> {
  const response = await fetch(`${API_URL}/image/${imageId}`);

  if (!response.ok) {
    throw new Error("Unable to download the image.");
  }

  return response.blob();
}

export async function deleteImage(imageId: number): Promise<void> {
  const response = await fetch(`${API_URL}/image/${imageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete the image.");
  }
}

export function getImageUrl(imagePath: string): string {
  return `${API_URL}${imagePath}`;
}
