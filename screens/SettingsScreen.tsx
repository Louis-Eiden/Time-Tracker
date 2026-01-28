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
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { signOutUser } from "@/services/users.service";
import { createCommonStyles, createSettingsStyles } from "../theme/styles";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeDropdown";
import RetroButton from "../components/RetroButton";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { timeFormat, toggleTimeFormat } = useTimeFormat();

  // Styles
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
  const commonStyles = createCommonStyles(colors);

  const handleLogout = async () => {
    await signOutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={["top", "bottom"]}>
      <Header />

      <ScrollView contentContainerStyle={commonStyles.main}>
        {/* --- APPEARANCE SECTION --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Appearance</Text>

          <View style={styles.settingsCard}>
            {/* Theme Row */}

            {/* <ThemeSwitcher /> */}

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

          <RetroButton
            style={styles.logoutButton}
            onPress={handleLogout}
            shadowColor={colors.border}
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
          </RetroButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
