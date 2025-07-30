import { CalendarData } from "@/app/home/(tabs)";
import EventChip from "@/components/ui/EventChip";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const UpcomingEvents = ({ data }: { data: CalendarData<string>[] }) => {
  return (
    <ScrollView style={styles.eventsView}>
      <Text style={styles.eventHeader} variant="bodyLarge">
        Upcoming Events
      </Text>
      <View style={styles.eventsChipList}>
        <EventChip
          title="Workout at the Gym"
          iconSrc="dumbbell"
          date="2025-07-23T08:00:00.000Z"
        />

        <EventChip
          title="Attend friends online meeting"
          iconSrc="account-group"
          date="2025-07-26T10:30:00.000Z"
        />

        <EventChip
          title="Eat dinner with the family"
          iconSrc="food-turkey"
          date="2025-07-26T20:00:00.000Z"
        />
      </View>
    </ScrollView>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
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
