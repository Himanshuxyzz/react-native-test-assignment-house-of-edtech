import React, { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { Home, VideoPlayer, Settings } from "@/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import linking from "./linking";
import { Ionicons } from "@expo/vector-icons";
import {
  addNotificationResponseListener,
  getLastNotificationResponse,
} from "@/utils/notifications";

const Stack = createNativeStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

export type MainTabParamList = {
  HomeTab: undefined;
  Settings: undefined;
};

export type RootParamList = {
  Main: undefined;
  VideoPlayer: { videoId: string };
};

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={Home} options={{ title: "Home" }} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<RootParamList>>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    // Handle notification taps while app is running (foreground/background)
    const subscription = addNotificationResponseListener((lessonId) => {
      if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.navigate("VideoPlayer", { videoId: lessonId });
      }
    });

    return () => {
      subscription.remove();
      isReadyRef.current = false;
    };
  }, []);

  const handleNavigationReady = async () => {
    isReadyRef.current = true;

    // Cold start: check if the app was opened by tapping a notification
    const lessonId = await getLastNotificationResponse();
    if (lessonId && navigationRef.current) {
      navigationRef.current.navigate("VideoPlayer", { videoId: lessonId });
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={handleNavigationReady}
    >
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{
            headerShown: false,
          }}
          initialParams={{
            videoId: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
