import { Platform, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { isMobileOrTablet } from "../utils/platform";
import { getThemeColors, Theme } from "@/contexts/ThemeContext";

// --- Retro Design Constants ---
const BORDER_WIDTH = 2;
const SHADOW_OFFSET = 4;

export const createCommonStyles = (
  colors: ReturnType<typeof getThemeColors>,
  theme: Theme,
  platform: string,
  routeName?: string,
) => {
  const isWeb = platform === "web";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // UPDATED: Added maxWidth and alignSelf to match the listContainer logic
    main: {
      flex: 1,
      width: "100%",
      maxWidth: 600, // Limits the width on large screens
      alignSelf: "center", // Centers the content container
      padding: 16,
      backgroundColor: colors.background,
    },
    // Retro Card Style
    card: {
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      padding: 20,
      marginBottom: 16,
      // Hard Shadow
      shadowColor: colors.border,
      shadowOffset: { width: SHADOW_OFFSET, height: SHADOW_OFFSET },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android needs elevation to show any shadow at all
      elevation: 4,
    } as ViewStyle,

    title: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: -0.5,
      marginBottom: 8,
    } as TextStyle,

    text: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "500",
    } as TextStyle,

    label: {
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#4B5563",
      marginBottom: 6,
    } as TextStyle,

    // List Container
    listContainer: {
      flex: 1,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      paddingBottom: 80, // Space for FAB
    },

    // Floating Action Button (FAB)
    fab: {
      position: "absolute",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      backgroundColor: "#2EC4B6", // Teal
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      // Hard Shadow
      shadowColor: colors.border,
      shadowOffset: { width: SHADOW_OFFSET, height: SHADOW_OFFSET },
      shadowOpacity: 1,
      shadowRadius: 0,
      zIndex: 20,
      // FIXED: Android Elevation
      elevation: 6,
    } as ViewStyle,
  });
};

export const createHeaderStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    header: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor: "#FFFFFF",
      borderBottomWidth: BORDER_WIDTH,
      borderColor: colors.border,
      zIndex: 10,
    },
    titleGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "900",
      textTransform: "uppercase",
      color: colors.text,
    },
    iconButton: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const createListItemStyles = (
  colors: ReturnType<typeof getThemeColors>,
  platform: string,
) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      marginBottom: 12,
      // Small Hard Shadow
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Removed overflow: 'hidden' because it cuts off shadows on iOS
      // overflow: "hidden",
      // FIXED: Added elevation for Android
      elevation: 3,
    },
    touchable: {
      padding: 16,
      paddingTop: 20,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    idTag: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: colors.border,
      paddingHorizontal: 8,
      paddingVertical: 2,
      zIndex: 1,
    },
    idTagText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "bold",
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    itemSubtitle: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 4,
    },
    iconBox: {
      width: 32,
      height: 32,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 16, // Circle
      alignItems: "center",
      justifyContent: "center",
    },
    progressBarContainer: {
      height: 8,
      width: "100%",
      borderTopWidth: 2,
      borderColor: colors.border,
      backgroundColor: "transparent",
      flexDirection: "row",
      marginTop: 12,
    },
    progressBarFill: {
      backgroundColor: "#FF9F1C", // Orange
      height: "100%",
    },
    // Swipe Actions
    rightSwipeActions: {
      backgroundColor: "#FF6B6B", // Red
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      paddingBottom: 12,
      height: "100%",
      borderLeftWidth: 2,
      borderColor: colors.border,
    },
    leftSwipeActions: {
      backgroundColor: "#2EC4B6", // Teal
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      paddingBottom: 12,
      height: "100%",
      borderRightWidth: 2,
      borderColor: colors.border,
    },
    swipeText: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 12,
    },
  });
};

