import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { mockNotificationsData } from "@/features/Notifications/api/mockData";
import NotificationItem from "@/features/Notifications/component/NotificationItem";

const NotificationScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Notifications</Text>
        </View>

        <ScrollView style={styles.notifListBlock}>
          {mockNotificationsData.map((notif) => {
            return <NotificationItem key={notif.id} {...notif} />;
          })}
        </ScrollView>
        <View style={styles.markAllContainer}>
          <TouchableOpacity>
            <Text variant="bodyMedium">Mark All As Read</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Reminders</Text>
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
    paddingBottom: 20,
    height: 350,
  },
  markAllContainer: {
    marginTop: "auto",
    paddingTop: 10,
  },
});
