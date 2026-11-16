import { SymbolView } from "expo-symbols";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
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
  pressed: {
    opacity: 0.7,
  },
});
