import { StyleSheet } from "react-native";

const calendarFormStyles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  titleBlock: {
    paddingVertical: 20,
    paddingBottom: 24,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  switchBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  dateTimeSection: {
    gap: 16,
    marginVertical: 16,
  },
  dateTimeRow: {
    gap: 12,
    paddingHorizontal: 4,
  },
  recurrenceBlock: {
    marginTop: 16,
    marginBottom: 24,
  },
  eventPreviewBlock: {
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 4,
    gap: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
});

export default calendarFormStyles;
