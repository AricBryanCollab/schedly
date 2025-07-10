import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#337ed3",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#E8E8F7",
          borderTopWidth: 1,
          borderTopColor: "#715ddc",
          paddingBottom: 15,
          paddingTop: 6,
          height: 80,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="reminder"
        options={{
          title: "Reminder",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
