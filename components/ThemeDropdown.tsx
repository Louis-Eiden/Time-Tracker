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
import { createSettingsStyles } from "@/theme/styles";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
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

  return (
    <View>
      {/* Trigger Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.themeButtonText}>Theme: {theme}</Text>
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
          <View style={localStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  localStyles.dropdownContainer,
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
                    localStyles.header,
                    {
                      borderBottomColor: colors.border,
                      borderBottomWidth: colors.borderWidth,
                    },
                  ]}
                >
                  <Text
                    style={[localStyles.headerText, { color: colors.text }]}
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
                        localStyles.optionRow,
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
                          localStyles.optionText,
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

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: 300,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
  },
});
