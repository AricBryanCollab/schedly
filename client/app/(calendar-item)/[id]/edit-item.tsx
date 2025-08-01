import ScreenWrapper from "@/components/layout/ScreenWrapper";

import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const EditCalendarItem = () => {
  const { id } = useLocalSearchParams();
  return (
    <ScreenWrapper>
      <View style={styles.titleBlock}>
        <Text variant="bodyLarge"> Update/Edit an Event Here</Text>
        <Text variant="bodyMedium">ID: {id} </Text>
      </View>
    </ScreenWrapper>
  );
};

export default EditCalendarItem;

const styles = StyleSheet.create({
  titleBlock: {
    padding: 10,
  },
});
