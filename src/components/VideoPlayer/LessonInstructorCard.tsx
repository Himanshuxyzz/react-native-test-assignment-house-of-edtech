import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { lessonDataTypes } from "@/types/types";

type LessonInstructorCardProps = {
  lessonData: lessonDataTypes;
};

const LessonInstructorCard = ({ lessonData }: LessonInstructorCardProps) => {
  return (
    <View style={styles.instructorCard}>
      <Image
        fadeDuration={1000}
        source={{ uri: lessonData.instructor.avatar }}
        style={styles.instructorAvatar}
      />
      <View style={styles.instructorInfo}>
        <Text style={styles.instructorName}>{lessonData.instructor.name}</Text>
        <Text style={styles.instructorTitle}>
          {lessonData.instructor.title}
        </Text>
      </View>
    </View>
  );
};

export default LessonInstructorCard;

const styles = StyleSheet.create({
  instructorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 12,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  instructorInfo: {
    marginLeft: 14,
  },
  instructorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  instructorTitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
