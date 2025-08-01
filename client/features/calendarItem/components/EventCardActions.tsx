import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";

import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
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

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showDeleteModal = () => setIsDeleteModalVisible(true);

  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  const handleEditPress = () => {
    onClose();
    router.push({
      pathname: "/(calendar-item)/[id]/edit-item",
      params: { id: itemId },
    });
  };

  const handleDeletePress = () => {
    onClose();
    showDeleteModal();
  };

  const handleConfirmDelete = (id: string) => {
    console.log(id);
    //Todo: add API call for delete calendar item
    hideDeleteModal();
  };

  return (
    <>
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
            onPress={handleEditPress}
            title="Edit"
          />
          <Divider />
          <Menu.Item
            leadingIcon="delete"
            onPress={handleDeletePress}
            title="Delete"
          />
        </Menu>
      </View>

      <ConfirmDeleteModal
        visible={isDeleteModalVisible}
        onDismiss={hideDeleteModal}
        onClose={hideDeleteModal}
        onDelete={() => handleConfirmDelete(itemId)}
        title="Delete Event"
        statement={`Are you sure you want to delete this event with ID ${itemId} ? This action cannot be undone.`}
      />
    </>
  );
};

export default EventCardActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
