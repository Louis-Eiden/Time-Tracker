import React, { ReactNode, useEffect, useState } from "react";
import { View, Modal, TextInput } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { createModalFormStyles } from "../theme/styles";

interface ModalFormProps {
  //general
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: string, startTime?: string, endTime?: string) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;

  // Time related
  isTimeEntry?: boolean;

  startTime?: string; // old startTime
  endTime?: string; // old endTime
  onStartTimeChange?: (value: string) => void; // new startTime
  onEndTimeChange?: (value: string) => void;

  //other
  children?: ReactNode;
}

export default function ModalForm({
  visible,
  onClose,
  onConfirm,
  title,
  inputValue,
  onInputChange,
  placeholder = "Enter name",
  isTimeEntry,
  startTime = "",
  endTime = "",
  onStartTimeChange,
  onEndTimeChange,
}: ModalFormProps) {
  // Style and Contexts
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createModalFormStyles(colors);
  const [isFocused, setIsFocused] = useState(false);
  const [startTimeFocused, setStartTimeFocused] = useState(false);
  const [endTimeFocused, setEndTimeFocused] = useState(false);
  const { timeFormat } = useTimeFormat();

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
              {/* Time Entry */}
              {/* <TextInput
                style={styles.modalInput}
                // value={date}
                // onChangeText={onDateChange}
                placeholder={
                  timeFormat === "24h"
                    ? "date dd,mm,yyyy"
                    : "date mm/dd/yyyy"
                }
                placeholderTextColor={colors.text}
                selectionColor="#000000"
                underlineColorAndroid="transparent"
              /> */}
              <TextInput
                style={[
                  styles.modalInput,
                  startTimeFocused && styles.modalInputFocused,
                ]}
                value={startTime}
                onChangeText={onStartTimeChange}
                placeholder={
                  timeFormat === "24h"
                    ? "Start Time (HH:MM)"
                    : "Start Time hh:mm AM/PM"
                }
                placeholderTextColor={colors.text}
                onFocus={() => setStartTimeFocused(true)} //Just for styling when focus
                onBlur={() => setStartTimeFocused(false)}
                // selectionColor="#000000"
                // underlineColorAndroid="transparent"
              />
              <TextInput
                style={[
                  styles.modalInput,
                  endTimeFocused && styles.modalInputFocused,
                ]}
                value={endTime}
                onChangeText={onEndTimeChange}
                placeholder={
                  timeFormat === "24h"
                    ? "End Time (HH:MM)"
                    : "End Time hh:mm AM/PM"
                }
                placeholderTextColor={colors.text}
                onFocus={() => setEndTimeFocused(true)} //Just for styling when focus
                onBlur={() => setEndTimeFocused(false)}
                // selectionColor="#000000"
                // underlineColorAndroid="transparent"
              />
            </>
          ) : (
            // Job Name Entry
            <TextInput
              style={[styles.modalInput, isFocused && styles.modalInputFocused]}
              value={inputValue}
              onChangeText={onInputChange}
              placeholder={placeholder}
              placeholderTextColor={colors.text}
              // selectionColor="#000000"
              // underlineColorAndroid="transparent"
              onFocus={() => setIsFocused(true)} //Just for styling when focus
              onBlur={() => setIsFocused(false)}
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
              disabled={
                // disable if either input is empty
                isTimeEntry
                  ? !startTime?.trim() || !endTime?.trim()
                  : !inputValue.trim()
              }
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
