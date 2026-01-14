import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Theme from "@/styles/Theme";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const LessonSection = ({ title, children }: SectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default LessonSection;

const styles = StyleSheet.create({
  section: {
    backgroundColor: Theme.COLORS.BACKGROUND,
    padding: Theme.SIZES.XL,
    marginTop: Theme.SIZES.XS,
  },
  sectionTitle: {
    fontSize: Theme.SIZES.MD,
    fontWeight: "700",
    color: Theme.COLORS.TEXT,
    marginBottom: Theme.SIZES.MD,
  },
});
