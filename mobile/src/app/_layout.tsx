import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { BoothSessionProvider } from "@/BoothSessionContext";
import BrandHeader from "@/components/BrandHeader";

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <BoothSessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="capture"
          options={{ headerShown: true, header: () => <BrandHeader showExit /> }}
        />
        <Stack.Screen
          name="templates"
          options={{ headerShown: true, header: () => <BrandHeader showExit /> }}
        />
        <Stack.Screen
          name="preview"
          options={{ headerShown: true, header: () => <BrandHeader showExit /> }}
        />
      </Stack>
      <StatusBar style="dark" />
    </BoothSessionProvider>
  );
}
