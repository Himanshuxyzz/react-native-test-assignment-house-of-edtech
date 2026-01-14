import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type CenterControlsProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: (seconds: number) => void;
  isBuffering: boolean;
};

const CenterControls: React.FC<CenterControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSkip,
  isBuffering,
}) => {
  if (isBuffering) return <View style={styles.centerControls} />;

  return (
    <View style={styles.centerControls}>
      {!isPlaying && (
        <TouchableOpacity style={styles.skipButton} onPress={() => onSkip(-10)}>
          <Ionicons name="play-back" size={32} color="#fff" />
          <Text style={styles.skipText}>10</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.playPauseButton} onPress={onPlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#fff" />
      </TouchableOpacity>

      {!isPlaying && (
        <TouchableOpacity style={styles.skipButton} onPress={() => onSkip(10)}>
          <Ionicons name="play-forward" size={32} color="#fff" />
          <Text style={styles.skipText}>10</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  skipButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
  },
  skipText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginTop: -4,
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CenterControls;
