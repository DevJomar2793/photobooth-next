import { type Href, Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useBoothSession } from "@/BoothSessionContext";
import { colors } from "@/theme";

interface BrandHeaderProps {
  showExit?: boolean;
  backHref?: "/capture" | "/templates";
}

export default function BrandHeader({
  showExit = false,
  backHref,
}: BrandHeaderProps) {
  const router = useRouter();
  const { resetSession } = useBoothSession();

  const handleExit = () => {
    resetSession();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={[styles.header, backHref && styles.headerWithBack]}>
        {backHref ? (
          <Link href={backHref as Href} asChild>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <SymbolView
                name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
                size={24}
                tintColor={colors.navy}
              />
            </Pressable>
          </Link>
        ) : null}

        <View style={[styles.brandMark, backHref && styles.brandMarkWithBack]}>
          <SymbolView
            name={{
              ios: "camera.fill",
              android: "photo_camera",
              web: "photo_camera",
            }}
            size={backHref ? 27 : 31}
            tintColor={colors.white}
          />
        </View>

        <View style={styles.brandCopy}>
          <Text
            style={[styles.brandName, backHref && styles.brandNameWithBack]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
          >
            SCHOOL BOOTH
          </Text>
          <Text
            style={[styles.brandTagline, backHref && styles.brandTaglineWithBack]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
          >
            SNAP • SMILE • CREATE MEMORIES
          </Text>
        </View>

        {showExit && (
          <Pressable
            style={({ pressed }) => [
              styles.exitButton,
              backHref && styles.exitButtonWithBack,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleExit}
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
  headerWithBack: {
    minHeight: 72,
    paddingHorizontal: 12,
    gap: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 13,
    borderColor: colors.border,
    borderWidth: 1,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  brandMark: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkWithBack: {
    width: 44,
    height: 44,
    borderRadius: 13,
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
  brandNameWithBack: {
    fontSize: 17,
    letterSpacing: -0.6,
  },
  brandTagline: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 2,
  },
  brandTaglineWithBack: {
    fontSize: 7,
    letterSpacing: 0.65,
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
  exitButtonWithBack: {
    minHeight: 44,
    borderRadius: 13,
    paddingHorizontal: 8,
    gap: 4,
  },
  buttonPressed: {
    opacity: 0.72,
  },
  exitText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
  },
});
