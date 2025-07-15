import { darkTheme, lightTheme } from "@/constants/theme";
import { TextStyle, ViewStyle } from "react-native";

interface AuthDynamicStyles<T> {
  orText: T;
  line: ViewStyle;
  textLink: T;
}

export const getAuthDynamicStyles = (
  isDark: boolean
): AuthDynamicStyles<TextStyle> => {
  const theme = isDark ? darkTheme : lightTheme;

  return {
    orText: {
      marginHorizontal: 14,
      color: theme.colors.foreground,
      fontWeight: "bold",
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.gray,
    },
    textLink: {
      color: theme.colors.gray,
      textDecorationLine: "underline",
    },
  };
};
