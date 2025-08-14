import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useState } from "react";
import { Platform, View } from "react-native";
import { TextInput } from "react-native-paper";

interface DatePickerFieldProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
}

const DatePickerField = ({ label, value, onChange }: DatePickerFieldProps) => {
  const [visible, setVisible] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setVisible(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <TextInput
        label={label}
        theme={{ roundness: 12 }}
        value={value ? format(value, "PPP") : ""}
        onPressIn={() => setVisible(true)}
        editable={false}
        mode="outlined"
      />

      {visible && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DatePickerField;
