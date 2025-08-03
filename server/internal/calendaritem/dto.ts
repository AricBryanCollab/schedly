export type Status = "PENDING" | "INCOMING" | "INPROGRESS" | "COMPLETED";

export interface CalendarItem {
  id: string;
  title: string;
  icon: string;
  description?: string | null;
  startTime: Date;
  endTime: Date;
  isAllDay: boolean;
  isRecurrent: boolean;
  recurrenceRule?: string | null;
  isHighlighted: boolean;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
