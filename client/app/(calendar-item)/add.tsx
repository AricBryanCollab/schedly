import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CalendarItemCard from "@/components/ui/CalendarItemCard";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

import useAddCalendarItem from "@/features/calendarItem/hooks/useAddCalendarItem";

const AddCalendarItem = () => {
  const {
    calendarItem,
    onCalendarItemChange,
    toggleIsAllDay,
    toggleIsRecurrent,
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
          onChangeText={(text) => onCalendarItemChange("title", text)}
        />

        <CustomInput
          placeholder="Description (optional)"
          icon="note-text"
          isTextArea
          value={calendarItem.description}
          onChangeText={(text) => onCalendarItemChange("description", text)}
        />

        <Select
          data={eventIcons}
          onSelect={(value: string) => onCalendarItemChange("icon", value)}
        />

        <View style={styles.switchBlock}>
          <Text variant="bodyLarge">Whole Day?</Text>
          <Switch
            value={calendarItem.isAllDay}
            color="#0a0a0a"
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

        <View style={styles.switchBlock}>
          <Text variant="bodyLarge">Does this event repeat?</Text>
          <Switch
            value={calendarItem.isRecurrent}
            color="#0a0a0a"
            onValueChange={toggleIsRecurrent}
          />
        </View>

        {calendarItem.isRecurrent && (
          <CustomInput
            placeholder="Recurrence (eg. daily, weekly)"
            icon="repeat"
            value={calendarItem.recurrenceRule}
            onChangeText={(text) =>
              onCalendarItemChange("recurrenceRule", text)
            }
          />
        )}
        <View style={styles.button}>
          <Button mode="contained">Create</Button>
        </View>

        <View style={styles.eventPreviewBlock}>
          <Text variant="headlineSmall">Card Preview</Text>

          <CalendarItemCard
            id=""
            title={calendarItem.title}
            description={calendarItem.description}
            iconTitle={calendarItem.icon}
            startDate={calendarItem.startDate.toISOString()}
            endDate={calendarItem.endDate.toISOString()}
            isAllDay={calendarItem.isAllDay}
            isRecurrent={calendarItem.isRecurrent}
            isHighlighted={false}
            status="PENDING"
          />
        </View>
      </ScrollView>
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
  switchBlock: {
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
  button: {
    marginTop: 12,
  },
  eventPreviewBlock: {
    marginTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
