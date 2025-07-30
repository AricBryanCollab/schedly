import { CalendarData } from "@/app/home/(tabs)";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarBlockProps {
  data: CalendarData<string>[];
}

const CalendarBlock = ({ data }: CalendarBlockProps) => {
  const [selected, setSelected] = useState<string>("");
  return (
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
  );
};

export default CalendarBlock;

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "transparent",
    height: 350,
    elevation: 0,
  },
});
