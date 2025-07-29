export type Status = "PENDING" | "INCOMING" | "INPROGRESS" | "COMPLETED";

export const getReadableStatus = (status: Status): string => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "INCOMING":
      return "Incoming";
    case "INPROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown Status"; // Fallback for unexpected status
  }
};

export const getStatusIcon = (status: Status) => {
  switch (status) {
    case "COMPLETED":
      return "check-circle";
    case "PENDING":
      return "clock-outline";
    case "INCOMING":
      return "bell-outline";
    case "INPROGRESS":
      return "progress-wrench";
    default:
      return "calendar-check";
  }
};
