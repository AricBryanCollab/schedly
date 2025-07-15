import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Chip, IconButton, Text } from "react-native-paper";

const CalendarScreen = () => {
  const [selected, setSelected] = useState<string>("");

  return (
    <ScreenWrapper>
      <View style={styles.controls}>
        <IconButton icon="plus" mode="outlined" />
        <IconButton icon="trash-can" mode="outlined" />
        <IconButton icon="assistant" mode="outlined" />
      </View>

      <View style={{ paddingVertical: 20 }}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            todayTextColor: "#7f7d9c",
            dayTextColor: "#363636",
            textDisabledColor: "#ccc",
            arrowColor: "#545454",
            monthTextColor: "#363636",
            textMonthFontWeight: "bold",
            textDayFontWeight: "400",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#dedee9",
              selectedTextColor: "#0a0a0a",
            },
          }}
        />
      </View>
      <ScrollView style={styles.eventsView}>
        <Text style={styles.eventHeader} variant="bodyLarge">
          Upcoming Events
        </Text>
        <View style={styles.eventsChipList}>
          <Chip icon="dumbbell" mode="outlined">
            <Text>Gym Workout at 8am</Text>
          </Chip>

          <Chip icon="school" mode="outlined">
            Take the online class at 1pm
          </Chip>

          <Chip icon="food-turkey" mode="outlined">
            Eat dinner with the family
          </Chip>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
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
