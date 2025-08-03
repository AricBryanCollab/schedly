import { darkTheme, lightTheme } from "@/constants/theme";
import { useThemeStore } from "@/lib/zustand/themeSlice";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

import "react-native-reanimated";

registerTranslation("en", en);

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    Fredoka: require("../assets/fonts/Fredoka-SemiBold.ttf"),
  });

  const isDark = useThemeStore((state) => state.isDark);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
