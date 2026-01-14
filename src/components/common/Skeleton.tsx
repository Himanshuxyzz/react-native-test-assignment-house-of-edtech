import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  DimensionValue,
} from "react-native";

const { width } = Dimensions.get("window");

export interface SkeletonItemProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

// Generic Skeleton Item with shimmer animation
export const SkeletonItem = ({
  width: boxWidth = "100%",
  height = 20,
  borderRadius = 4,
  style = {},
}: SkeletonItemProps) => {
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

export interface SkeletonContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Generic Skeleton Container
export const SkeletonContainer = ({
  children,
  style,
}: SkeletonContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
});
