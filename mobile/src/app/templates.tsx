import { type Href, Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import BoothPageHeader from "@/components/BoothPageHeader";
import PageFooter from "@/components/PageFooter";
import { templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

const selectedTemplate = templateOptions[0];

export default function TemplatesScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <BoothPageHeader
        backHref="/capture"
        title="Select a Template"
        description="Choose your favorite design to make your photos more fun!"
      />

      <View style={styles.templateGrid}>
        {templateOptions.map((template, index) => {
          const isSelected = index === 0;

          return (
            <View style={styles.templateOption} key={template.id}>
              <View style={[styles.templateCard, isSelected && styles.templateCardSelected]}>
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
              <Text style={[styles.templateName, isSelected && styles.templateNameSelected]}>
                {template.name}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.previewPanel}>
        <View style={styles.previewHeading}>
          <SymbolView
            name={{ ios: "eye.fill", android: "visibility", web: "visibility" }}
            size={25}
            tintColor={colors.navy}
          />
          <View style={styles.previewHeadingCopy}>
            <Text style={styles.previewTitle}>Template Preview</Text>
            <Text style={styles.previewDescription}>
              Classic is selected for this static mobile walkthrough.
            </Text>
          </View>
        </View>

        <Image
          source={selectedTemplate.image}
          style={styles.largePreview}
          resizeMode="cover"
          accessibilityLabel="Selected Classic Good Vibes template"
        />

        <Link href={"/preview" as Href} asChild>
          <Pressable
            style={({ pressed }) => [styles.useButton, pressed && styles.buttonPressed]}
            accessibilityLabel="Use Classic template"
          >
            <View style={styles.useButtonIcon}>
              <SymbolView
                name={{ ios: "checkmark", android: "check", web: "check" }}
                size={18}
                tintColor={colors.blue}
              />
            </View>
            <Text style={styles.useButtonText}>Use This Template</Text>
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
    borderWidth: 2,
    padding: 5,
  },
  templateImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  selectedBadge: {
    position: "absolute",
    top: -9,
    right: -8,
    width: 34,
    height: 34,
    borderRadius: 17,
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
  },
  previewHeading: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  previewHeadingCopy: {
    flex: 1,
  },
  previewTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
  },
  previewDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  largePreview: {
    width: "100%",
    maxWidth: 310,
    aspectRatio: 0.75,
    borderRadius: 13,
    alignSelf: "center",
    marginTop: 16,
  },
  useButton: {
    minHeight: 54,
    backgroundColor: colors.blue,
    borderRadius: 13,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  useButtonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  useButtonText: {
    flexShrink: 1,
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.78,
  },
});
