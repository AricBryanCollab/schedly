import { MutateCalendarItem } from "@/features/calendarItem/api/dto";
import {
  setDatePreserveTime,
  setTimePreserveDate,
} from "@/features/calendarItem/utils/setDateTime";
import { useState } from "react";

const useAddCalendarItem = () => {
  const initialStartDate = new Date();
  const initialEndDate = new Date(initialStartDate);
  initialEndDate.setHours(initialStartDate.getHours() + 1);

  const initialCalendarItem = {
    title: "",
    description: "",
    icon: "",
    startDate: initialStartDate,
    endDate: initialEndDate,
    isAllDay: false,
    isRecurrent: false,
    recurrenceRule: "",
  };

  const [calendarItem, setCalendarItem] =
    useState<MutateCalendarItem>(initialCalendarItem);

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

  return {
    calendarItem,
    onCalendarItemChange,
    toggleIsAllDay,
    updateStartDate,
    updateStartTime,
    updateEndDate,
    updateEndTime,
  };
};

export default useAddCalendarItem;
