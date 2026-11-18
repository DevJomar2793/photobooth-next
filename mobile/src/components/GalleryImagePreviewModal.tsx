import { SymbolView } from "expo-symbols";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

interface GalleryImagePreviewModalProps {
  visible: boolean;
  imageUrl: string;
  accessibilityLabel: string;
  isDownloading: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export default function GalleryImagePreviewModal({
  visible,
  imageUrl,
  accessibilityLabel,
  isDownloading,
  isDeleting,
  onClose,
  onDownload,
  onDelete,
}: GalleryImagePreviewModalProps) {
  const isBusy = isDownloading || isDeleting;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.closeBar} pointerEvents="box-none">
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
            hitSlop={12}
            pressRetentionOffset={16}
            onPressIn={onClose}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close full-screen photo preview"
          >
            <SymbolView
              name={{ ios: "xmark", android: "close", web: "close" }}
              size={24}
              tintColor={colors.white}
              pointerEvents="none"
            />
          </Pressable>
        </View>

        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel={accessibilityLabel}
        />

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.downloadButton,
              pressed && styles.pressed,
              isBusy && styles.disabled,
            ]}
            disabled={isBusy}
            onPress={onDownload}
            accessibilityRole="button"
            accessibilityLabel="Download image to device gallery"
            accessibilityState={{ disabled: isBusy, busy: isDownloading }}
          >
            {isDownloading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <SymbolView
                name={{ ios: "arrow.down.to.line", android: "download", web: "download" }}
                size={20}
                tintColor={colors.white}
              />
            )}
            <Text style={styles.actionButtonText}>
              {isDownloading ? "Downloading..." : "Download"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.deleteButton,
              pressed && styles.pressed,
              isBusy && styles.disabled,
            ]}
            disabled={isBusy}
            onPress={onDelete}
            accessibilityRole="button"
            accessibilityLabel="Delete image from gallery"
            accessibilityState={{ disabled: isBusy, busy: isDeleting }}
          >
            {isDeleting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <SymbolView
                name={{ ios: "trash", android: "delete", web: "delete" }}
                size={20}
                tintColor={colors.white}
              />
            )}
            <Text style={styles.actionButtonText}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020817",
  },
  closeBar: {
    minHeight: 66,
    paddingHorizontal: 16,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  closeButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  downloadButton: {
    backgroundColor: colors.blue,
  },
  deleteButton: {
    backgroundColor: "#c93636",
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.7,
  },
});
