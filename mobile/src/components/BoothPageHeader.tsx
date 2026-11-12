import { type Href, Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme";

interface BoothPageHeaderProps {
  backHref: "/capture" | "/templates";
  title: string;
  description: string;
}

export default function BoothPageHeader({
  backHref,
  title,
  description,
}: BoothPageHeaderProps) {
  return (
    <View style={styles.header}>
      <Link href={backHref as Href} asChild>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
          accessibilityLabel={`Go back from ${title}`}
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
            size={21}
            tintColor={colors.navy}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </Link>

      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 14,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  buttonPressed: {
    opacity: 0.72,
  },
  backText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "800",
  },
  copy: {
    gap: 4,
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
