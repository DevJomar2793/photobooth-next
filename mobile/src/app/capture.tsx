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
import { templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

const samplePhotos = templateOptions.slice(0, 4);

export default function CaptureScreen() {
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 360;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cameraPanel}>
        <View style={styles.cameraFrame}>
          <Image
            source={require("../../assets/images/school-booth-hero.png")}
            style={styles.cameraArtwork}
            resizeMode="contain"
            accessibilityLabel="School Booth camera preview illustration"
          />

          <View style={styles.cameraStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.cameraStatusText}>UI Preview</Text>
          </View>

          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
        </View>

        <View style={[styles.captureControls, isNarrowScreen && styles.captureControlsNarrow]}>
          <View style={styles.timerControl}>
            <View style={styles.controlHeading}>
              <SymbolView
                name={{ ios: "timer", android: "timer", web: "timer" }}
                size={20}
                tintColor={colors.navy}
              />
              <Text style={styles.controlHeadingText}>Timer</Text>
            </View>
            <View style={styles.timerOptions}>
              {["0s", "3s", "5s"].map((timer, index) => (
                <View
                  style={[styles.timerChip, index === 0 && styles.timerChipActive]}
                  key={timer}
                >
                  <Text
                    style={[styles.timerText, index === 0 && styles.timerTextActive]}
                  >
                    {timer}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            style={styles.shutterControl}
            disabled
            accessibilityLabel="Take photo"
            accessibilityState={{ disabled: true }}
          >
            <View style={styles.shutterButton}>
              <SymbolView
                name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
                size={31}
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.shutterText}>Take Photo</Text>
          </Pressable>

          <Pressable
            style={styles.previewButton}
            disabled
            accessibilityLabel="Preview sample photos"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{ ios: "eye", android: "visibility", web: "visibility" }}
              size={22}
              tintColor={colors.blue}
            />
            <Text style={styles.previewText}>Preview</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.capturedPanel}>
        <View style={styles.capturedHeader}>
          <View style={styles.capturedTitleRow}>
            <SymbolView
              name={{
                ios: "photo.on.rectangle",
                android: "photo_library",
                web: "photo_library",
              }}
              size={22}
              tintColor={colors.navy}
            />
            <Text style={styles.capturedTitle}>Captured Photos (4)</Text>
          </View>
          <Pressable
            style={styles.clearButton}
            disabled
            accessibilityLabel="Clear all sample photos"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{ ios: "trash", android: "delete", web: "delete" }}
              size={18}
              tintColor={colors.muted}
            />
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        </View>

        <View style={styles.photoGrid}>
          {samplePhotos.map((photo, index) => (
            <View style={styles.photoCard} key={photo.id}>
              <View style={styles.photoImageWrapper}>
                <Image
                  source={photo.image}
                  style={styles.photoImage}
                  resizeMode="cover"
                  accessibilityLabel={`Sample captured photo ${index + 1}`}
                />
                <View style={styles.photoNumber}>
                  <Text style={styles.photoNumberText}>{index + 1}</Text>
                </View>
              </View>
              <View style={styles.photoActions}>
                <View style={styles.photoActionButton}>
                  <SymbolView
                    name={{ ios: "eye", android: "visibility", web: "visibility" }}
                    size={16}
                    tintColor={colors.blue}
                  />
                  <Text style={styles.photoPreviewText}>Preview</Text>
                </View>
                <View style={[styles.photoActionButton, styles.deleteButton]}>
                  <SymbolView
                    name={{ ios: "trash", android: "delete", web: "delete" }}
                    size={16}
                    tintColor={colors.pink}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tip}>
        <SymbolView
          name={{ ios: "lightbulb", android: "lightbulb", web: "lightbulb" }}
          size={20}
          tintColor={colors.blue}
        />
        <Text style={styles.tipText}>This screen is a static preview of the booth layout.</Text>
      </View>

      <View style={styles.routeActions}>
        <Link href="/" asChild>
          <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <SymbolView
              name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
              size={20}
              tintColor={colors.navy}
            />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </Link>

        <Link href={"/templates" as Href} asChild>
          <Pressable style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}>
            <Text style={styles.nextText}>Next</Text>
            <SymbolView
              name={{ ios: "chevron.right", android: "arrow_forward", web: "arrow_forward" }}
              size={20}
              tintColor={colors.white}
            />
          </Pressable>
        </Link>
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
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  cameraPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
  },
  cameraFrame: {
    aspectRatio: 1.35,
    backgroundColor: "#e8eef6",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraArtwork: {
    width: "88%",
    height: "88%",
  },
  cameraStatus: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(6, 26, 71, 0.88)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#36d889",
  },
  cameraStatusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: colors.white,
  },
  cornerTopLeft: {
    top: 18,
    left: 18,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 4,
  },
  cornerTopRight: {
    top: 18,
    right: 18,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 4,
  },
  cornerBottomLeft: {
    bottom: 18,
    left: 18,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 4,
  },
  cornerBottomRight: {
    right: 18,
    bottom: 18,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 4,
  },
  captureControls: {
    minHeight: 118,
    paddingHorizontal: 4,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  captureControlsNarrow: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  timerControl: {
    flex: 1,
    minWidth: 120,
    gap: 9,
  },
  controlHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  controlHeadingText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
  },
  timerOptions: {
    flexDirection: "row",
    gap: 5,
  },
  timerChip: {
    flex: 1,
    minHeight: 34,
    borderRadius: 18,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  timerChipActive: {
    backgroundColor: colors.blue,
  },
  timerText: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
  },
  timerTextActive: {
    color: colors.white,
  },
  shutterControl: {
    alignItems: "center",
    gap: 5,
  },
  shutterButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.72,
  },
  shutterText: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: "800",
  },
  previewButton: {
    flex: 1,
    minWidth: 92,
    minHeight: 48,
    backgroundColor: colors.lightBlue,
    borderColor: "#b9d7ff",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    opacity: 0.72,
  },
  previewText: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "800",
  },
  capturedPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 14,
    padding: 12,
  },
  capturedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  capturedTitleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  capturedTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900",
  },
  clearButton: {
    minHeight: 38,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    opacity: 0.64,
  },
  clearText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  photoCard: {
    flexBasis: "47%",
    flexGrow: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 13,
    padding: 7,
  },
  photoImageWrapper: {
    aspectRatio: 0.9,
    borderRadius: 9,
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoNumber: {
    position: "absolute",
    left: 6,
    bottom: 6,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  photoNumberText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  photoActions: {
    flexDirection: "row",
    gap: 6,
    marginTop: 7,
  },
  photoActionButton: {
    flex: 1,
    minHeight: 35,
    borderColor: "#b9d7ff",
    borderWidth: 1,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    opacity: 0.72,
  },
  deleteButton: {
    flex: 0,
    width: 37,
    borderColor: "#ffc0d3",
  },
  photoPreviewText: {
    color: colors.blue,
    fontSize: 10,
    fontWeight: "700",
  },
  tip: {
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tipText: {
    flex: 1,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  routeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  backButton: {
    minHeight: 50,
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  backText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "800",
  },
  nextButton: {
    flex: 1,
    maxWidth: 180,
    minHeight: 50,
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  nextText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.76,
  },
});
