import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";

type BottomControlsProps = {
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  onSlidingStart: (value: number) => void;
  onValueChange: (value: number) => void;
  onSlidingComplete: (value: number) => void;
  playbackSpeed: number;
};

const BottomControls: React.FC<BottomControlsProps> = ({
  currentTime,
  duration,
  formatTime,
  onSlidingStart,
  onValueChange,
  onSlidingComplete,
  playbackSpeed,
}) => {
  return (
    <View style={styles.bottomBar}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        minimumTrackTintColor="#e50914"
        maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
        thumbTintColor="#e50914"
        onSlidingStart={onSlidingStart}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
      />

      <Text style={styles.timeText}>{formatTime(duration)}</Text>

      {playbackSpeed !== 1 && (
        <Text style={styles.speedBadge}>{playbackSpeed}x</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  timeText: {
    color: "#fff",
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    minWidth: 35,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  speedBadge: {
    color: "#e50914",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default BottomControls;
