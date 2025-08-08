import { eventCardDetails } from "@/features/calendarItem/api/mockData";
import { useState } from "react";

import { MutateCalendarItem } from "@/features/calendarItem/api/dto";

import {
  setDatePreserveTime,
  setTimePreserveDate,
} from "@/features/calendarItem/utils/setDateTime";

const useEditCalendarItem = (id: string | string[]) => {
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

  return {
    calendarItem,
    onCalendarItemChange,
    toggleIsAllDay,
    updateStartDate,
    updateStartTime,
    updateEndDate,
    updateEndTime,
    toggleIsRecurrent,
  };
};

export default useEditCalendarItem;
