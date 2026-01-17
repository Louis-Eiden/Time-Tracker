import { Platform, StyleSheet, TextStyle } from "react-native";
import { isMobileOrTablet } from "../utils/platform";
import { getThemeColors, Theme, useTheme } from "@/contexts/ThemeContext";
import {
  red100,
  white,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

// Common styles that can be reused across components
export const createCommonStyles = (
  colors: ReturnType<typeof getThemeColors>,
  theme: Theme,
  platform: string,
  routeName?: string,
) => {
  const isClear = theme?.startsWith("clear") ?? false;
  const isJobScreen = routeName?.startsWith("Job") ?? false;
  const isWeb = platform === "web";

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      alignItems: "center",
    },
    main: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: isWeb ? undefined : "center",
      backgroundColor: colors.background,
    },
    button: {
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderRadius: colors.borderRadius,
      borderColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "600",
    },

    text: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "400",
    },

    listContainer: {
      minHeight: 300,
      maxHeight: isWeb ? 400 : isJobScreen ? 400 : 800,
      flexGrow: 1,
      width: 300,
      borderWidth: isClear ? 0 : colors.borderWidth,
      borderBottomWidth: isClear ? 0 : colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 10,
      backgroundColor: colors.background,
      position: "relative",
      overflow: "hidden",
    },

    // Add Button
    addButton: {
      width: isJobScreen ? "50%" : "100%",
      height: 46,
      margin: 0,
      borderLeftWidth: isJobScreen ? 0 : isClear ? 0 : colors.borderWidth,
      borderWidth: isClear ? 0 : colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderRadius: colors.borderRadius,
      borderColor: colors.border,
      backgroundColor: colors.buttons,
    },

    addButtonText: {
      color: colors.text,
      fontSize: 32,
    },
  });
};

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
  });

export const createListItemStyles = (
  colors: ReturnType<typeof getThemeColors>,
  platform: string,
) => {
  const isWeb = platform === "web";

  return StyleSheet.create({
    container: {
      borderColor: colors.border,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderRadius: colors.borderRadius,
      marginBottom: 10,
      height: 45,
      padding: isWeb ? 10 : 0,
      width: "100%",
      backgroundColor: colors.buttons,
      elevation: 0,
      shadowOpacity: 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 225,
    },

    swipeableContainer: {
      display: isMobileOrTablet() ? "flex" : "none",
    },
    leftSwipeActions: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: colors.borderRadius,
      width: 70,
      marginTop: 0,
      height: 45,
    },

    rightSwipeActions: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: colors.borderRadius,
      width: 70,
      marginTop: 0,
      height: 45,
    },

    touchableText: {
      color: "white",
    },
  });
};

export const createModalFormStyles = (
  colors: ReturnType<typeof getThemeColors>,
  platform: string,
) => {
  const isWeb = platform === "web";

  return StyleSheet.create({
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
      // padding: 20,
      backgroundColor: colors.background,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center",
      color: colors.text,
    },

    modalInput: {
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 10,
      marginBottom: 15,
      height: 40,
      width: isWeb ? "50%" : "80%",
      color: colors.text,
    },
    modalInputFocused: {
      borderColor: colors.border,
      outlineStyle: "none",
      backgroundColor: "white",
    } as TextStyle,

    // buttons
    openPickerButton: {
      position: "relative",
      marginTop: 20,
      // padding: 20,
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius: colors.borderRadius,
      backgroundColor: colors.buttons,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      height: 45,
      // alignItems: "center",
      // justifyContent: "center",
    },

    openPickerButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      width: "80%",
    },
    modalButton: {
      margin: 20,
      flex: 1,
      marginHorizontal: 5,
      borderRadius: colors.borderRadius,
      borderColor: colors.border,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      maxWidth: 276,
      backgroundColor: colors.buttons,
    },
    modalButtonText: {
      color: "#000000",
    },
  });
};

export const createLoginStyles = (
  colors: ReturnType<typeof getThemeColors>,
  theme: Theme,
  platform: string,
  routeName?: string,
) => {
  const isClear = theme?.startsWith("clear") ?? false;
  const isJobScreen = routeName?.startsWith("Job") ?? false;
  const isWeb = platform === "web";

  return StyleSheet.create({
    loginListContainer: {
      minHeight: 300,
      maxHeight: 400,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      borderWidth: isClear ? 0 : colors.borderWidth,
      borderBottomWidth: isClear ? 0 : colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 30,
      backgroundColor: colors.background,
      // position: "relative",
      // overflow: "hidden",
    },

    input: {
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
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

    // Buttons

    loginButton: {
      marginTop: 20,
      // padding: 20,
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius: colors.borderRadius,
      backgroundColor: colors.buttons,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
    },
    loginButtonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
    },
    toggleButton: {
      marginTop: 16,
    },
    toggleText: {
      color: colors.text,
      textAlign: "center",
    },
  });
};

