import React from "react";
import { View, Modal, TextInput } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";

interface ListItemModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: string, startTime?: string, endTime?: string) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  isTimeEntry?: boolean;
  startTime?: string;
  endTime?: string;
  onStartTimeChange?: (value: string) => void;
  onEndTimeChange?: (value: string) => void;
}

export default function ListItemModal({
  visible,
  onClose,
  onConfirm,
  title,
  inputValue,
  onInputChange,
  placeholder = "Enter name",
  isTimeEntry = false,
  startTime = "",
  endTime = "",
  onStartTimeChange,
  onEndTimeChange
}: ListItemModalProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = {
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center",
      color: colors.text,
    },
    modalInput: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: "100%",
      color: colors.text,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 0,
      borderColor: colors.border,
      borderWidth: 2,
      backgroundColor: "#D3D3D3",
    },
  };

  const handleConfirm = () => {
    if (isTimeEntry) {
      if (startTime && endTime) {
        onConfirm(inputValue.trim(), startTime, endTime);
      }
    } else if (inputValue.trim()) {
      onConfirm(inputValue.trim());
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {isTimeEntry ? (
            <>
              <TextInput
                style={styles.modalInput}
                value={startTime}
                onChangeText={onStartTimeChange}
                placeholder="Start Time (HH:MM)"
                placeholderTextColor={colors.text}
                selectionColor="#000000"
                underlineColorAndroid="transparent"
              />
              <TextInput
                style={styles.modalInput}
                value={endTime}
                onChangeText={onEndTimeChange}
                placeholder="End Time (HH:MM)"
                placeholderTextColor={colors.text}
                selectionColor="#000000"
                underlineColorAndroid="transparent"
              />
            </>
          ) : (
            <TextInput
              style={styles.modalInput}
              value={inputValue}
              onChangeText={onInputChange}
              placeholder={placeholder}
              placeholderTextColor={colors.text}
              selectionColor="#000000"
              underlineColorAndroid="transparent"
            />
          )}
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.modalButton}
              rippleColor="transparent"
            >
              <Text style={{ color: "#000000" }}>Cancel</Text>
            </Button>
            <Button
              mode="outlined"
              onPress={handleConfirm}
              style={styles.modalButton}
              rippleColor="transparent"
            >
              <Text style={{ color: "#000000" }}>Confirm</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
