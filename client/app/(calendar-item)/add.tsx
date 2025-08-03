import ScreenWrapper from "@/components/layout/ScreenWrapper";

import CustomInput from "@/components/ui/CustomInput";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

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

        <View style={styles.inputBlock}>
          <TextInput
            mode="outlined"
            theme={{ roundness: 12 }}
            placeholder="Category"
            left={<TextInput.Icon icon="tag" />}
          />
        </View>
      </ScrollView>
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
