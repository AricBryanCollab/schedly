import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { MutateCalendarItem } from "@/features/calendarItem/api/dto";
import { useState } from "react";

import CalendarItemCard from "@/components/ui/CalendarItemCard";
import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";
import { useLocalSearchParams } from "expo-router";

import { eventIcons } from "@/constants/eventIcon";
import DatePickerField from "@/features/calendarItem/components/DatePickerField";
import TimePickerField from "@/features/calendarItem/components/TimePickerField";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

import {
  setDatePreserveTime,
  setTimePreserveDate,
} from "@/features/calendarItem/utils/setDateTime";

import { eventCardDetails } from "@/features/calendarItem/api/mockData";
import { Status } from "@/utils/formatStatus";

const EditCalendarItem = () => {
  const { id } = useLocalSearchParams();
  const eventId = Array.isArray(id) ? id[0] : id;
  const cardDetail = eventCardDetails.find((event) => event.id === eventId) as
    | MutateCalendarItem
    | undefined;
  const [calendarItem, setCalendarItem] = useState<MutateCalendarItem>(() => {
    if (!cardDetail) {
      throw new Error("Calendar item not found");
    }

    return {
      ...cardDetail,
      startDate: new Date(cardDetail.startDate ?? Date.now()),
      endDate: new Date(cardDetail.endDate ?? Date.now()),
    };
  });

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

  console.log(icon);

  const onCalendarItemChange = <K extends keyof MutateCalendarItem>(
    key: K,
    value: MutateCalendarItem[K]
  ) => {
    setCalendarItem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleIsAllDay = () => {
    setCalendarItem((prev) => {
      const nextIsAllDay = !prev.isAllDay;

      const updatedStart = new Date(prev.startDate);
      const updatedEnd = new Date(prev.endDate);

      if (nextIsAllDay) {
        updatedStart.setHours(0, 0, 0, 0);
        updatedEnd.setHours(0, 0, 0, 0);
      }

      return {
        ...prev,
        isAllDay: nextIsAllDay,
        startDate: updatedStart,
        endDate: updatedEnd,
      };
    });
  };

  const toggleIsRecurrent = () => {
    setCalendarItem((prev) => ({
      ...calendarItem,
      isRecurrent: !prev.isRecurrent,
    }));
  };

  const updateStartDate = (newDateOnly: Date) => {
    setCalendarItem((prev) => ({
      ...prev,
      startDate: setDatePreserveTime(prev.startDate, newDateOnly),
    }));
  };

  const updateStartTime = (newTimeOnly: Date) => {
    setCalendarItem((prev) => ({
      ...prev,
      startDate: setTimePreserveDate(prev.startDate, newTimeOnly),
    }));
  };

  const updateEndDate = (newDateOnly: Date) => {
    setCalendarItem((prev) => ({
      ...prev,
      endDate: setDatePreserveTime(prev.endDate, newDateOnly, {
        isEndDate: true,
        compareTo: prev.startDate,
      }),
    }));
  };

  const updateEndTime = (newTimeOnly: Date) => {
    setCalendarItem((prev) => ({
      ...prev,
      endDate: setTimePreserveDate(prev.endDate, newTimeOnly, {
        isEndTime: true,
        compareTo: prev.startDate,
      }),
    }));
  };

  return (
    <ScreenWrapper>
      <ScreenWrapper>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.titleBlock}>
            <Text variant="headlineSmall">Create an Event Here</Text>
          </View>

          <CustomInput
            placeholder="Event Title"
            icon="text"
            value={title}
            onChangeText={(text) => onCalendarItemChange("title", text)}
          />

          <CustomInput
            placeholder="Description (optional)"
            icon="note-text"
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
              icon="repeat"
              value={recurrenceRule}
              onChangeText={(text) =>
                onCalendarItemChange("recurrenceRule", text)
              }
            />
          )}

          <View style={styles.eventPreviewBlock}>
            <Text variant="headlineSmall">Card Preview</Text>

            <CalendarItemCard
              id={eventId}
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
            <Button mode="contained">Create</Button>
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
