import { SymbolView } from "expo-symbols";
import { Image, Modal, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

interface GalleryImagePreviewModalProps {
  visible: boolean;
  imageUrl: string;
  accessibilityLabel: string;
  onClose: () => void;
}

export default function GalleryImagePreviewModal({
  visible,
  imageUrl,
  accessibilityLabel,
  onClose,
}: GalleryImagePreviewModalProps) {
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
        <Pressable
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.pressed,
          ]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close full-screen photo preview"
        >
          <SymbolView
            name={{ ios: "xmark", android: "close", web: "close" }}
            size={24}
            tintColor={colors.white}
          />
        </Pressable>

        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel={accessibilityLabel}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020817",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 16,
    zIndex: 1,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.7,
  },
});
