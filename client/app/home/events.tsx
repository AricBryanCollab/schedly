import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import CalendarItemCard from "@/components/ui/CalendarItemCard";
import { eventCardDetails } from "@/features/calendarItem/api/mockData";

const EventsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "highlight">("all");

  const filteredCards =
    activeTab === "highlight"
      ? eventCardDetails.filter((card) => card.isHighlighted)
      : eventCardDetails;

  return (
    <ScreenWrapper>
      <View style={styles.tabBlock}>
        <TouchableOpacity onPress={() => setActiveTab("all")}>
          <Text
            variant="bodyLarge"
            style={[styles.tabText, activeTab === "all" && styles.activeTab]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("highlight")}>
          <Text
            variant="bodyLarge"
            style={[
              styles.tabText,
              activeTab === "highlight" && styles.activeTab,
            ]}
          >
            Highlight
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {filteredCards.map((card) => (
          <CalendarItemCard key={card.id} {...card} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabBlock: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  tabText: {
    opacity: 0.8,
    letterSpacing: 1.25,
  },
  activeTab: {
    fontWeight: "bold",
    opacity: 1,
    textDecorationLine: "underline",
  },
});
