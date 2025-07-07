import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#337ed3", // aqua blue
    secondary: "#715ddc", //light indigo
    accent: "#8b8de6", //dark indigo
    foreground: "#052347", //black
    background: "#d9e3e8", // white & light blue
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  primary: "#2c78ce", // dark blue
  secondary: "#191b76", //purple
  accent: "#3724a3", //light purple
  foreground: "#b7d5fa", // white & light blue
  background: "#172126", // black
};