// export const createHomeStyles = (colors: ReturnType<typeof getThemeColors>) =>
//   StyleSheet.create({
//     jobButton: {
//       borderColor: colors.border,
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//       borderRadius: colors.borderRadius,
//       marginVertical: 5,
//       height: 45,
//       width: 276,
//       backgroundColor: colors.background,
//       elevation: 0,
//       shadowOpacity: 0,
//     },
//     buttonContent: {
//       borderRadius: colors.borderRadius,
//       width: 225,
//       flexDirection: "row",
//     },
//     jobButtonText: {
//       color: colors.text,
//       fontSize: 18,
//       fontWeight: "400",
//       flex: 1,
//     },
//     contextMenuButtons: {
//       // backgroundColor: "transparent",
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//       position: "absolute",
//       right: -1,
//       top: -2,
//       zIndex: 1000,
//       padding: 0,
//       margin: 0,
//       color: colors.icon,
//       display: !isMobileOrTablet() ? "flex" : "none",
//       width: 24,
//       height: 24,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     swipeableContainer: {
//       display: isMobileOrTablet() ? "flex" : "none",
//     },

//     modalContainer: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     modalContent: {
//       flex: 1,
//       width: "100%",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: 20,
//       backgroundColor: colors.background,
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//       borderColor: colors.border,
//     },
//     modalTitle: {
//       fontSize: 18,
//       marginBottom: 15,
//       textAlign: "center",
//     },
//     input: {
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//       padding: 10,
//       marginBottom: 15,
//       height: 40,
//     },
//     modalButtons: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       width: "100%",
//     },
//     modalButton: {
//       flex: 1,
//       marginHorizontal: 5,
//       borderRadius: colors.borderRadius,
//       borderColor: colors.border,
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//     },
//     modalInput: {
//       borderWidth: colors.borderWidth,
//       borderBottomWidth: colors.borderBottomWidth,
//       borderColor: colors.border,
//       borderRadius: colors.borderRadius,
//       padding: 10,
//       marginBottom: 15,
//       height: 40,
//       width: "100%",
//     },
//     modalActionButton: {
//       borderColor: "#000000",
//       borderRadius: colors.borderRadius,
//       backgroundColor: "#D3D3D3",
//     },
//   });

export const createSettingsStyles = (
  colors: ReturnType<typeof getThemeColors>,
) =>
  StyleSheet.create({
    placeholder: {
      width: 48,
    },
    button: {
      width: 300,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      marginBottom: 15,
      height: 45,
      borderRadius: colors.borderRadius,
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
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 10,
      backgroundColor: colors.background,
      position: "relative",
      overflow: "hidden",
    },

    timeEntry: {
      borderColor: colors.border,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderRadius: colors.borderRadius,
      marginVertical: 5,
      padding: 0,
      height: 45,
      width: 276,
      backgroundColor: colors.buttons,
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
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      marginBottom: 10,
    },
    sessionText: {
      color: colors.text,
    },

    // ---------------------------------------------------------------------------
    // buttons
    // ---------------------------------------------------------------------------

    // Start Stop Button
    timerButton: {
      borderWidth: 2,
      borderColor: colors.border,
      width: 100,
      height: 100,
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: colors.borderRadius,
      backgroundColor: colors.background,
    },

    //   Back to days Button
    backButton: {
      marginBottom: 10,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 0,
      // paddingRight: 20,
      // paddingLeft: 20,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttons,
    },
    backButtonText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
    },
    // Back to Jobs Button
    backToJobsButton: {
      marginBottom: 10,
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderColor: colors.border,
      borderRadius: colors.borderRadius,
      padding: 0,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttons,
      fontSize: 22,
      fontWeight: "600",
    },

    // Print Button
    printButton: {
      width: "50%",
      borderWidth: colors.borderWidth,
      borderBottomWidth: colors.borderBottomWidth,
      borderRadius: colors.borderRadius,
      borderColor: colors.border,
      backgroundColor: colors.buttons,
    },

    printButtonText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
    },
  });
