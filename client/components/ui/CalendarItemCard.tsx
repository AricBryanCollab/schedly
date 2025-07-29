import { secondFormatDate } from "@/utils/formatDate";
import { Status, getReadableStatus, getStatusIcon } from "@/utils/formatStatus";
import { StyleSheet, View } from "react-native";
import { Chip, Icon, Text } from "react-native-paper";

interface CalendarItemCardProps<T, U> {
  title: T;
  startDate: T;
  endDate: T;
  description: T;
  isAllDay: U;
  isRecurrent: U;
  status: Status;
  isHighlighted: U;
}

const CalendarItemCard = ({
  title,
  startDate,
  endDate,
  description,
  isAllDay,
  isRecurrent,
  isHighlighted,
  status,
}: CalendarItemCardProps<string, boolean>) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon source="calendar-text" size={18} />
        <Text style={styles.title} variant="bodyLarge">
          {title}
        </Text>
      </View>

      <View style={styles.timeContent}>
        <View style="">
          <Text variant="bodySmall">Start</Text>
          <Text variant="bodyMedium">{secondFormatDate(startDate)}</Text>
        </View>
        <View>
          <Text variant="bodySmall">End</Text>
          <Text variant="bodyMedium">{secondFormatDate(endDate)}</Text>
        </View>
      </View>

      <View>
        <Text variant="bodySmall" numberOfLines={4} ellipsizeMode="tail">
          {description}
        </Text>
      </View>

      <View style={styles.tagBlock}>
        {isAllDay && (
          <Chip mode="outlined" icon="weather-sunny">
            Whole Day
          </Chip>
        )}

        {isRecurrent && (
          <Chip mode="outlined" icon="history">
            Recurrent
          </Chip>
        )}

        <Chip mode="outlined" icon={getStatusIcon(status)}>
          {getReadableStatus(status)}
        </Chip>
      </View>

      <View style={styles.bookmarkBlock}>
        <Icon
          source={isHighlighted ? "bookmark" : "bookmark-outline"}
          size={24}
        />
      </View>
    </View>
  );
};

export default CalendarItemCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    minWidth: 300,
    height: 260,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeBlock: {
    flex: 1,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 0.9,
  },
  tagBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bookmarkBlock: {
    position: "absolute",
    bottom: 10,
    right: 12,
  },
});
