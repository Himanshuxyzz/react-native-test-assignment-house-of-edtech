import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SkeletonContainer, SkeletonItem } from "@/components/common/Skeleton";
import Theme from "@/styles/Theme";

const LessonScreenSkeleton = () => {
  return (
    <SkeletonContainer>
      {/* Video Player Placeholder */}
      <SkeletonItem width="100%" height={240} borderRadius={0} />

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Lesson Header */}
        <View style={styles.section}>
          <SkeletonItem width={120} height={12} style={{ marginBottom: 10 }} />
          <SkeletonItem width="80%" height={24} style={{ marginBottom: 16 }} />

          {/* Meta Info */}
          <View style={styles.row}>
            <SkeletonItem width={80} height={14} />
            <View style={{ width: 10 }} />
            <SkeletonItem width={100} height={14} />
          </View>

          {/* Progress Bar */}
          <SkeletonItem width="100%" height={6} style={{ marginTop: 20 }} />
          <SkeletonItem width={120} height={12} style={{ marginTop: 10 }} />
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <SkeletonItem width={150} height={18} style={{ marginBottom: 14 }} />
          <SkeletonItem width="100%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonItem width="100%" height={14} style={{ marginBottom: 8 }} />
          <SkeletonItem width="70%" height={14} />
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <SkeletonItem width={140} height={18} style={{ marginBottom: 14 }} />
          {[1, 2, 3].map((key) => (
            <View key={key} style={[styles.row, { marginBottom: 12 }]}>
              <SkeletonItem width={22} height={22} borderRadius={11} />
              <View style={{ width: 12 }} />
              <SkeletonItem width="80%" height={16} />
            </View>
          ))}
        </View>

        {/* Instructor Section */}
        <View style={styles.section}>
          <SkeletonItem width={100} height={18} style={{ marginBottom: 14 }} />
          <View
            style={[
              styles.row,
              { backgroundColor: "#f8f9fa", padding: 14, borderRadius: 12 },
            ]}
          >
            <SkeletonItem width={50} height={50} borderRadius={25} />
            <View style={{ marginLeft: 14 }}>
              <SkeletonItem
                width={120}
                height={16}
                style={{ marginBottom: 6 }}
              />
              <SkeletonItem width={160} height={14} />
            </View>
          </View>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <SkeletonItem width={140} height={18} style={{ marginBottom: 14 }} />
          {[1, 2].map((key) => (
            <View
              key={key}
              style={[
                styles.row,
                {
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f0f0f0",
                },
              ]}
            >
              <SkeletonItem width={20} height={20} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <SkeletonItem
                  width={120}
                  height={14}
                  style={{ marginBottom: 4 }}
                />
                <SkeletonItem width={60} height={12} />
              </View>
              <SkeletonItem width={16} height={16} />
            </View>
          ))}
        </View>

        {/* Navigation Section */}
        <View
          style={{ flexDirection: "row", padding: 16, gap: 12, marginTop: 12 }}
        >
          {/* Previous Button Skeleton */}
          <View
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <SkeletonItem width={60} height={12} style={{ marginBottom: 6 }} />
            <SkeletonItem width="80%" height={14} />
          </View>

          {/* Next Button Skeleton */}
          <View
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 12,
              backgroundColor: "#e0e0e0",
            }}
          >
            <SkeletonItem
              width={40}
              height={12}
              style={{ marginBottom: 6, alignSelf: "flex-end" }}
            />
            <SkeletonItem
              width="80%"
              height={14}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SkeletonContainer>
  );
};

export default LessonScreenSkeleton;

const styles = StyleSheet.create({
  header: {
    padding: Theme.SIZES.SM,
    backgroundColor: Theme.COLORS.BACKGROUND,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
