import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { ScrollView, StyleSheet } from "react-native";

import CalendarItemCard from "@/components/ui/CalendarItemCard";
import { eventCardDetails } from "@/features/calendarItem/api/mockData";

const EventsScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        {eventCardDetails.map((card) => {
          return (
            <CalendarItemCard
              key={card.id}
              id={card.id}
              title={card.title}
              iconTitle={card.iconTitle}
              description={card.description}
              startDate={card.startDate}
              endDate={card.endDate}
              isAllDay={card.isAllDay}
              isRecurrent={card.isRecurrent}
              recurrenceRule={card.recurrenceRule}
              status={card.status}
              isHighlighted={card.isHighlighted}
            />
          );
        })}
      </ScrollView>
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
