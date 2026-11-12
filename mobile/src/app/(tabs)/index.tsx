import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme";

const features = [
  {
    title: "Take Photos",
    icon: { ios: "camera", android: "photo_camera", web: "photo_camera" },
  },
  {
    title: "Make It Unique",
    icon: {
      ios: "wand.and.stars",
      android: "auto_fix_high",
      web: "auto_fix_high",
    },
  },
  {
    title: "Get Your Photos",
    icon: {
      ios: "square.and.arrow.down",
      android: "download",
      web: "download",
    },
  },
] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.page}>
        <Text style={styles.tagline}>SNAP • SMILE • CREATE MEMORIES</Text>

        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={3}>
          Capture{"\n"}
          <Text style={styles.titleAccent}>Good Vibes</Text>{"\n"}
          Together!
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          Take photos, create memories, and make every moment special with your friends.
        </Text>

        <View style={styles.illustrationContainer}>
          <Image
            source={require("../../../assets/images/school-booth-hero.png")}
            style={styles.illustration}
            resizeMode="contain"
            accessibilityLabel="A blue camera surrounded by photos, stars, hearts, and colorful doodles"
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => router.push("/capture")}
          accessibilityRole="button"
          accessibilityLabel="Start Photo Booth"
        >
          <SymbolView
            name={{
              ios: "camera.fill",
              android: "photo_camera",
              web: "photo_camera",
            }}
            size={24}
            tintColor={colors.white}
          />
          <Text style={styles.ctaText}>Start Photo Booth</Text>
          <SymbolView
            name={{
              ios: "chevron.right",
              android: "chevron_right",
              web: "chevron_right",
            }}
            size={20}
            tintColor={colors.white}
          />
        </Pressable>

        <View style={styles.featureStrip}>
          {features.map((feature, index) => (
            <View
              style={[styles.feature, index > 0 && styles.featureDivider]}
              key={feature.title}
            >
              <View style={styles.featureIcon}>
                <SymbolView name={feature.icon} size={20} tintColor={colors.navy} />
              </View>
              <Text style={styles.featureTitle} numberOfLines={2}>
                {feature.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 146,
  },
  tagline: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.7,
  },
  title: {
    color: colors.navy,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: -1.8,
    lineHeight: 39,
    marginTop: 7,
  },
  titleAccent: {
    color: colors.blue,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 6,
  },
  illustrationContainer: {
    flex: 1,
    minHeight: 0,
    maxHeight: 230,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  cta: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 84,
    zIndex: 20,
    elevation: 8,
    height: 50,
    backgroundColor: colors.blue,
    borderRadius: 13,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
  ctaPressed: {
    opacity: 0.8,
  },
  ctaText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  featureStrip: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 8,
    zIndex: 10,
    elevation: 4,
    height: 68,
    backgroundColor: colors.lightBlue,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  feature: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  featureDivider: {
    borderLeftColor: "#c7def8",
    borderLeftWidth: 1,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d2e7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    color: colors.navy,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 3,
  },
});
