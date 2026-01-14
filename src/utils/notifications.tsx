import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";

// Set up Android notification channel (required for Android 8+)
if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
    sound: "default",
  });
}

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Sample lesson IDs for random selection
const LESSON_IDS = ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5"];

/**
 * Get a random lesson ID
 */
const getRandomLessonId = (): string => {
  const randomIndex = Math.floor(Math.random() * LESSON_IDS.length);
  return LESSON_IDS[randomIndex];
};

/**
 * Schedule a local notification with a delay
 * Requests permission if not already granted
 * @param title - Notification title
 * @param body - Notification body message
 * @param delaySeconds - Delay in seconds (2-5 seconds recommended)
 * @param data - Optional data payload (e.g., lessonId for navigation)
 */
export const scheduleNotification = async (
  title: string,
  body: string,
  delaySeconds: number = 3,
  data?: Record<string, unknown>
): Promise<string | undefined> => {
  // Check permission status
  const { status } = await Notifications.getPermissionsAsync();

  // Request permission if not granted
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    if (newStatus !== "granted") {
      Alert.alert(
        "Notifications Disabled",
        "Please enable notifications in settings to receive updates about your lessons.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Enable in Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return undefined;
    }
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      data: data || {},
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds,
    },
  });

  return identifier;
};

// Pre-defined notification messages
export const NotificationMessages = {
  WELCOME: {
    title: "👋 Welcome to LMS app",
    body: "You've successfully loaded the course catalog. Start learning today!",
    delay: 3,
  },
  REMINDER: {
    title: "📚 Daily Learning Reminder",
    body: "Don't forget to complete your lessons today. Knowledge is power!",
    delay: 4,
  },
  LESSON_UPDATE: {
    title: "🎬 New Lesson Available!",
    body: "A lesson has been updated. Tap to watch now!",
    delay: 14,
  },
} as const;

/**
 * Send welcome notification (triggered on webview load and by button)
 */
export const sendWelcomeNotification = async (): Promise<void> => {
  const { title, body, delay } = NotificationMessages.WELCOME;
  await scheduleNotification(title, body, delay);
};

/**
 * Send reminder notification (triggered by button)
 */
export const sendReminderNotification = async (): Promise<void> => {
  const { title, body, delay } = NotificationMessages.REMINDER;
  await scheduleNotification(title, body, delay);
};

/**
 * Send lesson update notification with random lessonId
 * When tapped, should navigate to VideoPlayer with the lessonId
 */
export const sendLessonUpdateNotification = async (): Promise<void> => {
  const { title, body, delay } = NotificationMessages.LESSON_UPDATE;
  const lessonId = getRandomLessonId();
  await scheduleNotification(title, body, delay, {
    type: "openVideo",
    lessonId,
  });
};

/**
 * Add listener for notification responses (when user taps notification)
 * Returns a subscription that should be removed on cleanup
 */
export const addNotificationResponseListener = (
  callback: (lessonId: string) => void
): Notifications.EventSubscription => {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;
    if (data?.type === "openVideo" && data?.lessonId) {
      callback(data.lessonId as string);
    }
  });
};
