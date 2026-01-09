import { StyleSheet, TextStyle } from "react-native";
import { isMobileOrTablet } from "../utils/platform";
import { getThemeColors } from "../contexts/ThemeContext";
import {
  red100,
  white,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

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

export const createHeaderStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    header: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      position: "relative",
      marginTop: 10,
      right: 0,
    },
    // headerIcons: {
    //   position: "absolute",
    //   right: 0,
    //   color: colors.icon,
    //   elevation: 0, // Android
    //   shadowOpacity: 0, // iOS
    //   zIndex: 1,
    //   shadowColor: "transparent",
    //   shadowOffset: { height: 0, width: 0 },
    //   shadowRadius: 0,
    //   borderWidth: 0,
    //   padding: 0,
    //   margin: 0,
    //   backgroundColor: "transparent",
    // },
    title: {
      fontSize: 28,
      fontWeight: "600",
    },
  });

export const createListItemStyles = (
  colors: ReturnType<typeof getThemeColors>
) =>
  StyleSheet.create({
    container: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 0,
      marginVertical: 5,
      height: 45,
      width: "100%",
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 225,
      // borderColor: colors.border,
      // borderWidth: 0,
      // borderRadius: 0,
    },
    text: {
      // position: "absolute",
      // top: "50%",
      // left: "50%",
      // transform: [{ translateX: -50 }, { translateY: -50 }],
      color: colors.text,
      fontSize: 18,
      fontWeight: "400",
      // flex: 1,
    },
    // contextMenuButton: {
    //   // borderColor: colors.border,
    //   // borderWidth: 2,
    //   // borderRadius: 0,
    //   backgroundColor: "transparent",
    //   position: "absolute",
    //   right: -89,
    //   top: -12,
    //   padding: 0,
    //   margin: 0,
    //   color: colors.icon,
    //   display: !isMobileOrTablet() ? "flex" : "none",
    //   width: 24,
    //   height: 24,
    //   // alignItems: "center",
    //   // justifyContent: "center",
    // },
    swipeableContainer: {
      display: isMobileOrTablet() ? "flex" : "none",
    },
    leftSwipeActions: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      marginTop: 5,
      height: 45,
    },

    rightSwipeActions: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      marginTop: 5,
      height: 45,
    },

    touchableText: {
      color: "white",
    },
  });

export const createModalFormStyles = (
  colors: ReturnType<typeof getThemeColors>
) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center",
      color: colors.text,
    },
    modalInput: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: "50%",
      color: colors.text,
    },
    modalInputFocused: {
      borderColor: colors.border,
      outlineStyle: "none",
      backgroundColor: "white",
    } as TextStyle,

    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "50%",
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 0,
      borderColor: colors.border,
      borderWidth: 2,
      maxWidth: 276,
      backgroundColor: "#D3D3D3",
    },
  });

export const createLoginStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      backgroundColor: colors.background,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: "100%",
      color: colors.text,
    },
    inputFocused: {
      borderColor: colors.border,
      outlineStyle: "none",
      appearance: "none",
      backgroundColor: "white",
    } as TextStyle,

    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 4,
    },
    toggleButton: {
      marginTop: 16,
    },
    toggleText: {
      color: colors.text,
      textAlign: "center",
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
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      position: "relative",
      marginTop: 10,
      right: 0,
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
      borderRadius: 0,
      width: 225,
      flexDirection: "row",
    },
    jobButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "400",
      flex: 1,
    },
    contextMenuButtons: {
      // backgroundColor: "transparent",
      borderWidth: 0,
      position: "absolute",
      right: -1,
      top: -2,
      zIndex: 1000,
      padding: 0,
      margin: 0,
      color: colors.icon,
      display: !isMobileOrTablet() ? "flex" : "none",
      width: 24,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },

    swipeableContainer: {
      display: isMobileOrTablet() ? "flex" : "none",
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      padding: 10,
      marginBottom: 15,
      height: 40,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 0,
      borderColor: colors.border,
      borderWidth: 2,
    },
    modalInput: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: "100%",
    },
    modalActionButton: {
      borderColor: "#000000",
      borderRadius: 0,
      backgroundColor: "#D3D3D3",
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
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      marginTop: 10,
      marginRight: 0,
      paddingRight: 0,
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
      // justifyContent: "center",
      // alignItems: "center",
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
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
      position: "relative",
      marginTop: 10,
      right: 0,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text,
    },
    timer: {
      fontSize: 56,
      textAlign: "center",
      marginVertical: 20,
      fontWeight: "400",
      color: colors.text,
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

    // Start Stop Button
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
    buttonContent: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginBottom: 30,
    },

    // buttonContent: {
    //   borderRadius: 0,
    //   width: 225,
    //   flexDirection: "row",
    // },

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
