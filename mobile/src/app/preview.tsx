import { type Href, Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import type { ReactNode } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import BoothPageHeader from "@/components/BoothPageHeader";
import PageFooter from "@/components/PageFooter";
import { templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

const previewTemplate = templateOptions[0];

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
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <BoothPageHeader
        backHref="/templates"
        title="Preview Your Photo"
        description="Here’s your finished photo and the available save options."
      />

      <View style={styles.photoPanel}>
        <Image
          source={previewTemplate.image}
          style={styles.previewImage}
          resizeMode="cover"
          accessibilityLabel="Finished Good Vibes School Booth photo"
        />
      </View>

      <View style={styles.actionsPanel}>
        <ActionSection
          title="Save Your Photo"
          description="Saving and downloading will be connected in a later step."
          icon={
            <SymbolView
              name={{ ios: "square.and.arrow.down", android: "download", web: "download" }}
              size={23}
              tintColor={colors.navy}
            />
          }
        >
          <Pressable
            style={[styles.actionButton, styles.primaryDisabledButton]}
            disabled
            accessibilityLabel="Download image"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{ ios: "arrow.down.to.line", android: "download", web: "download" }}
              size={21}
              tintColor={colors.white}
            />
            <Text style={styles.primaryButtonText}>Download Image</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.secondaryDisabledButton]}
            disabled
            accessibilityLabel="Save to gallery"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{
                ios: "photo.on.rectangle",
                android: "photo_library",
                web: "photo_library",
              }}
              size={21}
              tintColor={colors.navy}
            />
            <Text style={styles.secondaryButtonText}>Save to Gallery</Text>
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
          description="Return to the static camera screen and view the flow again."
          icon={
            <SymbolView
              name={{ ios: "arrow.clockwise", android: "refresh", web: "refresh" }}
              size={23}
              tintColor={colors.navy}
            />
          }
        >
          <Link href={"/capture" as Href} replace asChild>
            <Pressable
              style={({ pressed }) => [styles.actionButton, styles.retakeButton, pressed && styles.pressed]}
              accessibilityLabel="Return to Capture"
            >
              <SymbolView
                name={{ ios: "camera", android: "photo_camera", web: "photo_camera" }}
                size={21}
                tintColor={colors.blue}
              />
              <Text style={styles.retakeButtonText}>Retake Photo</Text>
            </Pressable>
          </Link>
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
  previewImage: {
    width: "100%",
    maxWidth: 340,
    aspectRatio: 0.75,
    borderRadius: 13,
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
  primaryDisabledButton: {
    backgroundColor: colors.blue,
    opacity: 0.58,
  },
  secondaryDisabledButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.border,
    borderWidth: 1,
    opacity: 0.65,
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
  pressed: {
    opacity: 0.74,
  },
});
