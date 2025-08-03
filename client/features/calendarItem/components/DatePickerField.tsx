import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

import { format } from "date-fns";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface DatePickerFieldProps {
  label: string;
  value: Date | undefined;
  onChange: (date: CalendarDate) => void;
}

const DatePickerField = ({ label, value, onChange }: DatePickerFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginVertical: 8 }}>
      <TextInput
        label={label}
        left={<TextInput.Icon icon="calendar" />}
        theme={{ roundness: 12 }}
        value={value ? format(value, "PPP") : ""}
        onPressIn={() => setVisible(true)}
        editable={false}
        mode="outlined"
      />

      <DatePickerModal
        locale="en"
        mode="single"
        visible={visible}
        date={value}
        onDismiss={() => setVisible(false)}
        onConfirm={({ date }) => {
          setVisible(false);
          onChange(date);
        }}
      />
    </View>
  );
};

export default DatePickerField;
