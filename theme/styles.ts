import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { getThemeColors } from "@/contexts/ThemeContext";

// --- Retro Design Constants ---
const BORDER_WIDTH = 2;
const SHADOW_OFFSET = 4;

export const createCommonStyles = (
  colors: ReturnType<typeof getThemeColors>,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    main: {
      flex: 1,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      padding: 16,
      backgroundColor: colors.background,
    },

    // --- SHARED RETRO CARD STYLES (Hard Shadow) ---
    retroCardWrapper: {
      position: "relative",
      width: "100%",
      marginBottom: 16,
    } as ViewStyle,

    retroCardShadow: {
      position: "absolute",
      top: 4,
      left: 4,
      width: "100%",
      height: "100%",
      backgroundColor: "#000000", // Hard Black Shadow
    } as ViewStyle,

    retroCardMain: {
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      elevation: 0, // Disable native Android shadow
      zIndex: 2, // Ensure it sits above the shadow
    } as ViewStyle,
    // ----------------------------------------------

    // Old soft shadow card (kept for settings/other lists if needed)
    card: {
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      padding: 20,
      marginBottom: 16,
      shadowColor: colors.border,
      shadowOffset: { width: SHADOW_OFFSET, height: SHADOW_OFFSET },
      shadowOpacity: 1,
      shadowRadius: 0,
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

    listContainer: {
      flex: 1,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      paddingBottom: 80,
    },

    fab: {
      position: "absolute",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      backgroundColor: "#2EC4B6",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
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
    swipeWrapper: {
      marginBottom: 12,
    },
    container: {
      backgroundColor: "#FFFFFF",
      borderWidth: BORDER_WIDTH,
      borderColor: colors.border,
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
      borderRadius: 16,
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
      backgroundColor: "#FF9F1C",
      height: "100%",
    },
    rightSwipeActions: {
      backgroundColor: "#FF6B6B",
      justifyContent: "center",
      alignItems: "center",
      width: 80,
      height: "100%",
      borderLeftWidth: 2,
      borderColor: colors.border,
    },
    leftSwipeActions: {
      backgroundColor: "#2EC4B6",
      justifyContent: "center",
      alignItems: "center",
      width: 80,
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
) => {
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
      borderWidth: 2,
      borderColor: colors.border,
      padding: 20,
      shadowColor: colors.border,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
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
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
      marginTop: 16,
    },
    pickerContainer: {
      gap: 12,
      height: 96,
    },
    button: {
      flex: 1,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 12,
      paddingVertical: 8,
      height: 42,
    },
    cancelButton: {
      backgroundColor: "#FFFFFF",
    },
    confirmButton: {
      backgroundColor: "#FF9F1C",
    },
    buttonText: {
      fontWeight: "600",
      fontSize: 14,
      color: colors.text,
      textTransform: "uppercase",
      marginVertical: 3,
      textAlign: "center",
    },
  });
};

export const createLoginStyles = (
  colors: ReturnType<typeof getThemeColors>,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    // Specific wrapper sizing for Login
    loginCardWrapper: {
      maxWidth: 320,
    },
    // Specific internal padding for Login
    loginCardContent: {
      padding: 24,
      alignItems: "center",
    },
    logoWrapper: {
      width: 64,
      height: 64,
      marginBottom: 16,
      position: "relative",
    },
    logoShadow: {
      position: "absolute",
      top: 4,
      left: 4,
      width: "100%",
      height: "100%",
      backgroundColor: "#FF9F1C",
    },
    logoMain: {
      width: "100%",
      height: "100%",
      backgroundColor: "#000000",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#000000",
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
      padding: 8,
      marginTop: 8,
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
    // Updated: Removed native shadow props, as we use the retroCard wrapper now
    timerCard: {
      backgroundColor: "#FDFBF7",
      // Border is handled by wrapper usually, but we keep it here if we want specific color
      // or we can let the wrapper handle border.
      // For safety, let's keep padding/align here, but remove shadow/elevation.
      padding: 20,
      alignItems: "center",
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
    },
    startBtn: { backgroundColor: "#FF9F1C" },
    stopBtn: { backgroundColor: "#FF6B6B" },
    btnText: {
      fontWeight: "bold",
      textTransform: "uppercase",
      color: colors.text,
    },
    actionGrid: {
      flexDirection: "row",
      width: "100%",
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
      height: 44,
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
      borderRadius: colors.borderRadius,
    },
    themeButtonText: {
      color: colors.text,
      marginVertical: 3,
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
      height: 56,
    },
  });

export const createThemeDropdownStyles = () =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdownContainer: {
      width: 300,
      overflow: "hidden",
    },
    header: {
      padding: 16,
      alignItems: "center",
    },
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    optionText: {
      fontSize: 16,
    },
  });
