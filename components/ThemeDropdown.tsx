import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from "react-native";
import { ChevronDown, Check } from "lucide-react-native";
import { useTheme, Theme, getThemeColors } from "@/contexts/ThemeContext";
import {
  createSettingsStyles,
  createThemeDropdownStyles,
} from "@/theme/styles";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
  const dropdownStyles = createThemeDropdownStyles();
  const [visible, setVisible] = useState(false);

  const themeOptions: { label: string; value: Theme }[] = [
    { label: "Retro Light", value: "retro-light" },
    { label: "Retro Dark", value: "retro-dark" },
    { label: "Retro Blue", value: "retro-blue" },
    { label: "Minimal", value: "minimal" },
  ];

  const handleSelect = (newTheme: Theme) => {
    setTheme(newTheme);
    setVisible(false);
  };

  // Find the label for the current theme
  const currentLabel =
    themeOptions.find((opt) => opt.value === theme)?.label || theme;

  return (
    <View>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
        style={[styles.row, { alignItems: "center" }]}
      >
        <Text style={styles.themeButtonText}>{currentLabel}</Text>
        <ChevronDown size={16} color={colors.text} style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      {/* Custom Modal for Dropdown */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={dropdownStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  dropdownStyles.dropdownContainer,
                  {
                    backgroundColor: colors.surface, // Use surface, not background
                    borderColor: colors.border,
                    borderWidth: colors.borderWidth,
                    borderRadius: colors.borderRadius,
                    // Apply dynamic shadow based on theme settings
                    ...Platform.select({
                      ios: {
                        shadowColor: colors.border,
                        shadowOffset: {
                          width: colors.shadowOffset,
                          height: colors.shadowOffset,
                        },
                        shadowOpacity: colors.shadowOffset > 0 ? 1 : 0.1,
                        shadowRadius: 0,
                      },
                      android: {
                        elevation: 8,
                      },
                    }),
                  },
                ]}
              >
                <View
                  style={[
                    dropdownStyles.header,
                    {
                      borderBottomColor: colors.border,
                      borderBottomWidth: colors.borderWidth,
                    },
                  ]}
                >
                  <Text
                    style={[dropdownStyles.headerText, { color: colors.text }]}
                  >
                    Select Theme
                  </Text>
                </View>

                {themeOptions.map((option, index) => {
                  const isSelected = theme === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        dropdownStyles.optionRow,
                        index !== themeOptions.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: colors.border,
                        },
                        isSelected && {
                          backgroundColor: colors.buttons + "20", // 20 = 12% opacity hex
                        },
                      ]}
                      onPress={() => handleSelect(option.value)}
                    >
                      <Text
                        style={[
                          dropdownStyles.optionText,
                          {
                            color: colors.text,
                            fontWeight: isSelected ? "bold" : "normal",
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                      {isSelected && <Check size={16} color={colors.buttons} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
