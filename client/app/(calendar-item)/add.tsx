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
          <Text variant="headlineSmall">Create an Event</Text>
        </View>

        <View style={styles.inputGroup}>
          <CustomInput
            placeholder="Event Title"
            value={calendarItem.title}
            onChangeText={(text) => onCalendarItemChange("title", text)}
          />

          <CustomInput
            placeholder="Description (optional)"
            isTextArea
            value={calendarItem.description}
            onChangeText={(text) => onCalendarItemChange("description", text)}
          />

          <Select
            data={eventIcons}
            onSelect={(value: string) => onCalendarItemChange("icon", value)}
          />
        </View>

        <View style={styles.switchBlock}>
          <Text variant="bodyLarge">Whole Day?</Text>
          <Switch
            value={calendarItem.isAllDay}
            color="#0a0a0a"
            onValueChange={toggleIsAllDay}
          />
        </View>

        <View style={styles.dateTimeSection}>
          <View style={styles.dateTimeRow}>
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

          <View style={styles.dateTimeRow}>
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
          <View style={styles.recurrenceBlock}>
            <CustomInput
              placeholder="Recurrence (eg. daily, weekly)"
              value={calendarItem.recurrenceRule}
              onChangeText={(text) =>
                onCalendarItemChange("recurrenceRule", text)
              }
            />
          </View>
        )}

        <View style={styles.eventPreviewBlock}>
          <Text variant="headlineSmall">Card Preview</Text>

          <CalendarItemCard
            id=""
            title={calendarItem.title}
            description={calendarItem.description}
            icon={calendarItem.icon}
            startDate={calendarItem.startDate.toISOString()}
            endDate={calendarItem.endDate.toISOString()}
            isAllDay={calendarItem.isAllDay}
            isRecurrent={calendarItem.isRecurrent}
            isHighlighted={false}
            status="PENDING"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button mode="contained">Create</Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddCalendarItem;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  titleBlock: {
    paddingVertical: 20,
    paddingBottom: 24,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  switchBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  dateTimeSection: {
    gap: 16,
    marginVertical: 16,
  },
  dateTimeRow: {
    gap: 12,
    paddingHorizontal: 4,
  },
  recurrenceBlock: {
    marginTop: 16,
    marginBottom: 24,
  },
  eventPreviewBlock: {
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 4,
    gap: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
});
