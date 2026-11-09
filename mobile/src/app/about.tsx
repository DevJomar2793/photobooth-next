import { SymbolView } from "expo-symbols";
import {
  Image,
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
    description: "Snap with simple timer options.",
    backgroundColor: "#e8f3ff",
    iconColor: "#0758f5",
    icon: { ios: "camera", android: "photo_camera", web: "photo_camera" },
  },
  {
    title: "Fun Templates",
    description: "Choose from colorful designs.",
    backgroundColor: "#ffe8f0",
    iconColor: "#ff4f87",
    icon: { ios: "square.grid.2x2", android: "grid_view", web: "grid_view" },
  },
  {
    title: "Preview & Edit",
    description: "Review your photos before saving.",
    backgroundColor: "#fff4d9",
    iconColor: "#e5a400",
    icon: { ios: "photo", android: "image", web: "image" },
  },
  {
    title: "Download",
    description: "Save your photos to your device.",
    backgroundColor: "#ddf9ed",
    iconColor: "#0f9d6d",
    icon: {
      ios: "square.and.arrow.down",
      android: "download",
      web: "download",
    },
  },
] as const;

const values = [
  {
    title: "Made for Students",
    description: "Create fun memories with classmates and friends.",
    icon: { ios: "person.3.fill", android: "groups", web: "groups" },
  },
  {
    title: "Simple & Easy",
    description: "A friendly experience designed for everyone.",
    icon: {
      ios: "checkmark.shield.fill",
      android: "verified_user",
      web: "verified_user",
    },
  },
  {
    title: "Spread Good Vibes",
    description: "Keep every photo as a memory to cherish.",
    icon: { ios: "heart.fill", android: "favorite", web: "favorite" },
  },
] as const;

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 360;
  const stackValueCards = width < 390;
  const artworkHeight = Math.min(390, width * 0.92);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>ABOUT SCHOOL BOOTH</Text>
      <Text style={[styles.title, isNarrowScreen && styles.titleNarrow]}>
        Capture Good Vibes,{"\n"}
        <Text style={styles.titleAccent}>One Photo at a Time</Text>
        <Text style={styles.heart}> ♥</Text>
      </Text>
      <Text style={styles.description}>
        School Booth is a fun and easy-to-use photo booth designed for students. Take
        photos, choose your favorite template, and create memorable moments with your
        friends!
      </Text>

      <Image
        source={require("../../assets/images/about-hero.png")}
        style={[styles.artwork, { height: artworkHeight }]}
        resizeMode="contain"
        accessibilityLabel="A Good Vibes photo strip with students, playful doodles, and a blue camera"
      />

      <View style={[styles.featureGrid, isNarrowScreen && styles.featureGridNarrow]}>
        {features.map((feature) => (
          <View
            style={[
              styles.featureCard,
              { backgroundColor: feature.backgroundColor },
              isNarrowScreen && styles.featureCardNarrow,
            ]}
            key={feature.title}
          >
            <View style={styles.featureIcon}>
              <SymbolView name={feature.icon} size={27} tintColor={feature.iconColor} />
            </View>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.values, stackValueCards && styles.valuesStacked]}>
        {values.map((value, index) => (
          <View
            style={[
              styles.valueCard,
              stackValueCards && styles.valueCardStacked,
              !stackValueCards && index > 0 && styles.valueDivider,
            ]}
            key={value.title}
          >
            <View style={styles.valueIcon}>
              <SymbolView name={value.icon} size={25} tintColor={colors.blue} />
            </View>
            <Text style={styles.valueTitle}>{value.title}</Text>
            <Text style={styles.valueDescription}>{value.description}</Text>
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
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.7,
    lineHeight: 40,
    marginTop: 14,
  },
  titleNarrow: {
    fontSize: 31,
    lineHeight: 35,
  },
  titleAccent: {
    color: colors.blue,
  },
  heart: {
    color: colors.pink,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 14,
  },
  artwork: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 8,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureGridNarrow: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  featureCard: {
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 112,
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureCardNarrow: {
    flexBasis: "auto",
    minHeight: 96,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureCopy: {
    flex: 1,
  },
  featureTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  featureDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  values: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 18,
  },
  valuesStacked: {
    flexDirection: "column",
    paddingHorizontal: 16,
    gap: 16,
  },
  valueCard: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 9,
  },
  valueCardStacked: {
    flex: 0,
    paddingHorizontal: 4,
  },
  valueDivider: {
    borderLeftColor: colors.border,
    borderLeftWidth: 1,
  },
  valueIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  valueTitle: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 9,
  },
  valueDescription: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
