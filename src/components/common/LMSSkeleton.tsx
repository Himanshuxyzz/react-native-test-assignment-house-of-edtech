import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Base Skeleton Box with shimmer animation
const SkeletonBox = ({
  width: boxWidth = "100%",
  height = 20,
  borderRadius = 4,
  style = {},
}: {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        {
          width: boxWidth,
          height,
          borderRadius,
          backgroundColor: "#e0e0e0",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX }],
        }}
      >
        <View
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        />
      </Animated.View>
    </View>
  );
};

// Course Header Skeleton
const HeaderSkeleton = () => (
  <View style={styles.header}>
    <SkeletonBox width="70%" height={22} borderRadius={4} />
    <View style={styles.headerMeta}>
      <SkeletonBox width={80} height={14} borderRadius={4} />
      <SkeletonBox width={60} height={14} borderRadius={4} />
      <SkeletonBox width={70} height={14} borderRadius={4} />
    </View>
    <SkeletonBox
      width="100%"
      height={6}
      borderRadius={3}
      style={{ marginTop: 12 }}
    />
    <SkeletonBox
      width="40%"
      height={12}
      borderRadius={4}
      style={{ marginTop: 8 }}
    />
  </View>
);

// Lesson Item Skeleton
const LessonSkeleton = () => (
  <View style={styles.lessonItem}>
    <SkeletonBox width={22} height={22} borderRadius={11} />
    <View style={styles.lessonContent}>
      <SkeletonBox width="80%" height={14} borderRadius={4} />
      <View style={styles.lessonMeta}>
        <SkeletonBox width={50} height={12} borderRadius={4} />
        <SkeletonBox width={35} height={12} borderRadius={4} />
      </View>
    </View>
  </View>
);

// Section Skeleton
const SectionSkeleton = ({ lessonCount = 4 }: { lessonCount?: number }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <SkeletonBox width="60%" height={16} borderRadius={4} />
      <SkeletonBox width={80} height={12} borderRadius={4} />
    </View>
    {Array.from({ length: lessonCount }).map((_, index) => (
      <LessonSkeleton key={index} />
    ))}
  </View>
);

// Main LMS Skeleton Component
const LMSSkeleton = () => {
  return (
    <View style={styles.container}>
      <HeaderSkeleton />
      <View style={styles.contentWrapper}>
        <SectionSkeleton lessonCount={4} />
        <SectionSkeleton lessonCount={3} />
        <SectionSkeleton lessonCount={2} />
      </View>
    </View>
  );
};

export default LMSSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#d1d5db",
    padding: 20,
    paddingTop: 16,
  },
  headerMeta: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  contentWrapper: {
    padding: 12,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fafafa",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  lessonContent: {
    flex: 1,
    gap: 8,
  },
  lessonMeta: {
    flexDirection: "row",
    gap: 8,
  },
});
