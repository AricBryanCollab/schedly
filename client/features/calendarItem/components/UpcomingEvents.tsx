import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { CalendarData } from "@/app/home/(tabs)";
import EventChip from "@/components/ui/EventChip";

import { getUpcomingEvents } from "@/utils/getUpcomingEvents";

const UpcomingEvents = ({ data }: { data: CalendarData<string>[] }) => {
  const latestEvents = getUpcomingEvents(data);

  return (
    <ScrollView style={styles.eventsView}>
      <Text style={styles.eventHeader} variant="bodyLarge">
        Upcoming Events
      </Text>
      <View style={styles.eventsChipList}>
        {latestEvents.map((late) => {
          return (
            <EventChip
              key={late.id}
              title={late.title}
              iconSrc={late.iconTitle}
              date={late.startDate}
            />
          );
        })}
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
