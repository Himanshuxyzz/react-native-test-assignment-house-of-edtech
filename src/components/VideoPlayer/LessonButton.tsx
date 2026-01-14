import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Theme from "@/styles/Theme";

type LessonButtonProps = TouchableOpacityProps & {
  action: "PREVIOUS" | "NEXT";
  subTitle: string;
  onPress: () => void;
};

const LessonButton = ({
  action,
  subTitle,
  onPress,
  style,
  ...props
}: LessonButtonProps) => {
  const isNext = action === "NEXT";
  const title = action;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.navButton, isNext && styles.navButtonNext, style]}
      {...props}
    >
      {!isNext && <LessonButton.LessonButtonNavigationIcon action={action} />}
      <View
        style={[
          styles.navButtonContent,
          isNext && {
            justifyContent: "space-between",
            alignItems: "flex-end",
          },
        ]}
      >
        <Text
          style={[styles.navButtonLabel, isNext && styles.navButtonLabelNext]}
        >
          {title}
        </Text>
        <Text
          style={[styles.navButtonTitle, isNext && styles.navButtonTitleNext]}
          numberOfLines={1}
        >
          {subTitle}
        </Text>
      </View>
      {isNext && <LessonButton.LessonButtonNavigationIcon action={action} />}
    </TouchableOpacity>
  );
};

LessonButton.LessonButtonNavigationIcon = ({
  action,
}: Pick<LessonButtonProps, "action">) => {
  return (
    <Ionicons
      style={{
        marginRight: action === "PREVIOUS" ? 10 : 0,
        marginLeft: action === "NEXT" ? 10 : 0,
      }}
      name={
        action === "PREVIOUS" ? "arrow-back-outline" : "arrow-forward-outline"
      }
      size={18}
      color={action === "NEXT" ? "#fff" : "#000"}
    />
  );
};

export default LessonButton;

const styles = StyleSheet.create({
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.COLORS.SKELETON,
    padding: 14,
    borderRadius: Theme.SIZES.XS,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.COLORS.SKELETON,
  },
  navButtonNext: {
    backgroundColor: Theme.COLORS.PRIMARY,
    borderColor: Theme.COLORS.PRIMARY,
  },
  navButtonContent: {
    flex: 1,
  },
  navButtonLabel: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  navButtonLabelNext: {
    color: "#fff",
    textAlign: "right",
  },
  navButtonTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#333",
    marginTop: 2,
  },
  navButtonTitleNext: {
    color: "#fff",
    textAlign: "right",
  },
});
