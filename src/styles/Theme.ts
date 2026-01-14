import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = {
  PRIMARY: "#6366f1",
  BACKGROUND: "#ffff",
  FOREGROUND: "#0000",
  TEXT: "#1a1a2e",
  SKELETON: "#f5f7fa",
};
const SIZES = {
  WINDOW_WIDTH: width,
  WINDOW_HEIGHT: height,
  BASE: 10,
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 22,
  XXXL: 28,
};

export default {
  COLORS,
  SIZES,
};
