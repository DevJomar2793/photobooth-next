import { useFocusEffect } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import {
  getImages,
  getImageUrl,
  type ImageListItemResponse,
} from "@/api/images";
import PageFooter from "@/components/PageFooter";
import { TEMPLATE_HEIGHT, TEMPLATE_WIDTH } from "@/data/templateOptions";
import { colors } from "@/theme";

interface GalleryImageCardProps {
  image: ImageListItemResponse;
  width: number;
}

function GalleryImageCard({ image, width }: GalleryImageCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const createdDate = new Date(image.created_at);
  const dateLabel = Number.isNaN(createdDate.getTime())
    ? "Saved photo"
    : createdDate.toLocaleDateString();

  return (
    <View style={[styles.photoCard, { width }]}>
      {hasImageError ? (
        <View style={styles.imageFallback}>
          <SymbolView
            name={{ ios: "photo", android: "broken_image", web: "broken_image" }}
            size={34}
            tintColor={colors.muted}
          />
          <Text style={styles.imageFallbackText}>Image unavailable</Text>
        </View>
      ) : (
        <Image
          source={{ uri: getImageUrl(image.image_url) }}
          style={styles.galleryImage}
          resizeMode="cover"
          onError={() => setHasImageError(true)}
          accessibilityLabel={`Saved School Booth photo from ${dateLabel}`}
        />
      )}
      <View style={styles.photoDetails}>
        <Text style={styles.photoName} numberOfLines={1}>
          {image.filename}
        </Text>
        <Text style={styles.photoDate}>{dateLabel}</Text>
      </View>
    </View>
  );
}

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 390;
  const cardWidth = (width - 40 - 12) / 2;
  const [images, setImages] = useState<ImageListItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = useCallback(
    async (signal?: AbortSignal, isPullToRefresh = false) => {
      if (isPullToRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const savedImages = await getImages(signal);
        setImages(savedImages);
      } catch (loadError) {
        if (signal?.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load your saved photos.",
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      void loadImages(controller.signal);

      return () => controller.abort();
    }, [loadImages]),
  );

  const renderHeader = () => (
    <>
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
              name={{ ios: "checkmark.square", android: "check_box", web: "check_box" }}
              size={20}
              tintColor={colors.navy}
            />
            <Text style={styles.selectText}>Select</Text>
          </View>
        </View>
      </View>

      {error && images.length > 0 ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
          <Pressable onPress={() => void loadImages()} accessibilityRole="button">
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={styles.loadingText}>Loading saved photos...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <SymbolView
              name={{ ios: "exclamationmark.triangle", android: "error", web: "error" }}
              size={42}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.emptyTitle}>Unable to load photos</Text>
          <Text style={styles.emptyDescription}>{error}</Text>
          <Pressable
            style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}
            onPress={() => void loadImages()}
            accessibilityRole="button"
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return (
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
          Your saved School Booth memories will appear here.
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
    );
  };

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.page}
      data={images}
      keyExtractor={(image) => image.id.toString()}
      renderItem={({ item }) => <GalleryImageCard image={item} width={cardWidth} />}
      numColumns={2}
      columnWrapperStyle={styles.photoRow}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyState}
      ListFooterComponent={<PageFooter />}
      refreshing={isRefreshing}
      onRefresh={() => void loadImages(undefined, true)}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  heading: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  headingCopy: { flex: 1 },
  title: { color: colors.navy, fontSize: 30, fontWeight: "900", letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 19, marginTop: 2 },
  toolbar: { gap: 10, marginTop: 24, marginBottom: 18 },
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
  searchInput: { flex: 1, color: colors.muted, fontSize: 15, paddingVertical: 0 },
  toolbarActions: { flexDirection: "row", gap: 10 },
  toolbarActionsNarrow: { flexDirection: "column" },
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
  toolbarControlNarrow: { flex: 0 },
  controlText: { color: colors.muted, fontSize: 14, fontWeight: "600" },
  selectText: { color: colors.navy, fontSize: 14, fontWeight: "800" },
  photoRow: { gap: 12 },
  photoCard: {
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
  },
  galleryImage: {
    width: "100%",
    aspectRatio: TEMPLATE_WIDTH / TEMPLATE_HEIGHT,
    backgroundColor: colors.lightBlue,
  },
  imageFallback: {
    width: "100%",
    aspectRatio: TEMPLATE_WIDTH / TEMPLATE_HEIGHT,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  imageFallbackText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  photoDetails: { padding: 10 },
  photoName: { color: colors.navy, fontSize: 12, fontWeight: "800" },
  photoDate: { color: colors.muted, fontSize: 11, marginTop: 3 },
  emptyState: {
    flexGrow: 1,
    minHeight: 360,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
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
  emptyTitle: { color: colors.navy, fontSize: 23, fontWeight: "900", marginTop: 18 },
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
  loadingText: { color: colors.muted, fontSize: 14, fontWeight: "700", marginTop: 14 },
  retryButton: {
    minHeight: 46,
    marginTop: 20,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  retryButtonText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  errorBanner: {
    marginBottom: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff4f4",
    borderColor: "#ffcaca",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  errorBannerText: { flex: 1, color: "#9c2525", fontSize: 13, lineHeight: 18 },
  retryText: { color: colors.blue, fontSize: 13, fontWeight: "900" },
  pressed: { opacity: 0.74 },
});
