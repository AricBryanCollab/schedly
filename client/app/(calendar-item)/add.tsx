import ScreenWrapper from "@/components/layout/ScreenWrapper";

import { useState } from "react";

import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";

const AddCalendarItem = () => {
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

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
        <View style={{ padding: 16 }}>
          <DatePickerField
            label="Start Date"
            value={new Date("2025-05-14")}
            onChange={() => {}}
          />
          <DatePickerField
            label="End Date"
            value={new Date()}
            onChange={() => {}}
          />

          <Checkbox.Item
            label="All Day"
            status={isAllDay ? "checked" : "unchecked"}
            onPress={() => setIsAllDay(!isAllDay)}
            position="leading"
          />

          {!isAllDay && (
            <View style={{ padding: 16 }}>
              <TextInput
                label="Start Time"
                value={format(startTime, "hh:mm a")}
                mode="outlined"
                editable={false}
                onPressIn={() => setShowStartTimePicker(true)}
                left={<TextInput.Icon icon="clock-outline" />}
              />
              <TextInput
                label="End Time"
                value={format(endTime, "hh:mm a")}
                mode="outlined"
                editable={false}
                onPressIn={() => setShowEndTimePicker(true)}
                left={<TextInput.Icon icon="clock-outline" />}
              />
            </View>
          )}

          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartTimePicker(false);
                if (selectedDate) setStartTime(selectedDate);
              }}
            />
          )}

          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndTimePicker(false);
                if (selectedDate) setEndTime(selectedDate);
              }}
            />
          )}
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

  inputBlock: {
    flexDirection: "column",
    gap: 10,
    marginVertical: 12,
    marginHorizontal: 10,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
