import useEditCalendarItem from "@/features/calendarItem/hooks/useEditCalendarItem";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CalendarItemCard from "@/components/ui/CalendarItemCard";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

import { Status } from "@/utils/formatStatus";

const EditCalendarItem = () => {
  const { id } = useLocalSearchParams();

  const {
    calendarItem,
    onCalendarItemChange,
    toggleIsAllDay,
    updateStartDate,
    updateStartTime,
    updateEndDate,
    updateEndTime,
    toggleIsRecurrent,
  } = useEditCalendarItem(id);

  const {
    title,
    description,
    startDate,
    endDate,
    icon,
    isAllDay,
    isRecurrent,
    recurrenceRule,
    isHighlighted,
    status,
  } = calendarItem;

  return (
    <ScreenWrapper>
      <ScreenWrapper>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.titleBlock}>
            <Text variant="headlineSmall">Edit the Calendar Event</Text>
          </View>

          <CustomInput
            placeholder="Event Title"
            value={title}
            onChangeText={(text) => onCalendarItemChange("title", text)}
          />

          <CustomInput
            placeholder="Description (optional)"
            isTextArea
            value={description}
            onChangeText={(text) => onCalendarItemChange("description", text)}
          />

          <Select
            value={icon}
            data={eventIcons}
            onSelect={(value: string) => onCalendarItemChange("icon", value)}
          />

          <View style={styles.switchBlock}>
            <Text variant="bodyLarge">Whole Day?</Text>
            <Switch
              value={isAllDay}
              color="#0a0a0a"
              onValueChange={toggleIsAllDay}
            />
          </View>

          <View style={styles.dateBlock}>
            <DatePickerField
              label="Start Date"
              value={startDate}
              onChange={updateStartDate}
            />

            {!isAllDay && (
              <TimePickerField
                label="Start Time"
                value={startDate}
                onChange={updateStartTime}
              />
            )}
          </View>

          <View style={styles.dateBlock}>
            <DatePickerField
              label="End Date"
              value={endDate}
              onChange={updateEndDate}
            />

            {!isAllDay && (
              <TimePickerField
                label="End Time"
                value={endDate}
                onChange={updateEndTime}
              />
            )}
          </View>

          <View style={styles.switchBlock}>
            <Text variant="bodyLarge">Does this event repeat?</Text>
            <Switch
              value={isRecurrent}
              color="#0a0a0a"
              onValueChange={toggleIsRecurrent}
            />
          </View>

          {isRecurrent && (
            <CustomInput
              placeholder="Recurrence (eg. daily, weekly)"
              value={recurrenceRule}
              onChangeText={(text) =>
                onCalendarItemChange("recurrenceRule", text)
              }
            />
          )}

          <View style={styles.eventPreviewBlock}>
            <Text variant="headlineSmall">Card Preview</Text>

            <CalendarItemCard
              id={id as string}
              title={title}
              description={description}
              icon={icon}
              startDate={startDate.toISOString()}
              endDate={endDate.toISOString()}
              isAllDay={isAllDay}
              isRecurrent={isRecurrent}
              isHighlighted={isHighlighted ? isHighlighted : false}
              status={status ? (status as Status) : "PENDING"}
            />
          </View>

          <View style={styles.button}>
            <Button mode="contained">Confirm Edit</Button>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </ScreenWrapper>
  );
};

export default EditCalendarItem;

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
    paddingVertical: 24,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  dateBlock: {
    display: "flex",
    gap: 8,
    padding: 10,
  },
  button: {
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  eventPreviewBlock: {
    marginTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
