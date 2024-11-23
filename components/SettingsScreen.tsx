import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { createSettingsStyles } from "../theme/styles";

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English");
  const { theme, toggleTheme } = useTheme();
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
          animated={false}
        />
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <Button mode="outlined" onPress={toggleLanguage} style={styles.button}>
        <Text style={styles.languageButtonText}>Language: {language}</Text>
      </Button>

      <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
        <Text style={styles.themeButtonText}>Theme: {theme}</Text>
      </Button>
    </View>
  );
}
