import calendarFormStyles from "@/styles/calendarItemForm";
import { ScrollView, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CalendarItemCard from "@/components/ui/CalendarItemCard";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";

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
      <ScrollView style={calendarFormStyles.scrollContent}>
        <View style={calendarFormStyles.titleBlock}>
          <Text variant="headlineSmall">Create an Event</Text>
        </View>

        <View style={calendarFormStyles.inputGroup}>
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

        <View style={calendarFormStyles.switchBlock}>
          <Text variant="bodyLarge">Whole Day?</Text>
          <Switch
            value={calendarItem.isAllDay}
            color="#0a0a0a"
            onValueChange={toggleIsAllDay}
          />
        </View>

        <View style={calendarFormStyles.dateTimeSection}>
          <View style={calendarFormStyles.dateTimeRow}>
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

          <View style={calendarFormStyles.dateTimeRow}>
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

        <View style={calendarFormStyles.switchBlock}>
          <Text variant="bodyLarge">Does this event repeat?</Text>
          <Switch
            value={calendarItem.isRecurrent}
            color="#0a0a0a"
            onValueChange={toggleIsRecurrent}
          />
        </View>

        {calendarItem.isRecurrent && (
          <View style={calendarFormStyles.recurrenceBlock}>
            <CustomInput
              placeholder="Recurrence (eg. daily, weekly)"
              value={calendarItem.recurrenceRule}
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
            isHighlighted={false}
            status="PENDING"
          />
        </View>

        <View style={calendarFormStyles.buttonContainer}>
          <Button mode="contained">Create</Button>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddCalendarItem;
