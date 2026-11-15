import { CameraView, useCameraPermissions } from "expo-camera";
import { type Href, Link, useFocusEffect } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import PageFooter from "@/components/PageFooter";
import { colors } from "@/theme";

const MAX_PHOTOS = 4;
const TIMER_OPTIONS = [0, 3, 5] as const;

type TimerSeconds = (typeof TIMER_OPTIONS)[number];

interface CapturedPhoto {
  id: string;
  uri: string;
}

export default function CaptureScreen() {
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 360;
  const cameraRef = useRef<CameraView>(null);
  const countdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const captureLockedRef = useRef(false);
  const isScreenFocusedRef = useRef(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<TimerSeconds>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [cameraError, setCameraError] = useState("");

  useFocusEffect(
    useCallback(() => {
      isScreenFocusedRef.current = true;
      setIsCameraActive(true);

      return () => {
        isScreenFocusedRef.current = false;
        setIsCameraActive(false);
        setIsCameraReady(false);
        setCountdown(null);
        setIsCapturing(false);
        captureLockedRef.current = false;

        if (countdownTimeoutRef.current) {
          clearTimeout(countdownTimeoutRef.current);
          countdownTimeoutRef.current = null;
        }
      };
    }, []),
  );

  const capturePhoto = async () => {
    if (!cameraRef.current || !isScreenFocusedRef.current) {
      captureLockedRef.current = false;
      return;
    }

    setIsCapturing(true);
    setCameraError("");

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });

      if (!photo?.uri || !isScreenFocusedRef.current) {
        return;
      }

      setCapturedPhotos((currentPhotos) => {
        if (currentPhotos.length >= MAX_PHOTOS) {
          return currentPhotos;
        }

        return [...currentPhotos, { id: photo.uri, uri: photo.uri }];
      });
    } catch {
      setCameraError("We could not take the photo. Please try again.");
    } finally {
      setIsCapturing(false);
      captureLockedRef.current = false;
    }
  };

  const startCountdown = (secondsRemaining: number) => {
    if (!isScreenFocusedRef.current) {
      captureLockedRef.current = false;
      return;
    }

    if (secondsRemaining === 0) {
      setCountdown(null);
      void capturePhoto();
      return;
    }

    setCountdown(secondsRemaining);
    countdownTimeoutRef.current = setTimeout(() => {
      startCountdown(secondsRemaining - 1);
    }, 1000);
  };

  const handleTakePhoto = () => {
    const cannotCapture =
      captureLockedRef.current ||
      !permission?.granted ||
      !isCameraReady ||
      capturedPhotos.length >= MAX_PHOTOS;

    if (cannotCapture) {
      return;
    }

    captureLockedRef.current = true;

    if (selectedTimer === 0) {
      void capturePhoto();
      return;
    }

    startCountdown(selectedTimer);
  };

  const isBusy = countdown !== null || isCapturing;
  const hasReachedPhotoLimit = capturedPhotos.length >= MAX_PHOTOS;
  const isCaptureDisabled =
    isBusy || !permission?.granted || !isCameraReady || hasReachedPhotoLimit;

  const renderCameraContent = () => {
    if (!permission) {
      return (
        <View style={styles.cameraMessage}>
          <ActivityIndicator color={colors.blue} />
          <Text style={styles.cameraMessageText}>Checking camera permission...</Text>
        </View>
      );
    }

    if (!permission.granted) {
      const handlePermissionPress = permission.canAskAgain
        ? requestPermission
        : Linking.openSettings;

      return (
        <View style={styles.cameraMessage}>
          <SymbolView
            name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
            size={34}
            tintColor={colors.blue}
          />
          <Text style={styles.cameraMessageTitle}>Camera access is required</Text>
          <Text style={styles.cameraMessageText}>
            Allow camera access to take your School Booth photos.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.permissionButton,
              pressed && styles.pressed,
            ]}
            onPress={() => void handlePermissionPress()}
            accessibilityRole="button"
            accessibilityLabel={permission.canAskAgain ? "Enable camera" : "Open settings"}
          >
            <Text style={styles.permissionButtonText}>
              {permission.canAskAgain ? "Enable Camera" : "Open Settings"}
            </Text>
          </Pressable>
        </View>
      );
    }

    if (!isCameraActive) {
      return null;
    }

    return (
      <CameraView
        ref={cameraRef}
        style={styles.cameraPreview}
        facing="front"
        onCameraReady={() => {
          setIsCameraReady(true);
          setCameraError("");
        }}
        onMountError={() => {
          setIsCameraReady(false);
          setCameraError("The camera could not start. Please check your device settings.");
        }}
      />
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cameraPanel}>
        <View style={styles.cameraFrame}>
          {renderCameraContent()}

          {permission?.granted && isCameraActive && (
            <View style={styles.cameraStatus} pointerEvents="none">
              <View style={styles.statusDot} />
              <Text style={styles.cameraStatusText}>
                {isCameraReady ? "Camera Ready" : "Starting Camera"}
              </Text>
            </View>
          )}

          {countdown !== null && (
            <View style={styles.countdownOverlay} pointerEvents="none">
              <Text style={styles.countdownText}>{countdown}</Text>
              <Text style={styles.countdownLabel}>Get ready!</Text>
            </View>
          )}

          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />
        </View>

        <View style={[styles.captureControls, isNarrowScreen && styles.captureControlsNarrow]}>
          <View style={styles.timerControl}>
            <View style={styles.controlHeading}>
              <SymbolView
                name={{ ios: "timer", android: "timer", web: "timer" }}
                size={20}
                tintColor={colors.navy}
              />
              <Text style={styles.controlHeadingText}>Timer</Text>
            </View>
            <View style={styles.timerOptions}>
              {TIMER_OPTIONS.map((timer) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.timerChip,
                    selectedTimer === timer && styles.timerChipActive,
                    pressed && !isBusy && styles.pressed,
                  ]}
                  onPress={() => setSelectedTimer(timer)}
                  disabled={isBusy || hasReachedPhotoLimit}
                  accessibilityRole="button"
                  accessibilityLabel={`${timer} second timer`}
                  accessibilityState={{
                    selected: selectedTimer === timer,
                    disabled: isBusy || hasReachedPhotoLimit,
                  }}
                  key={timer}
                >
                  <Text
                    style={[
                      styles.timerText,
                      selectedTimer === timer && styles.timerTextActive,
                    ]}
                  >
                    {timer}s
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            style={styles.shutterControl}
            onPress={handleTakePhoto}
            disabled={isCaptureDisabled}
            accessibilityLabel="Take photo"
            accessibilityState={{ disabled: isCaptureDisabled }}
          >
            <View
              style={[
                styles.shutterButton,
                isCaptureDisabled && styles.shutterButtonDisabled,
              ]}
            >
              <SymbolView
                name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
                size={31}
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.shutterText}>
              {isCapturing ? "Capturing..." : hasReachedPhotoLimit ? "4 Photos" : "Take Photo"}
            </Text>
          </Pressable>
        </View>

        {cameraError ? <Text style={styles.errorText}>{cameraError}</Text> : null}
      </View>

      <View style={styles.capturedPanel}>
        <View style={styles.capturedHeader}>
          <View style={styles.capturedTitleRow}>
            <SymbolView
              name={{
                ios: "photo.on.rectangle",
                android: "photo_library",
                web: "photo_library",
              }}
              size={22}
              tintColor={colors.navy}
            />
            <Text style={styles.capturedTitle}>
              Captured Photos ({capturedPhotos.length}/{MAX_PHOTOS})
            </Text>
          </View>
        </View>

        {capturedPhotos.length === 0 ? (
          <View style={styles.emptyPhotos}>
            <SymbolView
              name={{ ios: "camera", android: "photo_camera", web: "photo_camera" }}
              size={28}
              tintColor={colors.muted}
            />
            <Text style={styles.emptyPhotosText}>
              Your captured photos will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.photoGrid}>
            {capturedPhotos.map((photo, index) => (
              <View style={styles.photoCard} key={photo.id}>
                <View style={styles.photoImageWrapper}>
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.photoImage}
                    resizeMode="cover"
                    accessibilityLabel={`Captured photo ${index + 1}`}
                  />
                  <View style={styles.photoNumber}>
                    <Text style={styles.photoNumberText}>{index + 1}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.tip}>
        <SymbolView
          name={{ ios: "lightbulb", android: "lightbulb", web: "lightbulb" }}
          size={20}
          tintColor={colors.blue}
        />
        <Text style={styles.tipText}>
          Choose a timer, look at the camera, and capture up to four photos.
        </Text>
      </View>

      <View style={styles.routeActions}>
        <Link href="/" asChild>
          <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <SymbolView
              name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
              size={20}
              tintColor={colors.navy}
            />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </Link>

        <Link href={"/templates" as Href} asChild>
          <Pressable style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}>
            <Text style={styles.nextText}>Next</Text>
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
  cameraPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
  },
  cameraFrame: {
    aspectRatio: 1.35,
    backgroundColor: "#e8eef6",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPreview: {
    width: "100%",
    height: "100%",
  },
  cameraMessage: {
    width: "100%",
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  cameraMessageTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
  cameraMessageText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
  permissionButton: {
    minHeight: 40,
    marginTop: 3,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
  cameraStatus: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(6, 26, 71, 0.88)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    zIndex: 2,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#36d889",
  },
  cameraStatusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  countdownOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(6, 26, 71, 0.58)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  countdownText: {
    color: colors.white,
    fontSize: 72,
    lineHeight: 78,
    fontWeight: "900",
  },
  countdownLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: colors.white,
    zIndex: 2,
  },
  cornerTopLeft: {
    top: 18,
    left: 18,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 4,
  },
  cornerTopRight: {
    top: 18,
    right: 18,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 4,
  },
  cornerBottomLeft: {
    bottom: 18,
    left: 18,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 4,
  },
  cornerBottomRight: {
    right: 18,
    bottom: 18,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 4,
  },
  captureControls: {
    minHeight: 118,
    paddingHorizontal: 4,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  captureControlsNarrow: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  timerControl: {
    flex: 1,
    minWidth: 120,
    gap: 9,
  },
  controlHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  controlHeadingText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "800",
  },
  timerOptions: {
    flexDirection: "row",
    gap: 5,
  },
  timerChip: {
    flex: 1,
    minHeight: 34,
    borderRadius: 18,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  timerChipActive: {
    backgroundColor: colors.blue,
  },
  timerText: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
  },
  timerTextActive: {
    color: colors.white,
  },
  shutterControl: {
    alignItems: "center",
    gap: 5,
  },
  shutterButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterButtonDisabled: {
    opacity: 0.45,
  },
  shutterText: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: "800",
  },
  errorText: {
    color: colors.pink,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 2,
    paddingHorizontal: 8,
  },
  capturedPanel: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 14,
    padding: 12,
  },
  capturedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  capturedTitleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  capturedTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900",
  },
  emptyPhotos: {
    minHeight: 110,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  emptyPhotosText: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  photoCard: {
    flexBasis: "47%",
    flexGrow: 1,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 13,
    padding: 7,
  },
  photoImageWrapper: {
    aspectRatio: 0.9,
    borderRadius: 9,
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoNumber: {
    position: "absolute",
    left: 6,
    bottom: 6,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  photoNumberText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  tip: {
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tipText: {
    flex: 1,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  routeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  backButton: {
    minHeight: 50,
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  backText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "800",
  },
  nextButton: {
    flex: 1,
    maxWidth: 180,
    minHeight: 50,
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  nextText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.76,
  },
});
