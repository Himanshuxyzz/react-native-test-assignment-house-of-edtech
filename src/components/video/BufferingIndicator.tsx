import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

type BufferingIndicatorProps = {
  isBuffering: boolean;
};

const BufferingIndicator: React.FC<BufferingIndicatorProps> = ({
  isBuffering,
}) => {
  if (!isBuffering) return null;

  return (
    <View style={styles.bufferingContainer}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
    elevation: 100,
  },
});

export default BufferingIndicator;
