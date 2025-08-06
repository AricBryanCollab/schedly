import EventCardActions from "@/features/calendarItem/components/EventCardActions";
import { useState } from "react";

import { StyleSheet, View } from "react-native";
import { Chip, Icon, Text } from "react-native-paper";

import { secondFormatDate } from "@/utils/formatDate";
import { Status, getReadableStatus, getStatusIcon } from "@/utils/formatStatus";

export interface CalendarItemCardProps<T, U> {
  id: T;
  title: T;
  startDate: T;
  iconTitle: T;
  endDate: T;
  description: T;
  isAllDay: U;
  isRecurrent: U;
  recurrenceRule?: T;
  status: Status;
  isHighlighted: U;
}

const CalendarItemCard = ({
  id,
  title,
  iconTitle,
  startDate,
  endDate,
  description,
  isAllDay,
  isRecurrent,
  recurrenceRule,
  isHighlighted,
  status,
}: CalendarItemCardProps<string, boolean>) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const onOpen = () => setOpenMenu(true);

  const onClose = () => setOpenMenu(false);

  function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon source={iconTitle} size={18} />
        <Text style={styles.title} variant="bodyLarge">
          {title}
        </Text>
      </View>

      <View style={styles.cardOptions}>
        <EventCardActions
          itemId={id}
          openMenu={openMenu}
          onOpen={onOpen}
          onClose={onClose}
        />
      </View>

      <View style={styles.timeContent}>
        <View>
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

        {isRecurrent && recurrenceRule && (
          <Chip mode="outlined" icon="history">
            {capitalizeFirstLetter(recurrenceRule)}
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
    position: "relative",
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
  cardOptions: {
    position: "absolute",
    top: -6,
    right: 4,
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
