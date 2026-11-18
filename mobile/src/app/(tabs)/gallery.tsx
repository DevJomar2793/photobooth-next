import { File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useFocusEffect } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import {
  deleteImage,
  getImages,
  getImageUrl,
  type ImageListItemResponse,
} from "@/api/images";
import GalleryFilterModal from "@/components/GalleryFilterModal";
import GalleryImagePreviewModal from "@/components/GalleryImagePreviewModal";
import PageFooter from "@/components/PageFooter";
import { TEMPLATE_HEIGHT, TEMPLATE_WIDTH, templateOptions } from "@/data/templateOptions";
import { colors } from "@/theme";

interface GalleryImageCardProps {
  image: ImageListItemResponse;
  width: number;
  isSelectionMode: boolean;
  isSelected: boolean;
  onPress: () => void;
}

function GalleryImageCard({
  image,
  width,
  isSelectionMode,
  isSelected,
  onPress,
}: GalleryImageCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const createdDate = new Date(image.created_at);
  const dateLabel = Number.isNaN(createdDate.getTime())
    ? "Saved photo"
    : createdDate.toLocaleDateString();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.photoCard,
        { width },
        isSelected && styles.selectedPhotoCard,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        isSelectionMode
          ? `${isSelected ? "Deselect" : "Select"} ${image.filename}`
          : `View ${image.filename} full screen`
      }
      accessibilityState={{ selected: isSelected }}
    >
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

      {isSelectionMode ? (
        <View style={[styles.selectionBadge, isSelected && styles.selectionBadgeActive]}>
          {isSelected ? (
            <SymbolView
              name={{ ios: "checkmark", android: "check", web: "check" }}
              size={17}
              tintColor={colors.white}
            />
          ) : null}
        </View>
      ) : null}

      <View style={styles.photoDetails}>
        <Text style={styles.photoName} numberOfLines={1}>{image.filename}</Text>
        <Text style={styles.photoDate}>{dateLabel}</Text>
      </View>
    </Pressable>
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
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageListItemResponse | null>(null);
  const [previewAction, setPreviewAction] = useState<"download" | "delete" | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<number>>(new Set());

  const selectedTemplate = templateOptions.find(
    (template) => template.id === selectedTemplateId,
  );
  const filterLabel = selectedTemplate?.name ?? "All Photos";
  const filteredImages = selectedTemplateId
    ? images.filter((image) => image.template_id === selectedTemplateId)
    : images;
  const areAllVisibleImagesSelected =
    filteredImages.length > 0 &&
    filteredImages.every((image) => selectedImageIds.has(image.id));

  const loadImages = useCallback(
    async (signal?: AbortSignal, isPullToRefresh = false) => {
      if (isPullToRefresh) setIsRefreshing(true);
      else setIsLoading(true);
      setError(null);

      try {
        const savedImages = await getImages(signal);
        setImages(savedImages);
        const savedImageIds = new Set(savedImages.map((image) => image.id));
        setSelectedImageIds(
          (currentIds) => new Set([...currentIds].filter((id) => savedImageIds.has(id))),
        );
      } catch (loadError) {
        if (signal?.aborted) return;
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

  const handleSelectTemplate = (templateId: string | null) => {
    setSelectedTemplateId(templateId);
    setIsFilterVisible(false);
    setIsSelectionMode(false);
    setSelectedImageIds(new Set());
  };

  const handleSelectionMode = () => {
    setIsSelectionMode((isActive) => !isActive);
    setSelectedImageIds(new Set());
  };

  const handleImagePress = (image: ImageListItemResponse) => {
    if (!isSelectionMode) {
      setPreviewImage(image);
      return;
    }

    setSelectedImageIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(image.id)) nextIds.delete(image.id);
      else nextIds.add(image.id);
      return nextIds;
    });
  };

  const handleSelectAll = () => {
    setSelectedImageIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (areAllVisibleImagesSelected) {
        filteredImages.forEach((image) => nextIds.delete(image.id));
      } else {
        filteredImages.forEach((image) => nextIds.add(image.id));
      }
      return nextIds;
    });
  };

  const handleDownloadImage = async () => {
    if (!previewImage || previewAction) return;

    setPreviewAction("download");
    let downloadedFile: File | null = null;

    try {
      const currentPermission = await MediaLibrary.getPermissionsAsync(true, []);
      const permission = currentPermission.granted
        ? currentPermission
        : await MediaLibrary.requestPermissionsAsync(true, []);

      if (!permission.granted) {
        if (!permission.canAskAgain) {
          Alert.alert(
            "Photo Access Required",
            "Enable photo access in your device settings to download this image.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => void Linking.openSettings() },
            ],
          );
        } else {
          Alert.alert(
            "Permission Not Granted",
            "Photo access is required to download the image to your phone.",
          );
        }
        return;
      }

      const extension = previewImage.content_type === "image/png" ? "png" : "jpg";
      const destination = new File(
        Paths.cache,
        `school-booth-${previewImage.id}.${extension}`,
      );
      downloadedFile = await File.downloadFileAsync(
        getImageUrl(previewImage.image_url),
        destination,
        { idempotent: true },
      );
      await MediaLibrary.Asset.create(downloadedFile.uri);

      Alert.alert("Download Complete", "The image was saved to your device gallery.");
    } catch {
      Alert.alert("Download Failed", "Unable to download the image. Please try again.");
    } finally {
      try {
        if (downloadedFile?.exists) downloadedFile.delete();
      } finally {
        setPreviewAction(null);
      }
    }
  };

  const handleDeleteImage = () => {
    if (!previewImage || previewAction) return;

    Alert.alert(
      "Delete Image?",
      "This permanently removes the image from the School Booth gallery.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => void confirmDeleteImage(),
        },
      ],
    );
  };

  const confirmDeleteImage = async () => {
    if (!previewImage || previewAction) return;

    const imageId = previewImage.id;
    setPreviewAction("delete");

    try {
      await deleteImage(imageId);
      setImages((currentImages) =>
        currentImages.filter((image) => image.id !== imageId),
      );
      setSelectedImageIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(imageId);
        return nextIds;
      });
      setPreviewImage(null);
      Alert.alert("Image Deleted", "The image was removed from the gallery.");
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete the image. Please try again.";
      Alert.alert("Delete Failed", message);
    } finally {
      setPreviewAction(null);
    }
  };

  const renderHeader = () => (
    <>
      <View style={styles.heading}>
        <View style={styles.headingIcon}>
          <SymbolView
            name={{ ios: "photo.on.rectangle", android: "photo_library", web: "photo_library" }}
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
          <Pressable
            style={({ pressed }) => [
              styles.filterControl,
              selectedTemplateId !== null && styles.filterControlActive,
              isNarrowScreen && styles.toolbarControlNarrow,
              pressed && styles.pressed,
            ]}
            onPress={() => setIsFilterVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={`Photo filter, ${filterLabel}`}
          >
            <Text style={styles.controlText} numberOfLines={1}>{filterLabel}</Text>
            <SymbolView
              name={{ ios: "chevron.down", android: "keyboard_arrow_down", web: "keyboard_arrow_down" }}
              size={18}
              tintColor={colors.muted}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.selectControl,
              isSelectionMode && styles.selectControlActive,
              isNarrowScreen && styles.toolbarControlNarrow,
              pressed && styles.pressed,
            ]}
            onPress={handleSelectionMode}
            accessibilityRole="button"
            accessibilityLabel={isSelectionMode ? "Finish selecting photos" : "Select photos"}
          >
            <SymbolView
              name={{ ios: "checkmark.square", android: "check_box", web: "check_box" }}
              size={20}
              tintColor={isSelectionMode ? colors.white : colors.navy}
            />
            <Text style={[styles.selectText, isSelectionMode && styles.selectTextActive]}>
              {isSelectionMode ? `Done (${selectedImageIds.size})` : "Select"}
            </Text>
          </Pressable>
        </View>

        {isSelectionMode && filteredImages.length > 0 ? (
          <View style={styles.selectionToolbar}>
            <Text style={styles.selectionCount}>{selectedImageIds.size} selected</Text>
            <Pressable
              onPress={handleSelectAll}
              accessibilityRole="button"
              accessibilityLabel={
                areAllVisibleImagesSelected
                  ? "Deselect all visible photos"
                  : "Select all visible photos"
              }
            >
              <Text style={styles.selectAllText}>
                {areAllVisibleImagesSelected ? "Deselect All" : "Select All"}
              </Text>
            </Pressable>
          </View>
        ) : null}
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

    if (error && images.length === 0) {
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

    if (selectedTemplateId && images.length > 0) {
      return (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <SymbolView
              name={{ ios: "line.3.horizontal.decrease.circle", android: "filter_alt_off", web: "filter_alt_off" }}
              size={44}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.emptyTitle}>No {filterLabel} photos</Text>
          <Text style={styles.emptyDescription}>No saved images use this template yet.</Text>
          <Pressable
            style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}
            onPress={() => handleSelectTemplate(null)}
            accessibilityRole="button"
          >
            <Text style={styles.retryButtonText}>Show All Photos</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <SymbolView
            name={{ ios: "photo.on.rectangle.angled", android: "add_photo_alternate", web: "add_photo_alternate" }}
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
    <>
      <FlatList
        style={styles.screen}
        contentContainerStyle={styles.page}
        data={filteredImages}
        keyExtractor={(image) => image.id.toString()}
        renderItem={({ item }) => (
          <GalleryImageCard
            image={item}
            width={cardWidth}
            isSelectionMode={isSelectionMode}
            isSelected={selectedImageIds.has(item.id)}
            onPress={() => handleImagePress(item)}
          />
        )}
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

      <GalleryFilterModal
        visible={isFilterVisible}
        selectedTemplateId={selectedTemplateId}
        templates={templateOptions}
        onClose={() => setIsFilterVisible(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <GalleryImagePreviewModal
        visible={previewImage !== null}
        imageUrl={previewImage ? getImageUrl(previewImage.image_url) : ""}
        accessibilityLabel={
          previewImage ? `Full-screen preview of ${previewImage.filename}` : "Photo preview"
        }
        isDownloading={previewAction === "download"}
        isDeleting={previewAction === "delete"}
        onClose={() => setPreviewImage(null)}
        onDownload={() => void handleDownloadImage()}
        onDelete={handleDeleteImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 },
  heading: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: colors.lightBlue, alignItems: "center", justifyContent: "center" },
  headingCopy: { flex: 1 },
  title: { color: colors.navy, fontSize: 30, fontWeight: "900", letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 19, marginTop: 2 },
  toolbar: { gap: 10, marginTop: 24, marginBottom: 18 },
  searchField: { height: 50, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 10 },
  searchInput: { flex: 1, color: colors.muted, fontSize: 15, paddingVertical: 0 },
  toolbarActions: { flexDirection: "row", gap: 10 },
  toolbarActionsNarrow: { flexDirection: "column" },
  filterControl: { flex: 1, minHeight: 48, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  filterControlActive: { borderColor: "#8dbfff", backgroundColor: colors.lightBlue },
  selectControl: { flex: 1, minHeight: 48, backgroundColor: colors.lightBlue, borderColor: "#c8e0ff", borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  selectControlActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  toolbarControlNarrow: { flex: 0 },
  controlText: { flexShrink: 1, color: colors.muted, fontSize: 14, fontWeight: "600" },
  selectText: { color: colors.navy, fontSize: 14, fontWeight: "800" },
  selectTextActive: { color: colors.white },
  selectionToolbar: { minHeight: 44, paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  selectionCount: { color: colors.muted, fontSize: 13, fontWeight: "700" },
  selectAllText: { color: colors.blue, fontSize: 13, fontWeight: "900" },
  photoRow: { gap: 12 },
  photoCard: { marginBottom: 12, overflow: "hidden", backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 16 },
  selectedPhotoCard: { borderColor: colors.blue, borderWidth: 2 },
  galleryImage: { width: "100%", aspectRatio: TEMPLATE_WIDTH / TEMPLATE_HEIGHT, backgroundColor: colors.lightBlue },
  imageFallback: { width: "100%", aspectRatio: TEMPLATE_WIDTH / TEMPLATE_HEIGHT, backgroundColor: colors.lightBlue, alignItems: "center", justifyContent: "center", gap: 8 },
  imageFallbackText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  selectionBadge: { position: "absolute", top: 9, right: 9, width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.white, backgroundColor: "rgba(6, 26, 71, 0.45)", alignItems: "center", justifyContent: "center" },
  selectionBadgeActive: { backgroundColor: colors.blue },
  photoDetails: { padding: 10 },
  photoName: { color: colors.navy, fontSize: 12, fontWeight: "800" },
  photoDate: { color: colors.muted, fontSize: 11, marginTop: 3 },
  emptyState: { flexGrow: 1, minHeight: 360, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 20, paddingHorizontal: 28, paddingVertical: 46, alignItems: "center", justifyContent: "center" },
  emptyIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.lightBlue, alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: colors.navy, fontSize: 23, fontWeight: "900", marginTop: 18, textAlign: "center" },
  emptyDescription: { color: colors.muted, fontSize: 15, lineHeight: 21, textAlign: "center", maxWidth: 290, marginTop: 7 },
  emptyHint: { backgroundColor: colors.lightBlue, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 8, marginTop: 20 },
  emptyHintText: { flexShrink: 1, color: colors.blue, fontSize: 12, fontWeight: "700" },
  loadingText: { color: colors.muted, fontSize: 14, fontWeight: "700", marginTop: 14 },
  retryButton: { minHeight: 46, marginTop: 20, paddingHorizontal: 22, borderRadius: 12, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center" },
  retryButtonText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  errorBanner: { marginBottom: 18, padding: 14, borderRadius: 12, backgroundColor: "#fff4f4", borderColor: "#ffcaca", borderWidth: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  errorBannerText: { flex: 1, color: "#9c2525", fontSize: 13, lineHeight: 18 },
  retryText: { color: colors.blue, fontSize: 13, fontWeight: "900" },
  pressed: { opacity: 0.74 },
});
