import { useState } from "react";
import {
  Image,
  type LayoutChangeEvent,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

import type { CapturedPhoto } from "@/BoothSessionContext";
import {
  TEMPLATE_HEIGHT,
  TEMPLATE_WIDTH,
  type TemplateOption,
} from "@/data/templateOptions";

interface PhotoTemplateCanvasProps {
  template: TemplateOption;
  photos: CapturedPhoto[];
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export default function PhotoTemplateCanvas({
  template,
  photos,
  accessibilityLabel,
  style,
}: PhotoTemplateCanvasProps) {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const scale = canvasWidth / TEMPLATE_WIDTH;

  const handleLayout = (event: LayoutChangeEvent) => {
    setCanvasWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      style={[styles.canvas, style]}
      onLayout={handleLayout}
      accessible
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ?? `${template.name} template with four captured photos`
      }
    >
      <Image
        source={template.image}
        style={styles.templateImage}
        resizeMode="cover"
        accessible={false}
      />

      {canvasWidth > 0 &&
        template.photoSlots.map((slot, index) => {
          const photo = photos[index];

          if (!photo) {
            return null;
          }

          return (
            <View
              style={[
                styles.photoSlot,
                {
                  left: slot.x * scale,
                  top: slot.y * scale,
                  width: slot.width * scale,
                  height: slot.height * scale,
                  borderRadius: 8 * scale,
                },
              ]}
              key={`${template.id}-${index}`}
            >
              <Image
                source={{ uri: photo.uri }}
                style={styles.photo}
                resizeMode="cover"
                accessible={false}
              />
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: "100%",
    aspectRatio: TEMPLATE_WIDTH / TEMPLATE_HEIGHT,
    overflow: "hidden",
  },
  templateImage: {
    width: "100%",
    height: "100%",
  },
  photoSlot: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#dbe8f7",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});
