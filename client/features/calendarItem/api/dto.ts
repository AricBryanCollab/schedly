export interface MutateCalendarItem {
  title: string;
  description: string;
  icon: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  isRecurrent: boolean;
  recurrenceRule: string;
  status?: string;
}
