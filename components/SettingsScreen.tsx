import React, { useState } from "react";
import { View } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { useTimeFormat } from "@/contexts/TimeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createSettingsStyles } from "../theme/styles";

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English");
  const { theme, toggleTheme } = useTheme();
  const { timeFormat, toggleTimeFormat } = useTimeFormat();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const styles = createSettingsStyles(colors);

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "German" : "English");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          iconColor={colors.text}
          rippleColor="transparent"
          containerColor="transparent" // Background color of button
          theme={{
            colors: {
              secondaryContainer: "transparent", // Controls hover state background
            },
          }}
          animated={false}
        />
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      {/* TODO: add timeformat toggle
      TODO: add mode toggle for wireframe/modern */}
      <Button mode="outlined" onPress={toggleLanguage} style={styles.button}>
        <Text style={styles.languageButtonText}>Language: {language}</Text>
      </Button>
      <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
        <Text style={styles.themeButtonText}>Theme: {theme}</Text>
      </Button>
      <Button mode="outlined" onPress={toggleTimeFormat} style={styles.button}>
        <Text style={styles.themeButtonText}>Time Format: {timeFormat}</Text>
      </Button>
    </View>
  );
}
