import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const NotificationScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Notifications</Text>
        </View>

        <View style={styles.notifListBlock}>
          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text variant="bodyMedium" style={styles.notificationText}>
                You have modified the event: Developer Meeting
              </Text>
              <Text variant="bodySmall" style={styles.dateText}>
                Jul 30, 2025 1:00 AM
              </Text>
            </View>
            <TouchableOpacity style={styles.actionContainer}>
              <IconButton icon="dots-vertical" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  titleBlock: {
    paddingVertical: 20,
    paddingBottom: 24,
  },
  notifListBlock: {
    flex: 1,
    gap: 10,
  },
  notificationItem: {
    position: "relative",
    backgroundColor: "#ffffff",
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
