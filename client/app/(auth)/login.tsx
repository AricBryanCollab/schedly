import React from "react";
import { StyleSheet, View } from "react-native";

import { TextInput } from "react-native-paper";

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    flexDirection: "column",
  },
});
