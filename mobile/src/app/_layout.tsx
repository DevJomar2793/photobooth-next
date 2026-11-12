import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import BrandHeader from "@/components/BrandHeader";

export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
