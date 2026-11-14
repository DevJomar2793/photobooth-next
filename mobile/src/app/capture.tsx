import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  MAX_SESSION_PHOTOS,
  useBoothSession,
} from "@/BoothSessionContext";
import CapturedPhotosModal from "@/components/CapturedPhotosModal";
import { colors } from "@/theme";

const TIMER_OPTIONS = [0, 3, 5] as const;

type TimerSeconds = (typeof TIMER_OPTIONS)[number];

export default function CaptureScreen() {
  const router = useRouter();
  const {
    capturedPhotos,
    addCapturedPhoto,
    removeCapturedPhoto,
  } = useBoothSession();
  const cameraRef = useRef<CameraView>(null);
  const countdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const captureLockedRef = useRef(false);
  const isScreenFocusedRef = useRef(true);
  const isCameraActiveRef = useRef(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<CameraType>("front");
  const [selectedTimer, setSelectedTimer] = useState<TimerSeconds>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const cancelCountdown = useCallback(() => {
    if (countdownTimeoutRef.current) {
      clearTimeout(countdownTimeoutRef.current);
      countdownTimeoutRef.current = null;
    }

    setCountdown(null);
    captureLockedRef.current = false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      isScreenFocusedRef.current = true;
      isCameraActiveRef.current = true;
      setIsCameraActive(true);

      return () => {
        isScreenFocusedRef.current = false;
        isCameraActiveRef.current = false;
        setIsCameraActive(false);
        setIsCameraReady(false);
        setIsCapturing(false);
        setIsPreviewOpen(false);
        cancelCountdown();
      };
    }, [cancelCountdown]),
  );

  const capturePhoto = async () => {
    if (
      !cameraRef.current ||
      !isScreenFocusedRef.current ||
      !isCameraActiveRef.current
    ) {
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

      addCapturedPhoto(photo.uri);
    } catch {
      if (isScreenFocusedRef.current) {
        setCameraError("We could not take the photo. Please try again.");
      }
    } finally {
      if (isScreenFocusedRef.current) {
        setIsCapturing(false);
      }

      captureLockedRef.current = false;
    }
  };

  const startCountdown = (secondsRemaining: number) => {
    if (!isScreenFocusedRef.current || !isCameraActiveRef.current) {
      cancelCountdown();
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
      !isCameraActive ||
      !isCameraReady ||
      capturedPhotos.length >= MAX_SESSION_PHOTOS;

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

  const handleStopCamera = () => {
    if (isCapturing) {
      return;
    }

    isCameraActiveRef.current = false;
    setIsCameraActive(false);
    setIsCameraReady(false);
    cancelCountdown();
  };

  const handleStartCamera = () => {
    isCameraActiveRef.current = true;
    setCameraError("");
    setIsCameraActive(true);
  };

  const handleToggleCamera = () => {
    if (!isCameraActive || !isCameraReady || isBusy) {
      return;
    }

    setIsCameraReady(false);
    setCameraFacing((currentFacing) =>
      currentFacing === "front" ? "back" : "front",
    );
  };

  const handleRemovePhoto = (photoId: string) => {
    Alert.alert(
      "Remove photo?",
      "This photo will be removed from your current booth session.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeCapturedPhoto(photoId);
          },
        },
      ],
    );
  };

  const isBusy = countdown !== null || isCapturing;
  const hasReachedPhotoLimit = capturedPhotos.length >= MAX_SESSION_PHOTOS;
  const isCaptureDisabled =
    isBusy ||
    !permission?.granted ||
    !isCameraActive ||
    !isCameraReady ||
    hasReachedPhotoLimit;
  const isPreviewDisabled = capturedPhotos.length === 0 || isBusy;
  const isCameraControlDisabled = !permission?.granted || isCapturing;
  const isFlipDisabled = !isCameraActive || !isCameraReady || isBusy;
  const isNextDisabled = isBusy || !hasReachedPhotoLimit;

  const renderCameraContent = () => {
    if (!permission) {
      return (
        <View style={styles.cameraMessage}>
          <ActivityIndicator color={colors.white} />
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
          <View style={styles.messageIcon}>
            <SymbolView
              name={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
              size={34}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.cameraMessageTitle}>Camera access is required</Text>
          <Text style={styles.cameraMessageText}>
            Allow camera access to take your School Booth photos.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.primaryMessageButton,
              pressed && styles.pressed,
            ]}
            onPress={() => void handlePermissionPress()}
            accessibilityRole="button"
            accessibilityLabel={permission.canAskAgain ? "Enable camera" : "Open settings"}
          >
            <Text style={styles.primaryMessageButtonText}>
              {permission.canAskAgain ? "Enable Camera" : "Open Settings"}
            </Text>
          </Pressable>
        </View>
      );
    }

    if (!isCameraActive) {
      return (
        <View style={styles.cameraMessage}>
          <View style={styles.messageIcon}>
            <SymbolView
              name={{ ios: "video.slash.fill", android: "videocam_off", web: "videocam_off" }}
              size={34}
              tintColor={colors.blue}
            />
          </View>
          <Text style={styles.cameraMessageTitle}>Camera is stopped</Text>
          <Text style={styles.cameraMessageText}>
            Your captured photos are still available in Preview.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.primaryMessageButton,
              pressed && styles.pressed,
            ]}
            onPress={handleStartCamera}
            accessibilityRole="button"
          >
            <Text style={styles.primaryMessageButtonText}>Start Camera</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <CameraView
        key={cameraFacing}
        ref={cameraRef}
        style={styles.cameraPreview}
        facing={cameraFacing}
        onCameraReady={() => {
          setIsCameraReady(true);
          setCameraError("");
        }}
        onMountError={() => {
          isCameraActiveRef.current = false;
          setIsCameraActive(false);
          setIsCameraReady(false);
          setCameraError("The camera could not start. Please check your device settings.");
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topToolbar}>
        <Pressable
          style={({ pressed }) => [
            styles.toolbarButton,
            isPreviewDisabled && styles.buttonDisabled,
            pressed && !isPreviewDisabled && styles.pressed,
          ]}
          onPress={() => setIsPreviewOpen(true)}
          disabled={isPreviewDisabled}
          accessibilityRole="button"
          accessibilityLabel={`Preview ${capturedPhotos.length} captured photos`}
          accessibilityState={{ disabled: isPreviewDisabled }}
        >
          <SymbolView
            name={{ ios: "photo.on.rectangle", android: "photo_library", web: "photo_library" }}
            size={20}
            tintColor={colors.blue}
          />
          <Text style={styles.toolbarButtonText}>Preview</Text>
          <View style={styles.photoCountBadge}>
            <Text style={styles.photoCountText}>
              {capturedPhotos.length}/{MAX_SESSION_PHOTOS}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.toolbarButton,
            styles.cameraPowerButton,
            isCameraControlDisabled && styles.buttonDisabled,
            pressed && !isCameraControlDisabled && styles.pressed,
          ]}
          onPress={isCameraActive ? handleStopCamera : handleStartCamera}
          disabled={isCameraControlDisabled}
          accessibilityRole="button"
          accessibilityLabel={isCameraActive ? "Stop camera" : "Start camera"}
          accessibilityState={{ disabled: isCameraControlDisabled }}
        >
          <SymbolView
            name={{
              ios: isCameraActive ? "stop.circle.fill" : "play.circle.fill",
              android: isCameraActive ? "stop_circle" : "play_circle",
              web: isCameraActive ? "stop_circle" : "play_circle",
            }}
            size={21}
            tintColor={isCameraActive ? colors.pink : colors.blue}
          />
          <Text style={styles.toolbarButtonText}>
            {isCameraActive ? "Stop" : "Start"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.cameraStage}>
        {renderCameraContent()}

        {permission?.granted && isCameraActive && (
          <View style={styles.cameraStatus} pointerEvents="none">
            <View
              style={[
                styles.statusDot,
                !isCameraReady && styles.statusDotLoading,
              ]}
            />
            <Text style={styles.cameraStatusText}>
              {isCameraReady
                ? `${cameraFacing === "front" ? "Front" : "Rear"} Camera`
                : "Starting Camera"}
            </Text>
          </View>
        )}

        {countdown !== null && (
          <View style={styles.countdownOverlay} pointerEvents="none">
            <Text style={styles.countdownText}>{countdown}</Text>
            <Text style={styles.countdownLabel}>Get ready!</Text>
          </View>
        )}

        {cameraError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{cameraError}</Text>
          </View>
        ) : null}

        <View style={styles.bottomControls}>
          <View style={styles.timerRow}>
            <View style={styles.timerLabel}>
              <SymbolView
                name={{ ios: "timer", android: "timer", web: "timer" }}
                size={18}
                tintColor={colors.white}
              />
              <Text style={styles.timerLabelText}>Timer</Text>
            </View>

            <View style={styles.timerOptions}>
              {TIMER_OPTIONS.map((timer) => {
                const isTimerDisabled =
                  isBusy || hasReachedPhotoLimit || !isCameraActive;

                return (
                  <Pressable
                    style={({ pressed }) => [
                      styles.timerChip,
                      selectedTimer === timer && styles.timerChipActive,
                      isTimerDisabled && styles.timerChipDisabled,
                      pressed && !isTimerDisabled && styles.pressed,
                    ]}
                    onPress={() => setSelectedTimer(timer)}
                    disabled={isTimerDisabled}
                    accessibilityRole="button"
                    accessibilityLabel={`${timer} second timer`}
                    accessibilityState={{
                      selected: selectedTimer === timer,
                      disabled: isTimerDisabled,
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
                );
              })}
            </View>
          </View>

          <View style={styles.captureActions}>
            <Pressable
              style={({ pressed }) => [
                styles.roundActionButton,
                isFlipDisabled && styles.buttonDisabled,
                pressed && !isFlipDisabled && styles.pressed,
              ]}
              onPress={handleToggleCamera}
              disabled={isFlipDisabled}
              accessibilityRole="button"
              accessibilityLabel="Switch front and rear camera"
              accessibilityState={{ disabled: isFlipDisabled }}
            >
              <SymbolView
                name={{ ios: "arrow.triangle.2.circlepath.camera", android: "cameraswitch", web: "cameraswitch" }}
                size={25}
                tintColor={colors.white}
              />
              <Text style={styles.actionLabel}>Flip</Text>
            </Pressable>

            <Pressable
              style={styles.shutterControl}
              onPress={handleTakePhoto}
              disabled={isCaptureDisabled}
              accessibilityRole="button"
              accessibilityLabel="Take photo"
              accessibilityState={{ disabled: isCaptureDisabled }}
            >
              <View
                style={[
                  styles.shutterOuter,
                  isCaptureDisabled && styles.buttonDisabled,
                ]}
              >
                <View style={styles.shutterInner} />
              </View>
              <Text style={styles.shutterLabel}>
                {isCapturing
                  ? "Capturing"
                  : hasReachedPhotoLimit
                    ? "4 Photos"
                    : "Capture"}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.nextButton,
                isNextDisabled && styles.buttonDisabled,
                pressed && !isNextDisabled && styles.pressed,
              ]}
              onPress={() => router.push("/templates")}
              disabled={isNextDisabled}
              accessibilityRole="button"
              accessibilityLabel="Continue to templates"
              accessibilityState={{ disabled: isNextDisabled }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <SymbolView
                name={{ ios: "chevron.right", android: "arrow_forward", web: "arrow_forward" }}
                size={20}
                tintColor={colors.white}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <CapturedPhotosModal
        visible={isPreviewOpen}
        photos={capturedPhotos}
        maxPhotos={MAX_SESSION_PHOTOS}
        onClose={() => setIsPreviewOpen(false)}
        onRemovePhoto={handleRemovePhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
    gap: 10,
  },
  topToolbar: {
    flexDirection: "row",
    gap: 10,
  },
  toolbarButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  cameraPowerButton: {
    flex: 0.72,
  },
  toolbarButtonText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  photoCountBadge: {
    minWidth: 36,
    minHeight: 25,
    paddingHorizontal: 6,
    borderRadius: 13,
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  photoCountText: {
    color: colors.blue,
    fontSize: 11,
    fontWeight: "900",
  },
  cameraStage: {
    flex: 1,
    minHeight: 0,
    borderRadius: 20,
    backgroundColor: colors.navy,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPreview: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  cameraMessage: {
    width: "100%",
    paddingHorizontal: 30,
    paddingBottom: 130,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  messageIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraMessageTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  cameraMessageText: {
    maxWidth: 280,
    color: "#cfdbf5",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  primaryMessageButton: {
    minHeight: 44,
    marginTop: 4,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryMessageButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  cameraStatus: {
    position: "absolute",
    top: 12,
    left: 12,
    minHeight: 34,
    paddingHorizontal: 11,
    borderRadius: 18,
    backgroundColor: "rgba(6, 26, 71, 0.78)",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    zIndex: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#36d889",
  },
  statusDotLoading: {
    backgroundColor: "#ffca57",
  },
  cameraStatusText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  countdownOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingBottom: 130,
    backgroundColor: "rgba(6, 26, 71, 0.58)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  countdownText: {
    color: colors.white,
    fontSize: 82,
    lineHeight: 88,
    fontWeight: "900",
  },
  countdownLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  errorBanner: {
    position: "absolute",
    top: 54,
    left: 12,
    right: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "rgba(255, 79, 135, 0.92)",
    zIndex: 6,
  },
  errorText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  bottomControls: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 13,
    backgroundColor: "rgba(6, 26, 71, 0.82)",
    gap: 10,
    zIndex: 7,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  timerLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timerLabelText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
  timerOptions: {
    flex: 1,
    maxWidth: 210,
    flexDirection: "row",
    gap: 7,
  },
  timerChip: {
    flex: 1,
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  timerChipActive: {
    backgroundColor: colors.blue,
  },
  timerChipDisabled: {
    opacity: 0.48,
  },
  timerText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
  timerTextActive: {
    color: colors.white,
  },
  captureActions: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  roundActionButton: {
    width: 62,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  actionLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
  },
  shutterControl: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  shutterOuter: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  shutterLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
  },
  nextButton: {
    minWidth: 82,
    minHeight: 46,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  buttonDisabled: {
    opacity: 0.42,
  },
  pressed: {
    opacity: 0.72,
  },
});
