import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>SignUp Page</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
});
