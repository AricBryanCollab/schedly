import { Href, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const Home = () => {
  const boarding = require("@/assets/images/boarding.png");
  const router = useRouter();
  return (
    <View style={styles.mainPage}>
      <View style={styles.content}>
        <Image source={boarding} resizeMode="stretch" style={styles.img} />

        <Text style={styles.headerText} variant="displayMedium">
          Schedly
        </Text>
        <Text style={styles.subText} variant="titleLarge">
          Personal Calendar App
        </Text>

        <Button
          onPress={() => router.push("/(auth)/login" as Href)}
          style={styles.btn}
          mode="contained-tonal"
        >
          Get Started
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainPage: {
    backgroundColor: "#d9e3e8",
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  headerText: {
    letterSpacing: 0.5,
    color: "#337ed3",
  },
  subText: {
    color: "#337ed3",
  },
  img: {
    width: 260,
    height: 300,
  },
  btn: {
    marginTop: 12,
    width: 250,
  },
});
