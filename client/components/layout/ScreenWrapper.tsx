import { darkTheme, lightTheme } from "@/constants/theme";
import { useThemeStore } from "@/lib/zustand/themeSlice";
import { View } from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  const { isDark } = useThemeStore();

  const containerStyle = {
    flex: 1,
    backgroundColor: isDark
      ? darkTheme.colors.background
      : lightTheme.colors.background,
    color: isDark ? darkTheme.colors.foreground : lightTheme.colors.foreground,
  };

  return <View style={containerStyle}>{children}</View>;
};

export default ScreenWrapper;
