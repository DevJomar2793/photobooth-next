import { SymbolView } from "expo-symbols";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { TemplateOption } from "@/data/templateOptions";
import { colors } from "@/theme";

interface GalleryFilterModalProps {
  visible: boolean;
  selectedTemplateId: string | null;
  templates: TemplateOption[];
  onClose: () => void;
  onSelectTemplate: (templateId: string | null) => void;
}

export default function GalleryFilterModal({
  visible,
  selectedTemplateId,
  templates,
  onClose,
  onSelectTemplate,
}: GalleryFilterModalProps) {
  const renderOption = (id: string | null, label: string) => {
    const isSelected = selectedTemplateId === id;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.option,
          isSelected && styles.selectedOption,
          pressed && styles.pressed,
        ]}
        onPress={() => onSelectTemplate(id)}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        key={id ?? "all"}
      >
        <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
          {label}
        </Text>
        {isSelected ? (
          <SymbolView
            name={{ ios: "checkmark", android: "check", web: "check" }}
            size={21}
            tintColor={colors.blue}
          />
        ) : null}
      </Pressable>
    );
  };

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
            <View>
              <Text style={styles.title}>Filter Photos</Text>
              <Text style={styles.subtitle}>Choose a template</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close template filter"
            >
              <SymbolView
                name={{ ios: "xmark", android: "close", web: "close" }}
                size={21}
                tintColor={colors.navy}
              />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.options}
            showsVerticalScrollIndicator={false}
          >
            {renderOption(null, "All Photos")}
            {templates.map((template) => renderOption(template.id, template.name))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    backgroundColor: "rgba(6, 26, 71, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 480,
    maxHeight: "82%",
    borderRadius: 20,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  header: {
    minHeight: 70,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  options: {
    padding: 12,
    gap: 7,
  },
  option: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedOption: {
    borderColor: "#a9ceff",
    backgroundColor: colors.lightBlue,
  },
  optionText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "700",
  },
  selectedOptionText: {
    color: colors.blue,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.72,
  },
});
