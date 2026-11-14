import { SymbolView } from "expo-symbols";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { CapturedPhoto } from "@/BoothSessionContext";
import type { TemplateOption } from "@/data/templateOptions";
import { colors } from "@/theme";

import PhotoTemplateCanvas from "./PhotoTemplateCanvas";

interface TemplatePreviewModalProps {
  visible: boolean;
  template: TemplateOption;
  photos: CapturedPhoto[];
  onClose: () => void;
  onUseTemplate: () => void;
}

export default function TemplatePreviewModal({
  visible,
  template,
  photos,
  onClose,
  onUseTemplate,
}: TemplatePreviewModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.title}>Final Preview</Text>
              <Text style={styles.subtitle}>{template.name} template</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close template preview"
            >
              <SymbolView
                name={{ ios: "xmark", android: "close", web: "close" }}
                size={22}
                tintColor={colors.navy}
              />
            </Pressable>
          </View>

          <View style={styles.canvasWrapper}>
            <PhotoTemplateCanvas
              template={template}
              photos={photos}
              style={styles.canvas}
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>Keep Editing</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={onUseTemplate}
              accessibilityRole="button"
              accessibilityLabel={`Use ${template.name} template`}
            >
              <Text style={styles.primaryButtonText}>Use This Template</Text>
              <SymbolView
                name={{ ios: "chevron.right", android: "arrow_forward", web: "arrow_forward" }}
                size={20}
                tintColor={colors.white}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "rgba(6, 26, 71, 0.76)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "94%",
    borderRadius: 20,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  header: {
    minHeight: 68,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: colors.navy,
    fontSize: 19,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  canvasWrapper: {
    flexShrink: 1,
    padding: 14,
    alignItems: "center",
  },
  canvas: {
    maxWidth: 340,
    borderRadius: 13,
  },
  actions: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
  },
  primaryButton: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.74,
  },
});
