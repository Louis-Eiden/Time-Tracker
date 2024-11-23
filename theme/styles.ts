import { StyleSheet } from "react-native";
import { getThemeColors } from "../contexts/ThemeContext";

// Common styles that can be reused across components
export const createCommonStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    button: {
      borderWidth: 2,
      borderRadius: 0,
      borderColor: colors.border,
    },
    title: {
      color: colors.text,
    },
  });

export const createHomeStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      flex: 1,
      padding: 20,
      alignItems: "center",
      backgroundColor: colors.background,
      position: "absolute",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      position: "relative",
      marginTop: 10,
    },
    settingsIcon: {
      position: "absolute",
      right: 0,
      color: colors.icon,
    },
    main: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "400",
    },
    jobList: {
      minHeight: 500,
      width: 300,
      borderWidth: 2,
      borderRadius: 0,
      padding: 10,
    },
    jobItem: {
      padding: 12,
      borderWidth: 2,
      marginBottom: 10,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    jobButton: {
      borderColor: "#000000",
      borderWidth: 2,
      borderRadius: 0,
      marginVertical: 5,
      height: 40,
      justifyContent: "center",
    },
    modalInput: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      marginBottom: 15,
      height: 40,
    },
    modalActionButton: {
      borderColor: "#000000",
      borderRadius: 0,
      backgroundColor: "#D3D3D3",
    },
    addButton: {
      position: "absolute",
      bottom: 20,
      left: 10,
      right: 10,
      borderWidth: 2,
      borderRadius: 0,
    },
    addButtonText: {
      color: colors.text,
      fontSize: 32,
    },
  });

export const createSettingsStyles = (
  colors: ReturnType<typeof getThemeColors>
) =>
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
      borderWidth: 2,
      borderColor: colors.border,
      marginBottom: 15,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 0,
    },
    languageButtonText: {
      color: colors.text,
    },
    themeButtonText: {
      color: colors.text,
    },
  });

export const createJobStyles = (colors: ReturnType<typeof getThemeColors>) =>
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
      position: "relative",
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
      color: colors.text,
    },
    timer: {
      fontSize: 56,
      textAlign: "center",
      marginVertical: 40,
      fontWeight: "400",
      color: colors.text,
    },
    timeEntryList: {
      minHeight: 300,
      maxHeight: 300,
      width: 300,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      backgroundColor: colors.background,
      position: "relative",
      overflow: "hidden",
    },
    button: {
      borderWidth: 2,
      borderColor: colors.border,
      width: 100,
      height: 100,
      alignSelf: "center",
      marginBottom: 40,
      justifyContent: "center",
      borderRadius: 0,
    },
    timeEntry: {
      padding: 12,
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 0,
      marginBottom: 10,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    timeEntryText: {
      color: colors.text,
    },
    printButton: {
      padding: 12,
      borderWidth: 2,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 10,
      width: 276,
      borderColor: colors.border,
      borderRadius: 0,
    },
    printButtonText: {
      color: colors.text,
    },
    backIcon: {
      color: colors.icon,
    },
    content: {
      flex: 1,
      alignItems: "center",
    },
    timerContainer: {
      alignItems: "center",
      marginBottom: 30,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginBottom: 30,
    },
    buttonText: {
      fontSize: 16,
      color: colors.text,
      textAlign: "center",
    },
    sessionList: {
      width: "100%",
    },
    sessionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderWidth: 2,
      borderColor: colors.border,
      marginBottom: 10,
    },
    sessionText: {
      color: colors.text,
    },
  });
