import { Tabs } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { type ColorValue, StyleSheet } from "react-native";

import BrandHeader from "@/components/BrandHeader";
import { colors } from "@/theme";

interface NavigationIconProps {
  color: ColorValue;
  name: SymbolViewProps["name"];
}

function NavigationIcon({ color, name }: NavigationIconProps) {
  return <SymbolView name={name} size={23} tintColor={color} />;
}

export default function Navigation() {
  return (
    <Tabs
      screenOptions={{
        header: () => <BrandHeader />,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.muted,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home",
          tabBarIcon: ({ color }) => (
            <NavigationIcon
              color={color}
              name={{ ios: "house.fill", android: "home", web: "home" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          tabBarAccessibilityLabel: "Gallery",
          tabBarIcon: ({ color }) => (
            <NavigationIcon
              color={color}
              name={{
                ios: "photo.on.rectangle",
                android: "photo_library",
                web: "photo_library",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarAccessibilityLabel: "About School Booth",
          tabBarIcon: ({ color }) => (
            <NavigationIcon
              color={color}
              name={{ ios: "info.circle.fill", android: "info", web: "info" }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    minHeight: 64,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
});
