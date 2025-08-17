import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";

interface NotifiicationActionsProps {
  itemId: string;
  openMenu: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const NotificationActions = ({
  itemId,
  openMenu,
  onClose,
  onOpen,
}: NotifiicationActionsProps) => {
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
        <Menu.Item
          leadingIcon="check"
          onPress={() => {}}
          title="Mark as Read"
        />
        <Divider />
        <Menu.Item leadingIcon="delete" onPress={() => {}} title="Delete" />
      </Menu>
    </View>
  );
};

export default NotificationActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
