import { Status } from "@/utils/formatStatus";

export interface MutateCalendarItem {
  title: string;
  description: string;
  icon: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  isRecurrent: boolean;
  isHighlighted?: boolean;
  recurrenceRule: string;
  status?: Status;
}
