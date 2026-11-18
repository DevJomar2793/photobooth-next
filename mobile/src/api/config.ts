export function getApiBaseUrl() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, "");

  if (!apiUrl) {
    throw new Error(
      "The image service is not configured. Set EXPO_PUBLIC_API_URL and restart the app.",
    );
  }

  if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
    throw new Error(
      "EXPO_PUBLIC_API_URL must start with http:// or https://.",
    );
  }

  if (!__DEV__ && !apiUrl.startsWith("https://")) {
    throw new Error(
      "Production builds require an HTTPS API address.",
    );
  }

  return apiUrl;
}
