import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  MAX_SESSION_PHOTOS,
  useBoothSession,
} from "@/BoothSessionContext";
import BoothPageHeader from "@/components/BoothPageHeader";
import PageFooter from "@/components/PageFooter";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";
import { templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

export default function TemplatesScreen() {
  const router = useRouter();
  const {
    capturedPhotos,
    selectedTemplateId,
    selectTemplate,
  } = useBoothSession();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const selectedTemplate =
    templateOptions.find((template) => template.id === selectedTemplateId) ??
    templateOptions[0];
  const hasFourPhotos = capturedPhotos.length === MAX_SESSION_PHOTOS;

  if (!hasFourPhotos) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <BoothPageHeader
          backHref="/capture"
          title="Photos Needed"
          description="Capture all four photos before choosing a template."
        />

        <View style={styles.recoveryCard}>
          <View style={styles.recoveryIcon}>
            <SymbolView
              name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
              size={32}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.recoveryTitle}>
            {capturedPhotos.length} of {MAX_SESSION_PHOTOS} photos captured
          </Text>
          <Text style={styles.recoveryText}>
            Return to the camera and complete your photo set.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.cameraButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.replace("/capture")}
            accessibilityRole="button"
          >
            <Text style={styles.cameraButtonText}>Return to Camera</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  const handleUseTemplate = () => {
    setIsPreviewOpen(false);
    router.push("/preview");
  };

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <BoothPageHeader
          backHref="/capture"
          title="Select a Template"
          description="Choose a design, then preview it with your four photos."
        />

        <View style={styles.templateGrid}>
          {templateOptions.map((template) => {
            const isSelected = template.id === selectedTemplate.id;

            return (
              <Pressable
                style={({ pressed }) => [
                  styles.templateOption,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => selectTemplate(template.id)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${template.name} template`}
                accessibilityState={{ selected: isSelected }}
                key={template.id}
              >
                <View
                  style={[
                    styles.templateCard,
                    isSelected && styles.templateCardSelected,
                  ]}
                >
                  <Image
                    source={template.image}
                    style={styles.templateImage}
                    resizeMode="cover"
                    accessibilityLabel={`${template.name} template preview`}
                  />
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <SymbolView
                        name={{ ios: "checkmark", android: "check", web: "check" }}
                        size={19}
                        tintColor={colors.white}
                      />
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.templateName,
                    isSelected && styles.templateNameSelected,
                  ]}
                >
                  {template.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.previewPanel}>
          <View style={styles.previewCopy}>
            <Text style={styles.previewEyebrow}>SELECTED TEMPLATE</Text>
            <Text style={styles.previewTitle}>{selectedTemplate.name}</Text>
            <Text style={styles.previewDescription}>
              Preview this design with your four captured photos before continuing.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.previewButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setIsPreviewOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Preview ${selectedTemplate.name} with captured photos`}
          >
            <SymbolView
              name={{ ios: "eye.fill", android: "visibility", web: "visibility" }}
              size={22}
              tintColor={colors.white}
            />
            <Text style={styles.previewButtonText}>Preview with My Photos</Text>
          </Pressable>
        </View>

        <PageFooter />
      </ScrollView>

      <TemplatePreviewModal
        visible={isPreviewOpen}
        template={selectedTemplate}
        photos={capturedPhotos}
        onClose={() => setIsPreviewOpen(false)}
        onUseTemplate={handleUseTemplate}
      />
    </>
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
  templateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  templateOption: {
    flexBasis: "47%",
    flexGrow: 1,
    alignItems: "center",
  },
  templateCard: {
    width: "100%",
    aspectRatio: 0.75,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 6,
  },
  templateCardSelected: {
    borderColor: colors.blue,
    borderWidth: 3,
    padding: 4,
  },
  templateImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  selectedBadge: {
    position: "absolute",
    top: -10,
    right: -9,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blue,
    borderColor: colors.white,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  templateName: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 4,
  },
  templateNameSelected: {
    color: colors.blue,
    fontWeight: "900",
  },
  previewPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 20,
    padding: 14,
    gap: 14,
  },
  previewCopy: {
    gap: 3,
  },
  previewEyebrow: {
    color: colors.blue,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  previewTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "900",
  },
  previewDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  previewButton: {
    minHeight: 54,
    paddingHorizontal: 14,
    borderRadius: 13,
    backgroundColor: colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  previewButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
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
  cameraButton: {
    minHeight: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  buttonPressed: {
    opacity: 0.76,
  },
});
