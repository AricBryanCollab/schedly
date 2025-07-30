import ScreenWrapper from "@/components/layout/ScreenWrapper";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const AiAssistantScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.titleBlock}>
        <Text variant="bodyLarge"> AI Assistant Screen</Text>
        <Text variant="bodySmall">
          This section would be the chat or voice communication with the
          calendar assistant
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default AiAssistantScreen;

const styles = StyleSheet.create({
  titleBlock: {
    padding: 10,
  },
});
