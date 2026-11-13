import { SymbolView } from "expo-symbols";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

export interface CapturedPhoto {
  id: string;
  uri: string;
}

interface CapturedPhotosModalProps {
  visible: boolean;
  photos: CapturedPhoto[];
  maxPhotos: number;
  onClose: () => void;
  onRemovePhoto: (photoId: string) => void;
}

export default function CapturedPhotosModal({
  visible,
  photos,
  maxPhotos,
  onClose,
  onRemovePhoto,
}: CapturedPhotosModalProps) {
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
              <Text style={styles.title}>Captured Photos</Text>
              <Text style={styles.subtitle}>
                {photos.length} of {maxPhotos} photos
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close photo preview"
            >
              <SymbolView
                name={{ ios: "xmark", android: "close", web: "close" }}
                size={22}
                tintColor={colors.navy}
              />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {photos.length === 0 ? (
              <View style={styles.emptyState}>
                <SymbolView
                  name={{ ios: "photo", android: "image", web: "image" }}
                  size={38}
                  tintColor={colors.muted}
                />
                <Text style={styles.emptyTitle}>No photos to preview</Text>
                <Text style={styles.emptyText}>
                  Close Preview and capture a new photo.
                </Text>
              </View>
            ) : (
              <View style={styles.photoGrid}>
                {photos.map((photo, index) => (
                  <View style={styles.photoCard} key={photo.id}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.photoImage}
                      resizeMode="cover"
                      accessibilityLabel={`Captured photo ${index + 1}`}
                    />

                    <View style={styles.photoNumber}>
                      <Text style={styles.photoNumberText}>{index + 1}</Text>
                    </View>

                    <Pressable
                      style={({ pressed }) => [
                        styles.removeButton,
                        pressed && styles.pressed,
                      ]}
                      onPress={() => onRemovePhoto(photo.id)}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove captured photo ${index + 1}`}
                    >
                      <SymbolView
                        name={{
                          ios: "trash.fill",
                          android: "delete",
                          web: "delete",
                        }}
                        size={17}
                        tintColor={colors.white}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <Pressable
            style={({ pressed }) => [
              styles.doneButton,
              pressed && styles.pressed,
            ]}
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: "rgba(6, 26, 71, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "88%",
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
  content: {
    padding: 14,
    flexGrow: 1,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  photoCard: {
    width: "48%",
    aspectRatio: 0.82,
    borderRadius: 13,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoNumber: {
    position: "absolute",
    left: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(6, 26, 71, 0.88)",
    alignItems: "center",
    justifyContent: "center",
  },
  photoNumberText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
  },
  emptyText: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
  },
  doneButton: {
    minHeight: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.72,
  },
});
