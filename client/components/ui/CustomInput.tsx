import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface CustomInputProps {
  placeholder: string;
  icon: IconSource;
  isTextArea?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput = ({
  placeholder,
  icon,
  isTextArea = false,
  value,
  onChangeText,
}: CustomInputProps) => {
  return (
    <View style={styles.inputBlock}>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        theme={{ roundness: 12 }}
        placeholder={placeholder}
        left={<TextInput.Icon icon={icon} />}
        multiline={isTextArea}
        numberOfLines={isTextArea ? 5 : 1}
        style={isTextArea ? styles.textArea : styles.input}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
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
  input: {},
});
