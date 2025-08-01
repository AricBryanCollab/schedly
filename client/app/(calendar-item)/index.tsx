import { Stack } from "expo-router";
import React from "react";

const CalendarItemRoot = () => {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{ title: "Add Calendar Item", headerShown: false }}
      />
      <Stack.Screen
        name="[id]/edit-item"
        options={{ title: "Edit Calendar Item", headerShown: false }}
      />
    </Stack>
  );
};

export default CalendarItemRoot;
