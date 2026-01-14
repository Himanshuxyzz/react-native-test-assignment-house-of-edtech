import { StyleSheet, Text, View } from "react-native";
import React from "react";

type LessonProgressProps = {
  progress: number;
};

const LessonProgress = ({ progress }: LessonProgressProps) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {Math.round(progress)}% Course Complete
      </Text>
    </View>
  );
};

export default LessonProgress;

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e8e8e8",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6366f1",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
