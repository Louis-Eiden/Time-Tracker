import React, { useState } from "react";
import { View, Modal, TextInput, Text } from "react-native";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { createModalFormStyles } from "../theme/styles";
import RetroButton from "./RetroButton";

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: string, startTime?: Date, endTime?: Date) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  isTimeEntry?: boolean;
  startTime?: Date;
  endTime?: Date;
  onStartTimeChange?: (value: Date) => void;
  onEndTimeChange?: (value: Date) => void;
}

function combineDateAndTime(date: Date, hours: number, minutes: number): Date {
  const result = new Date(date);
  result.setHours(hours);
  result.setMinutes(minutes);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
}

export default function ModalForm({
  visible,
  onClose,
  onConfirm,
  title,
  inputValue,
  onInputChange,
  placeholder,
  isTimeEntry,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: ModalFormProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createModalFormStyles(colors);
  const { timeFormat } = useTimeFormat();

  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null,
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date | undefined>();
  const [newStartTime, setNewStartTime] = useState<Date | undefined>(startTime);
  const [newEndTime, setNewEndTime] = useState<Date | undefined>(endTime);

  const openStartPicker = () => {
    setActivePicker("start");
    setDatePickerVisible(true);
  };

  const openEndPicker = () => {
    setActivePicker("end");
    setDatePickerVisible(true);
  };

  const handleConfirm = () => {
    if (isTimeEntry) {
      if (newStartTime && newEndTime) {
        onConfirm(inputValue.trim(), newStartTime, newEndTime);
      }
      return;
    }
    if (inputValue.trim()) {
      onConfirm(inputValue.trim());
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>

          {isTimeEntry ? (
            <View style={styles.pickerContainer}>
              <RetroButton style={styles.button} onPress={openStartPicker}>
                <Text style={styles.buttonText}>
                  {newStartTime
                    ? `START: ${newStartTime.toLocaleString()}`
                    : "PICK START TIME"}
                </Text>
              </RetroButton>
              <RetroButton style={styles.button} onPress={openEndPicker}>
                <Text style={styles.buttonText}>
                  {newEndTime
                    ? `END: ${newEndTime.toLocaleString()}`
                    : "PICK END TIME"}
                </Text>
              </RetroButton>

              <DatePickerModal
                locale="en"
                mode="single"
                visible={datePickerVisible}
                onDismiss={() => setDatePickerVisible(false)}
                date={pickedDate}
                onConfirm={({ date }) => {
                  setDatePickerVisible(false);
                  setPickedDate(date);
                  setTimePickerVisible(true);
                }}
              />
              <TimePickerModal
                visible={timePickerVisible}
                onDismiss={() => setTimePickerVisible(false)}
                use24HourClock={timeFormat === "24h"}
                onConfirm={({ hours, minutes }) => {
                  if (!pickedDate || !activePicker) return;
                  const combined = combineDateAndTime(
                    pickedDate,
                    hours,
                    minutes,
                  );
                  if (activePicker === "start") {
                    setNewStartTime(combined);
                    onStartTimeChange?.(combined);
                  } else {
                    setNewEndTime(combined);
                    onEndTimeChange?.(combined);
                  }
                  setTimePickerVisible(false);
                  setActivePicker(null);
                }}
              />
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={onInputChange}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <RetroButton
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              shadowColor={colors.border}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </RetroButton>
            <RetroButton
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
              shadowColor={colors.border}
            >
              <Text style={styles.buttonText}>CONFIRM</Text>
            </RetroButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
