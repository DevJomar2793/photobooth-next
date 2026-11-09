import { SymbolView } from "expo-symbols";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import PageFooter from "@/components/PageFooter";
import { colors } from "@/theme";

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 390;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.heading}>
        <View style={styles.headingIcon}>
          <SymbolView
            name={{
              ios: "photo.on.rectangle",
              android: "photo_library",
              web: "photo_library",
            }}
            size={28}
            tintColor={colors.navy}
          />
        </View>
        <View style={styles.headingCopy}>
          <Text style={styles.title}>Gallery</Text>
          <Text style={styles.subtitle}>View and manage your School Booth memories.</Text>
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.searchField}>
          <SymbolView
            name={{ ios: "magnifyingglass", android: "search", web: "search" }}
            size={21}
            tintColor={colors.muted}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search photos..."
            placeholderTextColor={colors.muted}
            editable={false}
            accessibilityLabel="Search photos"
            accessibilityState={{ disabled: true }}
          />
        </View>

        <View style={[styles.toolbarActions, isNarrowScreen && styles.toolbarActionsNarrow]}>
          <View
            style={[styles.filterControl, isNarrowScreen && styles.toolbarControlNarrow]}
            accessibilityLabel="Photo filter, All Photos"
            accessibilityState={{ disabled: true }}
          >
            <Text style={styles.controlText}>All Photos</Text>
            <SymbolView
              name={{
                ios: "chevron.down",
                android: "keyboard_arrow_down",
                web: "keyboard_arrow_down",
              }}
              size={18}
              tintColor={colors.muted}
            />
          </View>
          <View
            style={[styles.selectControl, isNarrowScreen && styles.toolbarControlNarrow]}
            accessibilityLabel="Select photos"
            accessibilityState={{ disabled: true }}
          >
            <SymbolView
              name={{
                ios: "checkmark.square",
                android: "check_box",
                web: "check_box",
              }}
              size={20}
              tintColor={colors.navy}
            />
            <Text style={styles.selectText}>Select</Text>
          </View>
        </View>
      </View>

      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <SymbolView
            name={{
              ios: "photo.on.rectangle.angled",
              android: "add_photo_alternate",
              web: "add_photo_alternate",
            }}
            size={46}
            tintColor={colors.blue}
          />
        </View>
        <Text style={styles.emptyTitle}>No photos yet</Text>
        <Text style={styles.emptyDescription}>
          Your captured School Booth memories will appear here.
        </Text>
        <View style={styles.emptyHint}>
          <SymbolView
            name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
            size={20}
            tintColor={colors.blue}
          />
          <Text style={styles.emptyHintText}>Capture good vibes to fill your gallery</Text>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headingIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  headingCopy: {
    flex: 1,
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 19,
    marginTop: 2,
  },
  toolbar: {
    gap: 10,
    marginTop: 24,
  },
  searchField: {
    height: 50,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.muted,
    fontSize: 15,
    paddingVertical: 0,
  },
  toolbarActions: {
    flexDirection: "row",
    gap: 10,
  },
  toolbarActionsNarrow: {
    flexDirection: "column",
  },
  filterControl: {
    flex: 1,
    minHeight: 48,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectControl: {
    flex: 1,
    minHeight: 48,
    backgroundColor: colors.lightBlue,
    borderColor: "#c8e0ff",
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  toolbarControlNarrow: {
    flex: 0,
  },
  controlText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  selectText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  emptyState: {
    flexGrow: 1,
    minHeight: 360,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 18,
    paddingHorizontal: 28,
    paddingVertical: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: colors.navy,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 18,
  },
  emptyDescription: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    maxWidth: 290,
    marginTop: 7,
  },
  emptyHint: {
    backgroundColor: colors.lightBlue,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  emptyHintText: {
    flexShrink: 1,
    color: colors.blue,
    fontSize: 12,
    fontWeight: "700",
  },
});
