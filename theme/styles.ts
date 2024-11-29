import { StyleSheet } from "react-native";
import { isMobileOrTablet } from "../utils/platform";
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
      elevation: 0, // Android
      shadowOpacity: 0, // iOS
      zIndex: 1,
      shadowColor: "transparent",
      shadowOffset: { height: 0, width: 0 },
      shadowRadius: 0,
      borderWidth: 0,
      padding: 0,
      margin: 0,
      backgroundColor: "transparent",
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
      fontWeight: "600",
    },
    jobList: {
      minHeight: 500,
      width: 300,
      borderWidth: 2,
      borderRadius: 0,
      padding: 10,
    },
    jobItem: {
      // padding: 12,
      borderWidth: 2,
      marginBottom: 10,
      height: 45,
      // justifyContent: "center",
      // alignItems: "center",
    },
    jobButton: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 0,
      marginVertical: 5,
      height: 45,
      width: 276,
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 12,
      paddingRight: 8,
      flex: 1,
      position: "relative",
    },
    jobButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "left",
      flex: 1,
    },
    contextMenuButtons: {
      backgroundColor: "transparent",
      borderWidth: 0,
      padding: 0,
      margin: 0,
      color: colors.icon,
      display: !isMobileOrTablet() ? "flex" : "none",
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    swipeableContainer: {
      display: isMobileOrTablet() ? "flex" : "none",
    },

    addButton: {
      position: "absolute",
      bottom: 10,
      left: 10,
      right: 10,
      borderWidth: 2,
      borderRadius: 0,
      borderColor: colors.border,
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
      fontWeight: "600",
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
      fontWeight: "600",
      color: colors.text,
    },
    addButton: {
      position: "absolute",
      bottom: 10,
      left: 10,
      right: 10,
      borderWidth: 2,
      borderRadius: 0,
      borderColor: colors.border,
    },
    addButtonText: {
      color: colors.text,
      fontSize: 32,
    },
    timer: {
      fontSize: 56,
      textAlign: "center",
      marginVertical: 20,
      fontWeight: "400",
      color: colors.text,
    },
    backButton: {
      marginBottom: 10,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 12,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    backButtonText: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "600",
    },
    timeEntryList: {
      minHeight: 300,
      maxHeight: 400,
      flexGrow: 1,
      width: 300,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      backgroundColor: colors.background,
      position: "relative",
      overflow: "hidden",
    },
    backToJobsButton: {
      marginBottom: 10,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 12,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      fontSize: 22,
      fontWeight: "600",
    },
    button: {
      borderWidth: 2,
      borderColor: colors.border,
      width: 100,
      height: 100,
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 0,
      backgroundColor: colors.background,
    },

    timeEntry: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 0,
      marginVertical: 5,
      padding: 0,
      height: 45,
      width: 276,
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
    timeEntryText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "left",
      flex: 1,
    },

    contextMenuButtons: {
      backgroundColor: colors.background,
      right: 0,
      position: "absolute",
      color: colors.icon,
      display: !isMobileOrTablet() ? "flex" : "none",
    },
    swipeableContainer: {
      display: isMobileOrTablet() ? "flex" : "none",
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
      backgroundColor: colors.background,
    },
    printButtonText: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "600",
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
