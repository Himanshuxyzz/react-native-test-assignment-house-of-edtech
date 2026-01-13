import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { Container, CustomButton } from "@/components/common";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import Theme from "@/styles/Theme";
import { videoListHtml } from "./videoListHtml";
import { useNavigation } from "@react-navigation/native";
import LMSSkeleton from "@/components/common/LMSSkeleton";

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "openVideo") {
        Alert.alert("Lesson Selected", `Opening lesson: ${data.lessonId}`);
        // Handle video opening logic here
        navigation.navigate("VideoPlayer", { videoId: data.lessonId });
      }
    } catch (error) {
      console.log("Message received:", event.nativeEvent.data);
    }
  };

  return (
    <Container edgeToEdge={true} style={{}}>
      <View style={{ flex: 0.9 }}>
        {isLoading && (
          <View style={StyleSheet.absoluteFill}>
            <LMSSkeleton />
          </View>
        )}
        <WebView
          source={{ html: videoListHtml }}
          onMessage={handleMessage}
          style={{ flex: 1, opacity: isLoading ? 0 : 1 }}
          scrollEnabled={true}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          borderWidth: StyleSheet.hairlineWidth,
          gap: Theme.SIZES.SM,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: Theme.SIZES.MD,
          backgroundColor: "#fff",
        }}
      >
        <CustomButton text="Play" onPress={() => {}} />
        <CustomButton text="Pause" onPress={() => {}} />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
