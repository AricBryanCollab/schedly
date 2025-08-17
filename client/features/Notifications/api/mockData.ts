import { NotificationDTO } from "@/features/Notifications/api/dto";

export const mockNotificationsData: NotificationDTO[] = [
  {
    id: "979c5639-9cc0-4186-b437-44442d2432a1",
    userId: "user-001",
    message: "You have modified the event: Developer Meeting",
    isRead: false,
    createdAt: "2025-08-09T05:53:37.000Z",
  },
  {
    id: "979c5639-9cc0-4186-b437-44442d243232",
    userId: "user-001",
    message: "You have created an event: Session Standup",
    isRead: false,
    createdAt: "2025-08-09T05:52:50.000Z",
  },
  {
    id: "979c5639-9cc0-4186-b437-44442d243232",
    userId: "user-001",
    message: "You have created an event: Grocery Shopping",
    isRead: true,
    createdAt: "2025-08-09T05:52:50.000Z",
  },
];
