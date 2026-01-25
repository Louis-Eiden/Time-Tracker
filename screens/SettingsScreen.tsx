import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut, ChevronRight } from "lucide-react-native";

import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { signOutUser } from "@/services/users.service";
import { createCommonStyles, createSettingsStyles } from "../theme/styles";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeDropdown"; // Import the dropdown

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme(); // setTheme is no longer needed here, handled by dropdown
  const { timeFormat, toggleTimeFormat } = useTimeFormat();

  // Styles
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
  const commonStyles = createCommonStyles(
    colors,
    theme,
    Platform.OS,
    "Settings",
  );

  const handleLogout = async () => {
    await signOutUser();
    // Assuming the navigation stack resets or goes to Login
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };

  return (
    <View style={commonStyles.container}>
      <Header />

      <ScrollView contentContainerStyle={commonStyles.main}>
        {/* --- APPEARANCE SECTION --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Appearance</Text>

          <View style={styles.settingsCard}>
            {/* Theme Row: Now uses the Dropdown Component */}
            <View
              style={[
                styles.row,
                { paddingVertical: 10, alignItems: "center" },
              ]}
            >
              <Text style={styles.rowLabel}>Display</Text>
              {/* 
                The ThemeSwitcher is self-contained with its own button style.
                We place it here to replace the old manual toggle.
              */}
              <ThemeSwitcher />
            </View>

            {/* Time Format Row */}
            <TouchableOpacity
              style={[styles.row, styles.rowLast]}
              onPress={toggleTimeFormat}
              activeOpacity={0.7}
            >
              <Text style={styles.rowLabel}>Time Format</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={styles.valueBadge}>{timeFormat}</Text>
                <ChevronRight size={16} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- ACCOUNT SECTION --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>System</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LogOut size={20} color={colors.text} />
            <Text
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                color: colors.text,
              }}
            >
              Logout System
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
