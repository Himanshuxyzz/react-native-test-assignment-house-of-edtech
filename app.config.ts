import { ExpoConfig, ConfigContext } from "expo/config";

// ─── Environment Detection ───────────────────────────────────────────────────
// EAS injects APP_ENV during builds. Falls back to "development" for local dev.
const APP_ENV = process.env.APP_ENV ?? "development";

// ─── Per-Environment Overrides ───────────────────────────────────────────────
const ENV_CONFIG = {
  development: {
    name: "LMS (Dev)",
    bundleIdentifier: "com.florestwud.testassignment.dev",
    androidPackage: "com.florestwud.testassignment.dev",
    icon: "./assets/icon-a.png",
  },
  preview: {
    name: "LMS (Preview)",
    bundleIdentifier: "com.florestwud.testassignment.preview",
    androidPackage: "com.florestwud.testassignment.preview",
    icon: "./assets/icon-a.png",
  },
  production: {
    name: "LMS",
    bundleIdentifier: "com.florestwud.testassignment",
    androidPackage: "com.florestwud.testassignment",
    icon: "./assets/icon-a.png",
  },
} as const;

const envConfig =
  ENV_CONFIG[APP_ENV as keyof typeof ENV_CONFIG] ?? ENV_CONFIG.development;

// ─── Shared Expo Config ──────────────────────────────────────────────────────
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: envConfig.name,
  slug: "test-assignment",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "test-assignment",
  icon: envConfig.icon,
  userInterfaceStyle: "light",
  newArchEnabled: true,

  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: envConfig.bundleIdentifier,
    appleTeamId: "VD9U7D234M",
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: envConfig.androidPackage,
  },

  web: {
    favicon: "./assets/favicon.png",
  },

  updates: {
    url: "https://u.expo.dev/ce0230ac-ba84-4f5a-89ca-4a3e3e303b03",
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  // expose APP_ENV to runtime via expo-constants
  extra: {
    APP_ENV,
    eas: {
      projectId: "ce0230ac-ba84-4f5a-89ca-4a3e3e303b03",
    },
  },

  plugins: [
    [
      "expo-video",
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],
    [
      "expo-alternate-app-icons",
      [
        {
          name: "Holi",
          ios: "./assets/icon-b.png",
          android: {
            foregroundImage: "./assets/icon-b.png",
            backgroundColor: "#ffffff",
          },
        },
        {
          name: "Christmas",
          ios: "./assets/icon-c.png",
          android: {
            foregroundImage: "./assets/icon-c.png",
            backgroundColor: "#ffffff",
          },
        },
        {
          name: "Diwali",
          ios: "./assets/icon-d.png",
          android: {
            foregroundImage: "./assets/icon-d.png",
            backgroundColor: "#ffffff",
          },
        },
      ],
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "react-native",
        organization: "test-purpose-6q",
      },
    ],
  ],
});
