import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0a0a0a", // black
    secondary: "#dedde9", //white
    accent: "#f3edf2", //white
    foreground: "#020109", //black
    background: "#fbfbfe", // white
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    primary: "#f5f5f5", // dark blue
    secondary: "#171622", //purple
    accent: "#120c11", //light purple
    foreground: "#f7f6fe", // white & light blue
    background: "#010104", // black
  },
};
