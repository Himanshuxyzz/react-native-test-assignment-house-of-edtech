import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import * as ScreenOrientation from "expo-screen-orientation";
import { Container, Header } from "@/components/common";
import {
  lessonData,
  videoSources,
  VIDEO_QUALITY_OPTIONS,
} from "@/constants/constants";
import {
  LessonScreenSkeleton,
  LessonSection,
  LessonButton,
  LessonResourceLinks,
  LessonHeader,
  LessonInstructorCard,
} from "@/components/VideoScreen";
import { VideoControls } from "@/components/video";
import useDelayLoading from "@/hooks/useDelayLoading";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoPlayer = ({ navigation }: any) => {
  const videoViewRef = useRef<VideoView>(null);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [isBuffering, setIsBuffering] = useState(false);

  const isLoading = useDelayLoading();

  const player = useVideoPlayer(videoSources[0].videoSource, (player) => {
    player.loop = false;
    // Auto-play disabled
    // player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // Listen for buffering state
  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  // Update buffering state based on player status
  useEffect(() => {
    setIsBuffering(status === "loading" || status === "idle");
  }, [status]);

  // Reset orientation when exiting
  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  const handleSourceChange = useCallback(
    (source: { id: string; label: string; uri: string }) => {
      setCurrentQuality(source.id);
      // Note: In a production app we will use this to switch the video source
      // player.replace(source.uri);
    },
    [],
  );

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = useCallback((fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
  }, []);

  const progress = (lessonData.lessonNumber / lessonData.totalLessons) * 100;

  if (isLoading) {
    return (
      <Container edgeToEdge>
        <Header onPress={() => navigation.goBack()} />
        <LessonScreenSkeleton />
      </Container>
    );
  }

  // Fullscreen mode - only show video with controls
  if (isFullscreen) {
    return (
      <View style={styles.fullscreenContainer}>
        <VideoView
          ref={videoViewRef}
          style={styles.fullscreenVideo}
          player={player}
          nativeControls={false}
          allowsPictureInPicture={true}
          startsPictureInPictureAutomatically={true}
        />
        <VideoControls
          player={player}
          videoViewRef={videoViewRef}
          isPlaying={isPlaying}
          isBuffering={isBuffering}
          isFullscreen={isFullscreen}
          videoSources={VIDEO_QUALITY_OPTIONS}
          currentSourceId={currentQuality}
          onSourceChange={handleSourceChange}
          onFullscreenChange={handleFullscreenChange}
        />
      </View>
    );
  }

  return (
    <Container edgeToEdge>
      <Header onPress={() => navigation.goBack()} />

      {/* Video Container with Overlay Controls */}
      <View style={styles.videoContainer}>
        <VideoView
          ref={videoViewRef}
          style={styles.video}
          player={player}
          nativeControls={false}
          allowsPictureInPicture={true}
          startsPictureInPictureAutomatically={true}
        />
        <VideoControls
          player={player}
          videoViewRef={videoViewRef}
          isPlaying={isPlaying}
          isBuffering={isBuffering}
          isFullscreen={isFullscreen}
          videoSources={VIDEO_QUALITY_OPTIONS}
          currentSourceId={currentQuality}
          onSourceChange={handleSourceChange}
          onFullscreenChange={handleFullscreenChange}
        />
      </View>

      <ScrollView
        style={styles.videoContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Lesson Header */}
        <LessonHeader lessonData={lessonData} progress={progress} />

        {/* Description Section */}
        <LessonSection title="About this lesson">
          <Text style={styles.description}>{lessonData.description}</Text>
        </LessonSection>

        {/* Learning Objectives */}
        <LessonSection title="What you'll learn">
          {lessonData.learningObjectives.map((objective, index) => (
            <View key={index} style={styles.objectiveItem}>
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={14} color="green" />
              </View>
              <Text style={styles.objectiveText}>{objective}</Text>
            </View>
          ))}
        </LessonSection>

        {/* Instructor Section */}
        <LessonSection title="Instructor">
          <LessonInstructorCard lessonData={lessonData} />
        </LessonSection>

        {/* Resources Section */}
        <LessonSection title="Lesson Resources">
          {lessonData.resources.map((resource, index) => (
            <LessonResourceLinks
              onPress={() => {}}
              key={index}
              resource={resource}
            />
          ))}
        </LessonSection>

        <View style={styles.navigationSection}>
          <LessonButton
            action="PREVIOUS"
            subTitle={lessonData.previousLesson.title}
            onPress={() => {}}
          />

          <LessonButton
            action="NEXT"
            subTitle={lessonData.nextLesson.title}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  fullscreenVideo: {
    flex: 1,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
  },
  videoContentContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
  },
  objectiveItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  objectiveText: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  navigationSection: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    marginTop: 12,
  },
});
