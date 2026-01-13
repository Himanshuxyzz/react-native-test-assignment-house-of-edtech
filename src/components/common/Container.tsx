import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Theme from "@/styles/Theme";

type ContainerProps = {
  children: React.ReactNode;
  edgeToEdge?: boolean;
  removeBottomInset?: boolean;
  style?: ViewStyle;
};

const Container: React.FC<ContainerProps> = ({
  children,
  edgeToEdge = false,
  removeBottomInset = false,
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {edgeToEdge && <View style={{ height: insets.top }} />}
      <View
        style={[
          styles.container,
          !edgeToEdge && {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: Theme.SIZES.MD,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
      {edgeToEdge && !removeBottomInset && (
        <View style={{ height: insets.bottom }} />
      )}
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
