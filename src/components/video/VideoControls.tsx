import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  GestureResponderEvent,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VideoPlayer, VideoView } from "expo-video";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicons from "@expo/vector-icons/Ionicons";

import BufferingIndicator from "./BufferingIndicator";
import TopControls from "./TopControls";
import CenterControls from "./CenterControls";
import BottomControls from "./BottomControls";
import SettingsPanel from "./SettingsPanel";

const CONTROLS_TIMEOUT = 3000;

type VideoSource = {
  id: string;
  label: string;
  uri: string;
};

type VideoControlsProps = {
  player: VideoPlayer;
  videoViewRef: React.RefObject<VideoView | null>;
  isPlaying: boolean;
  isBuffering?: boolean;
  isFullscreen?: boolean;
  videoSources?: VideoSource[];
  currentSourceId?: string;
  onSourceChange?: (source: VideoSource) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
};

const DOUBLE_TAP_DELAY = 300;

type DoubleTapFeedbackProps = {
  side: "left" | "right";
};

const DoubleTapFeedback: React.FC<DoubleTapFeedbackProps> = ({ side }) => {
  return (
    <View
      style={[
        styles.feedbackContainer,
        side === "left" ? styles.feedbackLeft : styles.feedbackRight,
      ]}
    >
      <View style={styles.feedbackContent}>
        <Ionicons
          name={side === "left" ? "play-back" : "play-forward"}
          size={40}
          color="white"
        />
        <Text style={styles.feedbackText}>10s</Text>
      </View>
    </View>
  );
};

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  player,
  videoViewRef,
  isPlaying,
  isBuffering = false,
  isFullscreen = false,
  videoSources = [],
  currentSourceId,
  onSourceChange,
  onFullscreenChange,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const opacity = useSharedValue(1);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSeekingRef = useRef(false);
  const lastTapRef = useRef(0);
  const singleTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayWidth = useRef(Dimensions.get("window").width);
  const [doubleTapSide, setDoubleTapSide] = useState<"left" | "right" | null>(
    null,
  );

  // Keep fresh ref to toggleControls for the timeout closure
  const toggleControlsRef = useRef<() => void>(() => {});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Safe area insets
  const insets = useSafeAreaInsets();

  // Update time
  useEffect(() => {
    // We use a ref here because React state updates are async.
    // If we only checked `!isSeeking`, a tick could fire before the state flips,
    // causing the slider to ghost-jump back to the old video time.
    const interval = setInterval(() => {
      if (!isSeeking && !isSeekingRef.current && player) {
        setCurrentTime(player.currentTime || 0);
        setDuration(player.duration || 0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [player, isSeeking]);

  // Auto-hide
  useEffect(() => {
    if (showControls && isPlaying && !isSeeking && !showSettings) {
      hideTimeoutRef.current = setTimeout(() => {
        hideControls();
      }, CONTROLS_TIMEOUT);
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [showControls, isPlaying, isSeeking, showSettings]);

  const hideControls = () => {
    opacity.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(setShowControls)(false);
      }
    });
  };

  const showControlsHandler = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setShowControls(true);
    opacity.value = withTiming(1, { duration: 200 });
  };

  const toggleControls = useCallback(() => {
    if (showSettings) {
      setShowSettings(false);
      return;
    }
    showControls ? hideControls() : showControlsHandler();
  }, [showSettings, showControls]);

  // Update the ref whenever toggleControls changes
  useEffect(() => {
    toggleControlsRef.current = toggleControls;
  }, [toggleControls]);

  const handleOverlayPress = (e: GestureResponderEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (singleTapTimeoutRef.current) {
        clearTimeout(singleTapTimeoutRef.current);
        singleTapTimeoutRef.current = null;
      }

      const { locationX } = e.nativeEvent;
      const isLeft = locationX < overlayWidth.current / 2;

      showControlsHandler();
      player.seekBy(isLeft ? -10 : 10);
      setDoubleTapSide(isLeft ? "left" : "right");

      // Clear feedback after animation/delay
      setTimeout(() => {
        setDoubleTapSide(null);
      }, 600);
    } else {
      // Potential single tap
      lastTapRef.current = now;
      singleTapTimeoutRef.current = setTimeout(() => {
        toggleControlsRef.current();
        singleTapTimeoutRef.current = null;
      }, DOUBLE_TAP_DELAY);
    }
  };

  const handlePlayPause = useCallback(() => {
    showControlsHandler();
    isPlaying ? player.pause() : player.play();
  }, [player, isPlaying]);

  const handleSkip = useCallback(
    (seconds: number) => {
      showControlsHandler();
      player.seekBy(seconds);
    },
    [player],
  );

  const handleMuteToggle = useCallback(() => {
    showControlsHandler();
    const newMuted = !isMuted;
    player.muted = newMuted;
    setIsMuted(newMuted);
  }, [player, isMuted]);

  // Fullscreen toggle - just rotate, don't use native fullscreen
  const handleFullscreen = useCallback(async () => {
    showControlsHandler();
    try {
      const newFullscreen = !isFullscreen;
      if (newFullscreen) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE,
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      }
      onFullscreenChange?.(newFullscreen);
    } catch (error) {
      console.log("Fullscreen error:", error);
    }
  }, [isFullscreen, onFullscreenChange]);

  // Playback speed
  const handleSpeedChange = useCallback(
    (speed: number) => {
      player.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSettings(false);
    },
    [player],
  );

  const wasPlayingRef = useRef(false);

  // Slider handlers
  const handleSlidingStart = useCallback(
    (value: number) => {
      showControlsHandler();
      setIsSeeking(true);
      isSeekingRef.current = true;
      wasPlayingRef.current = isPlaying;
      if (isPlaying) {
        player.pause();
      }
    },
    [isPlaying, player],
  );

  const handleSlidingComplete = useCallback(
    (value: number) => {
      // The player needs a moment to actually seek and report the new time.
      // We block updates for a split second so the slider doesn't visualy "snap back"
      // to the old time while the native player caches.
      setTimeout(() => {
        setIsSeeking(false);
        isSeekingRef.current = false;
      }, 1200);

      if (duration > 0) {
        player.currentTime = value;
        // Optimistic update: Hold the slider at the target position immediately
        setCurrentTime(value);
      }
      if (wasPlayingRef.current) {
        player.play();
      }
    },
    [duration, player],
  );

  // Optimistic UI update during slide
  const handleValueChange = useCallback((value: number) => {
    setCurrentTime(value);
  }, []);

  return (
    <>
      <BufferingIndicator isBuffering={isBuffering} />

      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View
          style={styles.overlay}
          onLayout={(e) => (overlayWidth.current = e.nativeEvent.layout.width)}
        >
          {doubleTapSide && <DoubleTapFeedback side={doubleTapSide} />}
          {showControls && (
            <Animated.View
              style={[
                styles.controlsContainer,
                animatedStyle,
                {
                  paddingTop: isFullscreen ? insets.top : 0,
                  paddingBottom: isFullscreen ? insets.bottom : 0,
                  paddingLeft: isFullscreen ? insets.left : 0,
                  paddingRight: isFullscreen ? insets.right : 0,
                },
              ]}
            >
              <View style={styles.darkOverlay} />

              <TopControls
                isMuted={isMuted}
                onMuteToggle={handleMuteToggle}
                onSettingsPress={() => setShowSettings(true)}
                isFullscreen={isFullscreen}
                onFullscreenToggle={handleFullscreen}
                onPiP={() => videoViewRef.current?.startPictureInPicture()}
              />

              {!doubleTapSide && (
                <CenterControls
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onSkip={handleSkip}
                  isBuffering={isBuffering}
                />
              )}

              <BottomControls
                currentTime={currentTime}
                duration={duration}
                formatTime={formatTime}
                onSlidingStart={handleSlidingStart}
                onValueChange={handleValueChange}
                onSlidingComplete={handleSlidingComplete}
                playbackSpeed={playbackSpeed}
              />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <SettingsPanel
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
        playbackSpeed={playbackSpeed}
        onSpeedChange={handleSpeedChange}
        videoSources={videoSources}
        currentSourceId={currentSourceId}
        onSourceChange={onSourceChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  feedbackContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.1)", // subtle flash background
  },
  feedbackLeft: {
    left: 0,
    borderTopRightRadius: 100, // Arc effect
    borderBottomRightRadius: 100,
  },
  feedbackRight: {
    right: 0,
    borderTopLeftRadius: 100, // Arc effect
    borderBottomLeftRadius: 100,
  },
  feedbackContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default VideoControls;
