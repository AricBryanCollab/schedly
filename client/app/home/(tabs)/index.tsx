import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  const [selected, setSelected] = useState<string>("");

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, marginVertical: 80 }}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            todayTextColor: "#337ed3",
            dayTextColor: "#052347",
            textDisabledColor: "#ccc",
            arrowColor: "#337ed3",
            monthTextColor: "#052347",
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
              selectedColor: "#8b8de695",
              selectedTextColor: "#fff",
            },
          }}
        />
      </View>
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
});
