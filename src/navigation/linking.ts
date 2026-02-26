import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootParamList } from "./index";

const linking: LinkingOptions<RootParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Main: {
        screens: {
          HomeTab: "",
          Settings: "settings",
        },
      },
      VideoPlayer: "video/:videoId",
    },
  },
};

export default linking;
