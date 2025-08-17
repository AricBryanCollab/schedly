import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { secondFormatDate } from "@/utils/formatDate";

export interface NotificationItemProps {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationItem = (props: NotificationItemProps) => {
  const { id, message, isRead, createdAt } = props;

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text variant="bodyMedium" style={styles.notificationText}>
          {message}
        </Text>
        <Text variant="bodySmall" style={styles.dateText}>
          {secondFormatDate(createdAt)}
        </Text>
      </View>
      <TouchableOpacity style={styles.actionContainer}>
        <IconButton icon="dots-vertical" />
      </TouchableOpacity>
    </View>
  );
};
export default NotificationItem;

const styles = StyleSheet.create({
  notificationItem: {
    position: "relative",
    backgroundColor: "#F8F5FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    marginVertical: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  notificationText: {
    marginBottom: 4,
    lineHeight: 20,
  },
  dateText: {
    color: "#666666",
    opacity: 0.8,
  },
  actionContainer: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
