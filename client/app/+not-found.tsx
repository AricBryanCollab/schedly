import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ScreenWrapper>
        <View style={styles.container}>
          <Text variant="headlineMedium">App Screen Not Found</Text>
          <Button onPress={() => router.back()} mode="contained">
            Go Back
          </Button>
        </View>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 25,
  },
});
