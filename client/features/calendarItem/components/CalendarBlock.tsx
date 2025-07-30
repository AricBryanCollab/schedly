import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

import { IconButton, Modal, Portal, Text } from "react-native-paper";

import { CalendarData } from "@/app/home/(tabs)";
import { getMarkedDatesFromEvents } from "@/utils/getMarkedDates";

interface CalendarBlockProps {
  data: CalendarData<string>[];
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

const CalendarBlock = ({ data }: CalendarBlockProps) => {
  const [selected, setSelected] = useState<string>("");

  const markedDates = {
    ...getMarkedDatesFromEvents(data),
    ...(selected && {
      [selected]: {
        selected: true,
        selectedColor: "#dedee9",
        selectedTextColor: "#0a0a0a",
        disableTouchEvent: true,
      },
    }),
  };

  const handlePressedDay = (day: DateObject) => {
    const dateStr = day.dateString;
    setSelectedDate(dateStr);

    const matched = data.filter((event) => {
      const start = new Date(event.startDate).toISOString().split("T")[0];
      const end = new Date(event.endDate).toISOString().split("T")[0];
      return dateStr >= start && dateStr <= end;
    });

    setSelectedEvents(matched);
    setSelected(dateStr);

    if (matched.length > 0) {
      setVisible(true);
    }
  };

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<CalendarData<string>[]>(
    []
  );
  const [visible, setVisible] = useState(false);

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
        onDayPress={handlePressedDay}
        markedDates={markedDates}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.tooltip}
        >
          <Text style={styles.tooltipDate}>{selectedDate}</Text>
          {selectedEvents.map((event) => (
            <View key={event.id} style={styles.tooltipItem}>
              <IconButton icon={event.iconTitle} size={24} />
              <Text variant="titleMedium">{event.title}</Text>
            </View>
          ))}
        </Modal>
      </Portal>
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
  tooltip: {
    backgroundColor: "#ffffff",
    padding: 16,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
  },
  tooltipDate: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  tooltipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
});
