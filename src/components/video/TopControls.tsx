import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type TopControlsProps = {
  isMuted: boolean;
  onMuteToggle: () => void;
  onSettingsPress: () => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
};

const TopControls: React.FC<TopControlsProps> = ({
  isMuted,
  onMuteToggle,
  onSettingsPress,
  isFullscreen,
  onFullscreenToggle,
}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.iconButton} onPress={onMuteToggle}>
        <Ionicons
          name={isMuted ? "volume-mute" : "volume-high"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.topBarRight}>
        <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onFullscreenToggle}
        >
          <Ionicons
            name={isFullscreen ? "contract" : "expand"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  topBarRight: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopControls;
