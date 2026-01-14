import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { Container, Header } from "@/components/common";
import { useRoute } from "@react-navigation/native";
import { lessonData, videoSources } from "@/constants/constants";
import {
  LessonScreenSkeleton,
  LessonSection,
  LessonButton,
  LessonResourceLinks,
  LessonHeader,
  LessonInstructorCard,
} from "@/components/VideoPlayer";
import useDelayLoading from "@/hooks/useDelayLoading";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoPlayer = ({ navigation }: any) => {
  const route = useRoute();
  const videoId = (route.params as any)?.videoId;

  const isLoading = useDelayLoading();

  const player = useVideoPlayer(videoSources[0].videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const progress = (lessonData.lessonNumber / lessonData.totalLessons) * 100;

  if (isLoading) {
    return (
      <Container edgeToEdge>
        <Header onPress={() => navigation.goBack()} />
        <LessonScreenSkeleton />
      </Container>
    );
  }

  return (
    <Container edgeToEdge>
      <Header onPress={() => navigation.goBack()} />
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{
          enable: true,
        }}
        allowsPictureInPicture
        nativeControls
      />

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
  video: {
    width: "100%",
    height: 240,
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
