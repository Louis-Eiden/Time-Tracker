import React, { ReactNode, useState } from "react";
import { View, Modal, TextInput, Platform } from "react-native";
import { Text, Button, Portal } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { createModalFormStyles } from "../theme/styles";

// import { createButtonStyles } from "../theme/buttons";

interface ModalFormProps {
  // general
  visible: boolean;
  onClose: () => void;
  onConfirm: (value: string, startTime?: Date, endTime?: Date) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;

  // Time related
  isTimeEntry?: boolean;

  startTime?: Date;
  endTime?: Date;
  onStartTimeChange?: (value: Date) => void;
  onEndTimeChange?: (value: Date) => void;

  // other
  children?: ReactNode;
}

/**
 * Combines a date with hours & minutes into a single Date object
 */
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
  placeholder = "Enter name",
  isTimeEntry,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: ModalFormProps) {
  // Theme / styles
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createModalFormStyles(colors, Platform.OS);
  // const buttonStyles = createButtonStyles(colors);
  const { timeFormat } = useTimeFormat();

  // Focus
  const [isFocused, setIsFocused] = useState(false);

  // Picker state
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null,
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [pickedDate, setPickedDate] = useState<Date | undefined>();
  const [newStartTime, setNewStartTime] = useState<Date | undefined>(startTime);
  const [newEndTime, setNewEndTime] = useState<Date | undefined>(endTime);

  const isWeb = Platform.OS === "web";

  // Open pickers
  const openStartPicker = () => {
    setActivePicker("start");
    setDatePickerVisible(true);
  };

  const openEndPicker = () => {
    setActivePicker("end");
    setDatePickerVisible(true);
  };

  // Confirm modal
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
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>

          {isTimeEntry ? (
            <>
              {/* START TIME */}
              <Button style={styles.openPickerButton} onPress={openStartPicker}>
                <Text style={styles.openPickerButtonText}>
                  {newStartTime
                    ? `Start: ${newStartTime.toLocaleString()}`
                    : "Pick Start Time"}
                </Text>
              </Button>

              {/* END TIME */}
              <Button style={styles.openPickerButton} onPress={openEndPicker}>
                <Text style={styles.openPickerButtonText}>
                  {newEndTime
                    ? `End: ${newEndTime.toLocaleString()}`
                    : "Pick End Time"}
                </Text>
              </Button>

              <Portal>
                {/* DATE PICKER */}
                <DatePickerModal
                  locale={timeFormat === "12h" ? "en" : "de"}
                  mode="single"
                  visible={datePickerVisible}
                  date={pickedDate}
                  onConfirm={({ date }) => {
                    setDatePickerVisible(false);
                    setPickedDate(date);
                    setTimePickerVisible(true);
                  }}
                  onDismiss={() => setDatePickerVisible(false)}
                />

                {/* TIME PICKER */}
                <TimePickerModal
                  visible={timePickerVisible}
                  use24HourClock={timeFormat === "24h"}
                  onDismiss={() => setTimePickerVisible(false)}
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
              </Portal>
            </>
          ) : (
            <TextInput
              style={[styles.modalInput, isFocused && styles.modalInputFocused]}
              value={inputValue}
              onChangeText={onInputChange}
              placeholder={placeholder}
              placeholderTextColor={colors.text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}

          {/* BUTTONS */}
          <View style={styles.modalButtonContainer}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.modalButton}
              rippleColor="transparent"
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Button>

            <Button
              mode="outlined"
              onPress={handleConfirm}
              disabled={
                isTimeEntry ? !newStartTime || !newEndTime : !inputValue.trim()
              }
              style={styles.modalButton}
              rippleColor="transparent"
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
