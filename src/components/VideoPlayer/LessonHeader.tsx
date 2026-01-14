import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { lessonDataTypes } from "@/types/types";

type LessonHeaderProps = {
  lessonData: lessonDataTypes;
  progress: number;
};

const LessonHeader = ({ lessonData, progress }: LessonHeaderProps) => {
  return (
    <View style={styles.lessonHeader}>
      <Text style={styles.sectionLabel}>{lessonData?.section}</Text>
      <Text style={styles.lessonTitle}>{lessonData?.title}</Text>
      <View style={styles.lessonMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏱️</Text>
          <Text style={styles.metaText}>{lessonData?.duration}</Text>
        </View>
        <View style={styles.metaDot} />
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📚</Text>
          <Text style={styles.metaText}>
            Lesson {lessonData?.lessonNumber} of {lessonData?.totalLessons}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <LessonHeader.LessonProgress progress={progress} />
    </View>
  );
};

LessonHeader.LessonProgress = ({
  progress,
}: Pick<LessonHeaderProps, "progress">) => {
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

export default LessonHeader;

const styles = StyleSheet.create({
  lessonHeader: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionLabel: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#666",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },

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
