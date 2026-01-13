import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Theme from "@/styles/Theme";

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  asChild?: boolean;
  children?: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  asChild,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
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
