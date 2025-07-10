import ScreenWrapper from "@/components/layout/ScreenWrapper";
import React, { useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef<(RNTextInput | null)[]>([]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      if (text && idx < 4) {
        inputs.current[idx + 1]?.focus();
      }
    }
  };

  const handleResend = () => {};

  const handleSend = () => {};

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.header}>
          Schedly Sign Up OTP Verification
        </Text>
        <Text variant="bodyLarge" style={styles.caption}>
          Enter the 5-digit code sent to your email
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              // @ts-ignore
              ref={(ref) => {
                inputs.current[idx] = ref;
              }}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </View>
        <Button mode="contained" onPress={handleSend} style={styles.btn}>
          Send
        </Button>
        <Button mode="text" onPress={handleResend}>
          Resend OTP
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default OTPPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    textAlign: "center",
    color: "#337ed3",
  },

  caption: {
    marginBottom: 24,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 10,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#337ed3",
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 4,
    backgroundColor: "#f4f3f2",
  },
  btn: {
    width: 180,
    marginBottom: 12,
  },
});
