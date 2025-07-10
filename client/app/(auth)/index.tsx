import { Stack } from "expo-router";
import React from "react";

const AuthRoot = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />
      <Stack.Screen name="otp" options={{ title: "OTP", headerShown: false }} />
    </Stack>
  );
};

export default AuthRoot;
