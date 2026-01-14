import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Playback speed options
const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

type VideoSource = {
  id: string;
  label: string;
  uri: string;
};

type SettingsPanelProps = {
  isVisible: boolean;
  onClose: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  videoSources: VideoSource[];
  currentSourceId?: string;
  onSourceChange?: (source: VideoSource) => void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isVisible,
  onClose,
  playbackSpeed,
  onSpeedChange,
  videoSources,
  currentSourceId,
  onSourceChange,
}) => {
  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.settingsOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.settingsContainer}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Playback Speed */}
              <Text style={styles.settingsTitle}>Playback Speed</Text>
              <View style={styles.speedOptions}>
                {PLAYBACK_SPEEDS.map((speed) => (
                  <TouchableOpacity
                    key={speed}
                    style={[
                      styles.speedOption,
                      playbackSpeed === speed && styles.speedOptionActive,
                    ]}
                    onPress={() => onSpeedChange(speed)}
                  >
                    <Text
                      style={[
                        styles.speedOptionText,
                        playbackSpeed === speed && styles.speedOptionTextActive,
                      ]}
                    >
                      {speed}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Video Quality/Source */}
              {videoSources.length > 0 && (
                <>
                  <Text style={styles.settingsTitle}>Quality</Text>
                  <View style={styles.qualityOptions}>
                    {videoSources.map((source) => (
                      <TouchableOpacity
                        key={source.id}
                        style={[
                          styles.qualityOption,
                          currentSourceId === source.id &&
                            styles.qualityOptionActive,
                        ]}
                        onPress={() => {
                          onSourceChange?.(source);
                          onClose();
                        }}
                      >
                        <Text
                          style={[
                            styles.qualityOptionText,
                            currentSourceId === source.id &&
                              styles.qualityOptionTextActive,
                          ]}
                        >
                          {source.label}
                        </Text>
                        {currentSourceId === source.id && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#e50914"
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  settingsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
    elevation: 200,
  },
  settingsContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 320,
    maxHeight: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 1,
  },
  settingsTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },
  speedOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  speedOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  speedOptionActive: {
    backgroundColor: "#e50914",
  },
  speedOptionText: {
    color: "#fff",
    fontSize: 13,
  },
  speedOptionTextActive: {
    fontWeight: "600",
  },
  qualityOptions: {
    gap: 4,
  },
  qualityOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  qualityOptionActive: {
    backgroundColor: "rgba(229, 9, 20, 0.1)",
  },
  qualityOptionText: {
    color: "#fff",
    fontSize: 14,
  },
  qualityOptionTextActive: {
    color: "#e50914",
    fontWeight: "600",
  },
});

export default SettingsPanel;
