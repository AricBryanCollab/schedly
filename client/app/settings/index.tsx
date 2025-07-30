import ScreenWrapper from "@/components/layout/ScreenWrapper";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const SettingsScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.titleBlock}>
        <Text variant="bodyLarge"> App Settings</Text>
      </View>
    </ScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  titleBlock: {
    padding: 10,
  },
});
