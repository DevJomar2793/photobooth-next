import { SymbolView } from "expo-symbols";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const navy = "#061a47";
const muted = "#5f739f";
const blue = "#0758f5";

export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const isShortScreen = height < 830;
  const illustrationHeight = Math.min(isShortScreen ? 150 : 185, width * 0.5);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.main, isShortScreen && styles.mainShort]}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <SymbolView
                name={{
                  ios: "camera.fill",
                  android: "photo_camera",
                  web: "photo_camera",
                }}
                size={35}
                tintColor={navy}
              />
              <Text style={styles.brandName}>SCHOOL BOOTH</Text>
            </View>
            <SymbolView
              name={{ ios: "line.3.horizontal", android: "menu", web: "menu" }}
              size={29}
              tintColor={navy}
            />
          </View>

          <View
            style={[styles.navigation, isShortScreen && styles.navigationShort]}
          >
            <View style={styles.activeTab}>
              <Text style={styles.activeTabText}>Home</Text>
            </View>
            <Text style={styles.navText}>Gallery</Text>
            <Text style={styles.navText}>About</Text>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>SNAP • SMILE • CREATE MEMORIES</Text>
            <Text style={[styles.title, isShortScreen && styles.titleShort]}>
              Capture{"\n"}Good Vibes{"\n"}Together!
            </Text>
            <Text style={styles.description}>
              Take photos, create memories,{"\n"}and make every moment special!
            </Text>
            <Image
              source={require("../../assets/images/school-booth-hero.png")}
              style={[styles.illustration, { height: illustrationHeight }]}
              resizeMode="contain"
              accessibilityLabel="Blue camera surrounded by photos, stars, hearts, and colorful doodles"
            />
            <View style={[styles.cta, isShortScreen && styles.ctaShort]}>
              <SymbolView
                name={{
                  ios: "camera.fill",
                  android: "photo_camera",
                  web: "photo_camera",
                }}
                size={27}
                tintColor="#fff"
              />
              <Text style={styles.ctaText}>Start Photo Booth</Text>
              <SymbolView
                name={{
                  ios: "chevron.right",
                  android: "chevron_right",
                  web: "chevron_right",
                }}
                size={24}
                tintColor="#fff"
              />
            </View>
          </View>
        </View>

        <View style={[styles.features, isShortScreen && styles.featuresShort]}>
          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <SymbolView
                  name={{
                    ios: "camera",
                    android: "photo_camera",
                    web: "photo_camera",
                  }}
                  size={27}
                  tintColor={navy}
                />
              </View>
              <Text style={styles.featureTitle}>Take Photos</Text>
              <Text style={styles.featureDescription}>
                Choose your favorite layout and strike a pose!
              </Text>
            </View>
            <View style={[styles.feature, styles.featureDivider]}>
              <View style={styles.featureIcon}>
                <SymbolView
                  name={{
                    ios: "wand.and.stars",
                    android: "auto_fix_high",
                    web: "auto_fix_high",
                  }}
                  size={27}
                  tintColor={navy}
                />
              </View>
              <Text style={styles.featureTitle}>Make It Unique</Text>
              <Text style={styles.featureDescription}>
                Add fun frames and filters.
              </Text>
            </View>
            <View style={[styles.feature, styles.featureDivider]}>
              <View style={styles.featureIcon}>
                <SymbolView
                  name={{
                    ios: "square.and.arrow.down",
                    android: "download",
                    web: "download",
                  }}
                  size={27}
                  tintColor={navy}
                />
              </View>
              <Text style={styles.featureTitle}>Get Your Photos</Text>
              <Text style={styles.featureDescription}>
                Download instantly and keep your memories!
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.credit}>
              Developed by <Text style={styles.creditName}>DevJomar</Text> ©
              2026
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  page: { flexGrow: 1, backgroundColor: "#fff" },
  main: { paddingHorizontal: 20, paddingTop: 12 },
  mainShort: { paddingTop: 8 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandName: {
    color: navy,
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 16,
  },
  navigationShort: { marginTop: 8, marginBottom: 12 },
  activeTab: {
    backgroundColor: "#d8eaff",
    borderRadius: 30,
    minWidth: 80,
    paddingVertical: 6,
    alignItems: "center",
  },
  activeTabText: { color: "#0750bf", fontSize: 15, fontWeight: "700" },
  navText: { color: muted, fontSize: 15, fontWeight: "600" },
  hero: { alignItems: "stretch" },
  eyebrow: {
    color: muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 6,
  },
  title: {
    color: navy,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: -2.3,
    lineHeight: 43,
  },
  titleShort: { fontSize: 38, lineHeight: 39 },
  description: {
    color: muted,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
    marginTop: 9,
  },
  illustration: { width: "100%", alignSelf: "center", marginTop: 4 },
  cta: {
    minHeight: 54,
    backgroundColor: blue,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 4,
    marginBottom: 14,
  },
  ctaShort: { minHeight: 50, marginBottom: 10 },
  ctaText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  features: {
    flexGrow: 1,
    backgroundColor: "#e8f3ff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  featuresShort: { paddingTop: 12, paddingBottom: 8 },
  featureRow: { flexDirection: "row", justifyContent: "space-between" },
  feature: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
  featureDivider: { borderLeftWidth: 1, borderLeftColor: "#c7def8" },
  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#d2e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  featureTitle: {
    color: navy,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 5,
  },
  featureDescription: {
    color: muted,
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#c7def8",
    marginTop: 10,
    paddingTop: 8,
    alignItems: "center",
  },
  credit: { color: muted, fontSize: 11 },
  creditName: { color: navy, fontWeight: "800" },
});
