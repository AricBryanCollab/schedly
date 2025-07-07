import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const Home = () => {
  const boarding = require("@/assets/images/boarding.png");
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Image source={boarding} resizeMode="stretch" style={styles.img} />

        <Text style={styles.headerText} variant="displayMedium">
          Schedly
        </Text>
        <Text variant="titleLarge">Personal Calendar App</Text>

        <Button
          onPress={() => router.push("/(auth)/login" as Href)}
          style={styles.btn}
          mode="contained"
        >
          Get Started
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  headerText: {
    letterSpacing: 1.25,
    fontFamily: "Fredoka",
  },
  img: {
    width: 260,
    height: 300,
  },
  btn: {
    marginTop: 12,
    width: 280,
  },
});
