import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import {
  setDatePreserveTime,
  setTimePreserveDate,
} from "@/features/calendarItem/utils/setDateTime";
import { useState } from "react";

const AddCalendarItem = () => {
  const initialStartDate = new Date();
  const initialEndDate = new Date(initialStartDate);
  initialEndDate.setHours(initialStartDate.getHours() + 1);

  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);

  return (
    <ScreenWrapper>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Create an Event Here</Text>
        </View>

        <CustomInput
          placeholder="Event Title"
          icon="text"
          value=""
          onChangeText={() => {}}
        />

        <CustomInput
          placeholder="Description (optional)"
          icon="note-text"
          isTextArea
          value=""
          onChangeText={() => {}}
        />

        <Select data={eventIcons} onSelect={() => {}} />

        {/* Todo: Fix Layout and Separate Components */}
        <View style={styles.dateBlock}>
          <DatePickerField
            label="Start Date"
            value={startDate}
            onChange={(newDate) => {
              setStartDate((prev) => setDatePreserveTime(prev, newDate));
            }}
          />

          <TimePickerField
            label="Start Time"
            value={startDate}
            onChange={(newTime) => {
              setStartDate((prev) => setTimePreserveDate(prev, newTime));
            }}
          />
        </View>

        <View style={styles.dateBlock}>
          <DatePickerField
            label="End Date"
            value={endDate}
            onChange={(newDate) => {
              setEndDate((prev) =>
                setDatePreserveTime(prev, newDate, {
                  isEndDate: true,
                  compareTo: startDate,
                })
              );
            }}
          />

          <TimePickerField
            label="End Time"
            value={endDate}
            onChange={(newTime) => {
              setEndDate((prev) =>
                setTimePreserveDate(prev, newTime, {
                  isEndTime: true,
                  compareTo: startDate,
                })
              );
            }}
          />
        </View>

        {/* Todo: Recurrence and Recurrence Rule */}
        <Button mode="contained">Create</Button>
      </ScrollView>

      <View>
        <Text variant="headlineSmall">Card Preview</Text>
      </View>
    </ScreenWrapper>
  );
};

export default AddCalendarItem;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 8,
  },
  titleBlock: {
    paddingVertical: 12,
  },
  dateBlock: {
    display: "flex",
    gap: 8,
    padding: 10,
  },
});
