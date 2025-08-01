import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";

import { useRouter } from "expo-router";

interface EventCardActionsProps {
  itemId: string;
  openMenu: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EventCardActions = ({
  itemId,
  openMenu,
  onClose,
  onOpen,
}: EventCardActionsProps) => {
  const router = useRouter();

  const handleEditePress = () => {
    onClose();
    router.push({
      pathname: "/(calendar-item)/[id]/edit-item",
      params: { id: itemId },
    });
  };

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
          leadingIcon="pencil"
          onPress={handleEditePress}
          title="Edit"
        />
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
