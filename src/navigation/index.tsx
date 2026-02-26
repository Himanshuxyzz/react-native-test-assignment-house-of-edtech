import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, VideoPlayer, Settings } from "@/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import linking from "./linking";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <NavigationContainer linking={linking}>
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
