import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

interface BrandHeaderProps {
  showExit?: boolean;
}

export default function BrandHeader({ showExit = false }: BrandHeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <SymbolView
            name={{
              ios: "camera.fill",
              android: "photo_camera",
              web: "photo_camera",
            }}
            size={31}
            tintColor={colors.white}
          />
        </View>

        <View style={styles.brandCopy}>
          <Text style={styles.brandName} numberOfLines={1}>
            SCHOOL BOOTH
          </Text>
          <Text style={styles.brandTagline} numberOfLines={1}>
            SNAP • SMILE • CREATE MEMORIES
          </Text>
        </View>

        {showExit && (
          <Link href="/" replace asChild>
            <Pressable
              style={({ pressed }) => [
                styles.exitButton,
                pressed && styles.exitButtonPressed,
              ]}
              accessibilityLabel="Exit photo booth"
            >
              <SymbolView
                name={{
                  ios: "rectangle.portrait.and.arrow.right",
                  android: "logout",
                  web: "logout",
                }}
                size={20}
                tintColor={colors.navy}
              />
              <Text style={styles.exitText}>Exit</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  header: {
    minHeight: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCopy: {
    flex: 1,
    minWidth: 0,
  },
  brandName: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  brandTagline: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 2,
  },
  exitButton: {
    minHeight: 42,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exitButtonPressed: {
    opacity: 0.72,
  },
  exitText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
  },
});