export const createModalFormStyles = (
  colors: ReturnType<typeof getThemeColors>,
  platform: string,
) => {
  const isWeb = platform === "web";
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 20,
    },
    modalContent: {
      width: "100%",
      maxWidth: 320,
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      padding: 20,
      // Hard Shadow
      shadowColor: colors.border,
      shadowOffset: { width: SHADOW_OFFSET, height: SHADOW_OFFSET },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "900",
      textTransform: "uppercase",
      marginBottom: 24,
      borderBottomWidth: 2,
      borderColor: colors.border,
      paddingBottom: 8,
      color: colors.text,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#4B5563",
      marginBottom: 6,
    },
    input: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: colors.border,
      padding: 12,
      fontSize: 14,
      color: colors.text,
      // Inner shadow simulation via margin/padding trick or just flat
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
      marginTop: 16,
    },
    button: {
      flex: 1,
      height: 45,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    cancelButton: {
      backgroundColor: "#FFFFFF",
    },
    confirmButton: {
      backgroundColor: "#FF9F1C",
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 14,
      color: colors.text,
      textTransform: "uppercase",
    },
  });
};

export const createLoginStyles = (
  colors: ReturnType<typeof getThemeColors>,
  theme: Theme,
  platform: string,
  routeName?: string,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    card: {
      width: "100%",
      maxWidth: 320,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: colors.border,
      padding: 24,
      alignItems: "center",
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    logoBox: {
      width: 64,
      height: 64,
      backgroundColor: "#000000",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      borderWidth: 2,
      borderColor: "#000000",
      shadowColor: "#FF9F1C",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    title: {
      fontSize: 24,
      fontWeight: "900",
      textTransform: "uppercase",
      marginBottom: 8,
      color: colors.text,
    },
    subtitle: {
      fontSize: 12,
      color: "#6B7280",
      marginBottom: 24,
    },
    inputGroup: {
      width: "100%",
      marginBottom: 16,
    },
    input: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: colors.border,
      padding: 12,
      fontSize: 14,
      color: colors.text,
    },
    loginButton: {
      width: "100%",
      height: 48,
      backgroundColor: "#FF9F1C",
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    loginButtonText: {
      fontWeight: "bold",
      fontSize: 14,
      textTransform: "uppercase",
      color: colors.text,
    },
    toggleButton: {
      marginTop: 16,
    },
    toggleText: {
      fontSize: 12,
      textDecorationLine: "underline",
      color: "#6B7280",
    },
    errorText: {
      color: "#FF6B6B",
      fontSize: 12,
      marginBottom: 4,
      alignSelf: "flex-start",
    },
  });
};

export const createJobStyles = (colors: ReturnType<typeof getThemeColors>) =>
  StyleSheet.create({
    timerCard: {
      backgroundColor: "#FDFBF7",
      borderWidth: 2,
      borderColor: colors.border,
      padding: 20,
      alignItems: "center",
      marginBottom: 16,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    timerLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 8,
      color: "#6B7280",
    },
    timerDisplay: {
      fontSize: 48,
      fontWeight: "900",
      letterSpacing: 2,
      marginBottom: 32,
      color: colors.text,
      fontVariant: ["tabular-nums"],
    },
    controlButton: {
      width: 120,
      height: 48,
      borderWidth: 2,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    startBtn: { backgroundColor: "#FF9F1C" },
    stopBtn: { backgroundColor: "#FF6B6B" },
    btnText: {
      fontWeight: "bold",
      textTransform: "uppercase",
      color: colors.text,
    },

    // Action Grid
    actionGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
    },
    actionButton: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: colors.border,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },

    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
      borderBottomWidth: 2,
      borderColor: colors.border,
      alignSelf: "flex-start",
      marginBottom: 12,
      color: colors.text,
    },
  });

export const createSettingsStyles = (
  colors: ReturnType<typeof getThemeColors>,
) =>
  StyleSheet.create({
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#4B5563",
      marginBottom: 12,
      marginLeft: 4,
    },
    settingsCard: {
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 2,
      borderColor: colors.border,
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    rowLabel: {
      fontWeight: "bold",
      color: colors.text,
    },
    valueBadge: {
      fontSize: 12,
      backgroundColor: "#FF9F1C",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: colors.border,
      fontWeight: "bold",
      color: colors.text,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: colors.borderWidth,
      borderRadius: colors.borderRadius,
    },
    themeButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
    },
    logoutButton: {
      backgroundColor: "#FF6B6B",
      borderWidth: 2,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      gap: 8,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      // FIXED: Android Elevation
      elevation: 4,
    },
  });
