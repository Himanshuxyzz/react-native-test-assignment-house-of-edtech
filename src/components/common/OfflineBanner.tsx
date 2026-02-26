import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(false);
  const translateY = useState(new Animated.Value(-100))[0];

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isInternetReachable is null initially (unknown) — treat as online
      const offline = state.isConnected === false;
      setIsOffline(offline);

      Animated.spring(translateY, {
        toValue: offline ? 0 : -100,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  // Always render (for animation), but hidden when online
  return (
    <Animated.View
      style={[styles.banner, { transform: [{ translateY }] }]}
      pointerEvents={isOffline ? "auto" : "none"}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>📡</Text>
        <Text style={styles.text}>No internet connection</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: "#FF3B30",
    paddingTop: 50, // accounts for status bar
    paddingBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OfflineBanner;
