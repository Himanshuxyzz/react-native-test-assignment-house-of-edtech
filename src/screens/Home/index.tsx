import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { Container, CustomButton } from "@/components/common";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import Theme from "@/styles/Theme";
import { videoListHtml } from "./videoListHtml";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "@/navigation";
import HomeSkeleton from "@/components/Home/HomeSkeleton";

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <Container edgeToEdge={true} style={{}}>
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
        onLoadEnd={() => setIsLoading(false)}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
