import { CalendarItemCardProps } from "@/components/ui/CalendarItemCard";

export const eventCardDetails: CalendarItemCardProps<string, boolean>[] = [
  {
    title: "Coffee with Sarah",
    startDate: "2025-08-01T10:00:00.000Z",
    iconTitle: "silverware-fork-knife",
    endDate: "2025-08-01T11:00:00.000Z",
    description:
      "Catching up with Sarah at our favorite cafe. We'll chat about recent travels and plan our next hiking trip. Don't be late!",
    isAllDay: false,
    isRecurrent: false,
    status: "INCOMING",
    isHighlighted: true,
  },
  {
    title: "Saturday Movie Night",
    iconTitle: "movie-open",
    startDate: "2025-08-05T19:30:00.000Z",
    endDate: "2025-08-05T22:00:00.000Z",
    description:
      "Movie night at Alex's place! We're watching the new sci-fi blockbuster. Bring snacks if you can, popcorn will be provided.",
    isAllDay: false,
    isRecurrent: false,
    status: "PENDING",
    isHighlighted: false,
  },
  {
    title: "Weekend Camping Trip",
    iconTitle: "airplane",
    startDate: "2025-08-10T08:00:00.000Z",
    endDate: "2025-08-12T16:00:00.000Z",
    description:
      "Annual camping adventure with the gang! We'll be at Pine Lake. Remember to pack your sleeping bags, tents, and bug spray. Food rota is shared in the group chat.",
    isAllDay: true,
    isRecurrent: false,
    status: "PENDING",
    isHighlighted: true,
  },
  {
    title: "Grocery Shopping",
    iconTitle: "cart",
    startDate: "2025-07-29T17:00:00.000Z",
    endDate: "2025-07-29T18:30:00.000Z",
    description:
      "Quick run to the supermarket for weekly essentials. Need to stock up on fresh produce and pantry items. Don't forget the milk!",
    isAllDay: false,
    isRecurrent: true, // This could be a weekly recurring task
    status: "COMPLETED",
    isHighlighted: false,
  },
  {
    title: "Evening Jog",
    iconTitle: "dumbbell",
    startDate: "2025-08-02T18:00:00.000Z",
    endDate: "2025-08-02T18:45:00.000Z",
    description:
      "Daily evening jog around the park. Aiming for 45 minutes. Great way to unwind after a long day.",
    isAllDay: false,
    isRecurrent: true,
    status: "INPROGRESS",
    isHighlighted: false,
  },
  {
    title: "Visit to Grandma's",
    iconTitle: "account-group",
    startDate: "2025-08-15T14:00:00.000Z",
    endDate: "2025-08-15T17:00:00.000Z",
    description:
      "Spending the afternoon with Grandma. Bringing her favorite cookies and helping out with some chores around the house.",
    isAllDay: false,
    isRecurrent: false,
    status: "INCOMING",
    isHighlighted: true,
  },
  {
    title: "Book Club Meeting",
    iconTitle: "book-open",
    startDate: "2025-08-20T19:00:00.000Z",
    endDate: "2025-08-20T20:30:00.000Z",
    description:
      "Discussing this month's book, 'The Midnight Library'. Make sure you've finished reading and prepared your thoughts!",
    isAllDay: false,
    isRecurrent: true,
    status: "PENDING",
    isHighlighted: false,
  },
];
