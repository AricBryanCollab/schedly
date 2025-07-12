enum Status {
  PENDING,
  INCOMING,
  INPROGRESS,
  COMPLETED,
}

export class CalendarItem {
  id!: string;
  userId!: string;

  title!: string;
  description?: string;
  startTIme!: Date;
  endTime!: Date;
  isAllDay!: boolean;
  isRecurrent!: boolean;
  recurrenceRule!: string;
  isHighlighted!: boolean;
  status!: Status;
}
