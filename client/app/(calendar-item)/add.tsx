import ScreenWrapper from "@/components/layout/ScreenWrapper";

import CustomInput from "@/components/ui/CustomInput";
import Select from "@/components/ui/Select";

import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { eventIcons } from "@/constants/eventIcon";

const AddCalendarItem = () => {
  return (
    <ScreenWrapper>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.titleBlock}>
          <Text variant="headlineSmall">Create an Event Here</Text>
        </View>

        <CustomInput
          placeholder="Event Title"
          icon="text"
          value=""
          onChangeText={() => {}}
        />

        <CustomInput
          placeholder="Description (optional)"
          icon="note-text"
          isTextArea
          value=""
          onChangeText={() => {}}
        />

        <Select data={eventIcons} onSelect={() => {}} />
      </ScrollView>

      <View>
        <Text variant="headlineSmall">Card Preview</Text>
      </View>
    </ScreenWrapper>
  );
};

export default AddCalendarItem;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 8,
  },
  titleBlock: {
    paddingVertical: 12,
  },

  inputBlock: {
    flexDirection: "column",
    gap: 10,
    marginVertical: 12,
    marginHorizontal: 10,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
