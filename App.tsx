import React from "react";
import { View, StyleSheet } from "react-native";
import RootNavigation from "@/navigation";
import { ErrorBoundary, OfflineBanner } from "@/components/common";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://d2050e1ce07fa6fbac26db273622ed58@o4510952694874112.ingest.us.sentry.io/4510952697888768",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function App() {
  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <OfflineBanner />
        <RootNavigation />
      </View>
    </ErrorBoundary>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
