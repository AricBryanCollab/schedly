import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import CalendarBlock from "@/features/CalendarItem/components/CalendarBlock";
import UpcomingEvents from "@/features/CalendarItem/components/UpcomingEvents";
import { Href, useRouter } from "expo-router";

import { mockCalendarData } from "@/features/CalendarItem/api/mockData";

export interface CalendarData<T> {
  id: T;
  title: T;
  icon: T;
  startDate: T;
  endDate: T;
}

const CalendarScreen = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.controls}>
        <IconButton
          onPress={() => router.push("/settings" as Href)}
          icon="cog"
          mode="outlined"
        />
        <View style={styles.rightControl}>
          <IconButton
            onPress={() => router.push("/(calendar-item)/add" as Href)}
            icon="plus"
            mode="outlined"
          />
          <IconButton
            onPress={() => router.push("/ai-assistant" as Href)}
            icon="assistant"
            mode="outlined"
          />
        </View>
      </View>
      <CalendarBlock data={mockCalendarData} />
      <UpcomingEvents data={mockCalendarData} />
    </ScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "transparent",
    height: 350,
    elevation: 0,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  rightControl: {
    flexDirection: "row",
    gap: 4,
  },
  eventsView: {
    paddingHorizontal: 10,
  },
  eventHeader: {
    fontWeight: 700,
    letterSpacing: 0.75,
    marginBottom: 12,
  },
  eventsChipList: {
    gap: 12,
  },
});
