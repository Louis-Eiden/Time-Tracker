import { StyleSheet } from "react-native";
import { getThemeColors } from "@/contexts/ThemeContext";

export const createButtonStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    // Login Button
    loginButton: {
      marginTop: 20,
      // padding: 20,
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius: 0,
      backgroundColor: colors.buttons,
      borderWidth: 2,
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

    // Add Button
    addButton: {
      width: "50%",
      height: 46,
      margin: 0,
      borderLeftWidth: 0,
      borderWidth: 2,
      borderRadius: 0,
      borderColor: colors.border,
      backgroundColor: colors.buttons,
    },

    addButtonText: {
      color: colors.text,
      fontSize: 32,
    },

    // Print Button
    printButton: {
      width: "50%",
      borderWidth: 2,
      borderRadius: 0,
      borderColor: colors.border,
      backgroundColor: colors.buttons,
    },

    printButtonText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
    },

    //   Back to days Button
    backButton: {
      marginBottom: 10,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
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
      fontSize: 22,
      fontWeight: "600",
    },
    // Back to Jobs Button
    backToJobsButton: {
      marginBottom: 10,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 0,
      padding: 12,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttons,
      fontSize: 22,
      fontWeight: "600",
    },
  });
