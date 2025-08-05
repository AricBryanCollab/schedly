import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Text } from "react-native-paper";

import useAddCalendarItem from "@/features/calendarItem/hooks/useAddCalendarItem";

const AddCalendarItem = () => {
  const {
    calendarItem,
    onCalendarItemChange,
    toggleIsAllDay,
    updateStartDate,
    updateStartTime,
    updateEndDate,
    updateEndTime,
  } = useAddCalendarItem();

  const isAllDay = calendarItem.isAllDay;
  return (
    <ScreenWrapper>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Create an Event Here</Text>
        </View>

        <CustomInput
          placeholder="Event Title"
          icon="text"
          value={calendarItem.title}
          onChangeText={() => onCalendarItemChange("title", calendarItem.title)}
        />

        <CustomInput
          placeholder="Description (optional)"
          icon="note-text"
          isTextArea
          value={calendarItem.description}
          onChangeText={() =>
            onCalendarItemChange("description", calendarItem.description)
          }
        />

        <Select
          data={eventIcons}
          onSelect={(value: string) => onCalendarItemChange("icon", value)}
        />

        <View style={styles.isAllDaySwitchBlock}>
          <Text variant="bodyLarge">Whole Day?</Text>
          <Switch
            value={calendarItem.isAllDay}
            onValueChange={toggleIsAllDay}
          />
        </View>

        <View style={styles.dateBlock}>
          <DatePickerField
            label="Start Date"
            value={calendarItem.startDate}
            onChange={updateStartDate}
          />

          {!isAllDay && (
            <TimePickerField
              label="Start Time"
              value={calendarItem.startDate}
              onChange={updateStartTime}
            />
          )}
        </View>

        <View style={styles.dateBlock}>
          <DatePickerField
            label="End Date"
            value={calendarItem.endDate}
            onChange={updateEndDate}
          />

          {!isAllDay && (
            <TimePickerField
              label="End Time"
              value={calendarItem.endDate}
              onChange={updateEndTime}
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
  isAllDaySwitchBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  dateBlock: {
    display: "flex",
    gap: 8,
    padding: 10,
  },
});
