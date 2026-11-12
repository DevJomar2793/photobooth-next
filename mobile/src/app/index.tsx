import { type Href, Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import PageFooter from "@/components/PageFooter";
import { colors } from "@/theme";

const features = [
  {
    title: "Take Photos",
    description: "Choose your favorite layout and strike a pose!",
    icon: { ios: "camera", android: "photo_camera", web: "photo_camera" },
  },
  {
    title: "Make It Unique",
    description: "Add fun frames and filters to your photos.",
    icon: {
      ios: "wand.and.stars",
      android: "auto_fix_high",
      web: "auto_fix_high",
    },
  },
  {
    title: "Get Your Photos",
    description: "Download your favorites and keep the memories.",
    icon: {
      ios: "square.and.arrow.down",
      android: "download",
      web: "download",
    },
  },
] as const;

export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const isNarrowScreen = width < 360;
  const isShortScreen = height < 760;
  const illustrationHeight = Math.min(isShortScreen ? 190 : 235, width * 0.62);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>WELCOME TO SCHOOL BOOTH</Text>
        <Text style={[styles.title, isNarrowScreen && styles.titleNarrow]}>
          Capture{"\n"}
          <Text style={styles.titleAccent}>Good Vibes</Text>{"\n"}
          Together!
        </Text>
        <Text style={styles.description}>
          Take photos, create memories, and make every moment special with your friends.
        </Text>

        <Image
          source={require("../../assets/images/school-booth-hero.png")}
          style={[styles.illustration, { height: illustrationHeight }]}
          resizeMode="contain"
          accessibilityLabel="A blue camera surrounded by photos, stars, hearts, and colorful doodles"
        />

        <Link href={"/capture" as Href} asChild>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            accessibilityLabel="Start Photo Booth"
          >
            <SymbolView
              name={{
                ios: "camera.fill",
                android: "photo_camera",
                web: "photo_camera",
              }}
              size={26}
              tintColor={colors.white}
            />
            <Text style={styles.ctaText}>Start Photo Booth</Text>
            <SymbolView
              name={{
                ios: "chevron.right",
                android: "chevron_right",
                web: "chevron_right",
              }}
              size={22}
              tintColor={colors.white}
            />
          </Pressable>
        </Link>
      </View>

      <View style={[styles.featureGrid, isNarrowScreen && styles.featureGridNarrow]}>
        {features.map((feature) => (
          <View
            style={[styles.featureCard, isNarrowScreen && styles.featureCardNarrow]}
            key={feature.title}
          >
            <View style={styles.featureIcon}>
              <SymbolView name={feature.icon} size={26} tintColor={colors.navy} />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>

      <PageFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  hero: {
    alignItems: "stretch",
  },
  eyebrow: {
    alignSelf: "flex-start",
    color: colors.blue,
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    overflow: "hidden",
  },
  title: {
    color: colors.navy,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -2,
    lineHeight: 45,
    marginTop: 14,
  },
  titleNarrow: {
    fontSize: 38,
    lineHeight: 40,
  },
  titleAccent: {
    color: colors.blue,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 420,
  },
  illustration: {
    width: "100%",
    alignSelf: "center",
    marginTop: 8,
  },
  cta: {
    minHeight: 54,
    backgroundColor: colors.blue,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    paddingHorizontal: 18,
  },
  ctaText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
  },
  ctaPressed: {
    opacity: 0.82,
  },
  featureGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  featureGridNarrow: {
    flexDirection: "column",
  },
  featureCard: {
    flex: 1,
    minHeight: 170,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 9,
    paddingVertical: 16,
    alignItems: "center",
  },
  featureCardNarrow: {
    minHeight: 0,
    paddingHorizontal: 18,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureTitle: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 6,
  },
});
