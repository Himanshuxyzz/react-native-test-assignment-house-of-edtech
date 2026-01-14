import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Theme from "@/styles/Theme";

type CustomButtonProps = TouchableOpacityProps & {
  text?: string;
  onPress: () => void;
  asChild?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  asChild,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      {asChild ? children : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#000",
    padding: Theme.SIZES.MD,
    borderRadius: 8,
    flex: 1,
  },
  text: {
    color: "#000",
    fontSize: Theme.SIZES.MD,
    fontWeight: "bold",
    textAlign: "center",
  },
});
