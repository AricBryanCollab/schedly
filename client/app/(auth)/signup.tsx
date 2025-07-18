import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { useThemeStore } from "@/lib/zustand/themeSlice";
import { getAuthDynamicStyles } from "@/styles/auth";

import { Button, Text, TextInput } from "react-native-paper";

const SignUp = () => {
  const SchedlyImg = require("@/assets/images/schedly_signup.png");

  const isDark = useThemeStore((state) => state.isDark);
  const authStyle = getAuthDynamicStyles(isDark);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.subContainer}>
        <View style={styles.headerSection}>
          <Image source={SchedlyImg} style={styles.img} />

          <Text style={styles.textHeader} variant="headlineLarge">
            Register a Schedly Account
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            label="Username"
            right={<TextInput.Icon icon="account" />}
          />

          <TextInput label="Email" right={<TextInput.Icon icon="email" />} />

          <TextInput
            label="Password"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={toggleShowPassword}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={toggleShowPassword}
              />
            }
          />

          <Button onPress={() => router.push("/(auth)/otp")} mode="contained">
            Sign Up{" "}
          </Button>
        </View>
        <View style={styles.separatorContainer}>
          <View style={authStyle.line} />
          <Text style={authStyle.orText}>or</Text>
          <View style={authStyle.line} />
        </View>

        <View style={styles.oauthbtn}>
          <Button icon="google" mode="outlined">
            Sign Up with Google
          </Button>
          <Button icon="github" mode="outlined">
            Sign Up With Github
          </Button>
        </View>

        <View style={styles.toLogin}>
          <Text variant="bodyMedium"> Already have an account?</Text>
          <Text
            onPress={() => router.push("/(auth)/login" as Href)}
            style={authStyle.textLink}
          >
            Login Here
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  subContainer: {
    paddingVertical: 4,
    paddingHorizontal: 30,
  },
  headerSection: {
    justifyContent: "center",
    marginBottom: 20,
  },
  form: {
    gap: 20,
  },
  textHeader: {
    textAlign: "center",
  },
  img: {
    width: 280,
    height: 260,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  oauthbtn: {
    gap: 14,
  },
  toLogin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
});
