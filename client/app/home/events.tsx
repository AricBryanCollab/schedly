import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { ScrollView, StyleSheet } from "react-native";

const EventsScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}></ScrollView>
    </ScreenWrapper>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
