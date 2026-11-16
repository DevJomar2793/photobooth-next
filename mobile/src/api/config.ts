export function getApiBaseUrl() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, "");

  if (!apiUrl) {
    throw new Error(
      "The image service is not configured. Set EXPO_PUBLIC_API_URL and restart the app.",
    );
  }

  return apiUrl;
}
