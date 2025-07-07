import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

const LoginPage = () => {
  const SchedlyImg = require("@/assets/images/schedly_login.png");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScreenWrapper>
      <View style={styles.subContainer}>
        <View style={styles.headerSection}>
          <Image source={SchedlyImg} style={styles.img} />

          <Text style={styles.textHeader} variant="headlineLarge">
            Login with Schedly
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput label="Email" />

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

          <Button mode="contained">Login </Button>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.oauthbtn}>
          <Button icon="google" mode="outlined">
            Sign In with Google
          </Button>
          <Button icon="github" mode="outlined">
            Sign In With Github
          </Button>
        </View>

        <View style={styles.toSignUp}>
          <Text variant="bodyMedium">Don&apos;t have an account?</Text>
          <Text style={styles.textLink}>Sign Up Here</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginPage;

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
  orText: {
    marginHorizontal: 14,
    color: "#337ed3",
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#545454",
  },
  oauthbtn: {
    gap: 14,
  },
  toSignUp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  textLink: {
    color: "#337ed3",
    textDecorationLine: "underline",
  },
});
