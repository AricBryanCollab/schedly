import useEditCalendarItem from "@/features/CalendarItem/hooks/useEditCalendarItem";
import calendarFormStyles from "@/styles/calendarItemForm";
import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CalendarItemCard from "@/components/ui/CalendarItemCard";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/CalendarItem/components/DatePickerField";
import TimePickerField from "@/features/CalendarItem/components/TimePickerField";
import { Status } from "@/utils/formatStatus";
import { ScrollView, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

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
      <ScrollView style={calendarFormStyles.scrollContent}>
        <View style={calendarFormStyles.titleBlock}>
          <Text variant="headlineSmall">Edit the Event</Text>
        </View>

        <View style={calendarFormStyles.inputGroup}>
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
            data={eventIcons}
            value={icon}
            onSelect={(value: string) => onCalendarItemChange("icon", value)}
          />
        </View>

        <View style={calendarFormStyles.switchBlock}>
          <Text variant="bodyLarge">Whole Day?</Text>
          <Switch
            value={isAllDay}
            color="#0a0a0a"
            onValueChange={toggleIsAllDay}
          />
        </View>

        <View style={calendarFormStyles.dateTimeSection}>
          <View style={calendarFormStyles.dateTimeRow}>
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

          <View style={calendarFormStyles.dateTimeRow}>
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
        </View>

        <View style={calendarFormStyles.switchBlock}>
          <Text variant="bodyLarge">Does this event repeat?</Text>
          <Switch
            value={isRecurrent}
            color="#0a0a0a"
            onValueChange={toggleIsRecurrent}
          />
        </View>

        {calendarItem.isRecurrent && (
          <View style={calendarFormStyles.recurrenceBlock}>
            <CustomInput
              placeholder="Recurrence (eg. daily, weekly)"
              value={recurrenceRule}
              onChangeText={(text) =>
                onCalendarItemChange("recurrenceRule", text)
              }
            />
          </View>
        )}

        <View style={calendarFormStyles.eventPreviewBlock}>
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
            isHighlighted={isHighlighted ? isHighlighted : false}
            status={status ? (status as Status) : "PENDING"}
          />
        </View>

        <View style={calendarFormStyles.buttonContainer}>
          <Button mode="contained">Confirm Edit</Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default EditCalendarItem;
