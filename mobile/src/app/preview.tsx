import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { SymbolView } from "expo-symbols";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ViewShot, { releaseCapture, type ViewShotRef } from "react-native-view-shot";

import {
  MAX_SESSION_PHOTOS,
  useBoothSession,
} from "@/BoothSessionContext";
import BoothPageHeader from "@/components/BoothPageHeader";
import PageFooter from "@/components/PageFooter";
import PhotoTemplateCanvas from "@/components/PhotoTemplateCanvas";
import { uploadImage } from "@/api/images";
import { templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

type PreviewAction = "download" | "upload" | null;

const OUTPUT_WIDTH = 1080;
const OUTPUT_HEIGHT = 1440;

interface ActionSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

function ActionSection({ title, description, icon, children }: ActionSectionProps) {
  return (
    <View style={styles.actionSection}>
      <View style={styles.actionHeading}>
        <View style={styles.actionIcon}>
          {icon}
        </View>
        <View style={styles.actionHeadingCopy}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDescription}>{description}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

export default function PreviewScreen() {
  const router = useRouter();
  const previewRef = useRef<ViewShotRef>(null);
  const generatedImageUriRef = useRef<string | null>(null);
  const [activeAction, setActiveAction] = useState<PreviewAction>(null);
  const [isSaved, setIsSaved] = useState(false);
  const {
    capturedPhotos,
    selectedTemplateId,
    resetSession,
  } = useBoothSession();
  const selectedTemplate =
    templateOptions.find((template) => template.id === selectedTemplateId) ??
    templateOptions[0];

  useEffect(() => {
    return () => {
      if (generatedImageUriRef.current) {
        releaseCapture(generatedImageUriRef.current);
      }
    };
  }, []);

  if (capturedPhotos.length !== MAX_SESSION_PHOTOS) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <BoothPageHeader
          title="Preview Unavailable"
          description="Four captured photos are required to generate your template."
        />

        <View style={styles.recoveryCard}>
          <View style={styles.recoveryIcon}>
            <SymbolView
              name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
              size={32}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.recoveryTitle}>Complete your four-photo set</Text>
          <Text style={styles.recoveryText}>
            Return to the camera before generating a final preview.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.returnButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.replace("/capture")}
            accessibilityRole="button"
          >
            <Text style={styles.returnButtonText}>Return to Camera</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  const handleRetake = () => {
    resetSession();
    router.replace("/capture");
  };

  const getGeneratedImageUri = async () => {
    if (generatedImageUriRef.current) {
      return generatedImageUriRef.current;
    }

    if (!previewRef.current) {
      throw new Error("The photo preview is not ready yet.");
    }

    const imageUri = await previewRef.current.capture();

    generatedImageUriRef.current = imageUri;
    return imageUri;
  };

  const handleDownload = async () => {
    if (activeAction) {
      return;
    }

    setActiveAction("download");

    try {
      const currentPermission = await MediaLibrary.getPermissionsAsync(true, []);
      const permission = currentPermission.granted
        ? currentPermission
        : await MediaLibrary.requestPermissionsAsync(true, []);

      if (!permission.granted) {
        if (!permission.canAskAgain) {
          Alert.alert(
            "Photo Access Required",
            "Enable photo access in your device settings to download this image.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => void Linking.openSettings() },
            ],
          );
        } else {
          Alert.alert(
            "Permission Not Granted",
            "Photo access is required to download the image to your phone.",
          );
        }
        return;
      }

      const imageUri = await getGeneratedImageUri();
      await MediaLibrary.Asset.create(imageUri);

      Alert.alert("Download Complete", "Your photo was saved to your device gallery.");
    } catch {
      Alert.alert(
        "Download Failed",
        "Unable to download your photo. Please try again.",
      );
    } finally {
      setActiveAction(null);
    }
  };

  const handleSave = async () => {
    if (isSaved) {
      router.replace("/gallery");
      return;
    }

    if (activeAction) {
      return;
    }

    setActiveAction("upload");

    try {
      const imageUri = await getGeneratedImageUri();
      await uploadImage(imageUri, selectedTemplate.id);
      setIsSaved(true);
      Alert.alert("Photo Saved", "Your photo was saved to the School Booth gallery.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save your photo. Please try again.";
      Alert.alert("Save Failed", message);
    } finally {
      setActiveAction(null);
    }
  };

  const isBusy = activeAction !== null;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <BoothPageHeader
        title="Preview Your Photo"
        description="Here’s your finished photo and the available save options."
      />

      <View style={styles.photoPanel}>
        <ViewShot
          ref={previewRef}
          style={styles.previewCapture}
          options={{
            format: "jpg",
            quality: 0.92,
            result: "tmpfile",
            width: OUTPUT_WIDTH / PixelRatio.get(),
            height: OUTPUT_HEIGHT / PixelRatio.get(),
          }}
        >
          <PhotoTemplateCanvas
            template={selectedTemplate}
            photos={capturedPhotos}
            style={styles.previewCanvas}
            accessibilityLabel={`Finished ${selectedTemplate.name} School Booth photo`}
          />
        </ViewShot>
      </View>

      <View style={styles.actionsPanel}>
        <ActionSection
          title="Save Your Photo"
          description="Download a copy to your phone or save it to your School Booth gallery."
          icon={
            <SymbolView
              name={{ ios: "square.and.arrow.down", android: "download", web: "download" }}
              size={23}
              tintColor={colors.navy}
            />
          }
        >
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.primaryButton,
              isBusy && styles.disabledButton,
              pressed && !isBusy && styles.pressed,
            ]}
            disabled={isBusy}
            onPress={handleDownload}
            accessibilityLabel="Download image"
            accessibilityState={{ disabled: isBusy, busy: activeAction === "download" }}
          >
            {activeAction === "download" ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <SymbolView
                name={{ ios: "arrow.down.to.line", android: "download", web: "download" }}
                size={21}
                tintColor={colors.white}
              />
            )}
            <Text style={styles.primaryButtonText}>
              {activeAction === "download" ? "Downloading..." : "Download Image"}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.secondaryButton,
              isBusy && styles.disabledButton,
              pressed && !isBusy && styles.pressed,
            ]}
            disabled={isBusy}
            onPress={handleSave}
            accessibilityLabel={isSaved ? "View gallery" : "Save to gallery"}
            accessibilityState={{ disabled: isBusy, busy: activeAction === "upload" }}
          >
            {activeAction === "upload" ? (
              <ActivityIndicator color={colors.navy} />
            ) : (
              <SymbolView
                name={{
                  ios: isSaved ? "arrow.right" : "photo.on.rectangle",
                  android: isSaved ? "arrow_forward" : "photo_library",
                  web: isSaved ? "arrow_forward" : "photo_library",
                }}
                size={21}
                tintColor={colors.navy}
              />
            )}
            <Text style={styles.secondaryButtonText}>
              {activeAction === "upload"
                ? "Saving..."
                : isSaved
                  ? "View Gallery"
                  : "Save to Gallery"}
            </Text>
          </Pressable>
        </ActionSection>

        <ActionSection
          title="Print (Optional)"
          description="Printing is shown for layout preview only."
          icon={
            <SymbolView
              name={{ ios: "printer.fill", android: "print", web: "print" }}
              size={23}
              tintColor={colors.navy}
            />
          }
        >
          <Pressable
            style={[styles.actionButton, styles.secondaryDisabledButton]}
            disabled
            accessibilityLabel="Print photo"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{ ios: "printer.fill", android: "print", web: "print" }}
              size={21}
              tintColor={colors.navy}
            />
            <Text style={styles.secondaryButtonText}>Print Photo</Text>
          </Pressable>
        </ActionSection>

        <ActionSection
          title="Take Another Photo"
          description="Start a new four-photo School Booth session."
          icon={
            <SymbolView
              name={{ ios: "arrow.clockwise", android: "refresh", web: "refresh" }}
              size={23}
              tintColor={colors.navy}
            />
          }
        >
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.retakeButton,
              pressed && styles.pressed,
            ]}
            onPress={handleRetake}
            accessibilityLabel="Start a new photo session"
          >
            <SymbolView
              name={{ ios: "camera", android: "photo_camera", web: "photo_camera" }}
              size={21}
              tintColor={colors.blue}
            />
            <Text style={styles.retakeButtonText}>Retake Photos</Text>
          </Pressable>
        </ActionSection>
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
  photoPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },
  previewCapture: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 13,
    overflow: "hidden",
  },
  previewCanvas: {
    width: "100%",
  },
  actionsPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 16,
    paddingHorizontal: 14,
  },
  actionSection: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 18,
    gap: 11,
  },
  actionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  actionHeadingCopy: {
    flex: 1,
  },
  actionTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
  },
  actionDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  actionButton: {
    minHeight: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.blue,
  },
  secondaryButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.border,
    borderWidth: 1,
  },
  secondaryDisabledButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.border,
    borderWidth: 1,
    opacity: 0.65,
  },
  disabledButton: {
    opacity: 0.58,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "800",
  },
  retakeButton: {
    backgroundColor: colors.white,
    borderColor: "#a9ceff",
    borderWidth: 1,
  },
  retakeButtonText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "800",
  },
  recoveryCard: {
    minHeight: 320,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  recoveryIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  recoveryTitle: {
    color: colors.navy,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },
  recoveryText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  returnButton: {
    minHeight: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  returnButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.74,
  },
});
