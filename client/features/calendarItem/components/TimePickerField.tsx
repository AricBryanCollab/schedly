import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useState } from "react";
import { Platform, View } from "react-native";
import { TextInput } from "react-native-paper";

interface TimePickerFieldProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
}

const TimePickerField = ({ label, value, onChange }: TimePickerFieldProps) => {
  const [visible, setVisible] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selectedTime?: Date) => {
    setVisible(false);
    if (selectedTime && value) {
      const newDate = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      onChange(newDate);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <TextInput
        label={label}
        left={<TextInput.Icon icon="clock-outline" />}
        theme={{ roundness: 12 }}
        value={value ? format(value, "hh:mm a") : ""}
        onPressIn={() => setVisible(true)}
        editable={false}
        mode="outlined"
      />

      {visible && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default TimePickerField;
