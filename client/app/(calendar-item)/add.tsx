import ScreenWrapper from "@/components/layout/ScreenWrapper";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const AddCalendarItem = () => {
  return (
    <ScreenWrapper>
      <View style={styles.titleBlock}>
        <Text variant="bodyLarge"> Add an Event Here</Text>
      </View>
    </ScreenWrapper>
  );
};

export default AddCalendarItem;

const styles = StyleSheet.create({
  titleBlock: {
    padding: 10,
  },
});
