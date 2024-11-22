import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, getThemeColors } from "../contexts/ThemeContext";
import { Text, Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

export default function SettingsScreen() {
  const [language, setLanguage] = useState("English");
  const { theme, toggleTheme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

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
        />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <Button mode="outlined" onPress={toggleLanguage} style={styles.button}>
        Language: {language}
      </Button>

      <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
        Theme: {theme}
      </Button>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      alignItems: "center",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
      color: colors.text,
    },
    placeholder: {
      width: 48,
    },
    button: {
      width: 300,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
      marginBottom: 15,
      height: 45,
      justifyContent: "center",
      borderRadius: 0,
    },
  });

const styles = makeStyles({
  text: colors.text,
  background: colors.background,
  border: colors.primary,
  icon: colors.primary,
  link: colors.primary,
});
