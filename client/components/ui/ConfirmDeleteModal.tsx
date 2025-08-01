import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onDismiss: () => void;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  statement?: string;
}

const ConfirmDeleteModal = ({
  visible,
  onDismiss,
  onClose,
  onDelete,
  title = "Delete",
  statement = "",
}: ConfirmDeleteModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
      >
        <Text variant="titleMedium" style={styles.modalTitle}>
          {title}
        </Text>
        <Text style={styles.modalText}>{statement}</Text>
        <View style={styles.modalButtonContainer}>
          <Button onPress={onClose} mode="outlined" style={styles.modalButton}>
            Cancel
          </Button>
          <Button
            onPress={onDelete}
            mode="contained"
            buttonColor="#ef4444"
            style={styles.modalButton}
          >
            Delete
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
