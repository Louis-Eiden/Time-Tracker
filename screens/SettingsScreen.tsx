import React, { useState } from "react";
import { View } from "react-native";
import ThemeSwitcher from "../components/ThemeDropdown";
import { useTheme, getThemeColors } from "@/contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createCommonStyles, createSettingsStyles } from "../theme/styles";
import Header from "../components/Header";

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English");
  const { timeFormat, toggleTimeFormat } = useTimeFormat();
  const navigation = useNavigation();

  // styles
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const styles = createSettingsStyles(colors);
  const commonStyles = createCommonStyles(colors, theme);

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "German" : "English");
  };

  return (
    <View style={commonStyles.container}>
      <Header />

      <Button mode="outlined" onPress={toggleLanguage} style={styles.button}>
        <Text style={styles.languageButtonText}>Language: {language}</Text>
      </Button>
      <ThemeSwitcher />
      {/* <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
        <Text style={styles.themeButtonText}>Theme: {theme}</Text>
      </Button> */}
      <Button mode="outlined" onPress={toggleTimeFormat} style={styles.button}>
        <Text style={styles.themeButtonText}>Time Format: {timeFormat}</Text>
      </Button>
    </View>
  );
}
