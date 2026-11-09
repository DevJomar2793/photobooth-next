import { StatusBar } from "expo-status-bar";

import Navigation from "@/components/Navigation";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <StatusBar style="dark" />
    </>
  );
}
