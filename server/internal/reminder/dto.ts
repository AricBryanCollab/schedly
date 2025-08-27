import { OffsetDuration } from "@prisma/client";

export class Reminder {
  id!: string;
  calendarItemId!: string;
  offset!: number;
  offsetType!: OffsetDuration;
  isSent!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
