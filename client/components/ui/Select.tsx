import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Menu, Text } from "react-native-paper";

interface SelectData {
  name: string;
  value: string;
}
interface SelectProps {
  value?: string;
  data: SelectData[];
  onSelect: (value: string) => void;
}

const defaultSelectValue = {
  name: "Select the event category",
  value: "tag",
};

const Select = ({ data, onSelect, value }: SelectProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectData>(defaultSelectValue);

  useEffect(() => {
    if (!value) {
      setSelected(defaultSelectValue);
      return;
    }

    const found = data.find((item) => item.value === value);
    if (found) {
      setSelected(found);
    }
  }, [value, data]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleSelect = (select: SelectData) => {
    setSelected(select);
    onSelect(select.value);
    closeMenu();
  };
  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.labelStyle}
            mode="outlined"
            onPress={openMenu}
          >
            <View style={styles.selectedContent}>
              <Text variant="bodyLarge">{selected.name}</Text>
            </View>
          </Button>
        }
      >
        <ScrollView>
          {data.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => handleSelect(item)}
              title={item.name}
              leadingIcon={item.value}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    height: 56,
    paddingVertical: 0,
    justifyContent: "center",
  },
  buttonContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  labelStyle: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
    marginLeft: 0,
  },
  selectedContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    flex: 1,
  },
});
