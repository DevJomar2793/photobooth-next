import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme";

export default function PageFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2026 DevJomar. All rights reserved.</Text>
      <Text style={styles.message}>Capture Good Vibes! ♥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: 24,
    paddingTop: 16,
    gap: 4,
    alignItems: "center",
  },
  text: {
    color: colors.muted,
    fontSize: 11,
  },
  message: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: "700",
  },
});
