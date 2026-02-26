import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Container, CustomButton } from "@/components/common";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import Theme from "@/styles/Theme";
import { videoListHtml } from "./videoListHtml";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "@/navigation";
import HomeSkeleton from "@/components/Home/HomeSkeleton";
import {
  sendWelcomeNotification,
  sendReminderNotification,
  sendLessonUpdateNotification,
  addNotificationResponseListener,
} from "@/utils/notifications";

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const hasNotifiedRef = useRef(false);

  // Set up notification tap listener
  useEffect(() => {
    const subscription = addNotificationResponseListener((lessonId) => {
      // Navigate to VideoPlayer when notification is tapped
      navigation.navigate("VideoPlayer", { videoId: lessonId });
    });

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  // Handle messages from webview
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "openVideo") {
        navigation.navigate("VideoPlayer", { videoId: data.lessonId });
      }
    } catch (error) {
      console.log("Message received:", event.nativeEvent.data);
      return;
    }
  };

  // Handle webview load end
  const handleWebViewLoadEnd = () => {
    setIsLoading(false);
    // Only trigger notifications once per component mount
    if (hasNotifiedRef.current) return;
    hasNotifiedRef.current = true;

    // Welcome notification (3 sec delay)
    sendWelcomeNotification();
    // Lesson update notification (14 sec delay, opens VideoPlayer on tap)
    sendLessonUpdateNotification();
  };

  // Handle welcome notification
  const handleWelcomeNotification = () => {
    sendWelcomeNotification();
  };

  // Handle reminder notification
  const handleReminderNotification = () => {
    sendReminderNotification();
  };

  return (
    <Container
      edgeToEdge={true}
      removeBottomInset={true}
      style={styles.container}
    >
      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={StyleSheet.absoluteFill}>
            <HomeSkeleton />
          </View>
        )}
        <WebView
          showsVerticalScrollIndicator={false}
          source={{ html: videoListHtml }}
          onMessage={handleMessage}
          style={{ flex: 1, opacity: isLoading ? 0 : 1 }}
          scrollEnabled={true}
          onLoadEnd={handleWebViewLoadEnd}
        />
      </View>

      {/* Notification Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          asChild
          style={[styles.notificationButton, styles.welcomeButton]}
          onPress={handleWelcomeNotification}
        >
          <Text style={styles.buttonIcon}>👋</Text>
          <Text style={styles.buttonText}>Welcome Notification</Text>
          <Text style={styles.buttonSubtext}>Triggers in 3 seconds</Text>
        </CustomButton>
        <CustomButton
          asChild
          style={[styles.notificationButton, styles.reminderButton]}
          onPress={handleReminderNotification}
        >
          <Text style={styles.buttonIcon}>📚</Text>
          <Text style={styles.buttonText}>Reminder Notification</Text>
          <Text style={styles.buttonSubtext}>Triggers in 4 seconds</Text>
        </CustomButton>
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: Theme.COLORS.BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: Theme.COLORS.SKELETON,
    marginBottom: 12,
  },
  notificationButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeButton: {
    backgroundColor: "#4A90D9",
  },
  reminderButton: {
    backgroundColor: "#7C4DFF",
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    marginTop: 2,
  },
});
