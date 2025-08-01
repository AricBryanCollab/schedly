import { StyleSheet, View } from "react-native";

import { Divider, IconButton, Menu } from "react-native-paper";

interface EventCardActionsProps {
  openMenu: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EventCardActions = ({
  openMenu,
  onClose,
  onOpen,
}: EventCardActionsProps) => {
  return (
    <View style={styles.container}>
      <Menu
        visible={openMenu}
        onDismiss={onClose}
        anchor={
          <IconButton onPress={onOpen} icon="dots-horizontal" size={28} />
        }
        anchorPosition="bottom"
      >
        <Menu.Item leadingIcon="pencil" onPress={() => {}} title="Edit" />
        <Divider />
        <Menu.Item leadingIcon="delete" onPress={() => {}} title="Delete" />
      </Menu>
    </View>
  );
};

export default EventCardActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
