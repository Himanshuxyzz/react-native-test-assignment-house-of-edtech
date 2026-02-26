import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Container } from "@/components/common";
import Theme from "@/styles/Theme";
import Constants from "expo-constants";
import {
  setAlternateAppIcon,
  getAppIconName,
  supportsAlternateIcons,
} from "expo-alternate-app-icons";

const APP_ICONS = [
  {
    id: "Standard",
    name: "Standard",
    asset: require("../../assets/icon-a.png"),
  },
  { id: "Holi", name: "Holi", asset: require("../../assets/icon-b.png") },
  {
    id: "Christmas",
    name: "Christmas",
    asset: require("../../assets/icon-c.png"),
  },
  { id: "Diwali", name: "Diwali", asset: require("../../assets/icon-d.png") },
];

const APP_ENV = Constants.expoConfig?.extra?.APP_ENV ?? "development";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

const ENV_BADGE_COLORS: Record<string, string> = {
  development: "#FF9500",
  preview: "#5856D6",
  production: "#34C759",
};

const Settings = () => {
  const [currentIcon, setCurrentIcon] = useState<string | null>(null);
  const [canChangeIcon, setCanChangeIcon] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      const isSupported = supportsAlternateIcons;
      setCanChangeIcon(isSupported);
      if (isSupported) {
        const iconName = await getAppIconName();
        setCurrentIcon(iconName || "Standard");
      }
    };
    checkSupport();
  }, []);

  const handleIconChange = async (iconId: string) => {
    // Optimistic UI Update
    const previousIcon = currentIcon;
    setCurrentIcon(iconId);

    // Small delay to allow UI to update before system popup appears
    setTimeout(async () => {
      try {
        const targetIcon = iconId === "Standard" ? null : iconId;
        await setAlternateAppIcon(targetIcon);
      } catch (error) {
        // Rollback on error
        setCurrentIcon(previousIcon);
        Alert.alert(
          "Error",
          "Could not change app icon. Note: This requires a native build.",
        );
      }
    }, 100);
  };

  const handleTestCrash = () => {
    Alert.alert(
      "Test Crash",
      "This will crash the app to test the Error Boundary. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Crash",
          style: "destructive",
          onPress: () => setShouldCrash(true),
        },
      ],
    );
  };

  // Error thrown during render → caught by ErrorBoundary
  if (shouldCrash) {
    throw new Error("Sentry Test Crash - JS Error");
  }

  return (
    <Container style={styles.container} removeBottomInset={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=antigravity" }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Test</Text>
            <Text style={styles.profileEmail}>test@gmail.com</Text>
          </View>
        </View>

        {/* Environment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environment</Text>
          <View style={styles.envCard}>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>Build Profile</Text>
              <View
                style={[
                  styles.envBadge,
                  { backgroundColor: ENV_BADGE_COLORS[APP_ENV] ?? "#8e8e93" },
                ]}
              >
                <Text style={styles.envBadgeText}>{APP_ENV.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>App Version</Text>
              <Text style={styles.envValue}>{APP_VERSION}</Text>
            </View>
            <View style={styles.envRow}>
              <Text style={styles.envLabel}>App Name</Text>
              <Text style={styles.envValue}>
                {Constants.expoConfig?.name ?? "—"}
              </Text>
            </View>
          </View>
        </View>

        {/* App Icon Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Icon</Text>
          <View style={styles.iconGrid}>
            {APP_ICONS.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                style={[
                  styles.iconCard,
                  currentIcon === icon.id && styles.activeIconCard,
                ]}
                onPress={() => handleIconChange(icon.id)}
              >
                <Image source={icon.asset} style={styles.iconThumbnail} />
                <Text
                  style={[
                    styles.iconLabel,
                    currentIcon === icon.id && styles.activeIconLabel,
                  ]}
                >
                  {icon.name}
                </Text>
                {currentIcon === icon.id && <View style={styles.activeDot} />}
              </TouchableOpacity>
            ))}
          </View>
          {!canChangeIcon && (
            <Text style={styles.supportWarning}>
              Alternate icons are not supported in Expo Go. Use a development
              build or production build.
            </Text>
          )}
        </View>

        {/* Other Settings Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, styles.debugItem]}
            onPress={handleTestCrash}
          >
            <Text style={[styles.menuItemText, styles.debugText]}>
              Test Sentry Crash
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f7fa",
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: Theme.COLORS.TEXT,
  },
  profileEmail: {
    fontSize: 14,
    color: "#8e8e93",
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.COLORS.TEXT,
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconCard: {
    width: (Theme.SIZES.WINDOW_WIDTH - 64) / 2, // 2 items per row with gap
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeIconCard: {
    borderColor: Theme.COLORS.PRIMARY,
    backgroundColor: "#f0f0ff",
  },
  iconThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3A3A3C",
  },
  activeIconLabel: {
    color: Theme.COLORS.PRIMARY,
    fontWeight: "600",
  },
  activeDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.COLORS.PRIMARY,
  },
  supportWarning: {
    marginTop: 12,
    fontSize: 12,
    color: "#FF9500",
    fontStyle: "italic",
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    fontSize: 16,
    color: Theme.COLORS.TEXT,
  },
  envCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  envRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  envLabel: {
    fontSize: 14,
    color: "#8e8e93",
  },
  envValue: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Theme.COLORS.TEXT,
  },
  envBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  envBadgeText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#fff",
    letterSpacing: 0.8,
  },
  debugItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  debugText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});

export default Settings;
