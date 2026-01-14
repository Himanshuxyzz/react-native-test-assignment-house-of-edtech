import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Theme from "@/styles/Theme";

type ResourceLinksProps = {
  resource: any;
  onPress?: () => void;
};

const ResourceLinks = ({ resource, onPress }: ResourceLinksProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.resourceItem}
      onPress={onPress}
    >
      <Text style={styles.resourceIcon}>{resource.icon}</Text>
      <View style={styles.resourceInfo}>
        <Text style={styles.resourceName}>{resource.name}</Text>
        <Text style={styles.resourceSize}>{resource.size}</Text>
      </View>
      <Text style={styles.downloadIcon}>⬇️</Text>
    </TouchableOpacity>
  );
};

export default ResourceLinks;

const styles = StyleSheet.create({
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.COLORS.SKELETON,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceIcon: {
    fontSize: 16,
    color: Theme.COLORS.PRIMARY,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: 500,
    color: Theme.COLORS.TEXT,
  },
  resourceSize: {
    fontSize: 12,
    color: Theme.COLORS.TEXT,
  },
  downloadIcon: {
    fontSize: 16,
    color: Theme.COLORS.PRIMARY,
  },
});
