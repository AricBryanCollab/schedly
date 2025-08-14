import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

interface CustomInputProps {
  placeholder: string;
  isTextArea?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput = ({
  placeholder,
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
